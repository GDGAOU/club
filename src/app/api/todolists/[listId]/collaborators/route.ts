import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { listId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const { emails, role = "VIEWER" } = json;

    // Get users by email
    const users = await prisma.user.findMany({
      where: {
        email: {
          in: emails,
        },
      },
    });

    // Create collaborator entries
    const collaborators = await Promise.all(
      users.map((user) =>
        prisma.todoListCollaborator.create({
          data: {
            todoListId: params.listId,
            userId: user.id,
            role,
          },
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
        })
      )
    );

    return NextResponse.json(collaborators);
  } catch (error) {
    console.error("[COLLABORATORS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { listId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const { role, userId } = json;

    const collaborator = await prisma.todoListCollaborator.update({
      where: {
        userId_todoListId: {
          userId,
          todoListId: params.listId
        }
      },
      data: {
        role
      }
    });

    return NextResponse.json(collaborator);
  } catch (error) {
    console.error("[COLLABORATORS_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { listId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const searchParams = new URL(req.url).searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    await prisma.todoListCollaborator.delete({
      where: {
        userId_todoListId: {
          userId,
          todoListId: params.listId
        }
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[COLLABORATORS_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
