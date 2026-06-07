import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import axiosClient from '../utils/axiosClient';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, Trash2, ShieldAlert } from 'lucide-react';

const AdminDelete = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get('/problem/getAllProblem');
      setProblems(data);
    } catch (err) {
      setError('Failed to fetch problems');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this problem? This will delete all student records and submissions linked to this problem.')) return;
    
    try {
      await axiosClient.delete(`/problem/delete/${id}`);
      setProblems(problems.filter(problem => problem._id !== id));
    } catch (err) {
      setError('Failed to delete problem');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-[#020617] gap-2">
        <span className="loading loading-spinner text-indigo-500"></span>
        <span className="text-xs text-slate-400">Loading catalog...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 pb-12">
      {/* Top Navbar */}
      <nav className="navbar border-b border-slate-800 bg-[#090d16]/80 backdrop-blur-md sticky top-0 z-50 px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <NavLink to="/admin">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
              <ArrowLeft size={16} />
            </Button>
          </NavLink>
          <span className="text-sm font-semibold text-slate-300">Back to Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-white select-none">
            Apex<span className="text-indigo-500">Code</span>
          </span>
        </div>
      </nav>

      {/* Content Container */}
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6 animate-in fade-in duration-200">
        
        <div className="border-b border-slate-850 pb-4">
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <ShieldAlert size={22} className="text-rose-500" /> Delete Problems
          </h1>
          <p className="text-xs text-slate-400 mt-1">Review and remove challenge configurations from the platform catalog.</p>
        </div>

        {error && (
          <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-xs">
            <span>{error}</span>
          </div>
        )}

        <Card className="border-slate-800 bg-[#090d16]/40 overflow-hidden shadow-lg">
          <CardContent className="p-0">
            {problems.length === 0 ? (
              <div className="text-center py-12 text-slate-500 italic text-sm">
                No challenges present in database.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-850 text-left text-xs text-slate-300">
                  <thead className="bg-[#080c14] text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Title</th>
                      <th className="px-4 py-3">Difficulty</th>
                      <th className="px-4 py-3">Category Tag</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850/60">
                    {problems.map((problem, index) => (
                      <tr key={problem._id} className="hover:bg-[#090d16]/50 transition-colors">
                        <td className="px-4 py-3 font-mono text-slate-500">{index + 1}</td>
                        <td className="px-4 py-3 font-semibold text-slate-200">{problem.title}</td>
                        <td className="px-4 py-3">
                          <Badge variant={
                            problem.difficulty.toLowerCase() === 'easy' ? 'success' :
                            problem.difficulty.toLowerCase() === 'medium' ? 'warning' : 'error'
                          }>
                            {problem.difficulty}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="text-slate-400 uppercase bg-slate-900/30">
                            {problem.tags}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="h-7 px-3 text-[10px] font-bold"
                            onClick={() => handleDelete(problem._id)}
                          >
                            <Trash2 size={11} className="mr-1" /> Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default AdminDelete;