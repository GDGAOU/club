import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

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
    const todoList = await prisma.todoList.update({
      where: { id: params.listId },
      data: {
        name: json.name,
        description: json.description,
        isPublic: json.isPublic,
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

    return NextResponse.json(todoList);
  } catch (error) {
    console.error("[TODOLIST_PUT]", error);
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

    const todoList = await prisma.todoList.delete({
      where: { id: params.listId },
    });

    return NextResponse.json(todoList);
  } catch (error) {
    console.error("[TODOLIST_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
