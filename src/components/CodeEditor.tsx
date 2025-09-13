import { useState, useRef } from 'react';
import { Play, Bug, CheckCircle, AlertCircle, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ErrorDetectionService } from '@/services/errorDetection';
import { toast } from '@/hooks/use-toast';

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
      // Check for errors before running
      const errors = ErrorDetectionService.detectPythonErrors(code);
      const syntaxErrors = errors.filter(e => e.severity === 'error');
      
      if (syntaxErrors.length > 0) {
        setHasError(true);
        setOutput(`SyntaxError: ${syntaxErrors[0].message}`);
        setIsRunning(false);
        return;
      }
      
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simple Python execution simulation
      let result = '';
      
      // Handle print statements
      const printMatches = code.match(/print\((.*?)\)/g);
      if (printMatches) {
        const outputs = printMatches.map(match => {
          const content = match.match(/print\((.*?)\)/)?.[1] || '';
          // Handle f-strings and variables (basic simulation)
          if (content.includes('f"') || content.includes("f'")) {
            return content.replace(/f["'](.*)["']/, '$1').replace(/\{.*?\}/g, 'value');
          }
          return content.replace(/['"]/g, '');
        });
        result = outputs.join('\n');
      }
      
      // Handle simple loops
      const forLoopMatch = code.match(/for\s+\w+\s+in\s+range\((\d+)(?:,\s*(\d+))?\):\s*\n\s*print\((.*?)\)/);
      if (forLoopMatch) {
        const start = forLoopMatch[2] ? parseInt(forLoopMatch[2]) : 0;
        const end = forLoopMatch[2] ? parseInt(forLoopMatch[1]) : parseInt(forLoopMatch[1]);
        const printContent = forLoopMatch[3];
        
        const loopOutput = [];
        for (let i = start; i < end; i++) {
          if (printContent.includes('i')) {
            loopOutput.push(printContent.replace(/['"]/g, '').replace(/i/g, i.toString()));
          } else {
            loopOutput.push(printContent.replace(/['"]/g, ''));
          }
        }
        result = loopOutput.join('\n');
      }
      
      if (!result && code.trim()) {
        result = 'Code executed successfully!';
      }
      
      setOutput(result);
      onRun?.(code);
      
      // Show success toast
      toast({
        title: "Code executed successfully!",
        description: "Your code ran without errors.",
      });
      
    } catch (error) {
      setHasError(true);
      setOutput('Error: Something went wrong during execution!');
    } finally {
      setIsRunning(false);
    }
  };

  const handleFixError = (errorToFix: any) => {
    if (errorToFix.fix) {
      setCode(ErrorDetectionService.fixError(code, errorToFix));
      
      toast({
        title: "Error fixed!",
        description: ErrorDetectionService.explainError(errorToFix),
      });
    }
  };

  const errors = ErrorDetectionService.detectPythonErrors(code);
  const criticalErrors = errors.filter(e => e.severity === 'error');

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
            disabled={isRunning || criticalErrors.length > 0}
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
          {criticalErrors.map((error, index) => (
            <div key={index} className="absolute right-4 top-4">
              <div className="flex items-center space-x-2 bg-destructive/20 border border-destructive/50 rounded-md px-3 py-2">
                <Bug className="w-4 h-4 text-destructive animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-xs text-destructive font-medium">{error.message}</span>
                  <span className="text-xs text-destructive/70">Line {error.line}</span>
                </div>
                {error.fix && (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-xs h-auto p-1 text-destructive hover:bg-destructive/10"
                    onClick={() => handleFixError(error)}
                  >
                    <Wand2 className="w-3 h-3 mr-1" />
                    Fix It
                  </Button>
                )}
              </div>
            </div>
          ))}
          
          {/* Warnings */}
          {errors.filter(e => e.severity === 'warning').slice(0, 1).map((warning, index) => (
            <div key={`warning-${index}`} className="absolute right-4 top-16">
              <div className="flex items-center space-x-2 bg-yellow-500/20 border border-yellow-500/50 rounded-md px-3 py-2">
                <AlertCircle className="w-4 h-4 text-yellow-400" />
                <div className="flex flex-col">
                  <span className="text-xs text-yellow-400 font-medium">{warning.message}</span>
                  <span className="text-xs text-yellow-400/70">Line {warning.line}</span>
                </div>
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
            {criticalErrors.length > 0 && (
              <span className="text-xs text-destructive bg-destructive/20 px-2 py-1 rounded">
                {criticalErrors.length} error{criticalErrors.length > 1 ? 's' : ''} found
              </span>
            )}
          </div>
          <pre className={`font-mono text-sm whitespace-pre-wrap min-h-[60px] ${
            hasError ? 'text-destructive' : 'text-muted-foreground'
          }`}>
            {output || 'Click "Run Code" to see output...'}
          </pre>
        </div>
      </div>
    </Card>
  );
};
