"use client";

import { HomeLayout } from "@/components/layout/HomeLayout";
import { ResearchFeedContainer } from "@/components/feed/ResearchFeedContainer";

export default function HomePage() {
  return (
    <HomeLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome back, Dr. Researcher
              </h1>
              <p className="text-gray-600">
                Discover new research, connect with innovators, and share your ideas
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Your Impact</div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">24</div>
                  <div className="text-xs text-gray-500">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">156</div>
                  <div className="text-xs text-gray-500">Upvotes</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">89</div>
                  <div className="text-xs text-gray-500">Collaborators</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Research Feed */}
        <ResearchFeedContainer />
      </div>
    </HomeLayout>
  );
}