import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

interface UserStats {
  total_xp: number;
  level: number;
  streak_days: number;
  weekly_hours: number;
  monthly_hours: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  points: number;
  earned?: boolean;
  earned_at?: string;
}

interface Roadmap {
  id: string;
  title: string;
  description: string;
  category: string;
  estimated_duration: string;
  color: string;
  progress?: number;
  status?: 'not-started' | 'active' | 'completed';
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') throw profileError;
      setProfile(profileData);

      // Fetch user stats
      const { data: statsData, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (statsError && statsError.code !== 'PGRST116') throw statsError;
      setUserStats(statsData);

      // Fetch achievements with earned status
      const { data: achievementsData, error: achievementsError } = await supabase
        .from('achievements')
        .select(`
          *,
          user_achievements!left(earned_at)
        `);

      if (achievementsError) throw achievementsError;

      const processedAchievements = achievementsData?.map(achievement => ({
        ...achievement,
        earned: achievement.user_achievements?.length > 0,
        earned_at: achievement.user_achievements?.[0]?.earned_at
      })) || [];

      setAchievements(processedAchievements);

      // Fetch roadmaps with user progress
      const { data: roadmapsData, error: roadmapsError } = await supabase
        .from('roadmaps')
        .select(`
          *,
          user_roadmaps!left(progress, status)
        `);

      if (roadmapsError) throw roadmapsError;

      const processedRoadmaps = roadmapsData?.map(roadmap => ({
        ...roadmap,
        estimated_duration: roadmap.estimated_duration || '',
        color: roadmap.color || 'bg-blue-500',
        progress: roadmap.user_roadmaps?.[0]?.progress || 0,
        status: (roadmap.user_roadmaps?.[0]?.status || 'not-started') as 'not-started' | 'active' | 'completed'
      })) || [];

      setRoadmaps(processedRoadmaps);

    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to fetch profile data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: any) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully"
      });

      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    }
  };

  const updateUserStats = async (updates: Partial<UserStats>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_stats')
        .upsert({
          user_id: user.id,
          ...updates
        });

      if (error) throw error;

      fetchProfile();
    } catch (error) {
      console.error('Error updating user stats:', error);
      toast({
        title: "Error",
        description: "Failed to update stats",
        variant: "destructive"
      });
    }
  };

  const updateRoadmapProgress = async (roadmapId: string, progress: number, status?: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_roadmaps')
        .upsert({
          user_id: user.id,
          roadmap_id: roadmapId,
          progress,
          status: status || (progress === 100 ? 'completed' : progress > 0 ? 'active' : 'not-started'),
          started_at: progress > 0 ? new Date().toISOString() : null,
          completed_at: progress === 100 ? new Date().toISOString() : null
        });

      if (error) throw error;

      fetchProfile();
    } catch (error) {
      console.error('Error updating roadmap progress:', error);
      toast({
        title: "Error",
        description: "Failed to update roadmap progress",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  return {
    profile,
    userStats,
    achievements,
    roadmaps,
    loading,
    updateProfile,
    updateUserStats,
    updateRoadmapProgress,
    refetch: fetchProfile
  };
}