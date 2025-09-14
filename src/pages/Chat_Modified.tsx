import { useState } from "react";
import { Send, Bot, User, Lightbulb, TrendingUp, MapPin, BookOpen, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIService } from "@/services/aiService";
import type { ChatMessage } from "@/types";
import { useRoadmapContext } from "@/contexts/RoadmapContext";

const Chat = () => {
  const { selectedRoadmap } = useRoadmapContext();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: selectedRoadmap 
        ? `Hi! I'm your AI Career Mentor. I see you're currently focused on ${selectedRoadmap.title}. I'm here to help you with your learning journey and career development. What would you like to explore today?`
        : "Hi! I'm your AI Career Mentor. I'm here to help you make informed career choices and develop the right skills. What would you like to explore today?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const suggestions = [
    {
      icon: TrendingUp,
      text: selectedRoadmap 
        ? `What's next in my ${selectedRoadmap.title} learning path?`
        : "What skills should I learn for Data Science?",
      category: selectedRoadmap ? selectedRoadmap.title : "Skills"
    },
    {
      icon: MapPin,
      text: selectedRoadmap 
        ? `Career opportunities with ${selectedRoadmap.title} skills`
        : "How do I transition to Web Development?",
      category: "Career Path"
    },
    {
      icon: Lightbulb,
      text: selectedRoadmap 
        ? `Best practices for ${selectedRoadmap.title}`
        : "Best career path for AI/ML?",
      category: selectedRoadmap?.title || "AI/ML"
    },
    {
      icon: BookOpen,
      text: selectedRoadmap 
        ? `Recommend projects for ${selectedRoadmap.title}`
        : "Create a learning roadmap for me",
      category: selectedRoadmap ? "Projects" : "Roadmap"
    }
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const contextualInput = selectedRoadmap 
      ? `[Context: User is currently focused on ${selectedRoadmap.title} roadmap] ${inputValue}`
      : inputValue;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToSend = contextualInput;
    setInputValue("");
    setIsLoading(true);

    try {
      const aiResponse = await AIService.getChatResponse(messageToSend, messages);
      
      const aiMessage: ChatMessage = {
        id: `ai_${Date.now()}`,
        content: aiResponse,
        sender: "ai",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      const errorMessage: ChatMessage = {
        id: `ai_error_${Date.now()}`,
        content: "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
        sender: "ai",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8 h-[calc(100vh-12rem)]">
          
          {/* Sidebar with suggestions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Current Focus */}
            {selectedRoadmap && (
              <div className="bg-gradient-card rounded-2xl p-6 shadow-soft border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  Current Focus
                </h3>
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="font-medium text-foreground">{selectedRoadmap.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">{selectedRoadmap.description}</div>
                </div>
              </div>
            )}

            <div className="bg-gradient-card rounded-2xl p-6 shadow-soft border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Start</h3>
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className="w-full text-left p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <suggestion.icon className="w-5 h-5 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="text-xs font-medium text-accent mb-1">{suggestion.category}</div>
                        <div className="text-sm text-foreground">{suggestion.text}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-card rounded-2xl p-6 shadow-soft border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Pro Tips</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  <span>Be specific about your interests and goals</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2" />
                  <span>Ask for learning roadmaps and resources</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-success rounded-full mt-2" />
                  <span>Request skill assessments</span>
                </div>
                {selectedRoadmap && (
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-warning rounded-full mt-2" />
                    <span>Ask for {selectedRoadmap.title} specific guidance</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chat area */}
          <div className="lg:col-span-3 flex flex-col bg-gradient-card rounded-2xl shadow-medium border border-border overflow-hidden">
            
            {/* Chat header */}
            <div className="p-6 border-b border-border bg-gradient-hero text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">AI Career Mentor</h2>
                  <p className="text-white/80 text-sm">
                    {selectedRoadmap 
                      ? `Your ${selectedRoadmap.title} learning companion`
                      : "Your personal guide to career success"
                    }
                  </p>
                </div>
                {selectedRoadmap && (
                  <div className="bg-white/10 rounded-lg px-3 py-1">
                    <div className="text-xs font-medium">{selectedRoadmap.title}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'ai' && (
                    <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-xl p-4 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50 text-foreground'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <div className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>

                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-4 justify-start">
                  <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="max-w-xl p-4 rounded-2xl bg-muted/50 text-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <span className="text-sm text-muted-foreground ml-2">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="p-6 border-t border-border">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={selectedRoadmap 
                    ? `Ask me about ${selectedRoadmap.title} or your career journey...`
                    : "Ask me anything about your career journey..."
                  }
                  className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <Button 
                  onClick={handleSendMessage}
                  variant="hero"
                  size="icon"
                  className="w-12 h-12"
                  disabled={!inputValue.trim() || isLoading}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;