import { useState } from 'react';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Header } from '@/components/Header';
import { CodeEditor } from '@/components/CodeEditor';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Target, RefreshCw } from 'lucide-react';

const Practice = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const challenges = [
    {
      title: "Hello World Challenge",
      description: "Create a program that prints 'Hello, World!' to the console",
      difficulty: "Beginner",
      initialCode: "# Write your code here\n",
      solution: `print("Hello, World!")`,
      hint: "Use the print() function with the text in quotes",
      testCases: [
        { expected: "Hello, World!" }
      ]
    },
    {
      title: "Variable Practice", 
      description: "Create variables for your name and age, then print them in a formatted message",
      difficulty: "Beginner",
      initialCode: "# Create variables and print a message\nname = \nage = \n",
      solution: `name = "Alice"
age = 25
print(f"My name is {name} and I am {age} years old")`,
      hint: "Use f-strings with {} to insert variables into text",
      testCases: [
        { expected: "Should contain your name and age" }
      ]
    },
    {
      title: "Loop Challenge",
      description: "Write a for loop that prints numbers from 1 to 5",
      difficulty: "Intermediate", 
      initialCode: "# Write a for loop here\n",
      solution: `for i in range(1, 6):
    print(i)`,
      hint: "Use range(1, 6) to get numbers 1 through 5",
      testCases: [
        { expected: "1\n2\n3\n4\n5" }
      ]
    }
  ];

  const currentChallenge = challenges[selectedChallenge];

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Header />
      
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold gradient-text">Practice Challenges</h1>
            <p className="text-xl text-muted-foreground">
              Test your skills with hands-on coding challenges
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Challenge Selector */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select Challenge</h3>
              {challenges.map((challenge, index) => (
                <Card 
                  key={index}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedChallenge === index 
                      ? 'bg-primary/20 border-primary/50' 
                      : 'bg-gradient-card border-border/50 hover:border-primary/30'
                  }`}
                  onClick={() => {
                    setSelectedChallenge(index);
                    setShowHint(false);
                  }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{challenge.title}</h4>
                      <Badge 
                        className={
                          challenge.difficulty === 'Beginner' 
                            ? 'bg-success/20 text-success border-success/30'
                            : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        }
                      >
                        {challenge.difficulty}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {challenge.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Challenge Info */}
              <Card className="bg-gradient-card border-border/50 p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{currentChallenge.title}</h2>
                      <p className="text-muted-foreground mt-2">{currentChallenge.description}</p>
                    </div>
                    <Badge 
                      className={
                        currentChallenge.difficulty === 'Beginner' 
                          ? 'bg-success/20 text-success border-success/30'
                          : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      }
                    >
                      {currentChallenge.difficulty}
                    </Badge>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowHint(!showHint)}
                      className="glow-border hover:bg-primary/10"
                    >
                      <Lightbulb className="w-4 h-4 mr-2" />
                      {showHint ? 'Hide Hint' : 'Show Hint'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="glow-border hover:bg-accent/10"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reset Code
                    </Button>
                  </div>

                  {showHint && (
                    <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium text-primary">Hint</h4>
                          <p className="text-sm text-muted-foreground mt-1">{currentChallenge.hint}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Code Editor */}
              <CodeEditor 
                key={selectedChallenge} // Reset editor when challenge changes
                initialCode={currentChallenge.initialCode}
                onRun={(code) => {
                  console.log('Running challenge code:', code);
                  // Here you would validate against test cases
                }}
              />

              {/* Expected Output */}
              <Card className="bg-gradient-card border-border/50 p-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-accent" />
                    <h3 className="text-lg font-semibold">Expected Output</h3>
                  </div>
                  <div className="bg-code-bg border border-border/50 rounded-lg p-4">
                    <pre className="text-sm font-mono text-muted-foreground">
                      {currentChallenge.testCases[0].expected}
                    </pre>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Practice;