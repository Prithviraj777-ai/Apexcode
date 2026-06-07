import { useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';
import { NavLink } from 'react-router';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { ArrowLeft, Trash2, Plus, Edit3, Settings } from 'lucide-react';

const problemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.enum(['array', 'linkedList', 'graph', 'dp']),
  visibleTestCases: z.array(z.object({
    input: z.string().min(1), 
    output: z.string().min(1), 
    explanation: z.string().optional()
  })).min(1),
  hiddenTestCases: z.array(z.object({
    input: z.string().min(1), 
    output: z.string().min(1)
  })).optional(),
  startCode: z.array(z.object({
    language: z.enum(['C++', 'Java', 'Python']), 
    initialCode: z.string().min(1)
  })).min(3),
  referenceSolution: z.array(z.object({
    language: z.enum(['C++', 'Java', 'Python']), 
    completeCode: z.string().min(1)
  })).min(3)
});

function AdminUpdate() {
  const [problems, setProblems] = useState([]);
  const [selectedProblemId, setSelectedProblemId] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      title: '', description: '', difficulty: 'easy', tags: 'array',
      visibleTestCases: [], hiddenTestCases: [], startCode: [], referenceSolution: []
    }
  });

  const { fields: visibleFields, append: appendVisible, remove: removeVisible } = useFieldArray({ 
    control, 
    name: 'visibleTestCases' 
  });

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/getAllProblem');
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      } finally { 
        setLoading(false); 
      }
    };
    fetchProblems();
  }, []);

  const handleSelectProblem = async (e) => {
    const id = e.target.value;
    setSelectedProblemId(id);
    if (id) {
      try {
        const { data } = await axiosClient.get(`/problem/problemById/${id}`);
        reset(data); // Populate form
      } catch (err) {
        console.error(err);
      }
    } else {
      reset({ title: '', description: '', difficulty: 'easy', tags: 'array', visibleTestCases: [], hiddenTestCases: [], startCode: [], referenceSolution: [] });
    }
  };

  const onSubmit = async (data) => {
    setUpdating(true);
    try {
      await axiosClient.put(`/problem/update/${selectedProblemId}`, data);
      alert('Problem updated successfully!');
    } catch (error) {
      alert(`Error updating problem: ${error.response?.data?.message || error.message}`);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#020617] gap-3">
        <span className="loading loading-spinner loading-lg text-indigo-500"></span>
        <span className="text-xs text-slate-400">Loading problems catalog...</span>
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

      {/* Main Container */}
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6 animate-in fade-in duration-200">
        
        <div className="border-b border-slate-850 pb-4">
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Edit3 size={22} className="text-indigo-400" /> Update Problem
          </h1>
          <p className="text-xs text-slate-400 mt-1">Select and edit existing challenge configurations.</p>
        </div>

        {/* Problem Selector Card */}
        <Card className="border-slate-800 bg-[#090d16]/40 p-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Select Problem to Edit
            </label>
            <Select 
              value={selectedProblemId} 
              onChange={handleSelectProblem}
              className="h-10"
            >
              <option value="">-- Choose a Problem --</option>
              {problems.map(p => (
                <option key={p._id} value={p._id}>{p.title} ({p.difficulty})</option>
              ))}
            </Select>
          </div>
        </Card>

        {/* Selected Problem Forms */}
        {selectedProblemId && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Basic Info */}
            <Card className="border-slate-800 bg-[#090d16]/40 p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                <Settings size={14} className="text-indigo-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Basic Specifications</h3>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Title</label>
                <Input {...register('title')} className={errors.title ? 'border-red-500/50' : ''} />
                {errors.title && <span className="text-red-400 text-xs">{errors.title.message}</span>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Description</label>
                <textarea 
                  {...register('description')} 
                  rows={6}
                  className="flex w-full rounded-lg border border-slate-800 bg-[#080c14]/80 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 text-slate-100" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Difficulty</label>
                  <Select {...register('difficulty')}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Tag</label>
                  <Select {...register('tags')}>
                    <option value="array">Array</option>
                    <option value="linkedList">Linked List</option>
                    <option value="graph">Graph</option>
                    <option value="dp">DP</option>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Testcases */}
            <Card className="border-slate-800 bg-[#090d16]/40 p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Visible Test Cases</h3>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="h-8 border-slate-800"
                  onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
                >
                  <Plus size={12} className="mr-1" /> Add Case
                </Button>
              </div>

              <div className="space-y-4">
                {visibleFields.map((field, index) => (
                  <div key={field.id} className="p-4 rounded-lg border border-slate-850 bg-[#080c14]/40 space-y-3 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-indigo-400 block uppercase">Case {index + 1}</span>
                      <button 
                        type="button" 
                        onClick={() => removeVisible(index)} 
                        className="text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input {...register(`visibleTestCases.${index}.input`)} placeholder="Input (stdin)" className="h-8 text-xs font-mono" />
                      <Input {...register(`visibleTestCases.${index}.output`)} placeholder="Expected Output (stdout)" className="h-8 text-xs font-mono" />
                    </div>
                    <textarea 
                      {...register(`visibleTestCases.${index}.explanation`)} 
                      placeholder="Explanation (Optional)" 
                      rows={2}
                      className="flex w-full rounded-lg border border-slate-800 bg-[#080c14]/80 px-3 py-1.5 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 text-slate-100" 
                    />
                  </div>
                ))}
              </div>
            </Card>

            <Button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-500 font-semibold"
              disabled={updating}
            >
              {updating ? 'Verifying & Saving Changes...' : 'Save Problem Changes'}
            </Button>
          </form>
        )}

      </div>
    </div>
  );
}

export default AdminUpdate;
