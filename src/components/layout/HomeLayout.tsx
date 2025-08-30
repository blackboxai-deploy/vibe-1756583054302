"use client";

import { useState } from "react";
import { Navbar } from "./Navbar";
import { ResearchChatSidebar } from "../chat/ResearchChatSidebar";
import { CollaborationArea } from "../chat/CollaborationArea";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export function HomeLayout({ children }: HomeLayoutProps) {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Main Content Area with 80-10-10 Layout */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Main Feed Area - 80% */}
        <main className="w-4/5 overflow-y-auto border-r border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-6">
            {children}
          </div>
        </main>

        {/* Research Channels Sidebar - 10% */}
        <aside className="w-1/10 border-r border-gray-200 bg-white">
          <ResearchChatSidebar
            selectedChannel={selectedChannel}
            selectedUser={selectedUser}
            onChannelSelect={setSelectedChannel}
            onUserSelect={setSelectedUser}
          />
        </aside>

        {/* Collaboration Area - 10% */}
        <aside className="w-1/10 bg-white">
          <CollaborationArea
            selectedChannel={selectedChannel}
            selectedUser={selectedUser}
          />
        </aside>
      </div>
    </div>
  );
}