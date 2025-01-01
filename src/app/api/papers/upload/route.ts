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

// Convert buffer to readable stream
function bufferToStream(buffer: Buffer) {
  return Readable.from(buffer);
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    // Get or create the GDG Papers folder
    let folderId = '';
    try {
      const folderResponse = await drive.files.list({
        q: "name='GDG Papers' and mimeType='application/vnd.google-apps.folder'",
        fields: 'files(id, name)',
      });

      if (folderResponse.data.files && folderResponse.data.files.length > 0) {
        console.log('Folder exists:', folderResponse.data.files[0]);
        folderId = folderResponse.data.files[0].id;
      } else {
        const folderMetadata = {
          name: 'GDG Papers',
          mimeType: 'application/vnd.google-apps.folder',
        };
        const folder = await drive.files.create({
          requestBody: folderMetadata,
          fields: 'id',
        });
        folderId = folder.data.id!;
      }
    } catch (error) {
      console.error('Error with folder:', error);
      return NextResponse.json(
        { error: "Failed to prepare upload folder" },
        { status: 500 }
      );
    }

    console.log('Using folder ID:', folderId);

    // Upload file to Google Drive
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileMetadata = {
      name: file.name,
      parents: [folderId],
    };

    console.log('Uploading to Google Drive...', {
      fileName: file.name,
      folderId,
      fileSize: file.size,
    });

    let driveFile;
    try {
      driveFile = await drive.files.create({
        requestBody: fileMetadata,
        media: {
          mimeType: file.type,
          body: bufferToStream(fileBuffer),
        },
        fields: 'id, name, mimeType',
      });

      console.log('Drive response:', driveFile.data);

      // Update file permissions to make it accessible
      await drive.permissions.create({
        fileId: driveFile.data.id!,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      console.log('File permissions updated');

      // Create paper record in database
      const paper = await prisma.paper.create({
        data: {
          title: file.name,
          moduleCode,
          pathway,
          year,
          semester: semester === 'Fall' ? 1 : semester === 'Spring' ? 2 : 3,
          examType,
          fileId: driveFile.data.id!,
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
      console.error('Upload error:', error);
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Request error:', error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
