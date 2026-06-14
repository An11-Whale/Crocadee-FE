import { create } from 'zustand';
export interface ModuleItem {
  id: number;
  title: string;
  meta?: string;
  isLocked: boolean;
  codeTemplate: string;
  consoleLines: {
    text: string;
    type: 'output' | 'system' | 'compiling' | 'error';
  }[];
}
interface CodeBiteState {
  theme: 'light' | 'dark';
  progress: number;
  activeModuleId: number;
  modules: ModuleItem[];
  compiling: boolean;
  toast: { message: string; type: 'success' | 'error' } | null;

  toggleTheme: () => void;
  setActiveModuleId: (id: number) => void;
  updateCode: (code: string) => void;
  runCode: () => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
  clearToast: () => void;
}
const initialModules: ModuleItem[] = [
  {
    id: 1,
    title: 'Introduction to C++',
    meta: 'MODULE 1',
    isLocked: false,
    codeTemplate: `#include <iostream>
int main() {
    // This is your first C++ program
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
    consoleLines: [
      { text: '> Hello, World!', type: 'output' },
      { text: 'Program exited with code 0', type: 'system' },
    ],
  },
  {
    id: 2,
    title: 'C++ Basics',
    isLocked: false,
    codeTemplate: `#include <iostream>
int main() {
    std::cout << "Learning C++ is exciting!" << std::endl;
    std::cout << "Each line ends with a semicolon." << std::endl;
    
    return 0;
}`,
    consoleLines: [
      { text: '> Learning C++ is exciting!', type: 'output' },
      { text: '> Each line ends with a semicolon.', type: 'output' },
      { text: 'Program exited with code 0', type: 'system' },
    ],
  },
  {
    id: 3,
    title: 'Variable',
    isLocked: true,
    codeTemplate: '',
    consoleLines: [],
  },
  {
    id: 4,
    title: 'Condition',
    isLocked: true,
    codeTemplate: '',
    consoleLines: [],
  },
  { id: 5, title: 'Loop', isLocked: true, codeTemplate: '', consoleLines: [] },
  {
    id: 6,
    title: 'Function',
    isLocked: true,
    codeTemplate: '',
    consoleLines: [],
  },
  { id: 7, title: 'Array', isLocked: true, codeTemplate: '', consoleLines: [] },
  {
    id: 8,
    title: 'Pointer',
    isLocked: true,
    codeTemplate: '',
    consoleLines: [],
  },
];
export const useCodeBiteStore = create<CodeBiteState>((set, get) => ({
  theme: (localStorage.getItem('theme') ?? 'light') as 'light' | 'dark',
  progress: 1,
  activeModuleId: 1,
  modules: initialModules,
  compiling: false,
  toast: null,
  toggleTheme: () => {
    const nextTheme = get().theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    set({ theme: nextTheme });
    get().showToast(
      `Switched to ${nextTheme === 'light' ? 'Light' : 'Dark'} Mode ${nextTheme === 'light' ? '☀️' : '🌙'}`
    );
  },
  setActiveModuleId: (id) => {
    const target = get().modules.find((m) => m.id === id);
    if (target?.isLocked) {
      get().showToast(
        '🔒 This module is locked. Finish previous lessons first!',
        'error'
      );
      return;
    }
    const nextProgress = id === 1 ? 1 : id === 2 ? 15 : get().progress;
    set({ activeModuleId: id, progress: nextProgress });
  },
  updateCode: (code) => {
    set((state) => ({
      modules: state.modules.map((m) =>
        m.id === state.activeModuleId ? { ...m, codeTemplate: code } : m
      ),
    }));
  },
  runCode: () => {
    const activeId = get().activeModuleId;
    const activeModule = get().modules.find((m) => m.id === activeId);
    if (!activeModule) return;
    set({ compiling: true });
    // Instantly set compilation log
    set((state) => ({
      modules: state.modules.map((m) =>
        m.id === activeId
          ? {
              ...m,
              consoleLines: [
                {
                  text: `> g++ -o main ${activeId === 1 ? 'hello_world.cpp' : 'basics.cpp'} && ./main`,
                  type: 'compiling',
                },
                { text: 'Compiling and running...', type: 'system' },
              ],
            }
          : m
      ),
    }));
    // Simulating standard output after 1s delay
    setTimeout(() => {
      set({ compiling: false });
      const currentCode = activeModule.codeTemplate;
      const lines = currentCode.split('\n');

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
        set((state) => ({
          modules: state.modules.map((m) =>
            m.id === activeId
              ? {
                  ...m,
                  consoleLines: [
                    {
                      text: `${activeId === 1 ? 'hello_world.cpp' : 'basics.cpp'}:${String(
                        errorLineNum
                      )}:1: error: expected ';' before token`,
                      type: 'error',
                    },
                    { text: 'Compilation failed.', type: 'system' },
                  ],
                }
              : m
          ),
        }));
        get().showToast('Compilation error! Check semicolons.', 'error');
        return;
      }
      // Check std::cout print statements
      const matches = [...currentCode.matchAll(/std::cout\s*<<\s*"(.*?)"/g)];
      const resultLines: {
        text: string;
        type: 'output' | 'system' | 'compiling' | 'error';
      }[] = [];
      if (matches.length > 0) {
        matches.forEach((m) => {
          resultLines.push({ text: `> ${m[1]}`, type: 'output' });
        });
        resultLines.push({
          text: 'Program exited with code 0',
          type: 'system',
        });

        set((state) => ({
          modules: state.modules.map((m) =>
            m.id === activeId ? { ...m, consoleLines: resultLines } : m
          ),
        }));
        get().showToast('Program executed successfully!');
      } else {
        set((state) => ({
          modules: state.modules.map((m) =>
            m.id === activeId
              ? {
                  ...m,
                  consoleLines: [
                    { text: '> [No output generated]', type: 'output' },
                    { text: 'Program exited with code 0', type: 'system' },
                  ],
                }
              : m
          ),
        }));
      }
    }, 1000);
  },
  showToast: (message, type = 'success') => {
    set({ toast: { message, type } });
  },
  clearToast: () => {
    set({ toast: null });
  },
}));
