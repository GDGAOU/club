import { NextRequest, NextResponse } from 'next/server';
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

type DownloadResponse = {
  downloadUrl: string;
  message?: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return NextResponse.json({ downloadUrl: '', message: "Paper ID is required" }, { status: 400 });
  }

  try {
    const session = await getServerSession(authOptions);
    const paper = await prisma.paper.findUnique({
      where: { id },
    });

    if (!paper) {
      return NextResponse.json({ downloadUrl: '', message: "Paper not found" }, { status: 404 });
    }

    // If paper is private, check if user is authenticated and is the owner
    if (!paper.isPublic && (!session?.user?.email || session.user.email !== paper.uploadedBy)) {
      return NextResponse.json({ downloadUrl: '', message: "Unauthorized" }, { status: 401 });
    }

    try {
      // Update download count first
      const updatedPaper = await prisma.paper.update({
        where: { id },
        data: { downloads: { increment: 1 } },
      });

      console.log('Updated download count:', updatedPaper.downloads);

      // Get the file from Google Drive
      const response = await drive.files.get(
        {
          fileId: paper.fileId,
          fields: 'webContentLink',
        },
        {
          responseType: 'json',
        }
      );

      const file = response.data;
      if (!file.webContentLink) {
        return NextResponse.json({ 
          downloadUrl: '', 
          message: "Download link not available" 
        }, { status: 404 });
      }

      return NextResponse.json({ 
        downloadUrl: file.webContentLink,
        message: "Download link generated successfully" 
      }, { status: 200 });

    } catch (error) {
      console.error('Error downloading file from Google Drive:', error);
      if (error instanceof Error) {
        return NextResponse.json({ downloadUrl: '', message: error.message }, { status: 404 });
      }
      return NextResponse.json({ downloadUrl: '', message: "An unknown error occurred" }, { status: 404 });
    }
  } catch (error) {
    console.error('Error downloading paper:', error);
    if (error instanceof Error) {
      return NextResponse.json({ downloadUrl: '', message: error.message }, { status: 500 });
    }
    return NextResponse.json({ downloadUrl: '', message: "An unknown error occurred" }, { status: 500 });
  }
}
