"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Channel {
  id: string;
  name: string;
  type: 'research' | 'institution' | 'project';
  memberCount: number;
  unreadCount?: number;
}

interface User {
  id: string;
  username: string;
  displayName: string;
  isOnline: boolean;
  unreadCount?: number;
}

interface ResearchChatSidebarProps {
  selectedChannel: string | null;
  selectedUser: string | null;
  onChannelSelect: (channelId: string) => void;
  onUserSelect: (userId: string) => void;
}

export function ResearchChatSidebar({
  selectedChannel,
  selectedUser,
  onChannelSelect,
  onUserSelect,
}: ResearchChatSidebarProps) {
  const [channels] = useState<Channel[]>([
    { id: '1', name: 'AI Research', type: 'research', memberCount: 1247, unreadCount: 3 },
    { id: '2', name: 'MIT Community', type: 'institution', memberCount: 892 },
    { id: '3', name: 'Biotech Innovation', type: 'research', memberCount: 634, unreadCount: 1 },
    { id: '4', name: 'Patent Discussion', type: 'project', memberCount: 445 },
    { id: '5', name: 'Startup Funding', type: 'project', memberCount: 1123, unreadCount: 7 },
  ]);

  const [users] = useState<User[]>([
    { id: '1', username: 'AIResearcher_2024', displayName: 'Dr. Sarah Chen', isOnline: true, unreadCount: 2 },
    { id: '2', username: 'BioEngProfessor', displayName: 'Prof. Michael Adams', isOnline: false },
    { id: '3', username: 'TechInnovator_Alpha', displayName: 'Dr. Lisa Wang', isOnline: true, unreadCount: 1 },
    { id: '4', username: 'PhysicsPhD_Nova', displayName: 'Alex Thompson', isOnline: true },
  ]);

  const getChannelIcon = (type: Channel['type']) => {
    switch (type) {
      case 'research':
        return '🔬';
      case 'institution':
        return '🏛️';
      case 'project':
        return '💡';
      default:
        return '💬';
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800">Research Network</h3>
      </div>

      <ScrollArea className="flex-1">
        {/* World Research Channels */}
        <div className="p-3">
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            World Channels
          </h4>
          <div className="space-y-1">
            {channels.map((channel) => (
              <Button
                key={channel.id}
                variant={selectedChannel === channel.id ? "secondary" : "ghost"}
                className="w-full justify-start p-2 h-auto text-left"
                onClick={() => onChannelSelect(channel.id)}
              >
                <div className="flex items-center space-x-2 w-full">
                  <span className="text-lg">{getChannelIcon(channel.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium truncate">
                        {channel.name}
                      </span>
                      {channel.unreadCount && (
                        <Badge variant="destructive" className="text-xs h-4 px-1">
                          {channel.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {channel.memberCount.toLocaleString()} members
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <Separator className="mx-3" />

        {/* Direct Messages */}
        <div className="p-3">
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            Collaborators
          </h4>
          <div className="space-y-1">
            {users.map((user) => (
              <Button
                key={user.id}
                variant={selectedUser === user.id ? "secondary" : "ghost"}
                className="w-full justify-start p-2 h-auto text-left"
                onClick={() => onUserSelect(user.id)}
              >
                <div className="flex items-center space-x-2 w-full">
                  <div className="relative">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        {user.displayName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    </div>
                    {user.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium truncate">
                        {user.displayName}
                      </span>
                      {user.unreadCount && (
                        <Badge variant="destructive" className="text-xs h-4 px-1">
                          {user.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      @{user.username}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200">
        <Button variant="outline" size="sm" className="w-full text-xs">
          Find Researchers
        </Button>
      </div>
    </div>
  );
}