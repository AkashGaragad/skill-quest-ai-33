import { useState, useEffect } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIService } from "@/services/aiService";

const fallbackQuotes = [
  "Your future is created by what you do today, not tomorrow.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The only way to do great work is to love what you do.",
  "Don't be afraid to give up the good to go for the great.",
  "Your skills are your most valuable asset. Keep sharpening them.",
  "Every expert was once a beginner. Every pro was once an amateur.",
  "The journey of a thousand miles begins with a single step.",
  "Growth begins at the end of your comfort zone.",
  "Your potential is endless. Go do what you were created to do.",
  "Today's accomplishments were yesterday's impossibilities."
];

const MotivationalQuote = () => {
  const [currentQuote, setCurrentQuote] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    return fallbackQuotes[randomIndex];
  };

  const refreshQuote = async () => {
    setIsAnimating(true);
    setIsLoading(true);
    
    try {
      const aiQuote = await AIService.generateMotivationalQuote();
      setTimeout(() => {
        setCurrentQuote(aiQuote);
        setIsAnimating(false);
        setIsLoading(false);
      }, 300);
    } catch (error) {
      console.error('Failed to generate AI quote:', error);
      setTimeout(() => {
        setCurrentQuote(getRandomQuote());
        setIsAnimating(false);
        setIsLoading(false);
      }, 300);
    }
  };

  const generateInitialQuote = async () => {
    try {
      setIsLoading(true);
      const aiQuote = await AIService.generateMotivationalQuote();
      setCurrentQuote(aiQuote);
    } catch (error) {
      console.error('Failed to generate initial AI quote:', error);
      setCurrentQuote(getRandomQuote());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateInitialQuote();
  }, []);

  return (
    <div className="relative bg-gradient-hero rounded-2xl p-8 text-center shadow-strong overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4">
          <Sparkles className="w-8 h-8 text-white animate-bounce-gentle" />
        </div>
        <div className="absolute bottom-4 right-4">
          <Sparkles className="w-6 h-6 text-white animate-bounce-gentle" style={{ animationDelay: "0.5s" }} />
        </div>
        <div className="absolute top-1/2 left-8">
          <Sparkles className="w-4 h-4 text-white animate-bounce-gentle" style={{ animationDelay: "1s" }} />
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-lg font-semibold text-white/90">Daily Inspiration</h2>
          <Button
            variant="glass"
            size="icon"
            onClick={refreshQuote}
            disabled={isLoading}
            className="ml-4 w-8 h-8"
          >
            <RefreshCw className={`w-4 h-4 ${isAnimating || isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        
        <blockquote 
          className={`text-2xl md:text-3xl font-bold text-white leading-relaxed transition-all duration-300 ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          "{currentQuote}"
        </blockquote>
      </div>
    </div>
  );
};

export default MotivationalQuote;