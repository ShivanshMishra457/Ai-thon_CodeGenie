import { Code, Sparkles, Trophy, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  return (
    <header className="relative z-10 border-b border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Code className="w-8 h-8 text-primary animate-pulse-glow" />
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-accent animate-float" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">CodeGenie</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Tutorials
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Practice
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              <Trophy className="w-4 h-4 mr-2" />
              Progress
            </Button>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="glow-border hover:bg-primary/10">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            <Button size="sm" className="bg-gradient-primary hover:opacity-90 transition-opacity">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};