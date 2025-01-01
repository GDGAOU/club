"use client";

import { useState } from "react";
import { CommunityFeed } from "./community-feed";
import { CommunityMembers } from "./community-members";
import { CommunityEvents } from "./community-events";

export function CommunityDashboard() {
  const [activeTab, setActiveTab] = useState("Feed");
  const tabs = ["Feed", "Members", "Events"];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Community</h2>
        <p className="text-muted-foreground">
          Connect, share, and grow with the GDG Aou community
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-1 rounded-xl bg-neutral-900/20 p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors
                ${activeTab === tab
                  ? 'bg-white text-neutral-900 shadow'
                  : 'text-neutral-400 hover:bg-white/[0.12] hover:text-white'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {activeTab === "Feed" && <CommunityFeed />}
          {activeTab === "Members" && <CommunityMembers />}
          {activeTab === "Events" && <CommunityEvents />}
        </div>
      </div>
    </div>
  );
}
