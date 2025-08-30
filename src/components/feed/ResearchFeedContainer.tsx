"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateResearchPost } from "./CreateResearchPost";
import { ResearchPostCard } from "./ResearchPostCard";
import { Post } from "@/types";

export function ResearchFeedContainer() {
  const [activeTab, setActiveTab] = useState("following");
  const [showCreatePost, setShowCreatePost] = useState(false);

  // Mock data for demonstration
  const mockPosts: Post[] = [
    {
      id: "1",
      authorId: "user1",
      title: "Novel Approach to Neural Network Optimization in Biomedical Applications",
      content: "Our research team has developed a groundbreaking method for optimizing neural networks specifically for biomedical image analysis. This approach reduces computational overhead by 40% while maintaining 98.5% accuracy in diagnostic predictions. The implications for real-time medical imaging are significant...",
      type: "research",
      tags: ["neural-networks", "biomedical", "optimization", "machine-learning"],
      researchField: "Computer Science",
      citations: [
        {
          title: "Deep Learning in Medical Image Analysis",
          authors: ["Smith, J.", "Chen, L.", "Wang, K."],
          journal: "Nature Machine Intelligence",
          year: 2023,
          doi: "10.1038/s42256-023-00123-4"
        }
      ],
      upvotes: 47,
      downvotes: 3,
      commentCount: 12,
      isPublished: true,
      createdAt: new Date(Date.now() - 3600000),
      updatedAt: new Date(Date.now() - 3600000)
    },
    {
      id: "2",
      authorId: "user2",
      title: "Seeking Collaborators: Quantum Computing Applications in Drug Discovery",
      content: "I'm looking for researchers interested in exploring quantum computing applications for molecular simulation and drug discovery. Our preliminary work shows promising results in protein folding prediction. Looking for expertise in quantum algorithms and pharmaceutical sciences.",
      type: "project",
      tags: ["quantum-computing", "drug-discovery", "collaboration", "molecular-simulation"],
      researchField: "Physics",
      upvotes: 23,
      downvotes: 1,
      commentCount: 8,
      isPublished: true,
      createdAt: new Date(Date.now() - 7200000),
      updatedAt: new Date(Date.now() - 7200000)
    },
    {
      id: "3",
      authorId: "user3",
      title: "Patent Filed: Revolutionary Energy Storage System",
      content: "Excited to share that our team has filed a patent for a novel energy storage system that increases battery efficiency by 60%. This technology could revolutionize electric vehicles and renewable energy storage. Open to licensing discussions and commercial partnerships.",
      type: "patent",
      tags: ["energy-storage", "battery-technology", "patent", "renewable-energy"],
      researchField: "Engineering",
      upvotes: 89,
      downvotes: 2,
      commentCount: 31,
      isPublished: true,
      createdAt: new Date(Date.now() - 10800000),
      updatedAt: new Date(Date.now() - 10800000)
    },
    {
      id: "4",
      authorId: "user4",
      title: "Published: Climate Change Impact on Agricultural Sustainability",
      content: "Our latest publication in Nature Climate Change explores the long-term impacts of climate change on global agricultural sustainability. Key findings include adaptation strategies and policy recommendations for food security.",
      type: "publication",
      tags: ["climate-change", "agriculture", "sustainability", "policy"],
      researchField: "Environmental Science",
      citations: [
        {
          title: "Climate Change and Food Security",
          authors: ["Johnson, M.", "Rodriguez, A.", "Kim, S."],
          journal: "Nature Climate Change",
          year: 2024,
          doi: "10.1038/s41558-024-00123-8"
        }
      ],
      upvotes: 156,
      downvotes: 7,
      commentCount: 42,
      isPublished: true,
      createdAt: new Date(Date.now() - 14400000),
      updatedAt: new Date(Date.now() - 14400000)
    }
  ];

  return (
    <div className="space-y-6">
      {/* Create Post Section */}
      {!showCreatePost ? (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">DR</span>
            </div>
            <Button
              variant="outline"
              className="flex-1 justify-start text-gray-500 bg-gray-50 hover:bg-gray-100"
              onClick={() => setShowCreatePost(true)}
            >
              Share your research insights...
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Create Post
            </Button>
          </div>
        </div>
      ) : (
        <CreateResearchPost onClose={() => setShowCreatePost(false)} />
      )}

      {/* Feed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="following" className="text-sm">
            Following
          </TabsTrigger>
          <TabsTrigger value="trending" className="text-sm">
            Trending
          </TabsTrigger>
          <TabsTrigger value="research-fields" className="text-sm">
            Your Fields
          </TabsTrigger>
          <TabsTrigger value="latest" className="text-sm">
            Latest
          </TabsTrigger>
        </TabsList>

        <TabsContent value="following" className="space-y-6">
          {mockPosts.map((post) => (
            <ResearchPostCard key={post.id} post={post} />
          ))}
        </TabsContent>

        <TabsContent value="trending" className="space-y-6">
          {mockPosts
            .sort((a, b) => (b.upvotes + b.commentCount) - (a.upvotes + a.commentCount))
            .map((post) => (
              <ResearchPostCard key={post.id} post={post} />
            ))}
        </TabsContent>

        <TabsContent value="research-fields" className="space-y-6">
          {mockPosts
            .filter((post) => ["Computer Science", "Physics", "Engineering"].includes(post.researchField || ""))
            .map((post) => (
              <ResearchPostCard key={post.id} post={post} />
            ))}
        </TabsContent>

        <TabsContent value="latest" className="space-y-6">
          {mockPosts
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((post) => (
              <ResearchPostCard key={post.id} post={post} />
            ))}
        </TabsContent>
      </Tabs>

      {/* Load More */}
      <div className="text-center py-6">
        <Button variant="outline">
          Load More Research
        </Button>
      </div>
    </div>
  );
}