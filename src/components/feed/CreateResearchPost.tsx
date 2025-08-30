"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface CreateResearchPostProps {
  onClose: () => void;
}

export function CreateResearchPost({ onClose }: CreateResearchPostProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "" as "research" | "project" | "patent" | "publication" | "idea",
    researchField: "",
    tags: "",
    citations: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, this would make an API call
      console.log("Creating post:", formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Close the form and refresh feed
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const postTypes = [
    { value: "research", label: "Research Finding", icon: "🔬", color: "blue" },
    { value: "project", label: "Collaboration Project", icon: "💡", color: "green" },
    { value: "patent", label: "Patent/IP", icon: "📝", color: "purple" },
    { value: "publication", label: "Publication", icon: "📚", color: "amber" },
    { value: "idea", label: "Innovation Idea", icon: "💭", color: "gray" }
  ];

  const researchFields = [
    "Computer Science",
    "Biology",
    "Physics",
    "Chemistry",
    "Mathematics",
    "Engineering",
    "Medicine",
    "Environmental Science",
    "Psychology",
    "Economics",
    "Other"
  ];

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Share Your Research</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Post Type */}
          <div className="space-y-2">
            <Label>Post Type*</Label>
            <Select value={formData.type} onValueChange={(value: any) => setFormData({...formData, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select the type of content you're sharing" />
              </SelectTrigger>
              <SelectContent>
                {postTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center space-x-2">
                      <span>{type.icon}</span>
                      <span>{type.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title*</Label>
            <Input
              id="title"
              placeholder="Give your research a compelling title..."
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content*</Label>
            <Textarea
              id="content"
              placeholder="Share your research findings, methodology, results, or collaboration needs in detail..."
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              rows={6}
              required
            />
            <div className="text-xs text-gray-500">
              Tip: Include methodology, results, implications, and potential applications
            </div>
          </div>

          {/* Research Field */}
          <div className="space-y-2">
            <Label>Research Field</Label>
            <Select value={formData.researchField} onValueChange={(value) => setFormData({...formData, researchField: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select your primary research field" />
              </SelectTrigger>
              <SelectContent>
                {researchFields.map((field) => (
                  <SelectItem key={field} value={field}>
                    {field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="machine-learning, neural-networks, biomedical (comma separated)"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
            />
            <div className="text-xs text-gray-500">
              Add relevant tags to help others discover your research
            </div>
          </div>

          {/* Citations */}
          <div className="space-y-2">
            <Label htmlFor="citations">References/Citations</Label>
            <Textarea
              id="citations"
              placeholder="Add any relevant citations, DOIs, or reference links..."
              value={formData.citations}
              onChange={(e) => setFormData({...formData, citations: e.target.value})}
              rows={3}
            />
          </div>

          <Separator />

          {/* Preview */}
          {formData.title && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Preview</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  {formData.type && (
                    <Badge className={`text-xs bg-${postTypes.find(t => t.value === formData.type)?.color || 'gray'}-100 text-${postTypes.find(t => t.value === formData.type)?.color || 'gray'}-800`}>
                      {postTypes.find(t => t.value === formData.type)?.icon} {postTypes.find(t => t.value === formData.type)?.label}
                    </Badge>
                  )}
                  {formData.researchField && (
                    <Badge variant="outline" className="text-xs">
                      {formData.researchField}
                    </Badge>
                  )}
                </div>
                <h5 className="font-semibold text-gray-900">{formData.title}</h5>
                {formData.content && (
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {formData.content.substring(0, 150)}...
                  </p>
                )}
                {formData.tags && (
                  <div className="flex flex-wrap gap-1">
                    {formData.tags.split(",").map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag.trim()}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>🔒 Professional guidelines apply</span>
            </div>
            <div className="flex items-center space-x-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!formData.title || !formData.content || !formData.type || isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? "Publishing..." : "Publish Research"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}