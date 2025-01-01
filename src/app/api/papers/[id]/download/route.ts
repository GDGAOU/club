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

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    const paper = await prisma.paper.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!paper) {
      return NextResponse.json(
        { error: "Paper not found" },
        { status: 404 }
      );
    }

    // If paper is private, check if user is authenticated and is the owner
    if (!paper.visible) {
      const session = await getServerSession(authOptions);
      if (!session?.user?.email || session.user.email !== paper.user?.email) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }
    }

    try {
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
        return NextResponse.json(
          { error: "Download link not available" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        url: file.webContentLink,
        title: paper.title,
      });

    } catch (error) {
      console.error('Error downloading file from Google Drive:', error);
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Failed to generate download link" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error downloading paper:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
