import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, MessageCircle, Map, CheckSquare, Users, User, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
    }
  };

  const navItems = [
    { icon: Home, label: "Home", path: "/", requiresAuth: true },
    { icon: MessageCircle, label: "AI Mentor", path: "/chat", requiresAuth: false },
    { icon: Map, label: "Roadmaps", path: "/roadmaps", requiresAuth: true },
    { icon: CheckSquare, label: "TODO", path: "/todo", requiresAuth: true },
    { icon: Users, label: "Community", path: "/community", requiresAuth: false },
    { icon: User, label: "Profile", path: "/profile", requiresAuth: true },
  ];

  // Filter nav items based on auth status
  const availableNavItems = navItems.filter(item => 
    !item.requiresAuth || user
  );

  return (
    <nav className="bg-gradient-card border-b border-border shadow-soft sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                CareerBoost
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {availableNavItems.map(({ icon: Icon, label, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </NavLink>
            ))}
            
            {/* Desktop Auth Actions */}
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-border">
              {user ? (
                <>
                 
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-1" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button asChild variant="outline" size="sm">
                  <NavLink to="/auth">Sign In</NavLink>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="space-y-2">
              {availableNavItems.map(({ icon: Icon, label, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </NavLink>
              ))}
              
              {/* Mobile Auth Actions */}
              <div className="pt-2 mt-2 border-t border-border">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-4 py-2 text-sm text-muted-foreground">
                      Signed in as {user.email?.split('@')[0]}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mx-4 max-w-[calc(100%-2rem)] justify-start" 
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button asChild variant="outline" size="sm" className="w-full mx-4 max-w-[calc(100%-2rem)]">
                    <NavLink to="/auth" onClick={() => setIsOpen(false)}>
                      Sign In
                    </NavLink>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;