import { google } from 'googleapis';
import { Readable } from 'stream';

// Initialize the Google Drive API client
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

export async function uploadFile(fileBuffer: Buffer, fileName: string, mimeType: string) {
  try {
    // Create a readable stream from the buffer
    const readableStream = new Readable();
    readableStream.push(fileBuffer);
    readableStream.push(null);

    // Upload file to Google Drive
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType,
        // Store in a specific folder (optional)
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
      },
      media: {
        mimeType,
        body: readableStream,
      },
    });

    if (!response.data.id) {
      throw new Error('Failed to upload file to Google Drive');
    }

    // Make the file publicly accessible via link
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    // Get the file's web view link
    const file = await drive.files.get({
      fileId: response.data.id,
      fields: 'webViewLink, webContentLink',
    });

    return {
      fileId: response.data.id,
      webViewLink: file.data.webViewLink,
      downloadLink: file.data.webContentLink,
    };
  } catch (error) {
    console.error('Google Drive upload error:', error);
    throw error;
  }
}

export async function deleteFile(fileId: string) {
  try {
    await drive.files.delete({
      fileId,
    });
    return true;
  } catch (error) {
    console.error('Google Drive delete error:', error);
    throw error;
  }
}

export async function getFileStream(fileId: string) {
  try {
    const response = await drive.files.get(
      {
        fileId,
        alt: 'media',
      },
      { responseType: 'stream' }
    );
    return response.data;
  } catch (error) {
    console.error('Google Drive download error:', error);
    throw error;
  }
}
