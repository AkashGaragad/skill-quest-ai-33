import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

interface Post {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  tags: string[];
  post_type: 'community' | 'profile' | 'achievement';
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  profiles?: {
    name: string;
  };
  user_liked?: boolean;
}

interface Comment {
  id: string;
  user_id: string;
  post_id: string;
  content: string;
  parent_id?: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    name: string;
  };
}

export function useSocialFeatures() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<{ [postId: string]: Comment[] }>({});
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (postType?: string) => {
    setLoading(true);
    try {
      let query = supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (postType) {
        query = query.eq('post_type', postType);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Get user names for each post
      const postsWithProfiles: Post[] = [];
      if (data) {
        for (const post of data) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('name')
            .eq('user_id', post.user_id)
            .single();

          const { data: likes } = await supabase
            .from('likes')
            .select('user_id')
            .eq('post_id', post.id);

          postsWithProfiles.push({
            ...post,
            tags: post.tags || [],
            image_url: post.image_url || undefined,
            post_type: post.post_type as 'community' | 'profile' | 'achievement',
            profiles: profile || { name: 'Unknown User' },
            user_liked: user ? likes?.some(like => like.user_id === user.id) : false
          });
        }
      }

      setPosts(postsWithProfiles);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch posts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (content: string, imageUrl?: string, tags: string[] = [], postType: 'community' | 'profile' | 'achievement' = 'community') => {
    if (!user || !content.trim()) return;

    try {
      const { error } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          content: content.trim(),
          image_url: imageUrl,
          tags,
          post_type: postType
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Post created successfully"
      });

      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive"
      });
    }
  };

  const toggleLike = async (postId: string) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to like posts",
        variant: "destructive"
      });
      return;
    }

    try {
      // Check if user already liked the post
      const { data: existingLike } = await supabase
        .from('likes')
        .select('id')
        .eq('user_id', user.id)
        .eq('post_id', postId)
        .single();

      if (existingLike) {
        // Unlike the post
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('user_id', user.id)
          .eq('post_id', postId);

        if (error) throw error;
      } else {
        // Like the post
        const { error } = await supabase
          .from('likes')
          .insert({
            user_id: user.id,
            post_id: postId
          });

        if (error) throw error;
      }

      fetchPosts();
    } catch (error) {
      console.error('Error toggling like:', error);
      toast({
        title: "Error",
        description: "Failed to update like",
        variant: "destructive"
      });
    }
  };

  const fetchComments = async (postId: string) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const commentsWithProfiles: Comment[] = [];
      if (data) {
        for (const comment of data) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('name')
            .eq('user_id', comment.user_id)
            .single();

          commentsWithProfiles.push({
            ...comment,
            parent_id: comment.parent_id || undefined,
            profiles: profile || { name: 'Unknown User' }
          });
        }
      }

      setComments(prev => ({
        ...prev,
        [postId]: commentsWithProfiles
      }));
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast({
        title: "Error",
        description: "Failed to fetch comments",
        variant: "destructive"
      });
    }
  };

  const addComment = async (postId: string, content: string, parentId?: string) => {
    if (!user || !content.trim()) return;

    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          user_id: user.id,
          post_id: postId,
          content: content.trim(),
          parent_id: parentId
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Comment added successfully"
      });

      fetchComments(postId);
      fetchPosts(); // Refresh posts to update comment count
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive"
      });
    }
  };

  const deletePost = async (postId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Post deleted successfully"
      });

      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  return {
    posts,
    comments,
    loading,
    createPost,
    toggleLike,
    fetchComments,
    addComment,
    deletePost,
    refetch: fetchPosts
  };
}