import { createFileRoute } from '@tanstack/react-router';
import { useState, useRef, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  Settings,
  Star,
  ArrowLeft,
  Bot,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { useCodeBiteStore } from '../store/useCodeBiteStore';
import { useNavigate } from '@tanstack/react-router';
export const Route = createFileRoute('/challenge/$id')({
  component: ChallengePlayComponent,
});
function ChallengePlayComponent() {
  const navigate = useNavigate();
  const { showToast } = useCodeBiteStore();
  const [code, setCode] = useState(`/**
 * @param {Array} signals
 * @returns {Array}
 */
function siftSignals(signals) {
  // Write your solution here
  return signals.filter(s => {
    return s.frequency >= 200 && s.frequency <= 800 && s.strength > 50;
  });
}`);
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLPreElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  // Syntax highlighting for JS
  const highlightJS = (codeString: string) => {
    const keywords = new Set([
      'function',
      'return',
      'const',
      'let',
      'var',
      'if',
      'else',
      'for',
      'while',
    ]);
    let html = '';
    let i = 0;

    const escapeHtml = (text: string) => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    };
    while (i < codeString.length) {
      if (/\s/.test(codeString[i])) {
        html += escapeHtml(codeString[i]);
        i++;
        continue;
      }
      // Block comments (/** ... */)
      if (codeString.substring(i, i + 3) === '/**') {
        const start = i;
        i += 3;
        while (
          i < codeString.length &&
          codeString.substring(i, i + 2) !== '*/'
        ) {
          i++;
        }
        if (i < codeString.length) i += 2;
        html += `<span class="text-[#6A737D] italic">${escapeHtml(codeString.substring(start, i))}</span>`;
        continue;
      }
      // Single line comments
      if (codeString.substring(i, i + 2) === '//') {
        const start = i;
        while (i < codeString.length && codeString[i] !== '\n') {
          i++;
        }
        html += `<span class="text-[#6A737D] italic">${escapeHtml(codeString.substring(start, i))}</span>`;
        continue;
      }
      // Strings
      if (
        codeString[i] === '"' ||
        codeString[i] === "'" ||
        codeString[i] === '`'
      ) {
        const char = codeString[i];
        const start = i;
        i++;
        while (i < codeString.length && codeString[i] !== char) {
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
      // Numbers
      if (/\d/.test(codeString[i])) {
        const start = i;
        while (i < codeString.length && /\d/.test(codeString[i])) {
          i++;
        }
        html += `<span class="text-[#005CC5]">${escapeHtml(codeString.substring(start, i))}</span>`;
        continue;
      }
      // Words
      if (/[a-zA-Z_]/.test(codeString[i])) {
        const start = i;
        while (i < codeString.length && /[a-zA-Z0-9_]/.test(codeString[i])) {
          i++;
        }
        const word = codeString.substring(start, i);
        if (keywords.has(word)) {
          html += `<span class="text-[#D73A49] font-semibold">${word}</span>`;
        } else if (word === 'siftSignals' || word === 'filter') {
          html += `<span class="text-[#6F42C1] font-semibold">${word}</span>`;
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
    showToast('Running test cases...');

    setTimeout(() => {
      setIsRunning(false);
      setShowResults(true);
      showToast('Tests completed. 2/3 passed.', 'error');
    }, 1200);
  };
  const handleReset = () => {
    setCode(`/**
 * @param {Array} signals
 * @returns {Array}
 */
function siftSignals(signals) {
  // Write your solution here
  return signals.filter(s => {
    return s.frequency >= 200 && s.frequency <= 800 && s.strength > 50;
  });
}`);
    setShowResults(false);
    showToast('Reset template successfully!');
  };
  return (
    <div className="flex-1 flex flex-col h-screen bg-[#F6F4FF] overflow-hidden">
      {/* Top Navbar */}
      <header className="h-16 bg-white border-b border-[#EAE6FF] flex items-center justify-between px-6 z-10 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              void navigate({ to: '/challenge' });
            }}
            className="p-2 hover:bg-[#F6F4FF] rounded-full text-[#6C63FF] transition cursor-pointer"
            aria-label="Back to challenges"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-[#1F1144]">
              CodeBite
            </span>
            <span className="text-[#6C63FF] font-semibold">|</span>
            <span className="text-sm font-semibold text-neutral-500">
              Challenge Play
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#6C63FF] bg-[#6C63FF]/10 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>
      {/* Play Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Challenge details */}
        <div className="w-5/12 bg-white border-r border-[#EAE6FF] overflow-y-auto p-8 flex flex-col gap-6">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-3">
              <span className="w-fit px-3 py-1 bg-[#FFF0E5] text-[#FF8A1F] font-bold text-xs rounded-full uppercase tracking-wider">
                CHALLENGE #044
              </span>
              <h1 className="text-3xl font-extrabold text-[#1F1144] tracking-tight">
                The Data Sifter
              </h1>
            </div>

            <div className="bg-[#6C63FF] text-white p-3.5 rounded-2xl shadow-md shadow-[#6C63FF]/20 flex flex-col items-center shrink-0">
              <span className="text-[10px] font-black tracking-widest uppercase opacity-75">
                BOOST ACTIVE
              </span>
              <span className="text-lg font-black mt-0.5">X2 XP</span>
            </div>
          </div>
          <p className="text-[14.5px] text-neutral-500 leading-7 font-normal">
            Your mission is to build a robust filtering algorithm for the
            intergalactic data stream. Scientists are being overwhelmed by
            noise.
          </p>
          {/* Objective Box */}
          <div className="bg-[#F8F9FD] rounded-3xl p-6 border border-[#EAE6FF] flex flex-col gap-4">
            <h3 className="text-sm font-extrabold text-[#6C63FF] uppercase tracking-wider">
              The Objective
            </h3>
            <p className="text-[13.5px] text-neutral-600 leading-6 font-medium">
              Create a function named{' '}
              <span className="bg-[#E8E3FF] text-[#6C63FF] px-1.5 py-0.5 rounded font-mono text-[12px] font-bold">
                siftSignals
              </span>{' '}
              that accepts an array of signal objects. A signal is valid ONLY if
              its frequency is between 200 and 800, and its strength is above
              50.
            </p>

            <div className="flex flex-col gap-2.5 pt-2 border-t border-[#EAE6FF] text-[13px] font-mono text-neutral-500">
              <div className="flex items-start gap-2.5">
                <span className="text-[#24D3B5] font-bold">✓</span>
                <span>
                  Input:{' '}
                  <code className="text-[#1F1144]">
                    [{'{'}freq: 450, str: 60{'}'}, {'{'}freq: 100, str: 90{'}'}]
                  </code>
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#24D3B5] font-bold">✓</span>
                <span>
                  Output:{' '}
                  <code className="text-[#1F1144]">
                    [{'{'}freq: 450, str: 60{'}'}]
                  </code>
                </span>
              </div>
            </div>
          </div>
          {/* Requirements Box */}
          <div className="flex flex-col gap-3.5">
            <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
              Requirements
            </h4>
            <ul className="flex flex-col gap-3 text-xs font-semibold text-neutral-600">
              <li className="flex items-center gap-3">
                <Star className="w-4.5 h-4.5 text-[#FF8A1F] fill-[#FF8A1F] shrink-0" />
                <span>
                  Use the{' '}
                  <code className="bg-neutral-100 text-neutral-800 px-1 py-0.5 rounded font-mono text-[11px]">
                    filter()
                  </code>{' '}
                  method for optimal performance.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Star className="w-4.5 h-4.5 text-[#FF8A1F] fill-[#FF8A1F] shrink-0" />
                <span>
                  Handle empty arrays gracefully by returning an empty list.
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* Right Side: Code Editor with results panel */}
        <div className="w-7/12 flex flex-col bg-[#12151F] relative overflow-hidden">
          {/* Header */}
          <div className="h-12 bg-[#12151F] flex items-center justify-between px-6 border-b border-[#1E2230] shrink-0">
            <span className="text-[#A6ADBA] text-xs font-semibold font-mono tracking-wider">
              - SOLUTION.CPP
            </span>

            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-1.5 text-xs font-bold text-neutral-400 hover:text-white transition cursor-pointer"
                onClick={() => {
                  showToast('AI Chatbot is online! 🤖');
                }}
              >
                <Bot className="w-4 h-4 text-[#6C63FF]" />
                <span>AI CHATBOX</span>
              </button>
              <button
                onClick={handleReset}
                className="text-[#4A5164] hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition cursor-pointer"
                title="Reset solution template"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button className="text-[#4A5164] hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition cursor-pointer">
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="bg-[#FF8A1F] hover:bg-[#d96a00] disabled:bg-opacity-50 text-white font-bold text-xs px-5 py-1.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-md shadow-[#FF8A1F]/20 transition"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isRunning ? 'Running...' : 'Run'}</span>
              </button>
            </div>
          </div>
          {/* Code Area */}
          <div className="flex-1 grid grid-cols-[56px_1fr] overflow-hidden relative pb-16">
            {/* Line Numbers */}
            <div
              ref={lineNumbersRef}
              className="line-numbers bg-[#0E1017] py-6 flex flex-col items-center font-mono text-[13px] text-[#3A4154] select-none leading-6 border-r border-[#1E2230] overflow-y-auto"
            >
              {lineNumbers.map((num) => (
                <div key={num}>{num}</div>
              ))}
            </div>
            {/* Code inputs */}
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
                  __html: highlightJS(code + (code.endsWith('\n') ? ' ' : '')),
                }}
              />
            </div>
          </div>
          {/* Test Results overlay panel */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-[#0E1017] border-t border-[#1E2230] z-20 flex flex-col transition-all duration-300 ${
              showResults ? 'h-64' : 'h-0 pointer-events-none border-none'
            }`}
          >
            {showResults && (
              <>
                <div className="h-12 border-b border-[#1E2230] flex items-center justify-between px-6 shrink-0">
                  <span className="text-xs font-bold text-[#A6ADBA] tracking-widest uppercase">
                    Test Results
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#24D3B5] font-bold">
                    <CheckCircle className="w-4 h-4 fill-[#24D3B5] text-[#0E1017]" />
                    <span>Syntax Valid</span>
                  </div>
                </div>
                <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-3 font-mono text-[12.5px]">
                  {/* Test case 1 */}
                  <div className="bg-[#12151F] border border-[#1E2230] rounded-xl px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-[#24D3B5]" />
                      <span className="text-[#A6ADBA]">
                        Standard Filter Logic
                      </span>
                    </div>
                    <span className="text-neutral-500 font-semibold">
                      0.04ms
                    </span>
                  </div>
                  {/* Test case 2 */}
                  <div className="bg-[#12151F] border border-[#1E2230] rounded-xl px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-[#24D3B5]" />
                      <span className="text-[#A6ADBA]">
                        Empty Input Handling
                      </span>
                    </div>
                    <span className="text-neutral-500 font-semibold">
                      0.01ms
                    </span>
                  </div>
                  {/* Test case 3 */}
                  <div className="bg-[#12151F] border border-[#1E2230] rounded-xl px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-4 h-4 text-[#F03D3E]" />
                      <span className="text-[#A6ADBA]">
                        Edge Case: Maximum Frequency
                      </span>
                    </div>
                    <span className="text-[#FF8A1F] font-bold">PENDING</span>
                  </div>
                </div>
                <div className="h-16 border-t border-[#1E2230] flex items-center justify-between px-6 shrink-0 bg-[#0A0C12]">
                  <button
                    onClick={() => {
                      setShowResults(false);
                    }}
                    className="text-xs font-bold text-neutral-500 hover:text-white transition cursor-pointer"
                  >
                    Close Results
                  </button>
                  <button
                    onClick={() => {
                      showToast('Unlocking next details... 🔥');
                    }}
                    className="bg-[#FF8A1F] hover:bg-[#d96a00] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer shadow-lg shadow-[#FF8A1F]/10"
                  >
                    View Details
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
