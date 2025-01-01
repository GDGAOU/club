import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ error: "Paper ID is required" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { isPublic } = await request.json();

    // Get the paper
    const paper = await prisma.paper.findUnique({
      where: { id },
    });

    // Check if paper exists and user owns it
    if (!paper) {
      return NextResponse.json({ error: "Paper not found" }, { status: 404 });
    }
    if (paper.uploadedBy !== session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Update paper visibility
    const updatedPaper = await prisma.paper.update({
      where: { id },
      data: { isPublic },
    });

    return NextResponse.json(updatedPaper);
  } catch (error) {
    console.error("Error updating paper visibility:", error);
    return NextResponse.json(
      { error: "Failed to update paper visibility" },
      { status: 500 }
    );
  }
}
