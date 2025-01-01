import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { google } from 'googleapis';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Initialize Google Drive API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

type Params = { params: { id: string } };

export async function DELETE(
  request: Request,
  { params }: Params
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get and validate the ID
    const { id } = params;
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: "Invalid paper ID" }, { status: 400 });
    }

    console.log('Delete request for paper ID:', id);

    // Get the paper to check ownership and get Google Drive ID
    const paper = await prisma.paper.findUnique({
      where: { id }
    });
    
    if (!paper) {
      console.error('Paper not found with ID:', id);
      return NextResponse.json({ error: "Paper not found" }, { status: 404 });
    }

    // Check if user owns the paper
    if (paper.uploadedBy !== session.user.email) {
      return NextResponse.json({ error: "Unauthorized - You can only delete your own papers" }, { status: 403 });
    }

    // Delete from Prisma first
    const deletedPaper = await prisma.paper.delete({
      where: { id }
    });

    if (!deletedPaper) {
      console.error('Failed to delete paper from database:', id);
      return NextResponse.json({ error: "Failed to delete paper from database" }, { status: 500 });
    }

    // If paper has a Google Drive ID, delete from Google Drive
    if (paper.fileId) {
      try {
        await drive.files.delete({
          fileId: paper.fileId,
        });
        console.log('Successfully deleted file from Google Drive:', paper.fileId);
      } catch (driveError) {
        console.error('Error deleting from Google Drive:', driveError);
        // Don't return error here since we already deleted from database
        // But we should log it for monitoring
      }
    }

    return NextResponse.json({ success: true, message: "Paper deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ 
      error: "Internal server error", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}
