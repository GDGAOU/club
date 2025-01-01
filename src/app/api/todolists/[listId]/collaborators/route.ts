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
    const { userId, role } = json;

    const collaborator = await prisma.todoListCollaborator.update({
      where: {
        id: json.id,
      },
      data: {
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

    const { searchParams } = new URL(req.url);
    const collaboratorId = searchParams.get("id");

    if (!collaboratorId) {
      return new NextResponse("Collaborator ID required", { status: 400 });
    }

    const collaborator = await prisma.todoListCollaborator.delete({
      where: { id: collaboratorId },
    });

    return NextResponse.json(collaborator);
  } catch (error) {
    console.error("[COLLABORATORS_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
