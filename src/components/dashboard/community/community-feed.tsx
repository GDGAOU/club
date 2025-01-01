"use client";

import { CardBody, CardContainer } from "@/components/ui/3d-card";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export function CommunityFeed() {
  const posts = [
    {
      id: 1,
      author: "John Doe",
      avatar: "/avatars/john.jpg",
      content: "Just finished an amazing workshop on Next.js!",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      author: "Jane Smith",
      avatar: "/avatars/jane.jpg",
      content: "Looking forward to our upcoming hackathon!",
      timestamp: "5 hours ago",
    },
  ];

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <CardContainer key={post.id} className="w-full">
          <CardBody className="bg-neutral-900/[0.2] border border-neutral-900/[0.4] rounded-xl">
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="relative w-10 h-10">
                  <UserCircleIcon className="w-10 h-10 text-neutral-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{post.author}</h4>
                    <span className="text-sm text-neutral-400">
                      {post.timestamp}
                    </span>
                  </div>
                  <p className="mt-2 text-neutral-300">{post.content}</p>
                </div>
              </div>
            </div>
          </CardBody>
        </CardContainer>
      ))}
    </div>
  );
}
