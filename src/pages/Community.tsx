import { useState } from 'react';
import { Heart, MessageCircle, Share, TrendingUp, Award, Users, User, Hash, Camera, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useSocialFeatures } from "@/hooks/useSocialFeatures";
import { ImageUpload } from "@/components/ImageUpload";
import { PostComments } from "@/components/PostComments";
import { formatDistanceToNow } from 'date-fns';
import { toast } from '@/hooks/use-toast';

const Community = () => {
  const { user } = useAuth();
  const { posts, loading, createPost, toggleLike } = useSocialFeatures();
  const [newPostContent, setNewPostContent] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [isPosting, setIsPosting] = useState(false);

  const extractHashtags = (text: string) => {
    const hashtagRegex = /#[\w]+/g;
    return text.match(hashtagRegex) || [];
  };

  const renderContentWithHashtags = (content: string) => {
    const parts = content.split(/(#[\w]+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('#')) {
        return (
          <span key={index} className="text-primary font-medium hover:underline cursor-pointer">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim() || !user) {
      toast({
        title: "Error",
        description: "Please write something to post",
        variant: "destructive"
      });
      return;
    }

    setIsPosting(true);
    try {
      const hashtags = extractHashtags(newPostContent);
      await createPost(newPostContent, uploadedImageUrl || undefined, hashtags);
      setNewPostContent('');
      setUploadedImageUrl('');
    } finally {
      setIsPosting(false);
    }
  };

  const handleShare = (post: any) => {
    if (navigator.share) {
      navigator.share({
        title: `Post by ${post.profiles?.name}`,
        text: post.content,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Post link has been copied to clipboard"
      });
    }
  };

  const communityStats = [
    { label: "Active Learners", value: "15.2k", icon: Users },
    { label: "Posts This Week", value: "1.8k", icon: MessageCircle },
    { label: "Success Stories", value: "892", icon: Award },
    { label: "Skills Shared", value: "156", icon: TrendingUp }
  ];

  const getSkillColor = (skill: string) => {
    const colors = {
      "React": "bg-blue-500",
      "Data Science": "bg-purple-500",
      "AI/ML": "bg-green-500",
      "UX Design": "bg-pink-500"
    };
    return colors[skill as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Learning <span className="bg-gradient-hero bg-clip-text text-transparent">Community</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Share your progress, celebrate wins, and inspire fellow learners on their journey
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-slide-up">
          {communityStats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-gradient-card rounded-xl p-4 text-center shadow-soft border border-border hover:shadow-medium transition-all duration-300">
              <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{value}</div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Create Post */}
            <div className="bg-gradient-card rounded-2xl p-6 shadow-soft border border-border animate-slide-up">
              <h3 className="text-lg font-semibold text-foreground mb-4">Share Your Progress</h3>
              {user ? (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center text-white font-semibold">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <Textarea
                        placeholder="What did you learn this week? Share your wins, challenges, or insights... Use #hashtags to categorize your post!"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        className="min-h-[100px] resize-none"
                      />
                    </div>
                  </div>
                  
                  <ImageUpload
                    onImageUploaded={setUploadedImageUrl}
                    onImageRemoved={() => setUploadedImageUrl('')}
                    uploadedImageUrl={uploadedImageUrl}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Hash className="w-4 h-4" />
                        Use #hashtags
                      </span>
                      <span className="flex items-center gap-1">
                        <Camera className="w-4 h-4" />
                        Add photos
                      </span>
                    </div>
                    <Button 
                      onClick={handleCreatePost}
                      disabled={!newPostContent.trim() || isPosting}
                      className="flex items-center gap-2"
                    >
                      {isPosting ? (
                        <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      {isPosting ? 'Posting...' : 'Share Post'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Please log in to share your progress with the community
                  </p>
                  <Button variant="outline" onClick={() => window.location.href = '/auth'}>
                    Log In
                  </Button>
                </div>
              )}
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No posts yet</h3>
                  <p className="text-muted-foreground">
                    Be the first to share your learning journey!
                  </p>
                </div>
              ) : (
                posts.map((post, index) => (
                  <div 
                    key={post.id} 
                    className="bg-gradient-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-medium transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Post Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center text-white font-semibold">
                        <User className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-foreground">
                            {post.profiles?.name || 'Anonymous User'}
                          </h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                        </p>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="text-foreground leading-relaxed mb-4">
                      {renderContentWithHashtags(post.content)}
                    </div>

                    {/* Post Image */}
                    {post.image_url && (
                      <div className="mb-4">
                        <img
                          src={post.image_url}
                          alt="Post attachment"
                          className="max-w-full h-auto rounded-lg border border-border"
                        />
                      </div>
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium cursor-pointer hover:bg-primary/20 transition-colors">
                            {tag.startsWith('#') ? tag : `#${tag}`}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Post Actions */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-6">
                          <button 
                            onClick={() => toggleLike(post.id)}
                            className={`flex items-center gap-2 transition-colors ${
                              post.user_liked 
                                ? 'text-destructive' 
                                : 'text-muted-foreground hover:text-destructive'
                            }`}
                            disabled={!user}
                          >
                            <Heart className={`w-5 h-5 ${post.user_liked ? 'fill-current' : ''}`} />
                            <span className="text-sm font-medium">{post.likes_count}</span>
                          </button>
                          
                          <button 
                            onClick={() => handleShare(post)}
                            className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                          >
                            <Share className="w-5 h-5" />
                            <span className="text-sm font-medium">Share</span>
                          </button>
                        </div>
                      </div>

                      {/* Comments */}
                      <PostComments postId={post.id} commentsCount={post.comments_count} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Trending Topics */}
            <div className="bg-gradient-card rounded-2xl p-6 shadow-soft border border-border animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Trending This Week
              </h3>
              <div className="space-y-3">
                {["#ReactHooks", "#PythonDataScience", "#MachineLearning", "#UXDesign", "#WebDevelopment"].map((topic, index) => (
                  <div key={topic} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer">
                    <span className="text-sm font-medium text-foreground">{topic}</span>
                    <span className="text-xs text-muted-foreground">{Math.floor(Math.random() * 100) + 20} posts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Challenge */}
            <div className="bg-gradient-accent rounded-2xl p-6 shadow-medium text-white animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Weekly Challenge
              </h3>
              <p className="text-white/90 mb-4 text-sm">
                Build a responsive landing page using only HTML and CSS. Share your creation with #WeeklyChallenge!
              </p>
              <Button variant="glass" size="sm" className="w-full">
                Join Challenge
              </Button>
            </div>

            {/* Success Stories */}
            <div className="bg-gradient-card rounded-2xl p-6 shadow-soft border border-border animate-slide-up" style={{ animationDelay: "0.5s" }}>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-success" />
                Recent Wins
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                  <p className="font-medium text-foreground">Jake got his first dev job!</p>
                  <p className="text-muted-foreground">After 8 months of learning React</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="font-medium text-foreground">Maria completed ML certification</p>
                  <p className="text-muted-foreground">Advanced Data Science track</p>
                </div>
                <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="font-medium text-foreground">David launched his startup</p>
                  <p className="text-muted-foreground">Full-stack web application</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;