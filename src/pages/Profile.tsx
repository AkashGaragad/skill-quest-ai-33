import { useState } from "react";
import { Edit3, MapPin, Calendar, Trophy, Target, BookOpen, Flame, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const userStats = {
    totalXP: 2850,
    level: 12,
    streakDays: 23,
    completedRoadmaps: 2,
    activeRoadmaps: 3,
    communityPosts: 14
  };

  const achievements = [
    { title: "First Steps", description: "Completed your first learning module", icon: "🎯", earned: true, date: "2 weeks ago" },
    { title: "Streak Master", description: "Maintained a 7-day learning streak", icon: "🔥", earned: true, date: "1 week ago" },
    { title: "Community Star", description: "Received 50 likes on your posts", icon: "⭐", earned: true, date: "3 days ago" },
    { title: "Knowledge Seeker", description: "Completed 3 different roadmaps", icon: "📚", earned: false, date: null },
    { title: "Mentor", description: "Helped 10 community members", icon: "🤝", earned: false, date: null },
    { title: "Expert", description: "Reached level 25", icon: "👑", earned: false, date: null }
  ];

  const roadmapsProgress = [
    { name: "Web Development", progress: 75, status: "active", color: "bg-blue-500" },
    { name: "Data Science", progress: 45, status: "active", color: "bg-purple-500" },
    { name: "UI/UX Design", progress: 30, status: "active", color: "bg-pink-500" },
    { name: "JavaScript Fundamentals", progress: 100, status: "completed", color: "bg-green-500" },
    { name: "HTML & CSS Basics", progress: 100, status: "completed", color: "bg-green-500" }
  ];

  const learningAnalytics = {
    thisWeek: 12,
    lastWeek: 8,
    thisMonth: 45,
    lastMonth: 32
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Profile Header */}
        <div className="bg-gradient-hero rounded-2xl p-8 mb-8 text-white relative overflow-hidden animate-fade-in">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4">
              <Star className="w-12 h-12 animate-bounce-gentle" />
            </div>
            <div className="absolute bottom-6 left-8">
              <Trophy className="w-8 h-8 animate-bounce-gentle" style={{ animationDelay: "0.5s" }} />
            </div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center gap-6 mb-6 md:mb-0">
              <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center text-4xl font-bold">
                A
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">Alex Rodriguez</h1>
                  {!isEditing && (
                    <Button
                      variant="glass"
                      size="icon"
                      onClick={() => setIsEditing(true)}
                      className="w-8 h-8"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <p className="text-white/80 text-lg mb-2">Aspiring Full-Stack Developer</p>
                <div className="flex items-center gap-4 text-sm text-white/70">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    San Francisco, CA
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Started learning 3 months ago
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-4xl font-bold mb-1">Level {userStats.level}</div>
              <div className="text-white/80">XP: {userStats.totalXP.toLocaleString()}</div>
              <div className="w-40 bg-white/20 rounded-full h-2 mt-2">
                <div className="bg-white h-2 rounded-full w-3/4" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Stats Overview */}
            <div className="grid md:grid-cols-3 gap-6 animate-slide-up">
              <div className="bg-gradient-card rounded-xl p-6 shadow-soft border border-border text-center">
                <Flame className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground">{userStats.streakDays}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
              
              <div className="bg-gradient-card rounded-xl p-6 shadow-soft border border-border text-center">
                <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground">{userStats.completedRoadmaps}</div>
                <div className="text-sm text-muted-foreground">Completed Roadmaps</div>
              </div>
              
              <div className="bg-gradient-card rounded-xl p-6 shadow-soft border border-border text-center">
                <Target className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground">{userStats.activeRoadmaps}</div>
                <div className="text-sm text-muted-foreground">Active Roadmaps</div>
              </div>
            </div>

            {/* Learning Progress */}
            <div className="bg-gradient-card rounded-2xl p-6 shadow-soft border border-border animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-xl font-semibold text-foreground mb-6">Learning Progress</h3>
              <div className="space-y-4">
                {roadmapsProgress.map((roadmap, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{roadmap.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{roadmap.progress}%</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          roadmap.status === 'completed' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-primary/10 text-primary'
                        }`}>
                          {roadmap.status}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${roadmap.color} transition-all duration-500`}
                        style={{ width: `${roadmap.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Analytics */}
            <div className="bg-gradient-card rounded-2xl p-6 shadow-soft border border-border animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Learning Analytics
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3">Weekly Progress</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm text-muted-foreground">This Week</span>
                      <span className="font-bold text-foreground">{learningAnalytics.thisWeek} hours</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm text-muted-foreground">Last Week</span>
                      <span className="font-bold text-foreground">{learningAnalytics.lastWeek} hours</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-3">Monthly Progress</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm text-muted-foreground">This Month</span>
                      <span className="font-bold text-foreground">{learningAnalytics.thisMonth} hours</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm text-muted-foreground">Last Month</span>
                      <span className="font-bold text-foreground">{learningAnalytics.lastMonth} hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Achievements */}
            <div className="bg-gradient-card rounded-2xl p-6 shadow-soft border border-border animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-warning" />
                Achievements
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      achievement.earned 
                        ? 'bg-success/10 border-success/20' 
                        : 'bg-muted/30 border-border opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-sm">{achievement.title}</h4>
                        <p className="text-xs text-muted-foreground mb-1">{achievement.description}</p>
                        {achievement.earned && achievement.date && (
                          <p className="text-xs text-success font-medium">Earned {achievement.date}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-card rounded-2xl p-6 shadow-soft border border-border animate-slide-up" style={{ animationDelay: "0.5s" }}>
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-2" />
                  Set Learning Goals
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  View Certificates
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;