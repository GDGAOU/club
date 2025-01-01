import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { google } from "googleapis";

// Initialize Google Drive API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return new NextResponse("Paper ID is required", { status: 400 });
  }

  try {
    const session = await getServerSession(authOptions);
    const paper = await prisma.paper.findUnique({
      where: { id },
    });

    if (!paper) {
      return new NextResponse("Paper not found", { status: 404 });
    }

    // Check if user has access to the paper
    if (!paper.isPublic && (!session || session.user?.email !== paper.uploadedBy)) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Increment view count
    await prisma.paper.update({
      where: { id: paper.id },
      data: { views: { increment: 1 } },
    });

    // Get the file from Google Drive
    const response = await drive.files.get(
      {
        fileId: paper.fileId,
        alt: 'media',
      },
      { responseType: 'stream' }
    );

    // Set appropriate headers
    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    // Encode filename for Content-Disposition
    const encodedFilename = encodeURIComponent(paper.title.replace(/[^a-zA-Z0-9.-]/g, '_'));
    headers.set('Content-Disposition', `inline; filename="${encodedFilename}.pdf"`);

    // Convert stream to blob
    const chunks: Uint8Array[] = [];
    for await (const chunk of response.data) {
      chunks.push(chunk);
    }
    const blob = new Blob(chunks, { type: 'application/pdf' });

    return new NextResponse(blob, { headers });
  } catch (error) {
    console.error('Error viewing paper:', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
