import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../utils/axiosClient';
import { useNavigate, NavLink } from 'react-router';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { ArrowLeft, Trash2, Plus, Info, Database, FileCode, CheckCircle, Sparkles } from 'lucide-react';

const renderMarkdown = (text) => {
  if (!text) return "";
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h4 class="text-sm font-bold text-white mt-3 mb-1">$1</h4>');
  html = html.replace(/^## (.*$)/gim, '<h3 class="text-base font-bold text-white mt-4 mb-2">$1</h3>');
  html = html.replace(/^# (.*$)/gim, '<h2 class="text-lg font-bold text-white mt-5 mb-2 border-b border-neutral-800 pb-1">$1</h2>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Inline code
  html = html.replace(/`(.*?)`/g, '<code class="bg-neutral-900 px-1.5 py-0.5 rounded font-mono text-xs text-indigo-400">$1</code>');
  
  // Code blocks
  html = html.replace(/```([\s\S]*?)```/gm, '<pre class="bg-black/60 border border-neutral-900 p-3 rounded-lg font-mono text-xs text-neutral-300 my-2 whitespace-pre-wrap">$1</pre>');
  
  // Bullet lists
  html = html.replace(/^\s*-\s+(.*$)/gim, '<li class="list-disc ml-5 my-1 text-neutral-300">$1</li>');
  
  // Linebreaks
  html = html.split('\n').map(line => {
    if (line.trim().startsWith('<li') || line.trim().startsWith('<h') || line.trim().startsWith('<pre') || line.trim().startsWith('</pre')) {
      return line;
    }
    return line + '<br/>';
  }).join('\n');
  
  return html;
};

const problemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.enum(['array', 'linkedList', 'graph', 'dp']),
  visibleTestCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required'),
      explanation: z.string().min(1, 'Explanation is required')
    })
  ).min(1, 'At least one visible test case required'),
  hiddenTestCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required')
    })
  ).min(1, 'At least one hidden test case required'),
  startCode: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'Python']),
      initialCode: z.string().min(1, 'Initial code is required')
    })
  ).length(3, 'All three languages required'),
  referenceSolution: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'Python']),
      completeCode: z.string().min(1, 'Complete code is required')
    })
  ).length(3, 'All three languages required')
});

function AdminPanel() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState('basic');
  const [submitting, setSubmitting] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      visibleTestCases: [{ input: '', output: '', explanation: '' }],
      hiddenTestCases: [{ input: '', output: '' }],
      startCode: [
        { language: 'C++', initialCode: '' },
        { language: 'Java', initialCode: '' },
        { language: 'Python', initialCode: '' }
      ],
      referenceSolution: [
        { language: 'C++', completeCode: '' },
        { language: 'Java', completeCode: '' },
        { language: 'Python', completeCode: '' }
      ]
    }
  });

  const descriptionValue = watch('description') || '';

  // Check draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('create_problem_desc_draft');
    if (draft) {
      setHasDraft(true);
    }
  }, []);

  // Autosave draft
  useEffect(() => {
    if (descriptionValue) {
      localStorage.setItem('create_problem_desc_draft', descriptionValue);
    }
  }, [descriptionValue]);

  const restoreDraft = () => {
    const draft = localStorage.getItem('create_problem_desc_draft');
    if (draft) {
      setValue('description', draft);
      setHasDraft(false);
    }
  };

  const {
    fields: visibleFields,
    append: appendVisible,
    remove: removeVisible
  } = useFieldArray({
    control,
    name: 'visibleTestCases'
  });

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden
  } = useFieldArray({
    control,
    name: 'hiddenTestCases'
  });

  const validateStep = async (currentStep, nextStep) => {
    let fieldsToValidate = [];
    if (currentStep === 'basic') {
      fieldsToValidate = ['title', 'description', 'difficulty', 'tags'];
    } else if (currentStep === 'testcases') {
      fieldsToValidate = ['visibleTestCases', 'hiddenTestCases'];
    }
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setActiveStep(nextStep);
    }
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await axiosClient.post('/problem/create', data);
      alert('Problem created successfully!');
      localStorage.removeItem('create_problem_desc_draft');
      navigate('/');
    } catch (error) {
      alert(`Validation / API Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

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

      {/* Form Container */}
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        <div className="border-b border-slate-850 pb-4">
          <h1 className="text-2xl font-extrabold text-white">Create New Problem</h1>
          <p className="text-xs text-slate-400 mt-1">Configure metadata details, test cases, and template codes.</p>
        </div>

        {/* Draft Restore Banner */}
        {hasDraft && (
          <div className="flex items-center justify-between p-3.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-200 text-xs animate-in slide-in-from-top-3">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-indigo-400 animate-pulse" />
              <span>We found an unsaved description draft. Would you like to restore it?</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button 
                type="button" 
                size="sm" 
                className="h-7 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold" 
                onClick={restoreDraft}
              >
                Restore
              </Button>
              <Button 
                type="button" 
                size="sm" 
                variant="ghost" 
                className="h-7 text-indigo-400 hover:text-indigo-200" 
                onClick={() => setHasDraft(false)}
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}

        {/* Stepper Tabs */}
        <div className="flex justify-center">
          <TabsList className="grid grid-cols-3 w-full max-w-lg">
            <TabsTrigger 
              value="basic" 
              activeValue={activeStep} 
              onClick={() => validateStep(activeStep, 'basic')}
              className="text-xs"
            >
              <Info size={13} className="mr-1.5" /> 1. Basic Info
            </TabsTrigger>
            <TabsTrigger 
              value="testcases" 
              activeValue={activeStep} 
              onClick={() => validateStep(activeStep, 'testcases')}
              className="text-xs"
            >
              <Database size={13} className="mr-1.5" /> 2. Test Cases
            </TabsTrigger>
            <TabsTrigger 
              value="code" 
              activeValue={activeStep} 
              onClick={() => validateStep(activeStep, 'code')}
              className="text-xs"
            >
              <FileCode size={13} className="mr-1.5" /> 3. Code Templates
            </TabsTrigger>
          </TabsList>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* STEP 1: BASIC INFO */}
          <TabsContent value="basic" activeValue={activeStep}>
            <Card className="border-slate-800 bg-[#090d16]/40 p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Problem Title</label>
                <Input
                  {...register('title')}
                  placeholder="e.g. Two Sum"
                  className={errors.title ? 'border-red-500/50' : ''}
                />
                {errors.title && <p className="text-red-400 text-xs">{errors.title.message}</p>}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Problem Description (Markdown Supported)</label>
                  <span className="text-[10px] text-slate-500">Live preview matches rendering specs</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Editor */}
                  <div className="space-y-2">
                    <textarea
                      {...register('description')}
                      rows={13}
                      placeholder="Enter detailed specifications, constraints, examples... Markdown syntax is supported (e.g. # Header, **bold**, `code`)"
                      className={`flex w-full rounded-lg border border-slate-800 bg-[#080c14]/80 px-3 py-2 text-sm font-mono shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 text-slate-100 ${errors.description ? 'border-red-500/50' : ''}`}
                    />
                    {errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}
                  </div>

                  {/* Live Preview */}
                  <div className="rounded-lg border border-slate-800 bg-[#040812]/50 p-4 overflow-y-auto max-h-[310px] text-slate-300 prose prose-invert prose-sm">
                    {descriptionValue ? (
                      <div dangerouslySetInnerHTML={{ __html: renderMarkdown(descriptionValue) }} />
                    ) : (
                      <p className="text-slate-500 text-xs italic">Description live preview will appear here...</p>
                    )}
                  </div>
                </div>
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
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Category Tag</label>
                  <Select {...register('tags')}>
                    <option value="array">Array</option>
                    <option value="linkedList">Linked List</option>
                    <option value="graph">Graph</option>
                    <option value="dp">Dynamic Programming (DP)</option>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="button" onClick={() => validateStep('basic', 'testcases')}>
                  Next: Test Cases
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* STEP 2: TEST CASES */}
          <TabsContent value="testcases" activeValue={activeStep}>
            <Card className="border-slate-800 bg-[#090d16]/40 p-6 space-y-6">
              
              {/* Visible Test Cases */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Visible Test Cases</h3>
                    <p className="text-[10px] text-slate-400">Displayed in problem description specs</p>
                  </div>
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

                {visibleFields.map((field, index) => (
                  <div key={field.id} className="p-4 rounded-lg border border-slate-850 bg-[#080c14]/40 space-y-3 relative">
                    {visibleFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVisible(index)}
                        className="absolute right-3 top-3 text-slate-500 hover:text-red-400 cursor-pointer transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                    <span className="text-[10px] font-bold text-indigo-400 block uppercase">Case {index + 1}</span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Input
                          {...register(`visibleTestCases.${index}.input`)}
                          placeholder="Standard Input (stdin)"
                          className="h-8 text-xs font-mono"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Input
                          {...register(`visibleTestCases.${index}.output`)}
                          placeholder="Expected Output (stdout)"
                          className="h-8 text-xs font-mono"
                        />
                      </div>
                    </div>
                    <Input
                      {...register(`visibleTestCases.${index}.explanation`)}
                      placeholder="Case Explanation / Walkthrough description"
                      className="h-8 text-xs"
                    />
                  </div>
                ))}
                {errors.visibleTestCases && <p className="text-red-400 text-xs">{errors.visibleTestCases.message}</p>}
              </div>

              {/* Hidden Test Cases */}
              <div className="space-y-4 pt-4 border-t border-slate-850">
                <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Hidden Test Cases</h3>
                    <p className="text-[10px] text-slate-400">Used inside evaluations to grade solutions</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 border-slate-800"
                    onClick={() => appendHidden({ input: '', output: '' })}
                  >
                    <Plus size={12} className="mr-1" /> Add Hidden Case
                  </Button>
                </div>

                {hiddenFields.map((field, index) => (
                  <div key={field.id} className="p-4 rounded-lg border border-slate-850 bg-[#080c14]/40 space-y-3 relative">
                    {hiddenFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeHidden(index)}
                        className="absolute right-3 top-3 text-slate-500 hover:text-red-400 cursor-pointer transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                    <span className="text-[10px] font-bold text-purple-400 block uppercase">Hidden Case {index + 1}</span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        {...register(`hiddenTestCases.${index}.input`)}
                        placeholder="Hidden Input (stdin)"
                        className="h-8 text-xs font-mono"
                      />
                      <Input
                        {...register(`hiddenTestCases.${index}.output`)}
                        placeholder="Expected Output (stdout)"
                        className="h-8 text-xs font-mono"
                      />
                    </div>
                  </div>
                ))}
                {errors.hiddenTestCases && <p className="text-red-400 text-xs">{errors.hiddenTestCases.message}</p>}
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-850">
                <Button type="button" variant="outline" onClick={() => setActiveStep('basic')}>
                  Back
                </Button>
                <Button type="button" onClick={() => validateStep('testcases', 'code')}>
                  Next: Code Templates
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* STEP 3: CODE TEMPLATES */}
          <TabsContent value="code" activeValue={activeStep}>
            <Card className="border-slate-800 bg-[#090d16]/40 p-6 space-y-6">
              
              <div className="space-y-6">
                {['C++', 'Java', 'Python'].map((lang, idx) => (
                  <div key={lang} className="p-4 rounded-lg border border-slate-850 bg-[#080c14]/30 space-y-4">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block border-b border-slate-850 pb-1.5">{lang} Code Configurations</span>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase block">Starter Template Code</label>
                      <textarea
                        {...register(`startCode.${idx}.initialCode`)}
                        rows={5}
                        placeholder={`e.g. def solve():\n    pass`}
                        className="flex w-full rounded-lg border border-slate-800 bg-[#050811] px-3 py-2 text-xs font-mono shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 text-slate-100"
                      />
                      <input type="hidden" {...register(`startCode.${idx}.language`)} value={lang} />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase block">Complete Reference Solution</label>
                      <textarea
                        {...register(`referenceSolution.${idx}.completeCode`)}
                        rows={5}
                        placeholder={`e.g. def solve():\n    return result`}
                        className="flex w-full rounded-lg border border-slate-800 bg-[#050811] px-3 py-2 text-xs font-mono shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 text-slate-100"
                      />
                      <input type="hidden" {...register(`referenceSolution.${idx}.language`)} value={lang} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-850">
                <Button type="button" variant="outline" onClick={() => setActiveStep('testcases')}>
                  Back
                </Button>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-500 font-semibold" disabled={submitting}>
                  {submitting ? (
                    <div className="flex items-center gap-2">
                      <span className="loading loading-spinner loading-xs"></span>
                      Validating & Saving...
                    </div>
                  ) : (
                    <>
                      <CheckCircle size={14} className="mr-1.5" /> Save Problem
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </TabsContent>

        </form>
      </div>
    </div>
  );
}

export default AdminPanel;