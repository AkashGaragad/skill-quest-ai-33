import { supabase } from "@/integrations/supabase/client";
import type { ChatMessage, Roadmap, Task } from "@/types";

export class AIService {
  private static async callAI(prompt: string, context?: any) {
    try {
      const { data, error } = await supabase.functions.invoke('ai-mentor', {
        body: { prompt, context }
      });
      
      if (error) {
        console.error('AI Service Error:', error);
        throw new Error('Failed to get AI response');
      }
      
      return data;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to connect to AI service');
    }
  }

  static async getChatResponse(message: string, chatHistory: ChatMessage[] = []): Promise<string> {
    const context = {
      type: 'chat',
      history: chatHistory.slice(-5), // Last 5 messages for context
      timestamp: new Date().toISOString()
    };

    const prompt = `
You are an AI Career Mentor for youth. You provide supportive, encouraging guidance on:
- Career path recommendations
- Skill development advice
- Learning resource suggestions
- Motivation and goal setting

User message: "${message}"

Respond in a friendly, supportive tone. Keep responses concise but helpful.
`;

    const response = await this.callAI(prompt, context);
    return response.content || 'I apologize, but I cannot provide a response right now. Please try again.';
  }

  static async generateRoadmap(skill: string, level: 'beginner' | 'intermediate' | 'advanced' = 'beginner'): Promise<Roadmap> {
    const prompt = `
Create a detailed learning roadmap for "${skill}" at ${level} level.

Return a JSON object with this structure:
{
  "title": "skill name",
  "description": "brief description",
  "estimatedDuration": "time estimate",
  "levels": [
    {
      "title": "level name",
      "description": "what you'll learn",
      "estimatedHours": number,
      "tasks": [
        {
          "title": "task name",
          "description": "what to do",
          "estimatedHours": number,
          "resources": [
            {
              "title": "resource name",
              "type": "video|article|course|book|project",
              "url": "example.com",
              "description": "why this resource",
              "duration": "time needed"
            }
          ]
        }
      ]
    }
  ]
}

Make it practical, actionable, and include real resources when possible.
`;

    const response = await this.callAI(prompt);
    
    try {
      const roadmapData = JSON.parse(response.content);
      return {
        id: `roadmap_${Date.now()}`,
        ...roadmapData,
        status: 'not-started' as const,
        progress: 0
      };
    } catch (error) {
      console.error('Failed to parse roadmap:', error);
      throw new Error('Failed to generate roadmap');
    }
  }

  static async generateMotivationalQuote(): Promise<string> {
    const prompt = `
Generate a motivational quote for young people pursuing their careers and learning new skills.
Make it inspiring, relevant to career development, and encouraging.
Return just the quote text, nothing else.
`;

    const response = await this.callAI(prompt);
    return response.content || "Every expert was once a beginner. Keep learning, keep growing! 🚀";
  }

  static async analyzeProgress(tasks: Task[], streakDays: number): Promise<string> {
    const prompt = `
Analyze this user's learning progress and provide encouraging insights:

Completed Tasks: ${tasks.filter(t => t.status === 'completed').length}
Pending Tasks: ${tasks.filter(t => t.status === 'pending').length}
In Progress: ${tasks.filter(t => t.status === 'in-progress').length}
Current Streak: ${streakDays} days

Provide a brief, encouraging analysis with specific suggestions for improvement.
Keep it positive and actionable.
`;

    const response = await this.callAI(prompt);
    return response.content || "You're making great progress! Keep up the excellent work.";
  }

  static async suggestNextSteps(currentRoadmaps: string[], completedTasks: Task[]): Promise<string[]> {
    const prompt = `
Based on current roadmaps (${currentRoadmaps.join(', ')}) and ${completedTasks.length} completed tasks,
suggest 3-5 next actionable steps for continued learning.

Return as a JSON array of strings.
`;

    const response = await this.callAI(prompt);
    
    try {
      return JSON.parse(response.content);
    } catch (error) {
      return [
        "Review your completed tasks and identify knowledge gaps",
        "Set a specific learning goal for this week",
        "Find a practice project to apply your skills"
      ];
    }
  }
}