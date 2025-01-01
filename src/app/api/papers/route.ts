import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { google } from "googleapis";
import { Readable } from "stream";

// Initialize Google Drive API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only fetch papers uploaded by the current user
    const papers = await prisma.paper.findMany({
      where: {
        uploadedBy: session.user.email
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Map the papers to include view and download links
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
    const mappedPapers = papers.map(paper => ({
      ...paper,
      viewLink: `${baseUrl}/api/papers/${paper.id}/view`,
      downloadLink: `${baseUrl}/api/papers/${paper.id}/download`,
    }));

    return NextResponse.json(mappedPapers);
  } catch (error) {
    console.error("Error fetching papers:", error);
    return NextResponse.json(
      { error: "Failed to fetch papers" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const moduleCode = formData.get('moduleCode') as string;
    const pathway = formData.get('pathway') as string;
    const year = parseInt(formData.get('year') as string);
    const semester = formData.get('semester') as string;
    const examType = formData.get('examType') as string;

    if (!file || !moduleCode || !pathway || !year || !semester || !examType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Upload to Google Drive
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileStream = Readable.from(fileBuffer);

    const driveResponse = await drive.files.create({
      requestBody: {
        name: file.name,
        mimeType: 'application/pdf',
      },
      media: {
        mimeType: 'application/pdf',
        body: fileStream,
      },
    });

    if (!driveResponse.data.id) {
      throw new Error('Failed to upload to Google Drive');
    }

    // Create paper record
    const paper = await prisma.paper.create({
      data: {
        title: file.name,
        moduleCode,
        pathway,
        year,
        semester: semester === 'Fall' ? 1 : semester === 'Spring' ? 2 : 3,
        examType,
        fileId: driveResponse.data.id,
        fileSize: file.size,
        uploadedBy: session.user.email,
        isPublic: true,
        views: 0,
        downloads: 0
      },
    });

    // Add view and download links to the response
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
    const paperWithLinks = {
      ...paper,
      viewLink: `${baseUrl}/api/papers/${paper.id}/view`,
      downloadLink: `${baseUrl}/api/papers/${paper.id}/download`,
    };

    return NextResponse.json(paperWithLinks);
  } catch (error) {
    console.error("Error uploading paper:", error);
    return NextResponse.json(
      { error: "Failed to upload paper" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: "Paper ID is required" },
        { status: 400 }
      );
    }

    // Get the paper to find its Google Drive file ID
    const paper = await prisma.paper.findUnique({
      where: { id },
    });

    if (paper?.fileId) {
      try {
        // Delete from Google Drive
        await drive.files.delete({
          fileId: paper.fileId,
        });
      } catch (error) {
        console.error("Error deleting file from Google Drive:", error);
      }
    }

    // Delete from database
    await prisma.paper.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting paper:", error);
    return NextResponse.json(
      { error: "Failed to delete paper" },
      { status: 500 }
    );
  }
}
