import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();

  // Store the connection for broadcasting
  const userId = session.user.id;
  if (!global.notificationConnections) {
    global.notificationConnections = new Map();
  }
  global.notificationConnections.set(userId, writer);

  // Clean up on close
  request.signal.addEventListener("abort", () => {
    global.notificationConnections.delete(userId);
  });

  // Send initial message
  const initialMessage = { type: "connected", message: "SSE connected" };
  writer.write(encoder.encode(`data: ${JSON.stringify(initialMessage)}\n\n`));

  return new Response(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
