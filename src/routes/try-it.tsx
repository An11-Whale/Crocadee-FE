import { createFileRoute } from '@tanstack/react-router';
import { useState, useRef, useEffect } from 'react';
import {
  Play,
  Settings,
  Terminal,
  Trash2,
  ArrowLeft,
  Save,
  Copy,
} from 'lucide-react';
import { useCodeBiteStore } from '../store/useCodeBiteStore';
import { useNavigate } from '@tanstack/react-router';
export const Route = createFileRoute('/try-it')({
  component: TryItComponent,
});
function TryItComponent() {
  const navigate = useNavigate();
  const { showToast } = useCodeBiteStore();
  const [code, setCode] = useState(`#include <iostream>
int main() {
    std::cout << "Hello World!" << std::endl;
    
    return 0;
}`);
  const [output, setOutput] = useState('Hello World!');
  const [isRunning, setIsRunning] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLPreElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  // Custom Lexer for Syntax Highlighting C++
  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };
  const highlightCPP = (codeString: string) => {
    let i = 0;
    let html = '';

    const keywords = new Set([
      'int',
      'return',
      'double',
      'float',
      'void',
      'char',
      'const',
      'bool',
      'true',
      'false',
    ]);
    const stdTypes = new Set([
      'std',
      'cout',
      'endl',
      'cin',
      'string',
      'vector',
    ]);

    while (i < codeString.length) {
      if (/\s/.test(codeString[i])) {
        html += escapeHtml(codeString[i]);
        i++;
        continue;
      }

      if (codeString.substring(i, i + 2) === '//') {
        const start = i;
        while (i < codeString.length && codeString[i] !== '\n') {
          i++;
        }
        html += `<span class="text-[#6A737D] italic">${escapeHtml(codeString.substring(start, i))}</span>`;
        continue;
      }

      if (
        codeString[i] === '#' &&
        codeString.substring(i, i + 8) === '#include'
      ) {
        const start = i;
        while (i < codeString.length && codeString[i] !== '\n') {
          i++;
        }
        html += `<span class="text-[#D73A49] font-semibold">${escapeHtml(codeString.substring(start, i))}</span>`;
        continue;
      }

      if (codeString[i] === '"') {
        const start = i;
        i++;
        while (i < codeString.length && codeString[i] !== '"') {
          if (codeString[i] === '\\' && i + 1 < codeString.length) {
            i += 2;
          } else {
            i++;
          }
        }
        if (i < codeString.length) i++;
        html += `<span class="text-[#032F62]">${escapeHtml(codeString.substring(start, i))}</span>`;
        continue;
      }

      if (/\d/.test(codeString[i])) {
        const start = i;
        while (i < codeString.length && /\d/.test(codeString[i])) {
          i++;
        }
        html += `<span class="text-[#005CC5]">${escapeHtml(codeString.substring(start, i))}</span>`;
        continue;
      }

      if (/[a-zA-Z_]/.test(codeString[i])) {
        const start = i;
        while (i < codeString.length && /[a-zA-Z0-9_]/.test(codeString[i])) {
          i++;
        }
        const word = codeString.substring(start, i);
        if (keywords.has(word)) {
          html += `<span class="text-[#D73A49] font-semibold">${word}</span>`;
        } else if (stdTypes.has(word)) {
          html += `<span class="text-[#6F42C1]">${word}</span>`;
        } else if (word === 'main') {
          html += `<span class="text-[#6F42C1]">${word}</span>`;
        } else {
          html += escapeHtml(word);
        }
        continue;
      }

      html += escapeHtml(codeString[i]);
      i++;
    }

    return html;
  };
  const handleScroll = () => {
    if (textareaRef.current && highlightRef.current && lineNumbersRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };
  useEffect(() => {
    handleScroll();
  }, [code]);
  const lineCount = Math.max(1, code.split('\n').length);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);
  const handleRun = () => {
    setIsRunning(true);
    setOutput('Compiling and running...');

    setTimeout(() => {
      setIsRunning(false);
      const lines = code.split('\n');
      let semicolonError = false;
      let errorLineNum = -1;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('std::cout') && !line.endsWith(';')) {
          semicolonError = true;
          errorLineNum = i + 1;
          break;
        }
        if (line.startsWith('return') && !line.endsWith(';')) {
          semicolonError = true;
          errorLineNum = i + 1;
          break;
        }
      }
      if (semicolonError) {
        setOutput(
          `main.cpp:${String(errorLineNum)}:5: error: expected ';' before token\nCompilation failed.`
        );
        showToast('Compilation Error!', 'error');
        return;
      }
      // Check std::cout print statements
      const matches = [...code.matchAll(/std::cout\s*<<\s*"(.*?)"/g)];
      if (matches.length > 0) {
        const printText = matches.map((m) => m[1]).join('\n');
        setOutput(printText);
        showToast('Code executed successfully!');
      } else {
        setOutput('[No output generated]');
      }
    }, 800);
  };
  const handleClear = () => {
    setOutput('');
    showToast('Output cleared!');
  };
  const handleSave = () => {
    showToast('Code saved successfully!');
  };
  const handleCopy = () => {
    void navigator.clipboard.writeText(code).then(() => {
      showToast('Code copied to clipboard!');
    });
  };
  return (
    <div className="flex-1 flex flex-col h-screen bg-[#F6F4FF] overflow-hidden">
      {/* Top navbar */}
      <header className="h-16 bg-white border-b border-[#EAE6FF] flex items-center justify-between px-6 z-10 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              void navigate({ to: '/practice' });
            }}
            className="p-2 hover:bg-[#F6F4FF] rounded-full text-[#6C63FF] transition cursor-pointer"
            aria-label="Back to practice"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-[#1F1144]">
              CodeBite
            </span>
            <span className="text-[#6C63FF] font-semibold">|</span>
            <span className="text-sm font-semibold text-neutral-500">
              Try it Yourself - C++ Mastery
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="bg-[#FF8A1F] hover:bg-[#d96a00] disabled:bg-opacity-50 text-white font-bold text-sm px-6 py-2 rounded-full flex items-center gap-2 cursor-pointer shadow-md shadow-[#FF8A1F]/20 transition"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>

          <button
            onClick={handleSave}
            className="bg-white border border-[#EAE6FF] hover:bg-neutral-50 text-[#1F1144] font-bold text-sm px-6 py-2 rounded-full flex items-center gap-2 cursor-pointer transition shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
          <button className="p-2 hover:bg-neutral-100 rounded-full text-neutral-500 transition cursor-pointer">
            <Settings className="w-5 h-5" />
          </button>
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#6C63FF] bg-[#6C63FF]/10 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>
      {/* Main split view */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Code Editor */}
        <div className="w-1/2 flex flex-col bg-[#12151F] border-r border-[#1E2230] overflow-hidden">
          <div className="h-12 bg-[#12151F] flex items-center justify-between px-6 border-b border-[#1E2230]">
            <div className="file-name flex items-center gap-2.5 text-[#A6ADBA] text-xs font-semibold font-mono uppercase tracking-wider">
              <span className="text-[#6C63FF] font-sans font-bold text-sm">
                &lt;/&gt;
              </span>
              <span>main.cpp</span>
            </div>
            <button
              onClick={handleCopy}
              className="text-[#4A5164] hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition cursor-pointer"
              aria-label="Copy Code"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 grid grid-cols-[56px_1fr] overflow-hidden relative">
            {/* Line Numbers */}
            <div
              ref={lineNumbersRef}
              className="line-numbers bg-[#0E1017] py-6 flex flex-col items-center font-mono text-[13px] text-[#3A4154] select-none leading-6 border-r border-[#1E2230] overflow-y-auto"
            >
              {lineNumbers.map((num) => (
                <div key={num}>{num}</div>
              ))}
            </div>
            {/* Editing Field */}
            <div className="relative p-6 overflow-hidden flex-1 h-full">
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                onScroll={handleScroll}
                className="absolute top-6 left-6 w-[calc(100%-48px)] h-[calc(100%-48px)] border-none bg-transparent font-mono text-[14px] leading-6 text-transparent caret-white resize-none outline-none z-10 whitespace-pre overflow-auto font-medium"
                spellCheck="false"
              />
              <pre
                ref={highlightRef}
                className="absolute top-6 left-6 w-[calc(100%-48px)] h-[calc(100%-48px)] z-0 pointer-events-none whitespace-pre overflow-hidden text-[#A6ADBA] font-mono text-[14px] leading-6 font-medium"
                dangerouslySetInnerHTML={{
                  __html: highlightCPP(code + (code.endsWith('\n') ? ' ' : '')),
                }}
              />
            </div>
          </div>
        </div>
        {/* Right Side: Output Panel */}
        <div className="w-1/2 flex flex-col bg-[#F9FAFB] overflow-hidden">
          {/* Header */}
          <div className="h-12 bg-white flex items-center justify-between px-6 border-b border-[#EAE6FF] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#E8E3FF] flex items-center justify-center text-[#6C63FF]">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="text-[13px] font-bold text-[#1F1144] tracking-wide">
                Output
              </span>
            </div>

            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 text-xs font-bold text-neutral-400 hover:text-[#FF8A1F] transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
          {/* Output console content */}
          <div className="flex-1 p-8 overflow-auto font-mono text-[14px] leading-7 text-neutral-800 bg-white">
            {output ? (
              <pre className="whitespace-pre-wrap">{output}</pre>
            ) : (
              <span className="text-neutral-300 italic">
                No output. Press Run to execute the code.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
