import { Play, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TutorialCardProps {
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completed?: boolean;
  progress?: number;
  onClick?: () => void;
}

export const TutorialCard = ({ 
  title, 
  description, 
  duration, 
  difficulty, 
  completed = false, 
  progress = 0,
  onClick 
}: TutorialCardProps) => {
  const difficultyColors = {
    Beginner: 'bg-success/20 text-success border-success/30',
    Intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Advanced: 'bg-destructive/20 text-destructive border-destructive/30'
  };

  return (
    <Card className="bg-gradient-card border-border/50 p-6 group hover:border-primary/50 transition-all duration-300 cursor-pointer"
          onClick={onClick}>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
          
          {completed && (
            <CheckCircle className="w-5 h-5 text-success animate-pulse" />
          )}
        </div>

        <div className="flex items-center space-x-4">
          <Badge className={difficultyColors[difficulty]}>
            {difficulty}
          </Badge>
          
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span className="text-xs">{duration}</span>
          </div>
        </div>

        {progress > 0 && !completed && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-primary">{progress}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <Button 
          className="w-full bg-transparent border border-primary/30 text-primary hover:bg-primary/10 group-hover:border-primary/60 transition-all"
          size="sm"
        >
          <Play className="w-4 h-4 mr-2" />
          {completed ? 'Review' : progress > 0 ? 'Continue' : 'Start Learning'}
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </Card>
  );
};