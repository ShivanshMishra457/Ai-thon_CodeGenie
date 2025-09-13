export interface CodeError {
  line: number;
  column: number;
  message: string;
  type: 'syntax' | 'logical' | 'runtime';
  severity: 'error' | 'warning';
  fix?: string;
}

export class ErrorDetectionService {
  static detectPythonErrors(code: string): CodeError[] {
    const errors: CodeError[] = [];
    const lines = code.split('\n');

    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      const trimmedLine = line.trim();

      // Skip empty lines and comments
      if (!trimmedLine || trimmedLine.startsWith('#')) return;

      // Check for print statement without parentheses (Python 2 vs 3)
      if (trimmedLine.includes('print ') && !trimmedLine.includes('print(')) {
        errors.push({
          line: lineNumber,
          column: line.indexOf('print'),
          message: 'Missing parentheses in print statement',
          type: 'syntax',
          severity: 'error',
          fix: line.replace(/print\s+(.+)/, 'print($1)')
        });
      }

      // Check for missing colon after control structures
      const controlStructures = ['if', 'elif', 'else', 'for', 'while', 'def', 'class', 'try', 'except', 'finally'];
      for (const structure of controlStructures) {
        if (trimmedLine.startsWith(structure) && !trimmedLine.endsWith(':') && structure !== 'else') {
          if (structure === 'else' && trimmedLine === 'else') {
            errors.push({
              line: lineNumber,
              column: line.length,
              message: `Missing colon after '${structure}'`,
              type: 'syntax',
              severity: 'error',
              fix: line + ':'
            });
          } else if (structure !== 'else') {
            errors.push({
              line: lineNumber,
              column: line.length,
              message: `Missing colon after '${structure}' statement`,
              type: 'syntax',
              severity: 'error',
              fix: line + ':'
            });
          }
        }
      }

      // Check for incorrect indentation (basic check)
      if (trimmedLine && line.startsWith(' ') && (line.length - line.trimStart().length) % 4 !== 0) {
        errors.push({
          line: lineNumber,
          column: 0,
          message: 'Inconsistent indentation (use 4 spaces)',
          type: 'syntax',
          severity: 'warning',
          fix: '    ' + trimmedLine // Fix to 4-space indentation
        });
      }

      // Check for unclosed parentheses/brackets
      const openChars = line.match(/[\(\[\{]/g) || [];
      const closeChars = line.match(/[\)\]\}]/g) || [];
      if (openChars.length > closeChars.length) {
        errors.push({
          line: lineNumber,
          column: line.length,
          message: 'Unclosed parentheses or brackets',
          type: 'syntax',
          severity: 'error'
        });
      }

      // Check for missing quotes
      const singleQuotes = (line.match(/'/g) || []).length;
      const doubleQuotes = (line.match(/"/g) || []).length;
      if (singleQuotes % 2 !== 0 || doubleQuotes % 2 !== 0) {
        errors.push({
          line: lineNumber,
          column: line.length,
          message: 'Unclosed string literal',
          type: 'syntax',
          severity: 'error'
        });
      }

      // Check for undefined variables (basic check)
      const variableDeclaration = trimmedLine.match(/^(\w+)\s*=/);
      const variableUsage = trimmedLine.match(/\b(\w+)\b/g);
      
      if (variableUsage && !variableDeclaration) {
        // This is a very basic check - in a real implementation, you'd need to track scope
        const potentialVars = variableUsage.filter(v => 
          !['print', 'input', 'len', 'range', 'int', 'str', 'float', 'list', 'dict'].includes(v)
        );
        
        // Check if variable might be used before declaration (very basic)
        if (potentialVars.length > 0 && lineNumber === 1) {
          potentialVars.forEach(varName => {
            if (!code.includes(`${varName} =`) || code.indexOf(`${varName} =`) > code.indexOf(varName)) {
              errors.push({
                line: lineNumber,
                column: line.indexOf(varName),
                message: `Variable '${varName}' may be used before assignment`,
                type: 'logical',
                severity: 'warning'
              });
            }
          });
        }
      }
    });

    return errors;
  }

  static fixError(code: string, error: CodeError): string {
    if (!error.fix) return code;

    const lines = code.split('\n');
    lines[error.line - 1] = error.fix;
    return lines.join('\n');
  }

  static explainError(error: CodeError): string {
    const explanations: Record<string, string> = {
      'Missing parentheses in print statement': 
        "In Python 3, print is a function and requires parentheses around the content you want to print. For example: print('Hello World')",
      
      'Missing colon after': 
        "Python requires a colon (:) at the end of statements that start code blocks like if, for, while, def, and class statements.",
      
      'Inconsistent indentation': 
        "Python uses indentation to define code blocks. Use 4 spaces for each level of indentation consistently throughout your code.",
      
      'Unclosed parentheses or brackets': 
        "Every opening parenthesis (, bracket [, or brace { must have a matching closing character. Check that all pairs are properly closed.",
      
      'Unclosed string literal': 
        "String literals must be enclosed in matching quotes. If you start with a single quote ', end with a single quote. Same for double quotes \".",
      
      'Variable may be used before assignment': 
        "You're trying to use a variable that hasn't been created yet. Make sure to assign a value to the variable before using it."
    };

    for (const [key, explanation] of Object.entries(explanations)) {
      if (error.message.includes(key)) {
        return explanation;
      }
    }

    return "This error indicates a syntax or logical issue in your code. Check the highlighted line for potential problems.";
  }
}