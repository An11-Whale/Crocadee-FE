import { useEffect, useState } from 'react';
import { homeApi } from '../api/homeApi';
import type { DashboardData } from '../api/homeApi';
import { Button } from '../../../components/button';

import profileIcon from '../../../assets/icon/navbar-profile.svg';
import fireIcon from '../../../assets/icon/home-fire.svg';
import tickIcon from '../../../assets/icon/home-tick.svg';
import playIcon from '../../../assets/icon/home-play.svg';
import lockIcon from '../../../assets/icon/home-lock.svg';
import cupIcon from '../../../assets/icon/home-cup.svg';
import leaderboardIcon from '../../../assets/icon/home-leaderboard.svg';
import robotIcon from '../../../assets/icon/home-robot.svg';

/* ==========================================================================
   1. SUB-COMPONENT: RESUME BANNER
   ========================================================================== */
interface ResumeBannerProps {
  resumeLesson: DashboardData['resumeLesson'];
}
function ResumeBanner({ resumeLesson }: ResumeBannerProps) {
  return (
    <div className="mb-4 flex flex-col items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-shade-white px-6 py-4 shadow-sm md:flex-row">
      <p className="text-[16px] font-medium leading-relaxed text-neutral-900">
        You've finish your{' '}
        <span className="font-bold">{resumeLesson.lastCompleted}</span> lessons,
        and currently learning how{' '}
        <span className="font-bold">{resumeLesson.currentlyLearning}</span>{' '}
        work.
      </p>
      <div className="flex items-center gap-3">
        <Button className="px-5 py-2.5 text-sm">Resume session</Button>
        <Button variant="secondary" className="px-5 py-2.5 text-sm">
          To Challenge
        </Button>
      </div>
    </div>
  );
}

/* ==========================================================================
   2. SUB-COMPONENT: LEARNING ROADMAP
   ========================================================================== */
interface LearningRoadmapProps {
  roadmap: DashboardData['roadmap'];
}
function LearningRoadmap({ roadmap }: LearningRoadmapProps) {
  const currentLessonIndex = roadmap.findIndex(
    (node) => node.status === 'current'
  );
  const roadmapProgressWidth =
    roadmap.length > 1 ? (currentLessonIndex / (roadmap.length - 1)) * 100 : 0;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-shade-white p-5 shadow-sm lg:col-span-2">
      <h2 className="text-[20px] font-bold text-primary-900">
        Learning Roadmap
      </h2>

      <div className="relative mt-auto mb-2 px-2 sm:px-4">
        <div className="relative flex justify-between">
          <div className="absolute left-7 right-7 top-7 z-0 h-1.5 -translate-y-1/2 rounded-full bg-neutral-200"></div>

          <div
            className="absolute left-7 top-7 z-0 h-1.5 -translate-y-1/2 rounded-full bg-primary-500 transition-all duration-1000 ease-out"
            style={{ width: `${String(roadmapProgressWidth)}%` }}
          ></div>

          {roadmap.map((node) => (
            <div
              key={node.id}
              className="relative z-10 flex w-14 flex-col items-start"
            >
              <div
                className={`mb-3 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                  node.status === 'done'
                    ? 'border-primary-500 bg-primary-500'
                    : node.status === 'current'
                      ? 'border-primary-500 bg-shade-white ring-[5px] ring-primary-100'
                      : 'border-neutral-200 bg-[#F4F4F5]'
                }`}
              >
                {node.status === 'done' && (
                  <img src={tickIcon} alt="Done" className="h-6 w-6" />
                )}
                {node.status === 'current' && (
                  <img src={playIcon} alt="Play" className="ml-1 h-5 w-5" />
                )}
                {node.status === 'locked' && (
                  <img
                    src={lockIcon}
                    alt="Lock"
                    className="h-5 w-5 opacity-50"
                  />
                )}
              </div>

              <span className="whitespace-nowrap text-[16px] font-semibold text-neutral-800">
                {node.title}
              </span>
              <span
                className={`mt-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide ${
                  node.status === 'done'
                    ? 'bg-neutral-200 text-neutral-600'
                    : node.status === 'current'
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-neutral-200 text-neutral-500'
                }`}
              >
                {node.status.charAt(0).toUpperCase() + node.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   3. SUB-COMPONENT: DAILY QUESTS
   ========================================================================== */
interface DailyQuestsProps {
  dailyQuests: DashboardData['dailyQuests'];
}
function DailyQuests({ dailyQuests }: DailyQuestsProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-shade-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[20px] font-bold text-primary-900">Daily Quests</h2>
        <img src={cupIcon} alt="Trophy" className="h-6 w-6" />
      </div>
      <div className="flex flex-1 flex-col justify-between space-y-3">
        {dailyQuests.map((quest) => (
          <div key={quest.id}>
            <div className="mb-1.5 flex items-center justify-between text-[14px] font-medium">
              <span className="text-neutral-700">{quest.title}</span>
              <span className="text-neutral-500">
                {quest.current}/{quest.target}
              </span>
            </div>
            <div className="h-1.25 w-full overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full rounded-full bg-primary-500 transition-all duration-700"
                style={{
                  width: `${String((quest.current / quest.target) * 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   4. SUB-COMPONENT: AI TARGETED REVIEW
   ========================================================================== */
interface AiTargetedReviewProps {
  aiReview: DashboardData['aiReview'];
}
function AiTargetedReview({ aiReview }: AiTargetedReviewProps) {
  return (
    <div className="flex h-full flex-col  rounded-2xl border border-neutral-200 bg-shade-white p-5 shadow-sm">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-500">
            <img src={robotIcon} alt="AI Tutor" className="h-5 w-5" />
          </div>
          <h2 className="text-[17px] font-bold uppercase tracking-wide text-primary-900">
            AI Targeted Review
          </h2>
        </div>
        <p className="mt-3 text-[14px] leading-relaxed text-neutral-600 line-clamp-3">
          {aiReview.suggestion}
        </p>
      </div>
      <Button className="mt-auto w-full py-2 text-sm sm:w-1/2 sm:self-end">
        To CodeRush
      </Button>
    </div>
  );
}

/* ==========================================================================
   5. SUB-COMPONENT: WEEKLY LEADERBOARD
   ========================================================================== */
interface WeeklyLeaderboardProps {
  leaderboard: DashboardData['leaderboard'];
}
function WeeklyLeaderboard({ leaderboard }: WeeklyLeaderboardProps) {
  return (
    <div className="flex h-full flex-col  rounded-2xl border border-neutral-200 bg-shade-white p-5 shadow-sm">
      <div>
        <div className="mb-4 flex items-center gap-3">
          <img src={leaderboardIcon} alt="Chart" className="h-5 w-5" />
          <h2 className="text-[18px] font-bold text-primary-900">
            Weekly Leaderboard
          </h2>
        </div>
        <div className="space-y-2">
          {leaderboard.map((user) => (
            <div
              key={user.rank}
              className={`flex items-center justify-between rounded-xl px-3 py-2 ${user.isCurrentUser ? 'border border-primary-300 bg-primary-100' : ''}`}
            >
              <div className="flex items-center gap-2">
                <span className="w-5 text-center text-sm font-bold text-neutral-800">
                  {user.rank}
                </span>
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100">
                  <img src={profileIcon} alt="Avatar" className="h-3.5 w-3.5" />
                </div>
                <span
                  className={`text-sm font-semibold ${user.isCurrentUser ? 'text-neutral-900' : 'text-neutral-600'}`}
                >
                  {user.name}
                </span>
              </div>
              <span className="text-sm font-bold text-neutral-800">
                {user.points}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Button className="mt-auto w-full py-2 text-sm">View full</Button>
    </div>
  );
}

/* ==========================================================================
   6. SUB-COMPONENT: DAILY STREAK
   ========================================================================== */
interface DailyStreakProps {
  streak: DashboardData['streak'];
}
function DailyStreak({ streak }: DailyStreakProps) {
  return (
    <div className="flex h-full flex-col  rounded-2xl border border-neutral-200 bg-shade-white p-5 shadow-sm">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-primary-900">
            Daily Streak
          </h2>
          <img src={fireIcon} alt="Fire" className="h-5 w-5" />
        </div>

        <div className="flex justify-between">
          {streak.history.map((day) => (
            <div key={day.date} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-medium text-neutral-500">
                {day.date}
              </span>
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] ${
                  day.status === 'completed'
                    ? 'border-primary-900 bg-primary-900'
                    : 'border-dashed border-neutral-300 bg-shade-white text-neutral-400'
                }`}
              >
                {day.status === 'completed' ? (
                  <img src={tickIcon} alt="tick" className="h-3 w-3" />
                ) : (
                  <span className="text-[10px] font-bold">?</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[13px] text-neutral-600">
          Finish today's challenge to secure your{' '}
          <span className="font-bold text-primary-900">
            {streak.current}-day streak!
          </span>
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-3">
        <span className="text-[13px] font-medium text-neutral-500">
          Points this week
        </span>
        <span className="text-[20px] font-bold text-primary-900">
          {streak.pointsThisWeek}
        </span>
      </div>
    </div>
  );
}

/* ==========================================================================
   MAIN COMPONENT: HOME PAGE
   ========================================================================== */
export function HomePage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await homeApi.getDashboardData();
        setData(response);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchHomeData();
  }, []);

  if (isLoading || !data) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-bg-default">
        <div className="text-lg font-medium text-primary-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-80px)] bg-bg-default overflow-hidden">
      <div className="mx-auto flex h-full max-w-300 flex-col p-4 font-sans text-neutral-900">
        <div className="shrink-0">
          <ResumeBanner resumeLesson={data.resumeLesson} />
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-4">
          <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
            <LearningRoadmap roadmap={data.roadmap} />
            <DailyQuests dailyQuests={data.dailyQuests} />
          </div>

          <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
            <AiTargetedReview aiReview={data.aiReview} />
            <WeeklyLeaderboard leaderboard={data.leaderboard} />
            <DailyStreak streak={data.streak} />
          </div>
        </div>
      </div>
    </div>
  );
}
