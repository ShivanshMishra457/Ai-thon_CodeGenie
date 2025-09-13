import { Trophy, Target, Zap, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const ProgressCard = () => {
  return (
    <Card className="bg-gradient-card border-border/50 p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Your Progress</h3>
          <Trophy className="w-5 h-5 text-primary animate-pulse-glow" />
        </div>

        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Python Basics</span>
            <span className="text-primary font-medium">75%</span>
          </div>
          <Progress value={75} className="h-3" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-code-bg rounded-lg p-3 border border-border/30">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Completed</span>
            </div>
            <div className="text-xl font-bold text-foreground mt-1">12</div>
          </div>
          
          <div className="bg-code-bg rounded-lg p-3 border border-border/30">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-success" />
              <span className="text-sm text-muted-foreground">Bugs Fixed</span>
            </div>
            <div className="text-xl font-bold text-foreground mt-1">8</div>
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Recent Achievements</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-2 bg-success/10 border border-success/20 rounded-lg">
              <Star className="w-4 h-4 text-success" />
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">First Bug Fixed!</div>
                <div className="text-xs text-muted-foreground">Completed your first error fix</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-2 bg-primary/10 border border-primary/20 rounded-lg">
              <Trophy className="w-4 h-4 text-primary" />
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">Loop Master</div>
                <div className="text-xs text-muted-foreground">Completed all for loop exercises</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};