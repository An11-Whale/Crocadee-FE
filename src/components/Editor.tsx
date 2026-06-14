import React, { useRef, useEffect } from 'react';
import { useCodeBiteStore } from '../store/useCodeBiteStore';
import { Copy } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

interface EditorProps {
  moduleId: number;
}

export const Editor: React.FC<EditorProps> = ({ moduleId }) => {
  const { modules, updateCode, showToast } = useCodeBiteStore();

  const activeModule = modules.find((m) => m.id === moduleId);
  const navigate = useNavigate();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLPreElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const code = activeModule?.codeTemplate ?? '';

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
        while (i < codeString.length && codeString[i] !== '\n') i++;
        html += `<span class="syntax-comment text-[#6A737D] italic">${escapeHtml(codeString.substring(start, i))}</span>`;
        continue;
      }
      if (
        codeString[i] === '#' &&
        codeString.substring(i, i + 8) === '#include'
      ) {
        const start = i;
        while (i < codeString.length && codeString[i] !== '\n') i++;
        html += `<span class="syntax-include text-[#D73A49] font-semibold">${escapeHtml(codeString.substring(start, i))}</span>`;
        continue;
      }
      if (codeString[i] === '"') {
        const start = i;
        i++;
        while (i < codeString.length && codeString[i] !== '"') {
          if (codeString[i] === '\\' && i + 1 < codeString.length) i += 2;
          else i++;
        }
        if (i < codeString.length) i++;
        html += `<span class="syntax-string text-[#032F62]">${escapeHtml(codeString.substring(start, i))}</span>`;
        continue;
      }
      if (/\d/.test(codeString[i])) {
        const start = i;
        while (i < codeString.length && /\d/.test(codeString[i])) i++;
        html += `<span class="syntax-number text-[#005CC5]">${escapeHtml(codeString.substring(start, i))}</span>`;
        continue;
      }
      if (/[a-zA-Z_]/.test(codeString[i])) {
        const start = i;
        while (i < codeString.length && /[a-zA-Z0-9_]/.test(codeString[i])) i++;
        const word = codeString.substring(start, i);
        if (keywords.has(word)) {
          html += `<span class="syntax-keyword text-[#D73A49] font-semibold">${word}</span>`;
        } else if (stdTypes.has(word)) {
          html += `<span class="syntax-type text-[#6F42C1]">${word}</span>`;
        } else if (word === 'main') {
          html += `<span class="syntax-function text-[#6F42C1]">${word}</span>`;
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

  const handleCopy = () => {
    void navigator.clipboard.writeText(code).then(() => {
      showToast('Code copied to clipboard! ??');
    });
  };

  return (
    <div className="editor-panel rounded-3xl overflow-hidden shadow-xl border border-[#EAE6FF] mb-8 animate-fade-in">
      <div className="editor-header bg-[#12151F] h-12 flex items-center justify-between px-6 border-b border-[#1E2230]">
        <div className="file-name flex items-center gap-2.5 text-[#A6ADBA] text-xs font-semibold tracking-wide font-mono">
          <span className="text-[#6C63FF] font-bold font-sans text-sm">
            &lt;/&gt;
          </span>
          <span>{moduleId === 1 ? 'hello_world.cpp' : 'basics.cpp'}</span>
        </div>
        <button
          onClick={handleCopy}
          className="editor-action-btn text-[#4A5164] hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition cursor-pointer"
          aria-label="Copy Code"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
      <div className="editor-container grid grid-cols-[48px_1fr] bg-[#12151F] min-h-[220px]">
        <div
          ref={lineNumbersRef}
          className="line-numbers bg-[#0E1017] py-5 flex flex-col items-center font-mono text-[13px] text-[#3A4154] select-none leading-6 border-r border-[#1E2230] overflow-hidden"
        >
          {lineNumbers.map((num) => (
            <div key={num}>{num}</div>
          ))}
        </div>
        <div className="code-textarea-wrapper relative p-5 h-[200px]">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => {
              updateCode(e.target.value);
            }}
            onScroll={handleScroll}
            className="code-textarea absolute top-5 left-5 w-[calc(100%-40px)] h-[calc(100%-40px)] border-none bg-transparent font-mono text-[13.5px] leading-6 text-transparent caret-white resize-none outline-none z-10 whitespace-pre overflow-auto"
            spellCheck="false"
          />
          <pre
            ref={highlightRef}
            className="code-highlight-overlay absolute top-5 left-5 w-[calc(100%-40px)] h-[calc(100%-40px)] z-0 pointer-events-none whitespace-pre overflow-hidden text-[#A6ADBA] font-mono text-[13.5px] leading-6"
            dangerouslySetInnerHTML={{
              __html: highlightCPP(code + (code.endsWith('\n') ? ' ' : '')),
            }}
          />
        </div>
      </div>
      <div className="console-panel bg-[#0E1017] border-t border-[#1E2230] p-6 flex flex-col relative min-h-[150px]">
        <div className="console-header text-[10px] font-bold text-[#4A5164] tracking-widest uppercase mb-4">
          CONSOLE OUTPUT
        </div>
        <div className="console-body font-mono text-[13px] leading-6 flex flex-col gap-1.5 flex-1 pb-10">
          <div className="text-[#A6ADBA] font-semibold">&gt; Hello, World!</div>
          <div className="text-[#4A5164] italic">
            Program exited with code 0
          </div>
        </div>
        <button
          onClick={() => {
            void navigate({ to: '/try-it' });
          }}
          className="try-it-btn absolute bottom-6 right-6 bg-[#24D3B5] hover:bg-[#1fbfb0] text-white font-bold font-sans text-sm px-6 py-2.5 rounded-full flex items-center gap-2 cursor-pointer transition shadow-lg shadow-[#24D3B5]/20"
        >
          <span>Try it</span>
          <svg
            className="w-4.5 h-4.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};
