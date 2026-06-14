import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { useCodeBiteStore } from '../store/useCodeBiteStore';
import { Sun, Moon, Bell } from 'lucide-react';
import { useEffect } from 'react';
export const Route = createRootRoute({
  component: RootComponent,
});
function RootComponent() {
  const { theme, toggleTheme, toast, clearToast } = useCodeBiteStore();
  // Ensure DOM attribute matches store theme on initial mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  // Handle auto-clearing of toasts
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        clearToast();
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [toast, clearToast]);
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F4FF] dark:bg-dark-bg text-neutral-800 dark:text-slate-100 transition-colors duration-300">
      {/* Header Bar */}
      <header className="h-16 bg-white dark:bg-dark-sidebar border-b border-[#EAE6FF] dark:border-dark-border flex items-center justify-between px-8 sticky top-0 z-50 shadow-sm transition-colors duration-300">
        {/* Left Side: Brand & Links */}
        <div className="flex items-center gap-12">
          <Link
            to="/"
            className="flex items-center gap-2.5 cursor-pointer decoration-none"
          >
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" fill="url(#logo-grad-root)" />
              <path
                d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C14.7335 18 17.043 16.1706 17.7661 13.6842C17.1519 13.9174 16.4862 13.9875 15.826 13.8465C14.4754 13.5574 13.4868 12.3925 13.4868 11C13.4868 9.60749 14.4754 8.44256 15.826 8.15347C16.4862 8.0125 17.1519 8.08259 17.7661 8.31579C17.043 5.82939 14.7335 6 12 6Z"
                fill="white"
              />
              <defs>
                <linearGradient
                  id="logo-grad-root"
                  x1="2"
                  y1="2"
                  x2="22"
                  y2="22"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#8B5CF6" />
                  <stop stopColor="#6366F1" />
                </linearGradient>
              </defs>
            </svg>

            <span className="text-xl font-bold tracking-tight text-[#1F1144] dark:text-white">
              CodeBite
            </span>
          </Link>
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-3">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              className="text-[14px] font-semibold px-4 py-2 rounded-full text-neutral-500 hover:text-[#6C63FF] transition"
              activeProps={{
                className: 'bg-[#6C63FF] text-white hover:text-white',
              }}
            >
              Home
            </Link>
            <Link
              to="/practice"
              className="text-[14px] font-semibold px-4 py-2 rounded-full text-neutral-500 hover:text-[#6C63FF] transition"
              activeProps={{
                className: 'bg-[#6C63FF] text-white hover:text-white',
              }}
            >
              Practice Lab
            </Link>
            <Link
              to="/challenge"
              className="text-[14px] font-semibold px-4 py-2 rounded-full text-neutral-500 hover:text-[#6C63FF] transition"
              activeProps={{
                className: 'bg-[#6C63FF] text-white hover:text-white',
              }}
            >
              Challenge
            </Link>
            <Link
              to="/coderush"
              className="text-[14px] font-semibold px-4 py-2 rounded-full text-neutral-500 hover:text-[#6C63FF] transition"
              activeProps={{
                className: 'bg-[#6C63FF] text-white hover:text-white',
              }}
            >
              CodeRush
            </Link>
          </nav>
        </div>
        {/* Right Side: Theme, Avatar */}
        <div className="flex items-center gap-6">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 text-neutral-600 hover:text-[#6C63FF] hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg cursor-pointer transition"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-400" />
            )}
          </button>
          {/* Notification Bell */}
          <button
            className="p-1.5 text-neutral-600 hover:text-[#6C63FF] hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg cursor-pointer transition"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
          </button>
          {/* Profile Card */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[13px] font-bold text-[#1F1144] dark:text-slate-100">
                Username
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] font-extrabold text-[#6C63FF] tracking-wider">
                  LVL 16
                </span>
                <div className="w-[70px] h-[6px] bg-[#EAE6FF] dark:bg-dark-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1F1144] dark:bg-[#6C63FF] rounded-full"
                    style={{ width: '85%' }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#6C63FF] hover:opacity-90 transition cursor-pointer flex items-center justify-center bg-[#6C63FF]/10">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>
      {/* Main Outlet */}
      <main className="flex-1 flex overflow-hidden">
        <Outlet />
      </main>
      {/* Toast Notifications */}
      {toast && (
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50 animate-slide-in">
          <div
            className={`toast bg-[#1A1D29] text-white px-5 py-3.5 rounded-xl shadow-2xl text-[13.5px] font-medium flex items-center gap-2.5 border-l-4 ${
              toast.type === 'error' ? 'border-red-500' : 'border-brand-purple'
            }`}
          >
            <span>{toast.type === 'error' ? '⚠️' : '🎉'}</span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
