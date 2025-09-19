import { useState } from "react";
import { 
  Code, Database, Brain, Shield, Smartphone, Palette, 
  TrendingUp, Clock, Star, CheckCircle, Circle, Search 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Roadmaps = () => {
  const [selectedRoadmap, setSelectedRoadmap] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const roadmaps = [
    {
      id: "web-dev",
      title: "Web Development",
      description: "Full-stack web development from basics to advanced",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      progress: 65,
      timeEstimate: "6-8 months",
      difficulty: "Beginner",
      students: "12.5k"
    },
    {
      id: "data-science",
      title: "Data Science",
      description: "Analytics, machine learning, and data visualization",
      icon: Database,
      color: "from-purple-500 to-pink-500",
      progress: 30,
      timeEstimate: "8-12 months",
      difficulty: "Intermediate",
      students: "8.2k"
    },
    {
      id: "ai-ml",
      title: "AI & Machine Learning",
      description: "Artificial intelligence and deep learning fundamentals",
      icon: Brain,
      color: "from-green-500 to-emerald-500",
      progress: 0,
      timeEstimate: "10-15 months",
      difficulty: "Advanced",
      students: "6.7k"
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity",
      description: "Network security, ethical hacking, and defense",
      icon: Shield,
      color: "from-red-500 to-orange-500",
      progress: 0,
      timeEstimate: "6-10 months",
      difficulty: "Intermediate",
      students: "4.9k"
    },
    {
      id: "mobile-dev",
      title: "Mobile Development",
      description: "iOS and Android app development",
      icon: Smartphone,
      color: "from-indigo-500 to-purple-500",
      progress: 0,
      timeEstimate: "5-7 months",
      difficulty: "Beginner",
      students: "9.1k"
    },
    {
      id: "ui-ux",
      title: "UI/UX Design",
      description: "User interface and experience design principles",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      progress: 0,
      timeEstimate: "4-6 months",
      difficulty: "Beginner",
      students: "11.3k"
    }
  ];

  const webDevRoadmap = {
    beginner: [
      { title: "HTML Fundamentals", completed: true, resources: 3 },
      { title: "CSS & Styling", completed: true, resources: 5 },
      { title: "JavaScript Basics", completed: true, resources: 8 },
      { title: "Responsive Design", completed: false, resources: 4 },
      { title: "Version Control (Git)", completed: false, resources: 3 }
    ],
    intermediate: [
      { title: "React Framework", completed: false, resources: 12 },
      { title: "State Management", completed: false, resources: 6 },
      { title: "API Integration", completed: false, resources: 8 },
      { title: "Testing & Debugging", completed: false, resources: 7 },
      { title: "Build Tools & Deployment", completed: false, resources: 5 }
    ],
    advanced: [
      { title: "Advanced React Patterns", completed: false, resources: 10 },
      { title: "Backend Development", completed: false, resources: 15 },
      { title: "Database Design", completed: false, resources: 9 },
      { title: "DevOps & CI/CD", completed: false, resources: 8 },
      { title: "Performance Optimization", completed: false, resources: 6 }
    ]
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-success";
      case "Intermediate": return "text-warning";
      case "Advanced": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  // Search filter
  const filteredRoadmaps = roadmaps.filter((roadmap) =>
    roadmap.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search Bar */}
        {!selectedRoadmap && (
          <div className="mb-8 flex items-center gap-3">
            <div className="relative w-full">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search roadmaps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        )}

        {selectedRoadmap ? (
          // Detailed Roadmap View
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <Button 
                variant="outline" 
                onClick={() => setSelectedRoadmap(null)}
                className="mb-4"
              >
                ← Back to Roadmaps
              </Button>
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">65% Complete</div>
                <div className="text-sm text-muted-foreground">Web Development Journey</div>
              </div>
            </div>

            <div className="space-y-8">
              {Object.entries(webDevRoadmap).map(([level, topics]) => (
                <div key={level} className="bg-gradient-card rounded-2xl p-6 shadow-soft border border-border">
                  <h3 className="text-2xl font-bold text-foreground mb-6 capitalize flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      level === 'beginner' ? 'bg-success' :
                      level === 'intermediate' ? 'bg-warning' : 'bg-destructive'
                    }`} />
                    {level} Level
                  </h3>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {topics.map((topic, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-medium ${
                          topic.completed 
                            ? 'bg-success/10 border-success/20' 
                            : 'bg-muted/30 border-border hover:border-primary/20'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-foreground">{topic.title}</h4>
                          {topic.completed ? (
                            <CheckCircle className="w-5 h-5 text-success" />
                          ) : (
                            <Circle className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground mb-3">
                          {topic.resources} learning resources
                        </div>
                        {topic.completed ? (
                          <Button 
                            variant="success"
                            size="sm" 
                            className="w-full flex items-center gap-2"
                            disabled
                          >
                            <CheckCircle className="w-4 h-4" />
                            Completed
                          </Button>
                        ) : (
                          <Button variant="default" size="sm" className="w-full">
                            Start Learning
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Roadmaps Grid
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
            {filteredRoadmaps.map((roadmap) => (
              <div 
                key={roadmap.id}
                className="bg-gradient-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-strong transition-all duration-300 hover:scale-105 cursor-pointer group"
                onClick={() => roadmap.id === 'web-dev' && setSelectedRoadmap(roadmap.id)}
              >
                {/* Icon and Progress */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${roadmap.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <roadmap.icon className="w-6 h-6 text-white" />
                  </div>
                  {roadmap.progress > 0 && (
                    <div className="text-right">
                      <div className="text-lg font-bold text-foreground">{roadmap.progress}%</div>
                      <div className="text-xs text-muted-foreground">Complete</div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-2">{roadmap.title}</h3>
                <p className="text-muted-foreground mb-4">{roadmap.description}</p>

                {/* Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Duration
                    </span>
                    <span className="font-medium text-foreground">{roadmap.timeEstimate}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Difficulty
                    </span>
                    <span className={`font-medium ${getDifficultyColor(roadmap.difficulty)}`}>
                      {roadmap.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Students
                    </span>
                    <span className="font-medium text-foreground">{roadmap.students}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                {roadmap.progress > 0 && (
                  <div className="mb-4">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${roadmap.color} transition-all duration-500`}
                        style={{ width: `${roadmap.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <Button 
                  variant={roadmap.progress > 0 ? "hero" : "default"} 
                  className="w-full"
                  disabled={roadmap.id !== 'web-dev'}
                >
                  {roadmap.progress > 0 ? "Continue Learning" : "Start Roadmap"}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmaps;
