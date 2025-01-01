import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const todoList = await prisma.todoList.create({
      data: {
        name: json.name,
        description: json.description,
        isPublic: json.isPublic,
        userId: user.id,
      },
      include: {
        todos: true,
        collaborators: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(todoList);
  } catch (error) {
    console.error("[TODOLISTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get user's todo lists and lists where they are a collaborator
    const todoLists = await prisma.todoList.findMany({
      where: {
        OR: [
          { userId: user.id },
          {
            collaborators: {
              some: {
                userId: user.id,
              },
            },
          },
        ],
      },
      include: {
        todos: {
          include: {
            subTasks: true,
          },
        },
        collaborators: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(todoLists);
  } catch (error) {
    console.error("[TODOLISTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
