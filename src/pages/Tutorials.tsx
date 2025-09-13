import { useState } from 'react';
import { ArrowLeft, CheckCircle, Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Header } from '@/components/Header';
import { TutorialCard } from '@/components/TutorialCard';
import { useNavigate } from 'react-router-dom';

const Tutorials = () => {
  const navigate = useNavigate();
  const [selectedTutorial, setSelectedTutorial] = useState<any>(null);

  const tutorials = [
    {
      id: 1,
      title: "Python Basics: Variables & Print",
      description: "Learn how to create variables and display output using the print function. Perfect for beginners!",
      duration: "15 min",
      difficulty: "Beginner" as const,
      progress: 100,
      completed: true,
      content: {
        theory: "Variables are containers for storing data values. In Python, you create a variable by assigning a value to it.",
        example: `# Creating variables
name = "Alice"
age = 25
height = 5.6

# Using print function
print("Name:", name)
print("Age:", age)
print(f"Height: {height} feet")`,
        exercises: [
          {
            instruction: "Create a variable called 'city' with your city name and print it",
            solution: `city = "New York"
print("I live in", city)`
          }
        ]
      }
    },
    {
      id: 2,
      title: "For Loops & Iterations", 
      description: "Master the art of loops and understand how to repeat code efficiently with for loops.",
      duration: "20 min",
      difficulty: "Beginner" as const,
      progress: 75,
      content: {
        theory: "For loops are used to repeat code a specific number of times or iterate through sequences.",
        example: `# Basic for loop
for i in range(5):
    print("Step", i + 1)

# Loop through a list
colors = ["red", "blue", "green"]
for color in colors:
    print("I like", color)`,
        exercises: [
          {
            instruction: "Create a loop that prints numbers 1 through 10",
            solution: `for i in range(1, 11):
    print(i)`
          }
        ]
      }
    },
    {
      id: 3,
      title: "Functions & Parameters",
      description: "Create reusable code blocks with functions and learn to pass data using parameters.",
      duration: "25 min", 
      difficulty: "Intermediate" as const,
      progress: 0,
      content: {
        theory: "Functions are reusable blocks of code that perform specific tasks. They can accept parameters and return values.",
        example: `# Simple function
def greet():
    print("Hello!")

# Function with parameters
def greet_person(name):
    print(f"Hello, {name}!")

# Function with return value
def add_numbers(a, b):
    return a + b

# Using functions
greet()
greet_person("Alice")
result = add_numbers(5, 3)
print("Sum:", result)`,
        exercises: [
          {
            instruction: "Create a function that takes a name and age as parameters and prints a greeting",
            solution: `def introduce(name, age):
    print(f"Hi, I'm {name} and I'm {age} years old")

introduce("Bob", 30)`
          }
        ]
      }
    }
  ];

  if (selectedTutorial) {
    return (
      <div className="min-h-screen bg-background relative">
        <ParticleBackground />
        <Header />
        
        <main className="relative z-10 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedTutorial(null)}
              className="mb-6 text-primary hover:text-primary/80"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tutorials
            </Button>

            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold gradient-text">{selectedTutorial.title}</h1>
                <div className="flex justify-center space-x-4">
                  <Badge className="bg-success/20 text-success border-success/30">
                    {selectedTutorial.difficulty}
                  </Badge>
                  <Badge variant="outline">{selectedTutorial.duration}</Badge>
                </div>
                {selectedTutorial.progress > 0 && (
                  <div className="max-w-md mx-auto space-y-2">
                    <Progress value={selectedTutorial.progress} className="h-3" />
                    <p className="text-sm text-muted-foreground">{selectedTutorial.progress}% Complete</p>
                  </div>
                )}
              </div>

              <Card className="bg-gradient-card border-border/50 p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Star className="w-5 h-5 text-primary mr-2" />
                      Theory
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedTutorial.content.theory}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Play className="w-5 h-5 text-accent mr-2" />
                      Example Code
                    </h3>
                    <div className="bg-code-bg border border-border/50 rounded-lg p-4">
                      <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                        {selectedTutorial.content.example}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 text-success mr-2" />
                      Practice Exercise
                    </h3>
                    <Card className="bg-code-bg border-border/50 p-4">
                      <p className="text-foreground mb-4">{selectedTutorial.content.exercises[0].instruction}</p>
                      <details className="group">
                        <summary className="cursor-pointer text-primary hover:text-primary/80 select-none">
                          Show Solution
                        </summary>
                        <div className="mt-4 p-4 bg-secondary/20 rounded border border-border/30">
                          <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                            {selectedTutorial.content.exercises[0].solution}
                          </pre>
                        </div>
                      </details>
                    </Card>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <Button 
                      onClick={() => navigate('/practice')}
                      className="bg-gradient-primary hover:opacity-90 transition-opacity"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Try in Code Editor
                    </Button>
                    <Button variant="outline" className="glow-border">
                      Mark Complete
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Header />
      
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold gradient-text">Interactive Tutorials</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Master programming concepts with our structured learning path. Each tutorial builds on the previous one.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tutorials.map((tutorial) => (
              <TutorialCard
                key={tutorial.id}
                {...tutorial}
                onClick={() => setSelectedTutorial(tutorial)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tutorials;