"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { CalendarIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/outline";

export function CommunityEvents() {
  const events = [
    {
      id: 1,
      title: "Next.js Workshop",
      date: "January 15, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "Main Campus, Room 101",
      attendees: 25,
    },
    {
      id: 2,
      title: "Web Development Hackathon",
      date: "January 20, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "Tech Hub",
      attendees: 50,
    },
    {
      id: 3,
      title: "UI/UX Design Meetup",
      date: "January 25, 2024",
      time: "5:00 PM - 7:00 PM",
      location: "Design Lab",
      attendees: 30,
    },
  ];

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <CardContainer key={event.id} className="w-full">
          <CardBody className="bg-neutral-900/[0.2] border border-neutral-900/[0.4] rounded-xl">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">{event.title}</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-neutral-300">
                  <CalendarIcon className="h-4 w-4" />
                  <span>
                    {event.date} • {event.time}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-neutral-300">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-neutral-300">
                  <UsersIcon className="h-4 w-4" />
                  <span>{event.attendees} attendees</span>
                </div>
              </div>
            </div>
          </CardBody>
        </CardContainer>
      ))}
    </div>
  );
}
