import { ParticleBackground } from '@/components/ParticleBackground';
import { Header } from '@/components/Header';
import { ProgressCard } from '@/components/ProgressCard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Zap, Star, Calendar, Code, Bug, CheckCircle } from 'lucide-react';

const ProgressPage = () => {
  const achievements = [
    {
      title: "First Steps",
      description: "Completed your first tutorial",
      icon: Star,
      earned: true,
      date: "2 days ago"
    },
    {
      title: "Bug Squasher",
      description: "Fixed 5 syntax errors", 
      icon: Bug,
      earned: true,
      date: "1 day ago"
    },
    {
      title: "Loop Master",
      description: "Completed all loop exercises",
      icon: Code,
      earned: true,
      date: "Today"
    },
    {
      title: "Speed Coder",
      description: "Completed 10 challenges in one day",
      icon: Zap,
      earned: false,
      date: null
    },
    {
      title: "Perfect Score",
      description: "Got 100% on 5 tutorials",
      icon: Trophy,
      earned: false,
      date: null
    }
  ];

  const stats = [
    { label: "Tutorials Completed", value: "12", icon: CheckCircle, color: "text-success" },
    { label: "Challenges Solved", value: "8", icon: Target, color: "text-primary" },
    { label: "Bugs Fixed", value: "15", icon: Bug, color: "text-accent" },
    { label: "Current Streak", value: "3 days", icon: Calendar, color: "text-yellow-400" }
  ];

  const recentActivity = [
    {
      type: "tutorial",
      title: "Completed: For Loops & Iterations",
      time: "2 hours ago",
      score: "95%"
    },
    {
      type: "challenge", 
      title: "Solved: Variable Practice",
      time: "3 hours ago",
      score: "100%"
    },
    {
      type: "error",
      title: "Fixed: Missing parentheses error",
      time: "4 hours ago",
      score: null
    },
    {
      type: "tutorial",
      title: "Started: Functions & Parameters", 
      time: "1 day ago",
      score: "In Progress"
    }
  ];

  const learningPath = [
    { name: "Python Basics", progress: 100, total: 5 },
    { name: "Control Flow", progress: 75, total: 4 },
    { name: "Functions", progress: 25, total: 6 },
    { name: "Data Structures", progress: 0, total: 8 }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Header />
      
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold gradient-text">Learning Progress</h1>
            <p className="text-xl text-muted-foreground">
              Track your coding journey and celebrate achievements
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gradient-card border-border/50 p-6 text-center">
                <div className="space-y-3">
                  <stat.icon className={`w-8 h-8 mx-auto ${stat.color}`} />
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Progress Card */}
            <div className="lg:col-span-1">
              <ProgressCard />
            </div>

            {/* Learning Path */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-card border-border/50 p-6">
                <h3 className="text-lg font-semibold mb-6 flex items-center">
                  <Target className="w-5 h-5 text-primary mr-2" />
                  Learning Path
                </h3>
                <div className="space-y-6">
                  {learningPath.map((path, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">{path.name}</span>
                        <Badge 
                          variant={path.progress === 100 ? "default" : "outline"}
                          className={path.progress === 100 ? "bg-success/20 text-success border-success/30" : ""}
                        >
                          {Math.round((path.progress / 100) * path.total)}/{path.total}
                        </Badge>
                      </div>
                      <Progress value={path.progress} className="h-3" />
                      <div className="text-sm text-muted-foreground">
                        {path.progress}% Complete
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Achievements */}
            <Card className="bg-gradient-card border-border/50 p-6">
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <Trophy className="w-5 h-5 text-primary mr-2" />
                Achievements
              </h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-4 p-3 rounded-lg border ${
                      achievement.earned 
                        ? 'bg-success/10 border-success/20' 
                        : 'bg-secondary/20 border-border/30 opacity-60'
                    }`}
                  >
                    <achievement.icon 
                      className={`w-6 h-6 ${
                        achievement.earned ? 'text-success' : 'text-muted-foreground'
                      }`} 
                    />
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{achievement.title}</div>
                      <div className="text-sm text-muted-foreground">{achievement.description}</div>
                      {achievement.date && (
                        <div className="text-xs text-muted-foreground mt-1">{achievement.date}</div>
                      )}
                    </div>
                    {achievement.earned && (
                      <CheckCircle className="w-5 h-5 text-success" />
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gradient-card border-border/50 p-6">
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <Calendar className="w-5 h-5 text-accent mr-2" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-code-bg rounded-lg border border-border/30">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'tutorial' ? 'bg-primary' :
                      activity.type === 'challenge' ? 'bg-success' : 'bg-accent'
                    }`} />
                    <div className="flex-1">
                      <div className="font-medium text-foreground text-sm">{activity.title}</div>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                    {activity.score && (
                      <Badge variant="outline" className="text-xs">
                        {activity.score}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgressPage;