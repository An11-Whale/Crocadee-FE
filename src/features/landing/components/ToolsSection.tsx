import { Button } from '../../../components/button';
import gearIconUrl from '../../../assets/icon/landing-spinning-gear.svg';
import dailyStreakUrl from '../../../assets/icon/landing-daily streak.svg';

export function ToolsSection() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-24 text-center">
      <h2 className="mb-2 text-3xl font-extrabold text-neutral-900 md:text-4xl">
        Powerful Tools for Growth
      </h2>
      <p className="mb-16 text-lg text-neutral-600">
        Everything you need to go from novice to mastery.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* =========================================
            Line 1: AI Review & RPG Progression
            ========================================= */}

        {/*AI Targeted Review */}
        <div className="relative col-span-1 flex flex-col items-start overflow-hidden rounded-4xl border border-neutral-100 bg-shade-white shadow-sm p-10 text-left md:col-span-2 transition-transform hover:-translate-y-1 hover:shadow-md">
          <span className="rounded-full bg-primary-500 px-3 py-1.5 text-[10px] font-bold tracking-widest text-shade-white uppercase">
            CORE FEATURE
          </span>

          <h3 className="mt-5 mb-3 text-3xl font-extrabold text-neutral-900">
            AI Targeted Review
          </h3>
          <p className="max-w-md text-base leading-relaxed text-neutral-600 relative z-10">
            Our algorithm identifies your weak points and generates custom
            exercises to ensure complete concept mastery before moving forward.
          </p>

          <img
            src={gearIconUrl}
            alt="Spinning Gear"
            className="absolute -bottom-16 -right-16 w-80 h-80 opacity-20 animate-[spin_20s_linear_infinite] pointer-events-none select-none"
          />
        </div>

        {/*RPG Progression */}
        <div className="col-span-1 flex flex-col items-center justify-center rounded-4xl border border-neutral-100 bg-shade-white shadow-sm p-10 text-center transition-transform hover:-translate-y-1 hover:shadow-md">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-100 bg-shade-white shadow-sm text-primary-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l-1.02 5.619c-.08.443-.56.678-.936.438L12 17.25l-4.715 2.523c-.376.24-.856.005-.936-.438l-1.02-5.619a.563.563 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </div>
          <h3 className="mb-3 text-2xl font-extrabold text-neutral-900">
            RPG Progression
          </h3>
          <p className="text-sm leading-relaxed text-neutral-600">
            Earn XP, level up, and unlock exclusive rewards. Learning to code
            has never been this dangerously addictive.
          </p>
        </div>

        {/* =========================================
            Line 2: Leaderboard & Daily Quests 
            ========================================= */}

        {/* Weekly Leaderboard */}
        <div className="col-span-1 flex flex-col justify-between rounded-4xl bg-[#8F81FF] p-8 text-shade-white shadow-sm hover:-translate-y-1 hover:shadow-md transition-transform relative overflow-hidden">
          <div className="pointer-events-none select-none">
            <div className="mb-6 flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="h-6 w-6 text-shade-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                />
              </svg>
              <h3 className="text-xl font-bold">Weekly Leaderboard</h3>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between rounded-xl bg-shade-white/10 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="w-5 text-sm font-bold opacity-90">11</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#A99FFF] text-xs font-bold">
                    MN
                  </div>
                  <span className="text-sm font-medium">Minh Nguyen</span>
                </div>
                <span className="text-sm font-bold">3.0k</span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-shade-white/20 px-4 py-3 border border-shade-white/30 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="w-5 text-sm font-bold opacity-90">12</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-shade-white text-primary-700 text-xs font-bold">
                    AN
                  </div>
                  <span className="text-sm font-bold">Alex Nguyen (You)</span>
                </div>
                <span className="text-sm font-bold">2.4k</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center relative z-10">
            <p className="mb-4 text-xs font-medium opacity-90 px-2 leading-relaxed">
              Compete with learners worldwide for the top spot.
            </p>
            <Button
              variant="white"
              className="w-full py-3.5 text-sm text-[#8F81FF] border-none hover:bg-shade-white/90"
            >
              View Leaderboard
            </Button>
          </div>
        </div>

        {/* Daily Quests */}
        <div className="col-span-1 flex flex-col items-center justify-between gap-8 rounded-4xl border border-neutral-100 bg-shade-white p-10 text-left md:col-span-2 md:flex-row shadow-sm hover:-translate-y-1 hover:shadow-md transition-transform">
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full max-w-[320px] rounded-[20px] overflow-hidden border border-neutral-100 shadow-sm flex items-center justify-center bg-shade-white">
              <img
                src={dailyStreakUrl}
                alt="Daily Streak Tracker"
                className="w-full object-contain scale-[1.02]"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h3 className="mb-3 text-2xl font-extrabold text-neutral-900">
              Daily Quests
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-neutral-600">
              Stay consistent with bite-sized tasks that keep your streak alive.
              Complete today's challenges to secure your progress.
            </p>
            <a
              href="#"
              className="font-bold text-primary-500 hover:text-primary-700 transition flex items-center gap-1 w-fit"
            >
              View Quests
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
