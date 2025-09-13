import { useState, useRef } from 'react';
import { Play, Bug, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CodeEditorProps {
  initialCode?: string;
  onRun?: (code: string) => void;
}

export const CodeEditor = ({ initialCode = '', onRun }: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [hasError, setHasError] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleRunCode = async () => {
    setIsRunning(true);
    setHasError(false);
    
    try {
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simple Python print detection for demo
      if (code.includes('print(')) {
        const printMatches = code.match(/print\((.*?)\)/g);
        if (printMatches) {
          const outputs = printMatches.map(match => {
            const content = match.match(/print\((.*?)\)/)?.[1] || '';
            return content.replace(/['"]/g, '');
          });
          setOutput(outputs.join('\n'));
        }
      } else {
        setOutput('Code executed successfully!');
      }
      
      onRun?.(code);
    } catch (error) {
      setHasError(true);
      setOutput('Error: Something went wrong!');
    } finally {
      setIsRunning(false);
    }
  };

  const detectErrors = () => {
    // Simple error detection for demo
    const errors = [];
    if (code.includes('print ') && !code.includes('print(')) {
      errors.push({ line: 1, message: 'Missing parentheses in print statement', type: 'syntax' });
    }
    return errors;
  };

  const errors = detectErrors();

  return (
    <Card className="bg-gradient-card border-border/50 p-6">
      <div className="space-y-4">
        {/* Editor Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-destructive rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="ml-4 text-sm text-muted-foreground">Python Editor</span>
          </div>
          <Button 
            onClick={handleRunCode} 
            disabled={isRunning}
            className="bg-gradient-primary hover:opacity-90 transition-opacity"
            size="sm"
          >
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>
        </div>

        {/* Code Editor */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="code-editor w-full h-64 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 bg-code-bg text-foreground font-mono"
            placeholder="# Write your Python code here
print('Hello, CodeGenie!')

for i in range(3):
    print(f'Learning is fun! {i + 1}')"
            spellCheck={false}
          />
          
          {/* Error Indicators */}
          {errors.map((error, index) => (
            <div key={index} className="absolute right-4 top-4">
              <div className="flex items-center space-x-2 bg-destructive/20 border border-destructive/50 rounded-md px-2 py-1">
                <Bug className="w-4 h-4 text-destructive animate-pulse" />
                <span className="text-xs text-destructive">{error.message}</span>
                <Button size="sm" variant="ghost" className="text-xs h-auto p-1">
                  Fix It
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Output Panel */}
        <div className="bg-code-bg border border-border/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            {hasError ? (
              <AlertCircle className="w-4 h-4 text-destructive" />
            ) : (
              <CheckCircle className="w-4 h-4 text-success" />
            )}
            <span className="text-sm font-medium">Output</span>
          </div>
          <pre className="font-mono text-sm text-muted-foreground whitespace-pre-wrap min-h-[60px]">
            {output || 'Click "Run Code" to see output...'}
          </pre>
        </div>
      </div>
    </Card>
  );
};