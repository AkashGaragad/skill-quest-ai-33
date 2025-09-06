import { Heart, MessageCircle, Share, TrendingUp, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Community = () => {
  const posts = [
    {
      id: 1,
      author: "Sarah Chen",
      avatar: "SC",
      skill: "React",
      time: "2 hours ago",
      content: "Just completed my first React project! Built a weather app with hooks and context API. The learning curve was steep but so rewarding. Special thanks to the community for all the help! 🚀",
      image: null,
      likes: 24,
      comments: 8,
      tags: ["React", "JavaScript", "FirstProject"]
    },
    {
      id: 2,
      author: "Marcus Johnson",
      avatar: "MJ",
      skill: "Data Science",
      time: "4 hours ago",
      content: "Week 3 of my Data Science journey complete! Diving deep into pandas and NumPy. Created my first data visualization dashboard. The amount of insights you can extract from raw data is mind-blowing! 📊",
      image: null,
      likes: 31,
      comments: 12,
      tags: ["DataScience", "Python", "Visualization"]
    },
    {
      id: 3,
      author: "Alex Rodriguez",
      avatar: "AR",
      skill: "AI/ML",
      time: "1 day ago",
      content: "Milestone achieved! 🎉 Just deployed my first machine learning model to production. It predicts customer churn with 85% accuracy. The journey from data preprocessing to deployment taught me so much about the ML pipeline.",
      image: null,
      likes: 67,
      comments: 23,
      tags: ["MachineLearning", "AI", "Deployment"]
    },
    {
      id: 4,
      author: "Emily Watson",
      avatar: "EW",
      skill: "UX Design",
      time: "2 days ago",
      content: "Completed my UX research project! Conducted 15 user interviews and created personas for a mobile banking app. User research is so eye-opening - what we think users want vs what they actually need can be very different! 🔍",
      image: null,
      likes: 19,
      comments: 6,
      tags: ["UXDesign", "UserResearch", "Mobile"]
    }
  ];

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
              <div className="space-y-4">
                <textarea
                  placeholder="What did you learn this week? Share your wins, challenges, or insights..."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  rows={3}
                />
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Add Photo</Button>
                    <Button variant="outline" size="sm">Tag Skills</Button>
                  </div>
                  <Button variant="hero">Share Post</Button>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post, index) => (
                <div 
                  key={post.id} 
                  className="bg-gradient-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-medium transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Post Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center text-white font-semibold">
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{post.author}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getSkillColor(post.skill)}`}>
                          {post.skill}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{post.time}</p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-foreground leading-relaxed mb-4">{post.content}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-destructive transition-colors">
                        <Heart className="w-5 h-5" />
                        <span className="text-sm font-medium">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                        <Share className="w-5 h-5" />
                        <span className="text-sm font-medium">Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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