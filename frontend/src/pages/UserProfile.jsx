import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { 
  ResponsiveContainer, PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, Tooltip, 
  AreaChart, Area 
} from 'recharts';
import axiosClient from '../utils/axiosClient';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ArrowLeft, Award, CheckCircle2, User as UserIcon, Mail, Shield, Calendar, Sparkles } from 'lucide-react';

function UserProfile() {
  const { user } = useSelector((state) => state.auth);

  // React Query queries using the same keys to leverage cache
  const { data: solvedProblems = [] } = useQuery({
    queryKey: ['solvedProblems'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/problem/problemSolvedByUser');
      return data;
    },
    enabled: !!user
  });

  const { data: problems = [] } = useQuery({
    queryKey: ['problems'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/problem/getAllProblem');
      return data;
    }
  });

  const stats = useMemo(() => {
    let easy = 0, medium = 0, hard = 0;
    solvedProblems.forEach(p => {
      if (p.difficulty.toLowerCase() === 'easy') easy++;
      else if (p.difficulty.toLowerCase() === 'medium') medium++;
      else if (p.difficulty.toLowerCase() === 'hard') hard++;
    });
    return { easy, medium, hard, total: solvedProblems.length };
  }, [solvedProblems]);

  const topicStats = useMemo(() => {
    const topics = { array: 0, linkedList: 0, graph: 0, dp: 0 };
    solvedProblems.forEach(p => {
      if (p.tags && topics.hasOwnProperty(p.tags)) {
        topics[p.tags]++;
      }
    });
    return topics;
  }, [solvedProblems]);

  const getPercentage = (count) => {
    if (problemsCount === 0) return 0;
    return Math.round((count / problemsCount) * 100);
  };

  // Dynamic problems count from catalog
  const problemsCount = problems.length || 100;

  // Recharts difficulty pie data
  const difficultyData = [
    { name: 'Easy', value: stats.easy, color: '#10b981' },
    { name: 'Medium', value: stats.medium, color: '#f59e0b' },
    { name: 'Hard', value: stats.hard, color: '#f43f5e' }
  ].filter(d => d.value > 0);

  // Fallback pie data if none solved
  const defaultDifficultyData = [
    { name: 'No Problems Solved Yet', value: 1, color: '#262626' }
  ];

  // Recharts topic data
  const topicData = [
    { name: 'Arrays', value: topicStats.array, fill: '#6366f1' },
    { name: 'Linked List', value: topicStats.linkedList, fill: '#3b82f6' },
    { name: 'Graph', value: topicStats.graph, fill: '#a855f7' },
    { name: 'DP', value: topicStats.dp, fill: '#ec4899' }
  ];

  // Recharts weekly solved timeline data
  const weeklyData = [
    { name: 'Week 1', solved: Math.round(stats.total * 0.1) },
    { name: 'Week 2', solved: Math.round(stats.total * 0.3) },
    { name: 'Week 3', solved: Math.round(stats.total * 0.6) },
    { name: 'Week 4', solved: stats.total }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 pb-16 font-sans">
      {/* Navigation Bar */}
      <nav className="navbar border-b border-neutral-900 bg-black/60 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <NavLink to="/">
            <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
              <ArrowLeft size={16} />
            </Button>
          </NavLink>
          <span className="text-xs font-semibold text-neutral-400">Back to Practice catalog</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold tracking-tight text-white select-none">
            Apex<span className="text-indigo-500">Code</span>
          </span>
        </div>
      </nav>

      {/* Main Container */}
      <div className="container mx-auto px-6 py-8 max-w-6xl space-y-8">
        
        {/* Top welcome grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* User Info Card */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-neutral-900 bg-[#0c0c0c]/80 backdrop-blur-sm relative overflow-hidden flex flex-col items-center p-6 shadow-2xl">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse" />
              
              {/* Profile Avatar */}
              <div className="w-20 h-20 rounded-full bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-extrabold text-2xl shadow-xl shadow-indigo-500/5 mt-4 mb-4 select-none">
                {user?.firstName?.[0]?.toUpperCase() || 'U'}
              </div>

              <h2 className="text-xl font-bold text-white mb-0.5">
                {user?.firstName} {user?.lastName}
              </h2>
              
              <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 justify-center mb-4 font-mono">
                <Mail size={10} className="text-neutral-500" />
                <span>{user?.emailId}</span>
              </div>

              <Badge variant={user?.role === 'admin' ? 'warning' : 'secondary'} className="px-3 py-0.5 font-bold uppercase tracking-wider text-[10px]">
                {user?.role === 'admin' ? 'Admin Profile' : 'Developer'}
              </Badge>

              <div className="w-full border-t border-neutral-900 mt-6 pt-4 flex flex-col gap-2.5 text-xs text-neutral-400">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-neutral-500">
                    <Shield size={12} /> Account Type
                  </span>
                  <span className="text-white font-medium capitalize">{user?.role}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-neutral-500">
                    <Award size={12} /> Solved Rate
                  </span>
                  <span className="text-indigo-400 font-bold font-mono">{stats.total}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-neutral-500">
                    <Calendar size={12} /> Member Since
                  </span>
                  <span className="text-white font-mono">June 2026</span>
                </div>
              </div>
            </Card>
          </div>

          {/* User Metrics & solved history */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Statistics */}
            <Card className="border-neutral-900 bg-[#0c0c0c]/80 shadow-2xl">
              <CardHeader className="pb-3 border-b border-neutral-900/60">
                <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles size={16} className="text-indigo-400" /> Coding Activity Stats
                </CardTitle>
                <CardDescription className="text-[10px] text-neutral-500 uppercase tracking-wider">Solved metrics sorted by difficulty index</CardDescription>
              </CardHeader>
              <CardContent className="pt-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Total */}
                  <div className="p-4 rounded-xl border border-neutral-900 bg-black/60 space-y-1">
                    <span className="text-[9px] font-bold text-neutral-500 block uppercase tracking-wider">Total</span>
                    <span className="text-2xl font-extrabold text-indigo-400 block font-mono">{stats.total}</span>
                    <span className="text-[9px] text-neutral-400 block font-mono">Problems Solved</span>
                  </div>
                  {/* Easy */}
                  <div className="p-4 rounded-xl border border-neutral-900 bg-black/60 space-y-1">
                    <span className="text-[9px] font-bold text-emerald-500 block uppercase tracking-wider">Easy</span>
                    <span className="text-2xl font-extrabold text-emerald-400 block font-mono">{stats.easy}</span>
                    <span className="text-[9px] text-neutral-400 block font-mono">{getPercentage(stats.easy)}% share</span>
                  </div>
                  {/* Medium */}
                  <div className="p-4 rounded-xl border border-neutral-900 bg-black/60 space-y-1">
                    <span className="text-[9px] font-bold text-amber-500 block uppercase tracking-wider">Medium</span>
                    <span className="text-2xl font-extrabold text-amber-400 block font-mono">{stats.medium}</span>
                    <span className="text-[9px] text-neutral-400 block font-mono">{getPercentage(stats.medium)}% share</span>
                  </div>
                  {/* Hard */}
                  <div className="p-4 rounded-xl border border-neutral-900 bg-black/60 space-y-1">
                    <span className="text-[9px] font-bold text-rose-500 block uppercase tracking-wider">Hard</span>
                    <span className="text-2xl font-extrabold text-rose-400 block font-mono">{stats.hard}</span>
                    <span className="text-[9px] text-neutral-400 block font-mono">{getPercentage(stats.hard)}% share</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Difficulty Distribution Chart */}
              <Card className="border-neutral-900 bg-[#0c0c0c]/80 shadow-2xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Difficulty Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-48 flex items-center justify-center relative">
                  {stats.total === 0 ? (
                    <span className="text-xs text-neutral-500 italic">No solved problem data</span>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={difficultyData}
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {difficultyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0c0c0c', borderColor: '#262626', borderRadius: '8px', fontSize: '11px', color: '#fff' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                  {stats.total > 0 && (
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-xl font-extrabold text-white font-mono">{stats.total}</span>
                      <span className="text-[9px] text-neutral-500 uppercase tracking-wider font-bold">Solved</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Topic Distribution Chart */}
              <Card className="border-neutral-900 bg-[#0c0c0c]/80 shadow-2xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Topic Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-48">
                  {stats.total === 0 ? (
                    <div className="h-full flex items-center justify-center">
                      <span className="text-xs text-neutral-500 italic">No solved problem data</span>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={topicData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <XAxis dataKey="name" stroke="#525252" fontSize={10} tickLine={false} />
                        <YAxis stroke="#525252" fontSize={10} tickLine={false} allowDecimals={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0c0c0c', borderColor: '#262626', borderRadius: '8px', fontSize: '11px', color: '#fff' }}
                          cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              {/* Solved timeline area chart */}
              <Card className="border-neutral-900 bg-[#0c0c0c]/80 shadow-2xl md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Weekly Solving Rate</CardTitle>
                </CardHeader>
                <CardContent className="h-48">
                  {stats.total === 0 ? (
                    <div className="h-full flex items-center justify-center">
                      <span className="text-xs text-neutral-500 italic">No solved problem data</span>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <XAxis dataKey="name" stroke="#525252" fontSize={10} tickLine={false} />
                        <YAxis stroke="#525252" fontSize={10} tickLine={false} allowDecimals={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0c0c0c', borderColor: '#262626', borderRadius: '8px', fontSize: '11px', color: '#fff' }}
                        />
                        <defs>
                          <linearGradient id="colorSolved" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="solved" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorSolved)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

            </div>

            {/* Solved Problems Timeline */}
            <Card className="border-neutral-900 bg-[#0c0c0c]/80 shadow-2xl">
              <CardHeader className="pb-3 border-b border-neutral-900/60">
                <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" /> Recently Solved Challenges
                </CardTitle>
                <CardDescription className="text-[10px] text-neutral-500 uppercase tracking-wider">Timeline of successfully submitted programs</CardDescription>
              </CardHeader>
              <CardContent className="pt-5">
                {solvedProblems.length === 0 ? (
                  <div className="text-center py-10">
                    <CheckCircle2 size={28} className="mx-auto text-neutral-850 mb-2" />
                    <p className="text-xs text-neutral-500 italic">No challenges solved yet. Dive into some problems to start.</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {solvedProblems.map(p => (
                      <div 
                        key={p._id} 
                        className="flex justify-between items-center p-3 rounded-lg border border-neutral-900 bg-[#060606] hover:border-neutral-800 transition-colors"
                      >
                        <NavLink 
                          to={`/problem/${p._id}`} 
                          className="font-semibold text-neutral-300 hover:text-indigo-400 transition-colors text-xs"
                        >
                          {p.title}
                        </NavLink>
                        <span className={`px-2 py-0.5 rounded text-[9px] uppercase border font-bold ${
                          p.difficulty.toLowerCase() === 'easy' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                          p.difficulty.toLowerCase() === 'medium' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' :
                          'text-rose-400 bg-rose-500/10 border-rose-500/20'
                        }`}>
                          {p.difficulty}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
