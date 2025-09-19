import MotivationalQuote from "@/components/MotivationalQuote";
import QuickActionDashboard from "@/components/QuickActionDashboard";
import StreakTracker from "@/components/StreakTracker";
import heroImage from "@/assets/hero-image.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero overflow-hidden">
       
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Build Your
                <span className="block bg-gradient-accent bg-clip-text text-transparent">
                  Dream Career
                </span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Get personalized AI mentorship, structured learning roadmaps, and join a community 
                of ambitious youth building their future together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/Roadmaps" className="group">
                <button className="bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-medium">
                  Start Your Journey
                </button>
                </Link>
              </div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <MotivationalQuote />
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <QuickActionDashboard />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <StreakTracker />
            
            {/* Recent Activity */}
            <div className="bg-gradient-card rounded-2xl p-6 shadow-soft border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: "Completed React Basics", time: "2 hours ago", type: "success" },
                  { action: "Started Data Science Roadmap", time: "1 day ago", type: "info" },
                  { action: "AI Chat: Career Planning", time: "2 days ago", type: "chat" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-success' :
                      activity.type === 'info' ? 'bg-primary' : 'bg-accent'
                    }`} />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">{activity.action}</div>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;