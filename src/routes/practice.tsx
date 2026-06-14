import { createFileRoute } from '@tanstack/react-router';
import { useCodeBiteStore } from '../store/useCodeBiteStore';
import { Editor } from '../components/Editor';
import { Code, Cpu, ChevronRight, Play, Lock } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/practice')({
  component: PracticeComponent,
});

function PracticeComponent() {
  const { modules, activeModuleId, setActiveModuleId, progress } =
    useCodeBiteStore();
  const navigate = useNavigate();
  const activeModule =
    modules.find((m) => m.id === activeModuleId) ?? modules[0];

  const handleNextModule = () => {
    if (activeModuleId === 1) {
      setActiveModuleId(2);
    } else {
      void navigate({ to: '/challenge' });
    }
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row items-start gap-8 p-8 bg-[#F6F4FF] dark:bg-dark-bg min-h-[90vh]">
      {/* Sidebar */}
      <aside className="w-full md:w-80 bg-white dark:bg-dark-sidebar p-6 rounded-3xl shadow-sm border border-[#EAE6FF] dark:border-dark-border sticky top-24">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#1F1144] dark:text-white">
            C++ Mastery
          </h2>
          <div className="flex justify-between items-center mt-3 text-xs font-semibold text-[#6C63FF]">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-2 bg-[#EAE6FF] dark:bg-dark-border rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-[#6C63FF] rounded-full transition-all duration-500"
              style={{ width: `${String(progress)}%` }}
            />
          </div>
        </div>

        <nav className="space-y-2.5">
          {modules.map((m, idx) => {
            const isActive = m.id === activeModuleId;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setActiveModuleId(m.id);
                }}
                disabled={m.isLocked && m.id !== activeModuleId}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition duration-200 group cursor-pointer ${
                  isActive
                    ? 'bg-[#E8E3FF] text-[#6C63FF] font-bold shadow-sm'
                    : m.isLocked
                      ? 'opacity-50 cursor-not-allowed text-neutral-400'
                      : 'text-neutral-500 hover:bg-[#F6F4FF] hover:text-[#6C63FF]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition duration-200 ${
                      isActive
                        ? 'bg-[#6C63FF] text-white'
                        : 'bg-white border border-[#EAE6FF] text-neutral-400 group-hover:border-[#6C63FF] group-hover:text-[#6C63FF]'
                    }`}
                  >
                    {isActive ? (
                      <div className="w-2.5 h-2.5 bg-white rounded-full" />
                    ) : m.isLocked ? (
                      <Lock className="w-3.5 h-3.5" />
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span
                    className={`text-[13.5px] ${isActive ? 'text-[#1F1144] font-bold' : 'font-medium'}`}
                  >
                    {m.title}
                  </span>
                </div>
                {isActive && (
                  <Play className="w-3.5 h-3.5 text-[#6C63FF] fill-[#6C63FF]" />
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 space-y-8">
        <div className="bg-white dark:bg-dark-sidebar rounded-3xl p-8 shadow-sm border border-[#EAE6FF] dark:border-dark-border">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between mb-8">
            <div className="max-w-2xl" />
            <div className="inline-block px-3.5 py-1.5 text-xs font-bold text-[#6C63FF] bg-[#E8E3FF] rounded-full uppercase tracking-wider">
              {activeModuleId === 1
                ? 'MODULE 1 • INTRODUCTION'
                : 'MODULE 1 • BASICS'}
            </div>
            <h1 className="text-4xl font-extrabold text-[#1F1144] dark:text-white mt-4 tracking-tight">
              {activeModule.title}
            </h1>
            <p className="text-[14.5px] text-neutral-500 leading-7 mt-4 font-normal">
              {activeModuleId === 1 ? (
                <>
                  Embark on your journey into the world of high-performance
                  computing.{' '}
                  <strong className="text-[#1F1144] font-bold">C++</strong> is a{' '}
                  <strong className="text-[#1F1144] font-bold">
                    powerful, fast, and versatile programming language
                  </strong>{' '}
                  used to build operating systems, game engines, and critical
                  infrastructure. In this path, you'll master everything from{' '}
                  <strong className="text-[#1F1144] font-bold">
                    basic syntax to advanced memory management
                  </strong>
                  . Let's write your first line of code!
                </>
              ) : (
                <>
                  Now that we understand why C++ is used, let's explore its
                  basic structure. C++ applications are composed of functions,
                  namespaces, and header inclusions. Standard printing is
                  accomplished using the{' '}
                  <strong className="text-[#1F1144] font-bold">
                    std::cout
                  </strong>{' '}
                  operator.
                </>
              )}
            </p>
          </div>

          {/* Side cards inside container */}
          <div className="w-full lg:w-96 flex flex-col md:flex-row lg:flex-col gap-4">
            {/* Why C++ Card */}
            <div className="flex-1 p-6 bg-white dark:bg-dark-bg border border-[#EAE6FF] rounded-3xl shadow-xs transition duration-200 hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#E8E3FF] flex items-center justify-center text-[#6C63FF] mb-4">
                <Code className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1F1144] dark:text-white mb-2">
                Why C++?
              </h3>
              <p className="text-[13px] text-neutral-500 leading-6">
                C++ gives you unparalleled control over system resources and
                memory. It's the language of choice when performance is
                non-negotiable.
              </p>
            </div>

            {/* Close to the Metal Card */}
            <div className="flex-1 p-6 bg-white dark:bg-dark-bg border border-[#FFF6EA] rounded-3xl shadow-xs transition duration-200 hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#FFF6EA] flex items-center justify-center text-[#FF8A1F] mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1F1144] dark:text-white mb-2">
                Close to the Metal
              </h3>
              <p className="text-[13px] text-neutral-500 leading-6">
                Unlike many modern languages, C++ compiles directly to machine
                code, making it incredibly fast and efficient to execute.
              </p>
            </div>
          </div>
        </div>

        {/* Integrated Editor */}
        <div className="mt-8">
          <Editor moduleId={activeModuleId} />
        </div>

        {/* Navigation Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleNextModule}
            className="bg-[#6C63FF] hover:bg-[#5f46e8] text-white font-bold text-sm px-6 py-3 rounded-full flex items-center gap-2 cursor-pointer transition shadow-lg shadow-[#6C63FF]/20"
          >
            <span>
              {activeModuleId === 1 ? 'C++ Basics' : 'Start Challenges'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
