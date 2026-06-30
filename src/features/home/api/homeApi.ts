export interface DashboardData {
  resumeLesson: {
    lastCompleted: string;
    currentlyLearning: string;
  };
  roadmap: {
    id: string;
    title: string;
    status: 'done' | 'current' | 'locked';
  }[];
  dailyQuests: {
    id: string;
    title: string;
    current: number;
    target: number;
    isCompleted: boolean;
  }[];
  aiReview: {
    topic: string;
    suggestion: string;
  };
  leaderboard: {
    rank: number;
    name: string;
    points: string;
    isCurrentUser?: boolean;
  }[];
  streak: {
    current: number;
    pointsThisWeek: string;
    history: { date: string; status: 'completed' | 'pending' }[];
  };
}

export const homeApi = {
  getDashboardData: async (): Promise<DashboardData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          resumeLesson: {
            lastCompleted: 'Array',
            currentlyLearning: 'List',
          },
          roadmap: [
            { id: '1', title: 'Loop', status: 'done' },
            { id: '2', title: 'Function', status: 'current' },
            { id: '3', title: 'Array', status: 'locked' },
            { id: '4', title: 'Pointer', status: 'locked' },
          ],
          dailyQuests: [
            {
              id: 'q1',
              title: 'Answer 20 Code Cards',
              current: 15,
              target: 20,
              isCompleted: false,
            },
            {
              id: 'q2',
              title: 'Complete 1 Challenge',
              current: 0,
              target: 1,
              isCompleted: false,
            },
            {
              id: 'q3',
              title: 'Earn 50 XP today',
              current: 25,
              target: 50,
              isCompleted: false,
            },
          ],
          aiReview: {
            topic: 'Arrays',
            suggestion:
              "The AI-Tutor noticed you're often confused about Arrays in recent Code Swipes. You should read the theory of Array again and practice with CodeRush.",
          },
          leaderboard: [
            { rank: 11, name: 'Minh Nguyen', points: '3.0k' },
            {
              rank: 12,
              name: 'Alex Nguyen (You)',
              points: '2.4k',
              isCurrentUser: true,
            },
          ],
          streak: {
            current: 4,
            pointsThisWeek: '2,450 XP',
            history: [
              { date: '21/5', status: 'completed' },
              { date: '22/5', status: 'completed' },
              { date: '23/5', status: 'completed' },
              { date: '24/5', status: 'pending' },
              { date: '26/5', status: 'pending' },
              { date: '27/5', status: 'pending' },
              { date: '28/5', status: 'pending' },
            ],
          },
        });
      }, 500);
    });
  },
};
