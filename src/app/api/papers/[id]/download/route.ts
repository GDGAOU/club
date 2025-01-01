import type { NextApiRequest, NextApiResponse } from 'next';
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
  req: NextApiRequest,
  res: NextApiResponse<DownloadResponse>
) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ downloadUrl: '', message: "Paper ID is required" });
  }

  try {
    const session = await getServerSession(authOptions);
    const paper = await prisma.paper.findUnique({
      where: { id },
    });

    if (!paper) {
      return res.status(404).json({ downloadUrl: '', message: "Paper not found" });
    }

    // If paper is private, check if user is authenticated and is the owner
    if (!paper.isPublic && (!session?.user?.email || session.user.email !== paper.uploadedBy)) {
      return res.status(401).json({ downloadUrl: '', message: "Unauthorized" });
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
        return res.status(404).json({ 
          downloadUrl: '', 
          message: "Download link not available" 
        });
      }

      return res.status(200).json({ 
        downloadUrl: file.webContentLink,
        message: "Download link generated successfully" 
      });

    } catch (error) {
      console.error('Error downloading file from Google Drive:', error);
      if (error instanceof Error) {
        return res.status(404).json({ downloadUrl: '', message: error.message });
      }
      return res.status(404).json({ downloadUrl: '', message: "An unknown error occurred" });
    }
  } catch (error) {
    console.error('Error downloading paper:', error);
    if (error instanceof Error) {
      return res.status(500).json({ downloadUrl: '', message: error.message });
    }
    return res.status(500).json({ downloadUrl: '', message: "An unknown error occurred" });
  }
}
