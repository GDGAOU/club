import type { NextRequest } from 'next/server';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { google } from "googleapis";
import { Readable } from 'stream';

// Initialize Google Drive API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

type DownloadResponse = {
  downloadUrl: string;
  message?: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ message: "Paper ID is required" }, { status: 400 });
  }

  try {
    const session = await getServerSession(authOptions);
    const paper = await prisma.paper.findUnique({
      where: { id },
    });

    if (!paper) {
      return NextResponse.json({ message: "Paper not found" }, { status: 404 });
    }

    // If paper is private, check if user is authenticated and is the owner
    if (!paper.isPublic && (!session?.user?.email || session.user.email !== paper.uploadedBy)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
      // Update download count first
      const updatedPaper = await prisma.paper.update({
        where: { id },
        data: { downloads: { increment: 1 } },
      });

      console.log('Updated download count:', updatedPaper.downloads);

      // Get the file from Google Drive
      const file = await drive.files.get({
        fileId: paper.fileId,
        alt: 'media',
      }, {
        responseType: 'stream',
      });

      // Set appropriate headers for file download
      const headers = new Headers();
      headers.set('Content-Type', 'application/pdf');
      // Encode filename for Content-Disposition
      const encodedFilename = encodeURIComponent(paper.title.replace(/[^a-zA-Z0-9.-]/g, '_'));
      headers.set('Content-Disposition', `attachment; filename="${encodedFilename}.pdf"`);

      // Convert stream to buffer for proper download handling
      const chunks: Uint8Array[] = [];
      for await (const chunk of file.data as Readable) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);

      return new NextResponse(buffer, {
        headers,
        status: 200,
      });
    } catch (error) {
      console.error('Error downloading file from Google Drive:', error);
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 404 });
      }
      return NextResponse.json({ message: "An unknown error occurred" }, { status: 404 });
    }
  } catch (error) {
    console.error('Error downloading paper:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
  }
}
