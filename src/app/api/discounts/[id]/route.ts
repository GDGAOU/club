import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

interface RequestContext {
  params: {
    id: string;
  };
}

export async function DELETE(
  request: NextRequest,
  context: RequestContext
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to delete a discount" },
        { status: 401 }
      );
    }

    const discount = await prisma.discount.findUnique({
      where: { id: context.params.id },
      include: { user: true },
    });

    if (!discount) {
      return NextResponse.json(
        { error: "Discount not found" },
        { status: 404 }
      );
    }

    // Only allow the owner or admin to delete
    if (discount.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "You don't have permission to delete this discount" },
        { status: 403 }
      );
    }

    await prisma.discount.delete({
      where: { id: context.params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting discount:", error);
    return NextResponse.json(
      { error: "Failed to delete discount" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: RequestContext
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to update a discount" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const discount = await prisma.discount.findUnique({
      where: { id: context.params.id },
      include: { user: true },
    });

    if (!discount) {
      return NextResponse.json(
        { error: "Discount not found" },
        { status: 404 }
      );
    }

    // Only allow the owner or admin to update
    if (discount.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "You don't have permission to update this discount" },
        { status: 403 }
      );
    }

    const updatedDiscount = await prisma.discount.update({
      where: { id: context.params.id },
      data: {
        title: body.title,
        description: body.description,
        code: body.code,
        discount: body.discount,
        category: body.category,
        expiryDate: new Date(body.expiryDate),
        link: body.link,
        status: body.status,
        imageUrl: body.imageUrl,
      },
    });

    return NextResponse.json({ success: true, data: updatedDiscount });
  } catch (error) {
    console.error("Error updating discount:", error);
    return NextResponse.json(
      { error: "Failed to update discount" },
      { status: 500 }
    );
  }
}
