import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, Star } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useCodeBiteStore } from '../store/useCodeBiteStore';
export const Route = createFileRoute('/challenge/')({
  component: ChallengeSelectionComponent,
});
interface Challenge {
  id: string;
  number: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xp: number;
  status: 'MASTERED' | 'IN QUEST' | 'UNSOLVED';
}
const mockChallenges: Record<string, Challenge[]> = {
  'Chapter 1': [
    {
      id: '11',
      number: '#011',
      title: 'Variables declaration',
      difficulty: 'Easy',
      xp: 40,
      status: 'MASTERED',
    },
    {
      id: '12',
      number: '#012',
      title: 'Data Types sizes',
      difficulty: 'Easy',
      xp: 50,
      status: 'MASTERED',
    },
  ],
  'Chapter 2': [
    {
      id: '21',
      number: '#021',
      title: 'Conditional statements',
      difficulty: 'Easy',
      xp: 60,
      status: 'MASTERED',
    },
    {
      id: '22',
      number: '#022',
      title: 'Switch case syntax',
      difficulty: 'Medium',
      xp: 120,
      status: 'MASTERED',
    },
  ],
  'Chapter 3': [
    {
      id: '31',
      number: '#031',
      title: 'For loops parameters',
      difficulty: 'Easy',
      xp: 60,
      status: 'MASTERED',
    },
    {
      id: '32',
      number: '#032',
      title: 'While vs Do-While',
      difficulty: 'Medium',
      xp: 130,
      status: 'MASTERED',
    },
  ],
  'Chapter 4': [
    {
      id: '41',
      number: '#041',
      title: 'Accessing Array Elements',
      difficulty: 'Easy',
      xp: 50,
      status: 'MASTERED',
    },
    {
      id: '42',
      number: '#042',
      title: 'Managing the Inventory',
      difficulty: 'Easy',
      xp: 70,
      status: 'MASTERED',
    },
    {
      id: '43',
      number: '#043',
      title: 'Finding the High Score',
      difficulty: 'Medium',
      xp: 150,
      status: 'IN QUEST',
    },
    {
      id: '44',
      number: '#044',
      title: 'The Data Sifter',
      difficulty: 'Hard',
      xp: 400,
      status: 'UNSOLVED',
    },
  ],
  'Chapter 5': [
    {
      id: '51',
      number: '#051',
      title: 'Pointer References',
      difficulty: 'Medium',
      xp: 180,
      status: 'UNSOLVED',
    },
    {
      id: '52',
      number: '#052',
      title: 'Memory Allocation',
      difficulty: 'Hard',
      xp: 450,
      status: 'UNSOLVED',
    },
  ],
};
function ChallengeSelectionComponent() {
  const navigate = useNavigate();
  const { showToast } = useCodeBiteStore();
  const [activeChapter, setActiveChapter] = useState('Chapter 4');
  const [difficultyTab, setDifficultyTab] = useState<
    'All' | 'Easy' | 'Medium' | 'Hard'
  >('All');

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const challenges = mockChallenges[activeChapter] ?? [];
  const handleChallengeClick = (challenge: Challenge) => {
    showToast(`Launching ${challenge.title}...`);
    void navigate({
      to: '/challenge/$id',
      params: { id: challenge.id },
    });
  };
  const filteredChallenges = challenges
    .filter((c) => {
      const matchesSearch = c.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesTab =
        difficultyTab === 'All' || c.difficulty === difficultyTab;
      const matchesFilterDiff =
        !filterDifficulty || c.difficulty === filterDifficulty;
      const matchesFilterStatus = !filterStatus || c.status === filterStatus;
      return (
        matchesSearch && matchesTab && matchesFilterDiff && matchesFilterStatus
      );
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  const toggleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    showToast(
      `Sorted by title ${sortOrder === 'asc' ? 'descending' : 'ascending'}`
    );
  };
  return (
    <div className="flex-1 flex bg-[#F6F4FF] dark:bg-dark-bg min-h-[90vh]">
      {/* Sidebar chapters */}
      <aside className="w-64 bg-white dark:bg-dark-sidebar border-r border-[#EAE6FF] dark:border-dark-border p-6 flex flex-col gap-6 shrink-0">
        <h2 className="text-2xl font-black text-[#6C63FF] tracking-tight">
          CodeBite
        </h2>

        <nav className="flex flex-col gap-2">
          {Object.keys(mockChallenges).map((chapter) => {
            const isActive = chapter === activeChapter;
            return (
              <button
                key={chapter}
                onClick={() => {
                  setActiveChapter(chapter);
                  setShowFilterDropdown(false);
                }}
                className={`w-full text-left px-5 py-3.5 rounded-2xl font-bold text-sm transition relative flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-[#E8E3FF] text-[#6C63FF]'
                    : 'text-neutral-500 hover:bg-[#F6F4FF] hover:text-[#6C63FF]'
                }`}
              >
                <span>{chapter}</span>
                {isActive && (
                  <span className="absolute right-0 top-3.5 w-1.5 h-6 bg-[#6C63FF] rounded-l-md" />
                )}
              </button>
            );
          })}
        </nav>
      </aside>
      {/* Main challenges list area */}
      <main className="flex-1 p-8 flex flex-col gap-6">
        {/* Difficulty pills tab bar */}
        <div className="flex items-center gap-6 bg-white dark:bg-dark-sidebar p-3 rounded-2xl shadow-xs border border-[#EAE6FF] dark:border-dark-border">
          <button
            onClick={() => {
              setDifficultyTab('All');
            }}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition cursor-pointer ${
              difficultyTab === 'All'
                ? 'bg-[#E8E3FF] text-[#6C63FF]'
                : 'text-neutral-500 hover:bg-neutral-50'
            }`}
          >
            All
          </button>

          <button
            onClick={() => {
              setDifficultyTab('Easy');
            }}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition cursor-pointer ${
              difficultyTab === 'Easy'
                ? 'bg-[#E8E3FF] text-[#24D3B5]'
                : 'text-neutral-500 hover:bg-neutral-50 hover:text-[#24D3B5]'
            }`}
          >
            Easy
          </button>

          <button
            onClick={() => {
              setDifficultyTab('Medium');
            }}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition cursor-pointer ${
              difficultyTab === 'Medium'
                ? 'bg-[#E8E3FF] text-[#FF8A1F]'
                : 'text-neutral-500 hover:bg-neutral-50 hover:text-[#FF8A1F]'
            }`}
          >
            Medium
          </button>

          <button
            onClick={() => {
              setDifficultyTab('Hard');
            }}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition cursor-pointer ${
              difficultyTab === 'Hard'
                ? 'bg-[#E8E3FF] text-[#F03D3E]'
                : 'text-neutral-500 hover:bg-neutral-50 hover:text-[#F03D3E]'
            }`}
          >
            Hard
          </button>
        </div>
        {/* Controls row: Search, Sort, Filter */}
        <div className="flex items-center gap-4 relative">
          <div className="flex-1 bg-white dark:bg-dark-sidebar border border-[#EAE6FF] dark:border-dark-border rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-xs">
            <Search className="w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search challenges..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              className="bg-transparent border-none outline-none text-sm w-full text-neutral-800 dark:text-white"
            />
          </div>
          <button
            onClick={toggleSort}
            className="p-3.5 bg-white dark:bg-dark-sidebar border border-[#EAE6FF] dark:border-dark-border rounded-2xl text-neutral-500 hover:text-[#6C63FF] hover:bg-[#F6F4FF] transition shadow-xs cursor-pointer"
            title="Sort by Title"
          >
            <ArrowUpDown className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setShowFilterDropdown(!showFilterDropdown);
            }}
            className={`p-3.5 bg-white dark:bg-dark-sidebar border rounded-2xl transition shadow-xs cursor-pointer ${
              showFilterDropdown || filterDifficulty || filterStatus
                ? 'border-[#6C63FF] text-[#6C63FF] bg-[#E8E3FF]'
                : 'border-[#EAE6FF] dark:border-dark-border text-neutral-500 hover:text-[#6C63FF] hover:bg-[#F6F4FF]'
            }`}
            title="Filter options"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
          {/* Filter Dropdown Menu */}
          {showFilterDropdown && (
            <div className="absolute right-0 top-16 w-52 bg-white dark:bg-dark-sidebar border border-[#EAE6FF] dark:border-dark-border rounded-2xl shadow-xl p-4 flex flex-col gap-4 z-20 animate-fade-in">
              <div>
                <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                  Difficulty
                </h4>
                <div className="flex flex-col gap-1.5 text-xs font-semibold">
                  <button
                    onClick={() => {
                      setFilterDifficulty(
                        filterDifficulty === 'Easy' ? null : 'Easy'
                      );
                    }}
                    className={`text-left p-1.5 rounded-lg transition cursor-pointer ${filterDifficulty === 'Easy' ? 'bg-[#EAE6FF] text-[#24D3B5]' : 'text-neutral-500 hover:bg-neutral-50'}`}
                  >
                    Easy
                  </button>
                  <button
                    onClick={() => {
                      setFilterDifficulty(
                        filterDifficulty === 'Medium' ? null : 'Medium'
                      );
                    }}
                    className={`text-left p-1.5 rounded-lg transition cursor-pointer ${filterDifficulty === 'Medium' ? 'bg-[#EAE6FF] text-[#FF8A1F]' : 'text-neutral-500 hover:bg-neutral-50'}`}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => {
                      setFilterDifficulty(
                        filterDifficulty === 'Hard' ? null : 'Hard'
                      );
                    }}
                    className={`text-left p-1.5 rounded-lg transition cursor-pointer ${filterDifficulty === 'Hard' ? 'bg-[#EAE6FF] text-[#F03D3E]' : 'text-neutral-500 hover:bg-neutral-50'}`}
                  >
                    Hard
                  </button>
                </div>
              </div>
              <div className="border-t border-[#EAE6FF] dark:border-dark-border pt-3">
                <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                  Status
                </h4>
                <div className="flex flex-col gap-1.5 text-xs font-semibold">
                  <button
                    onClick={() => {
                      setFilterStatus(
                        filterStatus === 'UNSOLVED' ? null : 'UNSOLVED'
                      );
                    }}
                    className={`text-left p-1.5 rounded-lg transition cursor-pointer ${filterStatus === 'UNSOLVED' ? 'bg-[#EAE6FF] text-[#6C63FF]' : 'text-neutral-500 hover:bg-neutral-50'}`}
                  >
                    Unsolved
                  </button>
                  <button
                    onClick={() => {
                      setFilterStatus(
                        filterStatus === 'MASTERED' ? null : 'MASTERED'
                      );
                    }}
                    className={`text-left p-1.5 rounded-lg transition cursor-pointer ${filterStatus === 'MASTERED' ? 'bg-[#EAE6FF] text-[#6C63FF]' : 'text-neutral-500 hover:bg-neutral-50'}`}
                  >
                    Solved
                  </button>
                </div>
              </div>
              {(filterDifficulty !== null || filterStatus !== null) && (
                <button
                  onClick={() => {
                    setFilterDifficulty(null);
                    setFilterStatus(null);
                    setShowFilterDropdown(false);
                  }}
                  className="w-full text-center py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
        {/* Challenge list cards */}
        <div className="bg-white dark:bg-dark-sidebar rounded-3xl p-6 shadow-sm border border-[#EAE6FF] dark:border-dark-border flex flex-col gap-4 flex-1">
          {filteredChallenges.length > 0 ? (
            filteredChallenges.map((c) => {
              const diffColor =
                c.difficulty === 'Easy'
                  ? 'text-[#24D3B5]'
                  : c.difficulty === 'Medium'
                    ? 'text-[#FF8A1F]'
                    : 'text-[#F03D3E]';
              return (
                <div
                  key={c.id}
                  onClick={() => {
                    handleChallengeClick(c);
                  }}
                  className="bg-[#F6F4FF]/40 dark:bg-dark-bg/40 border border-[#EAE6FF] dark:border-dark-border rounded-2xl p-5 flex items-center justify-between hover:scale-[1.01] hover:shadow-xs transition duration-200 cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-bold text-[#6C63FF] font-mono tracking-wide w-12">
                      {c.number}
                    </span>
                    <span className="text-base font-extrabold text-[#1F1144] dark:text-white">
                      {c.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-10">
                    <span
                      className={`text-sm font-bold ${diffColor} w-16 text-left`}
                    >
                      {c.difficulty}
                    </span>
                    <span className="text-sm font-bold text-[#6C63FF] w-20 text-left">
                      +{c.xp} xp
                    </span>

                    {/* Badge / Status icon & label */}
                    <div className="flex items-center gap-2.5 w-32 justify-end">
                      {c.status === 'MASTERED' ? (
                        <>
                          <div className="w-6 h-6 rounded-lg bg-[#FFF6EA] flex items-center justify-center text-[#FF8A1F]">
                            <Star className="w-4 h-4 fill-[#FF8A1F]" />
                          </div>
                          <span className="text-xs font-extrabold text-[#FF8A1F]">
                            MASTERED !
                          </span>
                        </>
                      ) : c.status === 'IN QUEST' ? (
                        <>
                          <div className="w-6 h-6 rounded-full border-[3px] border-[#FF8A1F] border-r-transparent animate-spin-slow flex items-center justify-center" />
                          <span className="text-xs font-extrabold text-[#FF8A1F]">
                            IN QUEST
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="w-6 h-6 rounded-full border-2 border-neutral-300" />
                          <span className="text-xs font-extrabold text-neutral-300">
                            UNSTARTED
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-neutral-400 py-16">
              <SlidersHorizontal className="w-12 h-12 text-neutral-300 mb-4" />
              <p className="text-base font-bold">
                No challenges found matching filters.
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Try resetting search query or selection filters.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
