import { useEffect, useState, useMemo } from 'react';
import { NavLink } from 'react-router'; 
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';
import { 
  LogOut, LayoutDashboard, User, CheckCircle2, Search, SlidersHorizontal, 
  BookOpen, BrainCircuit, Flame, Bookmark, Star, 
  ChevronLeft, ChevronRight, Trophy, Sparkles, Filter, Check
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';

const topicDbMap = {
  'Arrays': 'array',
  'Linked List': 'linkedList',
  'Graph': 'graph',
  'Dynamic Programming': 'dp',
  'Trees': 'tree',
  'Stack': 'stack',
  'Queue': 'queue',
  'Binary Search': 'binarySearch',
  'Heap': 'heap',
  'Strings': 'string'
};

const getCompaniesForProblem = (problemId) => {
  const companies = ['Amazon', 'Google', 'Microsoft', 'Apple', 'Meta', 'Adobe', 'Uber', 'Airbnb', 'Netflix'];
  let hash = 0;
  for (let i = 0; i < problemId.length; i++) {
    hash = problemId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const result = [];
  const count = (Math.abs(hash) % 3) + 1;
  for (let i = 0; i < count; i++) {
    const idx = (Math.abs(hash) + i * 7) % companies.length;
    if (!result.includes(companies[idx])) {
      result.push(companies[idx]);
    }
  }
  return result;
};

// Activity Heatmap sub-component using real user submissions
const ActivityHeatmap = ({ submissions = [] }) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-indexed
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
  const monthName = today.toLocaleString('default', { month: 'long' });

  // Map of day of the month to accepted submissions count
  const activeDaysMap = useMemo(() => {
    const map = {};
    submissions.forEach(sub => {
      if (sub.status === 'accepted') {
        const subDate = new Date(sub.createdAt);
        if (subDate.getFullYear() === currentYear && subDate.getMonth() === currentMonth) {
          const day = subDate.getDate();
          map[day] = (map[day] || 0) + 1;
        }
      }
    });
    return map;
  }, [submissions, currentYear, currentMonth]);

  const activeDaysCount = useMemo(() => Object.keys(activeDaysMap).length, [activeDaysMap]);
  
  return (
    <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-5 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Daily Activity</h4>
          <span className="text-[10px] text-neutral-500">{monthName} {currentYear}</span>
        </div>
        <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
          <Flame size={10} className="text-emerald-400 animate-pulse" />
          <span className="text-[9px] font-bold text-emerald-400">{activeDaysCount} Days Active</span>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1.5 w-full max-w-[210px] mx-auto">
        {Array.from({ length: totalDays }).map((_, i) => {
          const dayNum = i + 1;
          const count = activeDaysMap[dayNum] || 0;
          
          let colorClass = 'bg-neutral-950 hover:bg-neutral-900 border border-neutral-900';
          if (count === 1) {
            colorClass = 'bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-900/30 cursor-pointer scale-102';
          } else if (count === 2) {
            colorClass = 'bg-emerald-800/80 hover:bg-emerald-700/80 cursor-pointer scale-102';
          } else if (count >= 3) {
            colorClass = 'bg-emerald-500 hover:bg-emerald-400 shadow shadow-emerald-500/20 cursor-pointer scale-105';
          }

          return (
            <div
              key={i}
              title={`${monthName} ${dayNum}, ${currentYear}: ${count} accepted submission${count === 1 ? '' : 's'}`}
              className={`w-6 h-6 rounded-md transition-all duration-300 ${colorClass}`}
            />
          );
        })}
      </div>
      <div className="flex items-center justify-between mt-4 text-[10px] text-neutral-500">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded bg-neutral-950 border border-neutral-900" />
          <div className="w-2.5 h-2.5 rounded bg-emerald-950 border border-emerald-900" />
          <div className="w-2.5 h-2.5 rounded bg-emerald-800" />
          <div className="w-2.5 h-2.5 rounded bg-emerald-500" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  // React Query implementation for catalog, solved problems, and submissions
  const { data: problems = [], isLoading: problemsLoading } = useQuery({
    queryKey: ['problems'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/problem/getAllProblem');
      return data;
    }
  });

  const { data: solvedProblems = [], isLoading: solvedLoading, refetch: refetchSolved } = useQuery({
    queryKey: ['solvedProblems'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/problem/problemSolvedByUser');
      return data;
    },
    enabled: !!user
  });

  const { data: submissions = [], isLoading: submissionsLoading, refetch: refetchSubmissions } = useQuery({
    queryKey: ['userSubmissions'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/submission/userSubmissions');
      return data;
    },
    enabled: !!user
  });

  const loading = problemsLoading || (user && solvedLoading) || (user && submissionsLoading);

  // Search state and debouncing
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchText);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchText]);

  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    status: 'all',
    company: 'all'
  });
  
  // Bookmarks state (persisted in localStorage)
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('bookmarked_problems');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Table pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const toggleBookmark = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarkedIds(prev => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('bookmarked_problems', JSON.stringify(next));
      return next;
    });
  };

  // Reset pagination when search queries or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, filters.difficulty, filters.tag, filters.status, filters.company]);

  // Memoized filter problems
  const filteredProblems = useMemo(() => {
    return problems.filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
      
      // Difficulty filter
      const difficultyMatch = filters.difficulty === 'all' || problem.difficulty.toLowerCase() === filters.difficulty.toLowerCase();
      
      // Topic/Tag filter
      const targetTag = filters.tag === 'all' ? 'all' : (topicDbMap[filters.tag] || filters.tag.toLowerCase());
      const tagMatch = targetTag === 'all' || problem.tags.toLowerCase() === targetTag.toLowerCase();
      
      // Company filter
      const companyMatch = filters.company === 'all' || getCompaniesForProblem(problem._id).includes(filters.company);
      
      // Status filter
      const isSolved = solvedProblems.some(sp => sp._id === problem._id);
      const statusMatch = filters.status === 'all' || 
                        (filters.status === 'solved' && isSolved) || 
                        (filters.status === 'unsolved' && !isSolved) ||
                        (filters.status === 'bookmarked' && bookmarkedIds.includes(problem._id));
                        
      return matchesSearch && difficultyMatch && tagMatch && companyMatch && statusMatch;
    });
  }, [problems, solvedProblems, bookmarkedIds, debouncedSearchQuery, filters.difficulty, filters.tag, filters.status, filters.company]);

  // Paginated slices (10 items per page)
  const totalPages = useMemo(() => Math.ceil(filteredProblems.length / itemsPerPage), [filteredProblems.length]);
  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [filteredProblems, currentPage]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'medium': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'hard': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default: return 'text-neutral-400 bg-neutral-500/10 border-neutral-500/20';
    }
  };

  // Stats calculation
  const stats = useMemo(() => {
    return {
      easy: solvedProblems.filter(p => p.difficulty.toLowerCase() === 'easy').length,
      medium: solvedProblems.filter(p => p.difficulty.toLowerCase() === 'medium').length,
      hard: solvedProblems.filter(p => p.difficulty.toLowerCase() === 'hard').length,
      total: solvedProblems.length
    };
  }, [solvedProblems]);

  const getPercentage = (count) => {
    if (problems.length === 0) return 0;
    return Math.round((count / problems.length) * 100);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 pb-16 font-sans">
      {/* Top Navbar */}
      <nav className="navbar border-b border-neutral-900 bg-black/60 backdrop-blur-md sticky top-0 z-50 px-6 md:px-12 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <BrainCircuit className="h-6 w-6 text-indigo-500" />
          <NavLink to="/" className="text-lg font-bold tracking-tight text-white cursor-pointer select-none">
            Apex<span className="text-indigo-500">Code</span>
          </NavLink>
        </div>
        
        <div className="flex items-center gap-4">
          <NavLink to="/profile">
            <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white flex items-center gap-2">
              <Trophy size={14} className="text-amber-400" /> Dashboard
            </Button>
          </NavLink>
          
          <div className="dropdown dropdown-end relative group">
            <div 
              tabIndex={0} 
              className="flex items-center gap-2 cursor-pointer p-1 rounded-full border border-neutral-900 hover:border-indigo-500/50 bg-[#0c0c0c] transition-colors select-none"
            >
              <div className="w-7 h-7 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs">
                {user?.firstName?.[0]?.toUpperCase() || 'U'}
              </div>
            </div>
            {/* Dropdown Menu */}
            <ul 
              tabIndex={0} 
              className="absolute right-0 mt-2 p-2 shadow-2xl bg-[#0c0c0c] border border-neutral-900 rounded-xl w-56 gap-1 hidden group-focus-within:block group-hover:block animate-in fade-in slide-in-from-top-2 duration-150"
            >
              <li className="px-3 py-2 border-b border-neutral-900 mb-1">
                <span className="font-bold text-white text-xs block truncate">{user?.firstName} {user?.lastName}</span>
                <span className="text-[10px] text-neutral-500 block truncate">{user?.emailId}</span>
              </li>
              <li>
                <NavLink 
                  to="/profile" 
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
                >
                  <User size={14} /> My Profile
                </NavLink>
              </li>
              {user?.role === 'admin' && (
                <li>
                  <NavLink 
                    to="/admin" 
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
                  >
                    <LayoutDashboard size={14} /> Admin Panel
                  </NavLink>
                </li>
              )}
              <li className="mt-1 border-t border-neutral-900 pt-1">
                <button 
                  onClick={handleLogout} 
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-left cursor-pointer"
                >
                  <LogOut size={14} /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="container mx-auto px-6 md:px-12 py-8 max-w-7xl space-y-8">
        
        {/* Hero Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Welcome Banner Card */}
          <div className="lg:col-span-2 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#0c0c0c] via-[#080808] to-black border border-neutral-900 relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[200px]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-3 relative z-10 max-w-xl">
              <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full w-max text-xs text-indigo-400 font-bold">
                <Sparkles size={12} className="animate-spin" />
                <span>Premium Coding Workspace</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Evaluate logic, optimize algorithm, and track growth.
              </h1>
              <p className="text-xs text-neutral-400 max-w-md">
                Solve coding puzzles, consult editorial steps, run test-cases in Monaco Editor, and check memory constraints.
              </p>
            </div>
            
            {/* Progress Rings/Bars */}
            <div className="mt-6 flex flex-wrap gap-6 items-center border-t border-neutral-900/60 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-indigo-500/20 flex items-center justify-center font-bold text-xs text-indigo-400 bg-indigo-500/5">
                  {getPercentage(stats.total)}%
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-bold">Overall progress</span>
                  <span className="text-xs text-white font-bold">{stats.total} / {problems.length} Solved</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-900">
                <Flame className="text-amber-500 animate-bounce" size={14} />
                <span className="text-[10px] text-neutral-400 font-medium">Streak: <b className="text-white">5 days</b></span>
              </div>
              <div className="flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-900">
                <Trophy className="text-yellow-500" size={14} />
                <span className="text-[10px] text-neutral-400 font-medium">Rank: <b className="text-white">#1,452</b></span>
              </div>
            </div>
          </div>

          {/* Daily Activity calendar */}
          <div className="lg:col-span-1">
            <ActivityHeatmap submissions={submissions} />
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-neutral-900 bg-[#0c0c0c] shadow-lg hover:border-neutral-800 transition-colors">
            <CardContent className="p-4 flex flex-col justify-between space-y-1">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Total Solved</span>
              <span className="text-2xl font-extrabold text-indigo-400">{stats.total}</span>
              <span className="text-[9px] text-neutral-400">{problems.length} Available</span>
            </CardContent>
          </Card>
          <Card className="border-neutral-900 bg-[#0c0c0c] shadow-lg hover:border-neutral-800 transition-colors">
            <CardContent className="p-4 flex flex-col justify-between space-y-1">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Easy solved</span>
              <span className="text-2xl font-extrabold text-emerald-400">{stats.easy}</span>
              <span className="text-[9px] text-neutral-400">{problems.filter(p=>p.difficulty.toLowerCase()==='easy').length} Available</span>
            </CardContent>
          </Card>
          <Card className="border-neutral-900 bg-[#0c0c0c] shadow-lg hover:border-neutral-800 transition-colors">
            <CardContent className="p-4 flex flex-col justify-between space-y-1">
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Medium solved</span>
              <span className="text-2xl font-extrabold text-amber-400">{stats.medium}</span>
              <span className="text-[9px] text-neutral-400">{problems.filter(p=>p.difficulty.toLowerCase()==='medium').length} Available</span>
            </CardContent>
          </Card>
          <Card className="border-neutral-900 bg-[#0c0c0c] shadow-lg hover:border-neutral-800 transition-colors">
            <CardContent className="p-4 flex flex-col justify-between space-y-1">
              <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">Hard solved</span>
              <span className="text-2xl font-extrabold text-rose-400">{stats.hard}</span>
              <span className="text-[9px] text-neutral-400">{problems.filter(p=>p.difficulty.toLowerCase()==='hard').length} Available</span>
            </CardContent>
          </Card>
        </div>

        {/* Topics badges section */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1 text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
            <Filter size={10} className="text-indigo-400" /> Popular Topics
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'All Topics', val: 'all', count: problems.length },
              { name: 'Arrays', val: 'Arrays', count: 158 },
              { name: 'Strings', val: 'Strings', count: 56 },
              { name: 'Linked List', val: 'Linked List', count: 52 },
              { name: 'Trees', val: 'Trees', count: 90 },
              { name: 'Graph', val: 'Graph', count: 52 },
              { name: 'Dynamic Programming', val: 'Dynamic Programming', count: 66 },
              { name: 'Heap', val: 'Heap', count: 24 },
              { name: 'Stack', val: 'Stack', count: 66 },
              { name: 'Queue', val: 'Queue', count: 30 },
              { name: 'Binary Search', val: 'Binary Search', count: 45 }
            ].map((topic) => (
              <button
                key={topic.name}
                onClick={() => setFilters(prev => ({ ...prev, tag: topic.val }))}
                className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 cursor-pointer select-none font-medium ${
                  filters.tag === topic.val
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow shadow-indigo-600/25 scale-105'
                    : 'bg-[#0c0c0c] border-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                {topic.name} <span className="opacity-45 text-[10px] ml-1">({topic.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Companies badges section */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1 text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
            <Star size={10} className="text-yellow-500" /> Popular Companies
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'All Companies', val: 'all', count: problems.length },
              { name: 'Amazon', val: 'Amazon', count: 183 },
              { name: 'Google', val: 'Google', count: 97 },
              { name: 'Microsoft', val: 'Microsoft', count: 155 },
              { name: 'Apple', val: 'Apple', count: 72 },
              { name: 'Meta', val: 'Meta', count: 66 },
              { name: 'Adobe', val: 'Adobe', count: 91 },
              { name: 'Uber', val: 'Uber', count: 40 },
              { name: 'Airbnb', val: 'Airbnb', count: 63 },
              { name: 'Netflix', val: 'Netflix', count: 25 }
            ].map((company) => (
              <button
                key={company.name}
                onClick={() => setFilters(prev => ({ ...prev, company: company.val }))}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-all duration-200 cursor-pointer select-none font-medium ${
                  filters.company === company.val
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow shadow-indigo-600/25'
                    : 'bg-[#0c0c0c] border-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                {company.name} <span className="opacity-45 text-[10px] ml-1">({company.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter deck & Search Deck */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#0c0c0c] border border-neutral-900 p-4 rounded-xl shadow-lg">
          {/* Search */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <Input
              type="text"
              placeholder="Search problems by name..."
              className="pl-10 h-10 w-full bg-neutral-950 border-neutral-900 text-neutral-200 placeholder-neutral-500 focus-visible:ring-indigo-600"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          {/* Select dropdown filters */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto items-center justify-end">
            {/* Status Select */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider hidden sm:inline">Status</span>
              <select
                className="bg-neutral-950 border border-neutral-900 rounded-lg text-xs py-2 px-3 text-neutral-300 focus:outline-none focus:border-indigo-600"
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="all">All Status</option>
                <option value="solved">Solved</option>
                <option value="unsolved">Unsolved</option>
                <option value="bookmarked">Bookmarked</option>
              </select>
            </div>

            {/* Difficulty Select */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider hidden sm:inline">Difficulty</span>
              <select
                className="bg-neutral-950 border border-neutral-900 rounded-lg text-xs py-2 px-3 text-neutral-300 focus:outline-none focus:border-indigo-600"
                value={filters.difficulty}
                onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
              >
                <option value="all">All Diff</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 text-xs border-neutral-900 text-neutral-400 hover:text-white"
              onClick={() => {
                setSearchText('');
                setFilters({ difficulty: 'all', tag: 'all', status: 'all', company: 'all' });
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Problems catalog table */}
        <div className="space-y-4">
          <div className="overflow-x-auto border border-neutral-900 rounded-xl bg-black/40">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <span className="loading loading-spinner loading-lg text-indigo-500"></span>
                <span className="text-xs text-neutral-500">Retrieving coding challenges...</span>
              </div>
            ) : paginatedProblems.length === 0 ? (
              <div className="text-center py-20 bg-neutral-950/20">
                <BookOpen size={40} className="mx-auto text-neutral-700 mb-3" />
                <h3 className="text-lg font-bold text-neutral-400">No challenges match filters</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">Try clearing tags, reset search filters, or toggle solved status indices.</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-neutral-900 text-left text-xs text-neutral-300">
                <thead className="bg-[#0c0c0c] text-neutral-500 text-[10px] uppercase font-bold tracking-wider select-none">
                  <tr>
                    <th className="px-6 py-4 w-16 text-center">Status</th>
                    <th className="px-4 py-4 w-12 text-center">#</th>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4 w-28">Acceptance</th>
                    <th className="px-6 py-4 w-28">Difficulty</th>
                    <th className="px-6 py-4 w-16 text-center">Bookmark</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900/40">
                  <AnimatePresence mode="popLayout">
                    {paginatedProblems.map((problem, idx) => {
                      const isSolved = solvedProblems.some(sp => sp._id === problem._id);
                      const isBookmarked = bookmarkedIds.includes(problem._id);
                      const displayIdx = (currentPage - 1) * itemsPerPage + idx + 1;
                      
                      return (
                        <motion.tr 
                          key={problem._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.15 }}
                          className="hover:bg-neutral-900/30 transition-all cursor-pointer group"
                        >
                          {/* Status */}
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <NavLink to={`/problem/${problem._id}`} className="inline-block">
                              {isSolved ? (
                                <CheckCircle2 size={16} className="text-emerald-400 mx-auto" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-neutral-800 group-hover:border-neutral-600 mx-auto" />
                              )}
                            </NavLink>
                          </td>

                          {/* Index */}
                          <td className="px-4 py-4 whitespace-nowrap text-center font-mono text-neutral-500">
                            {displayIdx}
                          </td>

                          {/* Title */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <NavLink 
                              to={`/problem/${problem._id}`}
                              className="font-semibold text-neutral-200 group-hover:text-indigo-400 transition-colors text-sm"
                            >
                              {problem.title}
                            </NavLink>
                            <div className="flex gap-1.5 mt-1">
                              <span className="text-[10px] text-neutral-500 capitalize">{problem.tags === 'linkedList' ? 'Linked List' : problem.tags}</span>
                              {getCompaniesForProblem(problem._id).slice(0, 2).map(c => (
                                <span key={c} className="text-[9px] text-indigo-400/80 bg-indigo-500/5 px-1 rounded">{c}</span>
                              ))}
                            </div>
                          </td>

                          {/* Acceptance */}
                          <td className="px-6 py-4 whitespace-nowrap font-mono text-neutral-400">
                            {(54.2 + (displayIdx % 30) * 1.3).toFixed(1)}%
                          </td>

                          {/* Difficulty */}
                          <td className="px-6 py-4 whitespace-nowrap font-bold">
                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase border ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </span>
                          </td>

                          {/* Bookmark */}
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <button
                              onClick={(e) => toggleBookmark(problem._id, e)}
                              className={`p-1.5 rounded hover:bg-neutral-900 transition-all ${
                                isBookmarked ? 'text-indigo-400' : 'text-neutral-600 hover:text-neutral-400'
                              }`}
                            >
                              <Bookmark size={14} className={isBookmarked ? 'fill-indigo-500/10' : ''} />
                            </button>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-2 text-xs text-neutral-500 select-none">
              <span>Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredProblems.length)} of {filteredProblems.length} problems</span>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-neutral-900 bg-[#0c0c0c] text-neutral-400 hover:text-white"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={14} />
                </Button>
                
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pg = i + 1;
                  return (
                    <Button
                      key={pg}
                      variant={currentPage === pg ? 'default' : 'outline'}
                      size="sm"
                      className={`h-8 w-8 text-xs font-bold ${
                        currentPage === pg 
                          ? 'bg-indigo-600 text-white' 
                          : 'border-neutral-900 bg-[#0c0c0c] text-neutral-400 hover:text-white'
                      }`}
                      onClick={() => setCurrentPage(pg)}
                    >
                      {pg}
                    </Button>
                  );
                })}

                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-neutral-900 bg-[#0c0c0c] text-neutral-400 hover:text-white"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight size={14} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;