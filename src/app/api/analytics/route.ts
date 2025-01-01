import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

type WhereClause = {
  discountId?: string;
  action?: string;
  createdAt?: {
    gte?: Date;
    lte?: Date;
  };
};

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { discountId, action } = body;

    if (!discountId || !action) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Record the analytics event
    const analytics = await prisma.analytics.create({
      data: {
        discountId,
        userId: session.user.id,
        action,
      },
    });

    // Update discount metrics
    if (action === "view") {
      await prisma.discount.update({
        where: { id: discountId },
        data: { views: { increment: 1 } },
      });
    } else if (action === "click") {
      await prisma.discount.update({
        where: { id: discountId },
        data: { clicks: { increment: 1 } },
      });
    }

    return NextResponse.json({ success: true, data: analytics });
  } catch (error) {
    console.error("Error recording analytics:", error);
    return NextResponse.json(
      { error: "Failed to record analytics" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const discountId = searchParams.get("discountId");
    const action = searchParams.get("action");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const whereClause: WhereClause = {};

    if (discountId) {
      whereClause.discountId = discountId;
    }
    if (action) {
      whereClause.action = action;
    }
    if (startDate && endDate) {
      whereClause.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const analytics = await prisma.analytics.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        discount: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Get aggregated metrics
    const metrics = await prisma.analytics.groupBy({
      by: ["action"],
      _count: {
        action: true,
      },
      where: whereClause,
    });

    return NextResponse.json({
      success: true,
      data: {
        analytics,
        metrics: metrics.reduce((acc, curr) => {
          acc[curr.action] = curr._count.action;
          return acc;
        }, {} as Record<string, number>),
      },
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
