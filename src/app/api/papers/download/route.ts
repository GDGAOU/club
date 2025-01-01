import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

type DownloadResponse = {
  downloadUrl: string;
  paper: {
    id: string;
    title: string;
    moduleCode: string;
    fileId: string;
  };
};

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { paperId } = await request.json();
    if (!paperId) {
      return NextResponse.json(
        { error: "Paper ID is required" },
        { status: 400 }
      );
    }

    // Record the download
    await prisma.paperDownload.create({
      data: {
        paperId,
        userId: session.user.id,
      },
    });

    // Get the paper's file URL
    const paper = await prisma.paper.findUnique({
      where: { id: paperId },
      select: {
        id: true,
        title: true,
        moduleCode: true,
        fileId: true,
        downloadLink: true,
      },
    });

    if (!paper) {
      return NextResponse.json(
        { error: "Paper not found" },
        { status: 404 }
      );
    }

    // Update download count
    await prisma.paper.update({
      where: { id: paper.id },
      data: { downloads: { increment: 1 } },
    });

    const response: DownloadResponse = {
      downloadUrl: paper.downloadLink,
      paper: {
        id: paper.id,
        title: paper.title,
        moduleCode: paper.moduleCode,
        fileId: paper.fileId,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error recording download:", error);
    return NextResponse.json(
      { error: "Failed to record download" },
      { status: 500 }
    );
  }
}
