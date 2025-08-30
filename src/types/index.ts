// TypeScript type definitions for Hypideas.com research platform

export interface User {
  id: string;
  email: string;
  phone: string;
  displayName: string;
  username: string;
  bio?: string;
  avatar?: string;
  isVerified: boolean;
  interests: string[];
  professionalAccounts: ProfessionalAccount[];
  institution?: string;
  degree?: string;
  researchFields: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfessionalAccount {
  platform: 'scopus' | 'ieee' | 'orcid' | 'researchgate' | 'linkedin' | 'academia';
  profileUrl: string;
  isVerified: boolean;
  publicationCount?: number;
}

export interface Post {
  id: string;
  authorId: string;
  title: string;
  content: string;
  type: 'research' | 'idea' | 'project' | 'publication' | 'patent';
  tags: string[];
  researchField?: string;
  citations?: Citation[];
  attachments?: Attachment[];
  upvotes: number;
  downvotes: number;
  commentCount: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Citation {
  title: string;
  authors: string[];
  journal?: string;
  year: number;
  doi?: string;
  url?: string;
}

export interface Attachment {
  id: string;
  filename: string;
  url: string;
  type: 'pdf' | 'image' | 'document' | 'data';
  size: number;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  parentId?: string;
  upvotes: number;
  downvotes: number;
  isReview: boolean;
  reviewType?: 'peer' | 'expert' | 'community';
  createdAt: Date;
  updatedAt: Date;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  type: 'research' | 'institution' | 'project' | 'general';
  isPublic: boolean;
  adminIds: string[];
  memberCount: number;
  researchField?: string;
  institution?: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  channelId?: string;
  senderId: string;
  receiverId?: string;
  content: string;
  type: 'text' | 'file' | 'research_link';
  isPrivate: boolean;
  attachments?: Attachment[];
  createdAt: Date;
}

export interface ResearchInterest {
  id: string;
  name: string;
  category: 'computer_science' | 'biology' | 'physics' | 'chemistry' | 'mathematics' | 
           'engineering' | 'medicine' | 'social_science' | 'business' | 'arts';
  subcategories: string[];
  description: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'comment' | 'upvote' | 'follow' | 'message' | 'research_invite' | 'collaboration';
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: Date;
}

export interface SearchResult {
  type: 'user' | 'post';
  id: string;
  title: string;
  description: string;
  relevanceScore: number;
  highlights?: string[];
}

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  isVerified: boolean;
  role: 'user' | 'admin' | 'moderator';
}

export interface SignupData {
  email: string;
  phone: string;
  password: string;
  displayName: string;
  interests: string[];
  institution?: string;
  degree?: string;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface OTPVerification {
  phone: string;
  otp: string;
  type: 'signup' | 'login' | 'reset';
}