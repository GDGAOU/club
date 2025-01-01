"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export function CommunityMembers() {
  const members = [
    {
      id: 1,
      name: "John Doe",
      avatar: "/avatars/john.jpg",
      role: "Developer",
      joinDate: "Member since Jan 2024",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "/avatars/jane.jpg",
      role: "Designer",
      joinDate: "Member since Dec 2023",
    },
    {
      id: 3,
      name: "Mike Johnson",
      avatar: "/avatars/mike.jpg",
      role: "Student",
      joinDate: "Member since Dec 2023",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <CardContainer key={member.id} className="w-full">
          <CardBody className="bg-neutral-900/[0.2] border border-neutral-900/[0.4] rounded-xl">
            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-20 h-20">
                  <UserCircleIcon className="w-20 h-20 text-neutral-400" />
                </div>
                <h4 className="mt-4 font-semibold text-white">{member.name}</h4>
                <p className="text-sm text-neutral-400">{member.role}</p>
                <p className="mt-2 text-xs text-neutral-500">{member.joinDate}</p>
              </div>
            </div>
          </CardBody>
        </CardContainer>
      ))}
    </div>
  );
}
