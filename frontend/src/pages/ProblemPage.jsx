import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Editor from '@monaco-editor/react';
import { useParams, NavLink } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axiosClient from "../utils/axiosClient";
import SubmissionHistory from "../components/SubmissionHistory";
import ChatAi from '../components/ChatAi';
import Editorial from '../components/Editorial';
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { 
  Play, Send, Terminal as TerminalIcon, Code2, CheckCircle2, History, 
  MessageSquare, BookOpen, FileText, Maximize2, Minimize2, ArrowLeft 
} from 'lucide-react';

const langMap = {
  cpp: 'C++',
  java: 'Java',
  python: 'Python'
};

const ProblemPage = () => {
  const { problemId } = useParams();

  // React Query fetching with cache
  const { data: problem, isLoading: problemLoading } = useQuery({
    queryKey: ['problem', problemId],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/problem/problemById/${problemId}`);
      return data;
    }
  });

  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [customCodes, setCustomCodes] = useState({});
  const [loading, setLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState('description');
  const [activeRightTab, setActiveRightTab] = useState('code');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef(null);

  const [leftWidth, setLeftWidth] = useState(45); // percentage
  const isResizing = useRef(false);

  const startResize = (e) => {
    isResizing.current = true;
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const resize = (e) => {
    if (!isResizing.current) return;
    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth > 20 && newWidth < 80) {
      setLeftWidth(newWidth);
    }
  };

  const stopResize = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  // Safe window/document event listener memory leak cleanups
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResize);
    };
  }, []);

  const { handleSubmit } = useForm();

  // Populate editor state once problem is loaded from cache/API
  useEffect(() => {
    if (problem) {
      const startCodeList = problem.startCode || [];
      
      // Find if selected language exists, otherwise fallback to first available
      let activeLang = 'python';
      let activeLangObj = startCodeList.find(sc => sc.language.toLowerCase() === activeLang);
      if (!activeLangObj && startCodeList.length > 0) {
        activeLangObj = startCodeList[0];
        activeLang = activeLangObj.language.toLowerCase();
      }

      setSelectedLanguage(activeLang);

      const initialCodes = {};
      startCodeList.forEach(sc => {
        initialCodes[sc.language.toLowerCase()] = sc.initialCode;
      });
      setCustomCodes(initialCodes);
      setCode(activeLangObj ? activeLangObj.initialCode : '');
    }
  }, [problem]);

  const handleEditorChange = (value) => {
    const val = value || '';
    setCode(val);
    setCustomCodes(prev => ({
      ...prev,
      [selectedLanguage]: val
    }));
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (language) => {
    const targetCode = customCodes[language] !== undefined 
      ? customCodes[language] 
      : (problem?.startCode.find(sc => sc.language.toLowerCase() === language)?.initialCode || '');

    setCode(targetCode);
    setSelectedLanguage(language);
  };

  const handleRun = async () => {
    setLoading(true);
    setRunResult(null);
    try {
      const response = await axiosClient.post(`/submission/run/${problemId}`, {
        code,
        language: selectedLanguage
      });
      setRunResult(response.data);
      setLoading(false);
      setActiveRightTab('testcase');
    } catch (error) {
      console.error('Error running code:', error);
      setRunResult({
        success: false,
        error: 'Internal server error'
      });
      setLoading(false);
      setActiveRightTab('testcase');
    }
  };

  const handleSubmitCode = async () => {
    setLoading(true);
    setSubmitResult(null);
    try {
      const response = await axiosClient.post(`/submission/submit/${problemId}`, {
        code: code,
        language: selectedLanguage
      });
      setSubmitResult(response.data);
      setLoading(false);
      setActiveRightTab('result');
    } catch (error) {
      console.error('Error submitting code:', error);
      setSubmitResult(null);
      setLoading(false);
      setActiveRightTab('result');
    }
  };

  const getLanguageForMonaco = (lang) => {
    switch (lang) {
      case 'python': return 'python';
      case 'java': return 'java';
      case 'cpp': return 'cpp';
      default: return 'python';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'error';
      default: return 'secondary';
    }
  };

  const LeftTabButton = ({ id, icon: Icon, label }) => (
    <button 
      className={`flex items-center gap-2 px-4 py-3 font-semibold text-xs uppercase tracking-wider transition-all border-b-2 select-none duration-150 cursor-pointer ${
        activeLeftTab === id 
          ? 'border-indigo-500 text-white bg-indigo-500/5' 
          : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
      }`}
      onClick={() => setActiveLeftTab(id)}
    >
      <Icon size={14} className={activeLeftTab === id ? 'text-indigo-400' : 'text-slate-500'} />
      <span>{label}</span>
    </button>
  );

  const RightTabButton = ({ id, icon: Icon, label }) => (
    <button 
      className={`flex items-center gap-2 px-4 py-3 font-semibold text-xs uppercase tracking-wider transition-all border-b-2 select-none duration-150 cursor-pointer ${
        activeRightTab === id 
          ? 'border-indigo-500 text-white bg-indigo-500/5' 
          : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
      }`}
      onClick={() => setActiveRightTab(id)}
    >
      <Icon size={14} className={activeRightTab === id ? 'text-indigo-400' : 'text-slate-500'} />
      <span>{label}</span>
    </button>
  );

  if (problemLoading && !problem) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center min-h-screen bg-[#020617] text-slate-100">
        <span className="loading loading-spinner loading-lg text-indigo-500"></span>
        <span className="text-xs text-slate-400">Loading IDE Workspace...</span>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#020617] text-slate-100 overflow-hidden">
      {/* Workspace top nav */}
      <div className="flex items-center justify-between border-b border-slate-900 bg-[#090d16]/80 px-4 h-12 shrink-0">
        <div className="flex items-center gap-3">
          <NavLink to="/" className="text-slate-400 hover:text-white transition-colors">
            <Button size="icon" variant="ghost" className="h-7 w-7 rounded-md">
              <ArrowLeft size={16} />
            </Button>
          </NavLink>
          {problem && (
            <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
              <span className="text-sm font-bold text-white max-w-[200px] sm:max-w-xs truncate">{problem.title}</span>
              <Badge variant={getDifficultyColor(problem.difficulty)} className="text-[10px]">
                {problem.difficulty}
              </Badge>
            </div>
          )}
        </div>

        {/* Global Save Actions / Info */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="hidden sm:inline">Auto-save: enabled</span>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 min-h-0 flex bg-[#050505] p-2 gap-0 overflow-hidden">
        
        {/* Left Specification Tab Panel */}
        {!isFullscreen && (
          <div 
            style={{ width: `${leftWidth}%` }} 
            className="min-w-[20%] flex flex-col rounded-xl overflow-hidden border border-neutral-900 bg-[#0c0c0c]/80 shadow-2xl min-h-0"
          >
            {/* Spec Panel Navigation */}
            <div className="flex shrink-0 bg-[#080c14] border-b border-slate-850 overflow-x-auto no-scrollbar">
              <LeftTabButton id="description" icon={FileText} label="Description" />
              <LeftTabButton id="editorial" icon={BookOpen} label="Editorial" />
              <LeftTabButton id="solutions" icon={Code2} label="Solutions" />
              <LeftTabButton id="submissions" icon={History} label="Submissions" />
              <LeftTabButton id="chatAI" icon={MessageSquare} label="AI Assistant" />
            </div>

            {/* Spec Contents */}
            <div className="flex-1 min-h-0 overflow-y-auto p-5 relative bg-[#090d16]/10">
              {problem && (
                <div className="absolute inset-0 p-5 overflow-y-auto custom-scrollbar space-y-6">
                  
                  {activeLeftTab === 'description' && (
                    <div className="animate-in fade-in duration-300 space-y-6">
                      <div className="flex flex-wrap items-center gap-3 border-b border-slate-850 pb-4">
                        <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
                        <Badge variant={getDifficultyColor(problem.difficulty)} className="uppercase text-[10px]">
                          {problem.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-slate-400 capitalize bg-slate-900/30">
                          {problem.tags === 'linkedList' ? 'Linked List' : problem.tags}
                        </Badge>
                      </div>

                      {/* Problem Description */}
                      <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap select-text selection:bg-indigo-500/20">
                        {problem.description}
                      </div>

                      {/* Code Examples */}
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Examples</h3>
                        {problem.visibleTestCases.map((example, index) => (
                          <div key={index} className="bg-[#080c14] p-4 rounded-lg border border-slate-850 border-l-2 border-l-indigo-500 font-mono text-xs space-y-2">
                            <h4 className="text-indigo-400 font-semibold text-[10px] uppercase tracking-wider">Example {index + 1}</h4>
                            <div className="space-y-1">
                              <div className="flex"><span className="text-slate-500 w-20 select-none">Input:</span> <span className="text-slate-200 select-text">{example.input}</span></div>
                              <div className="flex"><span className="text-slate-500 w-20 select-none">Output:</span> <span className="text-slate-200 select-text">{example.output}</span></div>
                              {example.explanation && (
                                <div className="flex pt-2 mt-2 border-t border-slate-850/50">
                                  <span className="text-slate-500 w-20 select-none">Explanation:</span> 
                                  <span className="text-slate-400 select-text leading-relaxed whitespace-pre-wrap">{example.explanation}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeLeftTab === 'editorial' && (
                    <div className="animate-in fade-in duration-300 space-y-4">
                      <div className="border-b border-slate-850 pb-3">
                        <h2 className="text-lg font-bold text-white">Video Solution Review</h2>
                        <p className="text-xs text-slate-400">Step-by-step logic breakdown for this problem</p>
                      </div>
                      <div className="bg-[#080c14]/40 border border-slate-850 rounded-xl p-4">
                        <Editorial secureUrl={problem.secureUrl} thumbnailUrl={problem.thumbnailUrl} duration={problem.duration}/>
                      </div>
                    </div>
                  )}

                  {activeLeftTab === 'solutions' && (
                    <div className="animate-in fade-in duration-300 space-y-4">
                      <div className="border-b border-slate-850 pb-3">
                        <h2 className="text-lg font-bold text-white">Reference Solutions</h2>
                        <p className="text-xs text-slate-400">Optimized code structures for reference</p>
                      </div>
                      <div className="space-y-6">
                        {problem.referenceSolution?.map((solution, index) => (
                          <div key={index} className="border border-slate-800 rounded-lg overflow-hidden bg-[#080c14]/30">
                            <div className="bg-[#080c14] px-4 py-2 border-b border-slate-850 flex items-center justify-between">
                              <span className="text-xs font-bold text-indigo-400">{solution?.language}</span>
                            </div>
                            <Editor
                              height="220px"
                              language={getLanguageForMonaco(solution?.language.toLowerCase())}
                              value={solution?.completeCode}
                              theme="vs-dark"
                              options={{
                                readOnly: true,
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                fontSize: 13,
                                fontFamily: 'JetBrains Mono, monospace',
                                automaticLayout: true
                              }}
                            />
                          </div>
                        )) || <p className="text-xs text-slate-500 italic text-center p-4">Reference solutions locked.</p>}
                      </div>
                    </div>
                  )}

                  {activeLeftTab === 'submissions' && (
                    <div className="animate-in fade-in duration-300 h-full">
                      <SubmissionHistory problemId={problemId} />
                    </div>
                  )}

                  {activeLeftTab === 'chatAI' && (
                    <div className="animate-in fade-in duration-300 h-full flex flex-col">
                      <ChatAi problem={problem} />
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>
        )}

        {!isFullscreen && (
          <div 
            className="w-1.5 cursor-col-resize hover:bg-indigo-600/60 bg-neutral-950 transition-colors self-stretch flex items-center justify-center relative select-none group"
            onMouseDown={startResize}
          >
            <div className="w-[1px] h-8 bg-neutral-800 group-hover:bg-indigo-400/80 transition-colors" />
          </div>
        )}
 
        {/* Right Editor Panel */}
        <div 
          style={{ width: isFullscreen ? '100%' : `${100 - leftWidth}%` }} 
          className="flex flex-col rounded-xl overflow-hidden border border-neutral-900 bg-[#0c0c0c]/80 shadow-2xl min-h-0"
        >
          {/* Editor Tabs list */}
          <div className="flex shrink-0 bg-[#080c14] border-b border-slate-850 justify-between items-center pr-2">
            <div className="flex overflow-x-auto no-scrollbar">
              <RightTabButton id="code" icon={Code2} label="Code" />
              <RightTabButton id="testcase" icon={TerminalIcon} label="Console" />
              <RightTabButton id="result" icon={CheckCircle2} label="Result" />
            </div>
            
            <div className="flex items-center gap-2 shrink-0 pl-2">
              {activeRightTab === 'code' && (
                <div className="flex gap-1 mr-2 bg-[#020617] border border-slate-850 rounded-lg p-0.5">
                  {['python', 'java', 'cpp'].map((lang) => (
                    <button
                      key={lang}
                      className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md transition-colors cursor-pointer select-none ${
                        selectedLanguage === lang 
                          ? 'bg-indigo-600 text-white shadow' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      onClick={() => handleLanguageChange(lang)}
                    >
                      {lang === 'cpp' ? 'C++' : lang === 'python' ? 'Python' : 'Java'}
                    </button>
                  ))}
                </div>
              )}
              <Button 
                onClick={() => setIsFullscreen(!isFullscreen)} 
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-white"
                title={isFullscreen ? "Restore Layout" : "Maximize Code Workspace"}
              >
                {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </Button>
            </div>
          </div>

          {/* Right Editor Contents */}
          <div className="flex-1 min-h-0 flex flex-col relative bg-[#090d16]/10">
            {activeRightTab === 'code' && (
              <div className="absolute inset-0 flex flex-col animate-in fade-in duration-300 min-h-0">
                <div className="flex-1 min-h-0 pt-2 bg-[#1e1e1e]/10">
                  <Editor
                    height="100%"
                    language={getLanguageForMonaco(selectedLanguage)}
                    value={code}
                    onChange={handleEditorChange}
                    onMount={handleEditorDidMount}
                    theme="vs-dark"
                    options={{
                      fontSize: 14,
                      fontFamily: 'JetBrains Mono, Fira Code, Menlo, Monaco, monospace',
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 4,
                      wordWrap: 'on',
                      padding: { top: 12 },
                      lineNumbersMinChars: 3,
                      cursorSmoothCaretAnimation: "on",
                      smoothScrolling: true,
                      suggest: { showWords: false }
                    }}
                  />
                </div>

                {/* Editor Lower Action Deck */}
                <div className="p-3 bg-[#080c14] border-t border-slate-850 flex items-center justify-between shrink-0">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-slate-400 hover:text-white"
                    onClick={() => setActiveRightTab('testcase')}
                  >
                    <TerminalIcon size={14} /> Console Logs
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 font-semibold border-slate-800"
                      onClick={handleRun}
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <>
                          <Play size={12} className="text-emerald-400 fill-emerald-400/20" /> Run
                        </>
                      )}
                    </Button>
                    
                    <Button
                      variant="default"
                      size="sm"
                      className="h-8 bg-indigo-600 hover:bg-indigo-500 font-semibold"
                      onClick={handleSubmitCode}
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <>
                          <Send size={12} /> Submit
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Testcases Console */}
            {activeRightTab === 'testcase' && (
              <div className="absolute inset-0 p-5 overflow-y-auto custom-scrollbar bg-[#050811] text-slate-300 font-mono text-xs">
                <div className="flex items-center gap-2 border-b border-slate-850 pb-3 mb-4">
                  <TerminalIcon size={14} className="text-indigo-400" />
                  <span className="font-bold text-white uppercase text-[10px] tracking-wider">Dry-Run Diagnostics</span>
                </div>
                
                {runResult ? (
                  <div className="animate-in slide-in-from-bottom-2 duration-200 space-y-5">
                    <div className={`p-4 rounded-lg border ${
                      runResult.success 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>
                      <h4 className="font-bold text-sm mb-1">
                        {runResult.success 
                          ? '✅ ACCEPTED' 
                          : runResult.error?.includes("Compilation") 
                            ? '❌ COMPILATION ERROR' 
                            : runResult.error?.includes("Time Limit") 
                              ? '❌ TIME LIMIT EXCEEDED' 
                              : '❌ RUNTIME ERROR'}
                      </h4>
                      <div className="flex gap-4 text-[10px] opacity-80 mt-1">
                        <span>Time: {runResult.runtime}s</span>
                        <span>Memory: {runResult.memory}KB</span>
                      </div>
                      {runResult.error && (
                        <div className="mt-3 pt-3 border-t border-red-500/10 text-xs text-red-300 font-mono whitespace-pre-wrap">
                          {runResult.error}
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      {runResult.testCases?.map((tc, i) => (
                        <div key={i} className="border border-slate-850 rounded-lg overflow-hidden bg-[#090d16]/30">
                          <div className={`px-4 py-2 font-bold text-[10px] uppercase tracking-wider flex justify-between items-center border-b border-slate-850 ${
                            tc.status_id == 3 ? 'bg-emerald-500/5 text-emerald-400' : 'bg-red-500/5 text-red-400'
                          }`}>
                            <span>Test Case {i + 1}</span>
                            <span>{tc.status_id == 3 ? 'Passed' : 'Failed'}</span>
                          </div>
                          <div className="p-3.5 space-y-3">
                            <div>
                              <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Input</div>
                              <div className="bg-black/40 p-2 rounded text-slate-300">{tc.stdin}</div>
                            </div>
                            <div>
                              <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Expected Output</div>
                              <div className="bg-black/40 p-2 rounded text-slate-300">{tc.expected_output}</div>
                            </div>
                            <div>
                              <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Your Output</div>
                              <pre className={`p-2 rounded text-xs overflow-x-auto ${
                                tc.status_id == 3 ? 'bg-black/40 text-slate-300' : 'bg-red-950/20 text-red-400'
                              }`}>
                                {tc.stdout || tc.stderr || tc.compile_output || 'No output'}
                              </pre>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-2 py-20">
                    <TerminalIcon size={32} />
                    <p className="text-xs">Compile and run your logic to see execution diagnostics.</p>
                  </div>
                )}
              </div>
            )}

            {/* Submit Results */}
            {activeRightTab === 'result' && (
              <div className="absolute inset-0 p-5 overflow-y-auto custom-scrollbar flex items-center justify-center bg-[#070b13]">
                {submitResult ? (
                  <div className="w-full max-w-md animate-in zoom-in-95 duration-300">
                    <Card className={`border-t-4 bg-[#090d16] ${submitResult.accepted ? 'border-t-emerald-500 border-slate-800' : 'border-t-red-500 border-slate-800'}`}>
                      <CardContent className="p-6 text-center space-y-6">
                        
                        {submitResult.accepted ? (
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/5">
                              <CheckCircle2 size={32} />
                            </div>
                            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
                              Success! Accepted
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">Your submission passed all hidden test suites.</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mb-4 shadow-lg shadow-red-500/5 text-2xl font-bold">
                              ✕
                            </div>
                            <h3 className="text-xl font-bold text-red-400">
                              Submission Rejected
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">{submitResult.error || "Wrong Output or compilation error occurred."}</p>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-3 text-left">
                          <div className="p-3 bg-[#080c14] border border-slate-850 rounded-lg">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Time Elapsed</span>
                            <span className="text-base font-bold text-slate-200 font-mono mt-0.5 block">{submitResult.runtime}s</span>
                          </div>
                          <div className="p-3 bg-[#080c14] border border-slate-850 rounded-lg">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Peak Memory</span>
                            <span className="text-base font-bold text-slate-200 font-mono mt-0.5 block">{submitResult.memory}KB</span>
                          </div>
                          <div className="col-span-2 p-3 bg-[#080c14] border border-slate-850 rounded-lg text-center">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Test Cases Passed</span>
                            <span className={`text-sm font-bold mt-0.5 block ${submitResult.accepted ? 'text-emerald-400' : 'text-red-400'}`}>
                              {submitResult.passedTestCases} / {submitResult.totalTestCases} Passed
                            </span>
                          </div>
                        </div>

                        <Button 
                          onClick={() => setActiveRightTab('code')} 
                          variant="outline" 
                          className="w-full h-8 text-xs font-semibold border-slate-800"
                        >
                          Back to Editor Workspace
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-600 gap-2 py-20 text-center">
                    <CheckCircle2 size={32} />
                    <p className="text-xs">Submit your solution parameters to initiate platform diagnostics.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProblemPage;