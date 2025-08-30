"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'research_link';
}

interface CollaborationAreaProps {
  selectedChannel: string | null;
  selectedUser: string | null;
}

export function CollaborationArea({ selectedChannel, selectedUser }: CollaborationAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping] = useState(false);

  // Mock messages for demo
  useEffect(() => {
    if (selectedChannel || selectedUser) {
      const mockMessages: Message[] = [
        {
          id: '1',
          senderId: 'user1',
          senderName: 'Dr. Sarah Chen',
          content: 'I found an interesting paper on neural networks that might be relevant to our project.',
          timestamp: new Date(Date.now() - 3600000),
          type: 'text'
        },
        {
          id: '2',
          senderId: 'user2',
          senderName: 'Prof. Michael Adams',
          content: 'Could you share the DOI? I\'d love to review it.',
          timestamp: new Date(Date.now() - 1800000),
          type: 'text'
        },
        {
          id: '3',
          senderId: 'user1',
          senderName: 'Dr. Sarah Chen',
          content: 'Here\'s the research link: "Deep Learning Applications in Biomedical Engineering"',
          timestamp: new Date(Date.now() - 900000),
          type: 'research_link'
        }
      ];
      setMessages(mockMessages);
    } else {
      setMessages([]);
    }
  }, [selectedChannel, selectedUser]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: 'current_user',
        senderName: 'You',
        content: newMessage,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getActiveTitle = () => {
    if (selectedChannel) {
      const channelNames: { [key: string]: string } = {
        '1': 'AI Research',
        '2': 'MIT Community',
        '3': 'Biotech Innovation',
        '4': 'Patent Discussion',
        '5': 'Startup Funding'
      };
      return channelNames[selectedChannel] || 'Unknown Channel';
    }
    if (selectedUser) {
      const userNames: { [key: string]: string } = {
        '1': 'Dr. Sarah Chen',
        '2': 'Prof. Michael Adams',
        '3': 'Dr. Lisa Wang',
        '4': 'Alex Thompson'
      };
      return userNames[selectedUser] || 'Unknown User';
    }
    return null;
  };

  const activeTitle = getActiveTitle();

  if (!activeTitle) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gray-50 text-center p-4">
        <div className="text-gray-400 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">Start Collaborating</h3>
        <p className="text-xs text-gray-500 max-w-32">
          Select a research channel or collaborator to begin messaging
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800 truncate">{activeTitle}</h3>
          {selectedChannel && (
            <Badge variant="outline" className="text-xs">
              {selectedChannel === '1' ? '1.2k' : selectedChannel === '5' ? '1.1k' : '634'} members
            </Badge>
          )}
        </div>
        {selectedUser && (
          <p className="text-xs text-gray-500">Online • Available for collaboration</p>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-3">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex flex-col">
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-white font-medium">
                    {message.senderName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-medium text-gray-800">
                      {message.senderName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <div className={`text-xs ${message.type === 'research_link' ? 'bg-blue-50 p-2 rounded border-l-2 border-blue-400' : ''}`}>
                    {message.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              </div>
              <span>Someone is typing...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-3 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            type="text"
            placeholder="Share your research insights..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 text-xs"
          />
          <Button 
            type="submit" 
            size="sm" 
            disabled={!newMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </Button>
        </form>
      </div>
    </div>
  );
}