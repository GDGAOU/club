import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
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
      },
    });

    // Get the paper's file URL
    const paper = await prisma.paper.findUnique({
      where: { id: paperId },
      select: { fileUrl: true },
    });

    if (!paper) {
      return NextResponse.json(
        { error: "Paper not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ fileUrl: paper.fileUrl });
  } catch (error) {
    console.error("Error recording download:", error);
    return NextResponse.json(
      { error: "Failed to record download" },
      { status: 500 }
    );
  }
}
