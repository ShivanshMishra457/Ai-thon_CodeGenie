import { ParticleBackground } from '@/components/ParticleBackground';
import { Header } from '@/components/Header';
import { CodeEditor } from '@/components/CodeEditor';
import { ProgressCard } from '@/components/ProgressCard';
import { TutorialCard } from '@/components/TutorialCard';
import { Sparkles, Code, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const tutorials = [
    {
      title: "Python Basics: Variables & Print",
      description: "Learn how to create variables and display output using the print function. Perfect for beginners!",
      duration: "15 min",
      difficulty: "Beginner" as const,
      progress: 100,
      completed: true,
    },
    {
      title: "For Loops & Iterations", 
      description: "Master the art of loops and understand how to repeat code efficiently with for loops.",
      duration: "20 min",
      difficulty: "Beginner" as const,
      progress: 75,
    },
    {
      title: "Functions & Parameters",
      description: "Create reusable code blocks with functions and learn to pass data using parameters.",
      duration: "25 min", 
      difficulty: "Intermediate" as const,
      progress: 0,
    },
    {
      title: "Error Handling & Debugging",
      description: "Learn professional debugging techniques and how to handle errors gracefully in your code.",
      duration: "30 min",
      difficulty: "Advanced" as const,
      progress: 0,
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Header />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold gradient-text">
                Learn Programming with AI
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Master coding with real-time error detection, intelligent fixes, and interactive tutorials. 
                Your AI-powered programming companion that makes learning fun!
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 transition-opacity"
                onClick={() => navigate('/tutorials')}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Learning Free
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="glow-border hover:bg-primary/10"
                onClick={() => navigate('/practice')}
              >
                <Code className="w-5 h-5 mr-2" />
                Try Code Editor
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-card border-border/50 p-6 text-center group hover:border-primary/50 transition-all">
              <Brain className="w-12 h-12 text-primary mx-auto mb-4 animate-float" />
              <h3 className="text-lg font-semibold mb-2">AI Error Detection</h3>
              <p className="text-sm text-muted-foreground">
                Real-time error detection with intelligent fix suggestions powered by AI
              </p>
            </Card>
            
            <Card className="bg-gradient-card border-border/50 p-6 text-center group hover:border-primary/50 transition-all">
              <Zap className="w-12 h-12 text-accent mx-auto mb-4 animate-pulse-glow" />
              <h3 className="text-lg font-semibold mb-2">Instant Code Execution</h3>
              <p className="text-sm text-muted-foreground">
                Run Python and JavaScript code directly in your browser with immediate results
              </p>
            </Card>
            
            <Card className="bg-gradient-card border-border/50 p-6 text-center group hover:border-primary/50 transition-all">
              <Code className="w-12 h-12 text-success mx-auto mb-4 animate-float" />
              <h3 className="text-lg font-semibold mb-2">Interactive Tutorials</h3>
              <p className="text-sm text-muted-foreground">
                Step-by-step lessons with hands-on exercises and gamified learning experience
              </p>
            </Card>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Code Editor */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Interactive Code Editor</h2>
                <Badge className="bg-primary/20 text-primary border-primary/30">Live Demo</Badge>
              </div>
              
              <CodeEditor 
                initialCode={`# Welcome to CodeGenie! 🧞‍♂️
# Try editing this code and click "Run Code"

name = "CodeGenie"
print(f"Hello from {name}!")

# Let's practice with a loop
for i in range(3):
    print(f"✨ Learning step {i + 1}")`}
                onRun={(code) => console.log('Code executed:', code)}
              />
            </div>

            {/* Progress Sidebar */}
            <div className="space-y-6">
              <ProgressCard />
              
              <Card className="bg-gradient-card border-border/50 p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Tips</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 animate-pulse"></div>
                    <p className="text-muted-foreground">Use the "Fix It" button to automatically resolve syntax errors</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 animate-pulse"></div>
                    <p className="text-muted-foreground">Click "Run Code" to see your output in real-time</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full mt-2 animate-pulse"></div>
                    <p className="text-muted-foreground">Complete tutorials to unlock achievements and badges</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Tutorials Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold gradient-text">Interactive Learning Path</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Follow our structured curriculum designed by experts. Each lesson builds on the previous one with hands-on exercises.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {tutorials.map((tutorial, index) => (
                <TutorialCard
                  key={index}
                  {...tutorial}
                  onClick={() => navigate('/tutorials')}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
