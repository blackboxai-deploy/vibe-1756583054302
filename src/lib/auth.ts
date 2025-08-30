// Authentication utilities and session management for Hypideas.com

import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  isVerified: boolean;
  role: 'user' | 'admin' | 'moderator';
}

export interface AuthSession {
  user: AuthUser;
  expires: string;
}

// Password hashing utilities
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// Session utilities
export const generateSessionId = (): string => {
  return uuidv4();
};

export const generateUserId = (): string => {
  return uuidv4();
};

// Username generation based on interests
export const generateUsername = (interests: string[], displayName: string): string => {
  const cleanDisplayName = displayName.replace(/[^a-zA-Z0-9]/g, '');
  // Could use namePrefix for personalization: cleanDisplayName.substring(0, 8);
  
  // Research field mappings
  const fieldMappings: { [key: string]: string[] } = {
    'computer-science': ['TechInnovator', 'AIResearcher', 'CodeExplorer', 'DataScientist'],
    'biology': ['BioResearcher', 'LifeScientist', 'BioInnovator', 'GeneExplorer'],
    'physics': ['PhysicsExplorer', 'QuantumResearcher', 'PhysicsPhD', 'ParticleExplorer'],
    'chemistry': ['ChemInnovator', 'MolecularExplorer', 'ChemResearcher', 'ReactionExpert'],
    'engineering': ['EngInnovator', 'TechEngineer', 'SystemDesigner', 'InnovationLead'],
    'medicine': ['MedResearcher', 'HealthInnovator', 'ClinicalExplorer', 'BioMedExpert'],
  };

  // Select relevant prefix based on interests
  let prefix = 'Researcher';
  for (const interest of interests) {
    const key = interest.toLowerCase().replace(/\s+/g, '-');
    if (fieldMappings[key]) {
      prefix = fieldMappings[key][Math.floor(Math.random() * fieldMappings[key].length)];
      break;
    }
  }

  // Generate unique suffixes
  const suffixes = ['Alpha', 'Beta', 'Nova', 'Prime', 'Pro', 'Elite', 'Max', 'Plus'];
  const years = ['2024', '2025'];
  const numbers = ['001', '247', '360', '365', '101', '202'];

  const suffix = Math.random() > 0.6 
    ? suffixes[Math.floor(Math.random() * suffixes.length)]
    : Math.random() > 0.5
    ? years[Math.floor(Math.random() * years.length)]
    : numbers[Math.floor(Math.random() * numbers.length)];

  return `${prefix}_${suffix}`;
};

// OTP utilities for phone verification
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone);
};

// Academic email validation (for institutional verification)
export const isAcademicEmail = (email: string): boolean => {
  const academicDomains = [
    '.edu', '.ac.', '.university', '.college', '.school',
    'mit.edu', 'stanford.edu', 'harvard.edu', 'caltech.edu',
    'ox.ac.uk', 'cam.ac.uk', 'imperial.ac.uk'
  ];
  
  return academicDomains.some(domain => email.toLowerCase().includes(domain));
};

// Mock authentication functions (would be replaced with real auth in production)
export const authenticateUser = async (email: string, _password: string): Promise<AuthUser | null> => {
  // Mock authentication - in production, this would check against database
  console.log('Authenticating user:', { email, password: '[HIDDEN]' });
  
  // Simulate successful authentication
  return {
    id: generateUserId(),
    email,
    username: 'MockUser_2024',
    displayName: 'Dr. Mock User',
    isVerified: true,
    role: 'user'
  };
};

export const createUser = async (userData: {
  email: string;
  phone: string;
  password: string;
  displayName: string;
  interests: string[];
  institution?: string;
  degree?: string;
}): Promise<AuthUser> => {
  const _hashedPassword = await hashPassword(userData.password);
  const username = generateUsername(userData.interests, userData.displayName);
  
  // In production, this would save to database
  const user: AuthUser = {
    id: generateUserId(),
    email: userData.email,
    username,
    displayName: userData.displayName,
    isVerified: false, // Would be true after phone verification
    role: 'user'
  };

  console.log('Creating user:', { ...user, hashedPassword: '[HIDDEN]' });
  
  return user;
};

export const verifyOTP = async (phone: string, otp: string): Promise<boolean> => {
  // Mock OTP verification - in production, this would verify against SMS service
  console.log('Verifying OTP:', { phone, otp });
  
  // Simulate successful verification for demo
  return otp === '123456' || otp.length === 6;
};

// Role-based permissions
export const hasPermission = (user: AuthUser, permission: string): boolean => {
  const permissions = {
    user: ['read', 'create_post', 'comment', 'message'],
    moderator: ['read', 'create_post', 'comment', 'message', 'moderate', 'ban_user'],
    admin: ['read', 'create_post', 'comment', 'message', 'moderate', 'ban_user', 'manage_channels', 'system_admin']
  };

  return permissions[user.role]?.includes(permission) || false;
};