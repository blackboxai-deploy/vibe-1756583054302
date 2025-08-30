"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Post } from "@/types";

interface ResearchPostCardProps {
  post: Post;
}

export function ResearchPostCard({ post }: ResearchPostCardProps) {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  // Mock user data based on authorId
  const getAuthorData = (authorId: string) => {
    const authors: Record<string, { name: string; username: string; title: string; institution: string }> = {
      user1: { name: "Dr. Sarah Chen", username: "AIResearcher_2024", title: "Associate Professor", institution: "MIT" },
      user2: { name: "Prof. Michael Adams", username: "QuantumExplorer_Pro", title: "Full Professor", institution: "Stanford" },
      user3: { name: "Dr. Lisa Wang", username: "EnergyInnovator_Alpha", title: "Senior Researcher", institution: "Caltech" },
      user4: { name: "Dr. Maria Rodriguez", username: "ClimateScientist_Nova", title: "Research Director", institution: "Harvard" }
    };
    return authors[authorId] || authors.user1;
  };

  const author = getAuthorData(post.authorId);
  
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getPostTypeColor = (type: Post['type']) => {
    switch (type) {
      case 'research': return 'bg-blue-100 text-blue-800';
      case 'project': return 'bg-green-100 text-green-800';
      case 'patent': return 'bg-purple-100 text-purple-800';
      case 'publication': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPostTypeIcon = (type: Post['type']) => {
    switch (type) {
      case 'research': return '🔬';
      case 'project': return '💡';
      case 'patent': return '📝';
      case 'publication': return '📚';
      default: return '💭';
    }
  };

  const handleUpvote = () => {
    if (isDownvoted) setIsDownvoted(false);
    setIsUpvoted(!isUpvoted);
  };

  const handleDownvote = () => {
    if (isUpvoted) setIsUpvoted(false);
    setIsDownvoted(!isDownvoted);
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <Card className="bg-white border border-gray-200 hover:border-gray-300 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/aada7a18-ec12-4bbb-b20e-7f97f8c45dad.png' ')[0]}+headshot`} />
            <AvatarFallback>
              {author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-gray-900">{author.name}</h4>
              <Badge variant="secondary" className="text-xs">
                {author.title}
              </Badge>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm text-gray-600">@{author.username}</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-600">{author.institution}</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-500">{formatTimeAgo(post.createdAt)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getPostTypeColor(post.type)}>
              <span className="mr-1">{getPostTypeIcon(post.type)}</span>
              {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
          {post.title}
        </h3>

        {/* Content */}
        <div className="text-gray-700 leading-relaxed mb-4">
          <p>
            {showFullContent ? post.content : truncateContent(post.content)}
            {post.content.length > 200 && (
              <Button
                variant="link"
                className="p-0 h-auto text-blue-600 hover:text-blue-800 ml-2"
                onClick={() => setShowFullContent(!showFullContent)}
              >
                {showFullContent ? "Show less" : "Read more"}
              </Button>
            )}
          </p>
        </div>

        {/* Citations */}
        {post.citations && post.citations.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <h5 className="text-sm font-medium text-gray-800 mb-2">📚 Citations</h5>
            {post.citations.map((citation, index) => (
              <div key={index} className="text-xs text-gray-600 mb-1">
                <span className="font-medium">{citation.title}</span> •{" "}
                {citation.authors.join(", ")} •{" "}
                {citation.journal} ({citation.year})
                {citation.doi && (
                  <span className="text-blue-600 ml-2">DOI: {citation.doi}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
          {post.researchField && (
            <Badge className="text-xs bg-indigo-100 text-indigo-800">
              {post.researchField}
            </Badge>
          )}
        </div>

        <Separator className="my-4" />

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Upvote */}
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center space-x-2 ${
                isUpvoted ? "text-green-600 bg-green-50" : "text-gray-600"
              }`}
              onClick={handleUpvote}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{post.upvotes + (isUpvoted ? 1 : 0)}</span>
            </Button>

            {/* Downvote */}
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center space-x-2 ${
                isDownvoted ? "text-red-600 bg-red-50" : "text-gray-600"
              }`}
              onClick={handleDownvote}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{post.downvotes + (isDownvoted ? 1 : 0)}</span>
            </Button>

            {/* Comments */}
            <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="font-medium">{post.commentCount}</span>
            </Button>

            {/* Share */}
            <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span className="font-medium">Share</span>
            </Button>
          </div>

          {/* Follow/Collaborate */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Follow
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              Collaborate
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}