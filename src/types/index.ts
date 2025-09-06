// User Profile
export interface User {
  id: string;
  name: string;
  currentRoadmaps: string[];
  streakCount: number;
  achievements: Badge[];
  completedTasks: Task[];
}

// Badge/Achievement
export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

// Skill Roadmap
export interface Roadmap {
  id: string;
  title: string;
  description: string;
  levels: Level[];
  estimatedDuration: string;
  color?: string;
  status?: 'not-started' | 'active' | 'completed';
  progress?: number;
}

// Learning Level
export interface Level {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  estimatedHours: number;
  prerequisites?: string[];
}

// Learning Task
export interface Task {
  id: string;
  title: string;
  description: string;
  resources: Resource[];
  dueDate: Date;
  status: 'pending' | 'in-progress' | 'completed';
  estimatedHours?: number;
  level?: string;
  roadmapId?: string;
}

// Learning Resource
export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'course' | 'book' | 'project';
  url: string;
  description?: string;
  duration?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

// Chat Message
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'roadmap' | 'task-suggestion';
  metadata?: any;
}

// Community Post
export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  content: string;
  imageUrl?: string;
  tags: string[];
  likes: number;
  comments: Comment[];
  createdAt: Date;
}

// Comment
export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
}

// Learning Analytics
export interface LearningAnalytics {
  totalXP: number;
  level: number;
  weeklyHours: number;
  monthlyHours: number;
  streakDays: number;
  completedRoadmaps: number;
  activeRoadmaps: number;
  communityPosts: number;
}