import { Link } from "react-router-dom";
import { MessageCircle, Map, Flame, TrendingUp, Target, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";



const QuickActionDashboard = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const quickActions = [
    {
      title: "Chat with AI Mentor",
      description: "Get personalized career advice",
      icon: MessageCircle,
      link: "/chat",
      variant: "hero" as const,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "My Roadmaps",
      description: "Continue your learning journey",
      icon: Map,
      link: "/roadmaps",
      variant: "accent" as const,
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Weekly Streaks",
      description: "Keep your momentum going",
      icon: Flame,
      link: "/todo",
      variant: "success" as const,
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const stats = [
    { label: "Skills Learning", value: "3", icon: Target },
    { label: "Days Streak", value: "12", icon: Flame },
    { label: "Roadmaps Active", value: "2", icon: BookOpen },
    { label: "This Week Progress", value: "85%", icon: TrendingUp }
  ];

  return (
    <div className="space-y-8">
      {/* Personalized Greeting */}
      <div className="text-center space-y-2 animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Welcome back, <span className="bg-gradient-hero bg-clip-text text-transparent">{profile?.name || user?.email || "User"}</span>! 
        </h2>
        <p className="text-lg text-muted-foreground">
          Keep going strong on your <span className="font-semibold text-primary">Web Development</span> journey 🚀
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-gradient-card rounded-xl p-4 text-center shadow-soft border border-border hover:shadow-medium transition-all duration-300">
            <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
        {quickActions.map(({ title, description, icon: Icon, link, variant }) => (
          <Link key={title} to={link} className="group">
            <div className="bg-gradient-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-strong transition-all duration-300 hover:scale-105 group-hover:border-primary/20">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-hero rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-muted-foreground mb-4">{description}</p>
              <Button variant={variant} className="w-full">
                Get Started
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActionDashboard;