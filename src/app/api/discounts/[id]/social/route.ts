import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// Like/Unlike a discount
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action } = body;

    if (action === "like") {
      const like = await prisma.like.create({
        data: {
          discountId: params.id,
          userId: session.user.id,
        },
      });

      // Create notification for discount owner
      const discount = await prisma.discount.findUnique({
        where: { id: params.id },
        select: { userId: true, title: true },
      });

      if (discount && discount.userId !== session.user.id) {
        await prisma.notification.create({
          data: {
            userId: discount.userId,
            type: "new_like",
            message: `${session.user.name} liked your discount: ${discount.title}`,
            metadata: {
              discountId: params.id,
              userId: session.user.id,
            },
          },
        });
      }

      return NextResponse.json({ success: true, data: like });
    } else if (action === "unlike") {
      await prisma.like.delete({
        where: {
          discountId_userId: {
            discountId: params.id,
            userId: session.user.id,
          },
        },
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    if ((error as any).code === "P2002") {
      return NextResponse.json(
        { error: "You have already liked this discount" },
        { status: 400 }
      );
    }

    console.error("Error handling social action:", error);
    return NextResponse.json(
      { error: "Failed to process social action" },
      { status: 500 }
    );
  }
}

// Add a comment
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { content } = body;

    if (!content?.trim()) {
      return NextResponse.json(
        { error: "Comment content is required" },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        discountId: params.id,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    // Create notification for discount owner
    const discount = await prisma.discount.findUnique({
      where: { id: params.id },
      select: { userId: true, title: true },
    });

    if (discount && discount.userId !== session.user.id) {
      await prisma.notification.create({
        data: {
          userId: discount.userId,
          type: "new_comment",
          message: `${session.user.name} commented on your discount: ${discount.title}`,
          metadata: {
            discountId: params.id,
            commentId: comment.id,
            userId: session.user.id,
          },
        },
      });
    }

    return NextResponse.json({ success: true, data: comment });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 }
    );
  }
}

// Share a discount
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { platform } = body;

    const share = await prisma.share.create({
      data: {
        discountId: params.id,
        userId: session.user.id,
        platform,
      },
    });

    // Record analytics
    await prisma.analytics.create({
      data: {
        discountId: params.id,
        userId: session.user.id,
        action: "share",
      },
    });

    return NextResponse.json({ success: true, data: share });
  } catch (error) {
    console.error("Error sharing discount:", error);
    return NextResponse.json(
      { error: "Failed to share discount" },
      { status: 500 }
    );
  }
}

// Get social data for a discount
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const [likes, comments, shares, userLike] = await Promise.all([
      prisma.like.count({
        where: { discountId: params.id },
      }),
      prisma.comment.findMany({
        where: { discountId: params.id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.share.count({
        where: { discountId: params.id },
      }),
      prisma.like.findUnique({
        where: {
          discountId_userId: {
            discountId: params.id,
            userId: session.user.id,
          },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        likes,
        comments,
        shares,
        userHasLiked: !!userLike,
      },
    });
  } catch (error) {
    console.error("Error fetching social data:", error);
    return NextResponse.json(
      { error: "Failed to fetch social data" },
      { status: 500 }
    );
  }
}
