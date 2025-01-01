import { NextResponse } from 'next/server';
import type { RouteHandler } from '@/types/api';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from "zod";

// Schema for discount validation
const discountSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description must be less than 500 characters"),
  code: z.string().min(1, "Discount code is required").max(50, "Code must be less than 50 characters"),
  discount: z.string().min(1, "Discount amount is required").max(50, "Discount amount must be less than 50 characters"),
  category: z.string(),
  customCategory: z.string().optional(),
  link: z.string().url("Please enter a valid URL"),
  terms: z.string().optional(),
  howToUse: z.string().optional(),
  targetGroup: z.string(),
  platform: z.string(),
  minPurchase: z.number().optional().nullable(),
  maxDiscount: z.number().optional().nullable(),
  expiryDate: z.string(),
});

export const POST: RouteHandler = async (request) => {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    console.log("Session:", JSON.stringify(session, null, 2));
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to submit a discount" },
        { status: 401 }
      );
    }

    // Ensure user ID exists
    const userId = session.user.id;
    console.log("User ID from session:", userId);
    
    if (!userId) {
      console.error("No user ID in session:", session);
      return NextResponse.json(
        { error: "Invalid user session" },
        { status: 401 }
      );
    }

    // Parse request body
    let body;
    try {
      const rawBody = await request.json();
      console.log("Raw request body:", rawBody);
      body = rawBody;
    } catch (error) {
      console.error("Error parsing request body:", error);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    // Validate data
    let validatedData;
    try {
      validatedData = discountSchema.parse(body);
      console.log("Validated data:", validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
        const errors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return NextResponse.json(
          { error: "Validation failed", details: errors },
          { status: 400 }
        );
      }
      throw error;
    }

    // Create discount
    try {
      const discountData = {
        ...validatedData,
        userId,
        status: "PENDING",
        expiryDate: new Date(validatedData.expiryDate),
        minPurchase: validatedData.minPurchase ? parseFloat(validatedData.minPurchase.toString()) : null,
        maxDiscount: validatedData.maxDiscount ? parseFloat(validatedData.maxDiscount.toString()) : null,
      };
      console.log("Creating discount with data:", discountData);

      const discount = await prisma.discount.create({
        data: discountData,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          _count: {
            select: {
              likes: true,
              comments: true,
              shares: true,
            },
          },
        },
      });

      console.log("Created discount:", discount);

      return NextResponse.json({
        message: "Discount submitted successfully",
        discount,
      });
    } catch (error) {
      console.error("Error creating discount:", error);
      return NextResponse.json(
        { error: "Failed to create discount in database" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in POST /api/discounts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const GET: RouteHandler = async (request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const categories = searchParams.getAll("category");
    const status = searchParams.get("status");
    const sortBy = searchParams.get("sortBy") || "newest";
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const minDiscount = searchParams.get("minDiscount");
    const maxDiscount = searchParams.get("maxDiscount");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const showExpired = searchParams.get("showExpired") === "true";

    type WhereClause = {
      OR?: {
        title?: { contains: string; mode: "insensitive" };
        description?: { contains: string; mode: "insensitive" };
        code?: { contains: string; mode: "insensitive" };
      }[];
      category?: string;
      status?: string;
      expiryDate?: {
        gt?: Date;
        gte?: Date;
        lte?: Date;
      };
    };

    type OrderBy = {
      createdAt?: "asc" | "desc";
      expiryDate?: "asc" | "desc";
      likes?: {
        _count: "desc";
      };
    };

    const whereClause: WhereClause = {};
    const orderBy: OrderBy = {};

    // Search filter
    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { code: { contains: search, mode: "insensitive" } },
      ];
    }

    // Category filter
    if (categories.length > 0) {
      whereClause.category = { in: categories };
    }

    // Status filter
    if (status) {
      whereClause.status = status;
    }

    // Expiry filter
    if (!showExpired) {
      whereClause.expiryDate = {
        gt: new Date(),
      };
    }

    // Date range filter
    if (startDate && endDate) {
      whereClause.expiryDate = {
        ...whereClause.expiryDate,
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    // Discount amount filter
    if (minDiscount || maxDiscount) {
      // No discount filter in this code
    }

    // Sort options
    switch (sortBy) {
      case "oldest":
        orderBy.createdAt = "asc";
        break;
      case "expiring":
        orderBy.expiryDate = "asc";
        break;
      case "popular":
        orderBy.likes = {
          _count: "desc",
        };
        break;
      default: // newest
        orderBy.createdAt = "desc";
    }

    const [discounts, total] = await Promise.all([
      prisma.discount.findMany({
        where: whereClause,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          _count: {
            select: {
              likes: true,
              comments: true,
              shares: true,
            },
          },
        },
      }),
      prisma.discount.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      discounts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error in GET /api/discounts:", error);
    return NextResponse.json(
      { error: "Failed to fetch discounts" },
      { status: 500 }
    );
  }
}
