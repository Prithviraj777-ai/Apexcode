import { useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Calendar, Cpu, Clock, Code2, AlertTriangle, FileCode } from 'lucide-react';

const SubmissionHistory = ({ problemId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/problem/submittedProblem/${problemId}`);
        // Ensure data is array (handle backend returning plain string when no submissions)
        if (Array.isArray(response.data)) {
          setSubmissions(response.data);
        } else {
          setSubmissions([]);
        }
        setError(null);
      } catch (err) {
        setError('Failed to fetch submission history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [problemId]);

  const handleOpenCode = (sub) => {
    setSelectedSubmission(sub);
    setDialogOpen(true);
  };

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted': return <Badge variant="success">Accepted</Badge>;
      case 'wrong': return <Badge variant="error">Wrong Answer</Badge>;
      case 'error': return <Badge variant="warning">Error</Badge>;
      case 'pending': return <Badge variant="secondary">Pending</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatMemory = (memory) => {
    if (memory < 1024) return `${memory} KB`;
    return `${(memory / 1024).toFixed(1)} MB`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 gap-2">
        <span className="loading loading-spinner text-indigo-500"></span>
        <span className="text-xs text-slate-400">Loading submissions...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-xs">
        <AlertTriangle size={14} />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-850 pb-3">
        <h2 className="text-lg font-bold text-white">Submission History</h2>
        <p className="text-xs text-slate-400">Review log parameters of past evaluations</p>
      </div>
      
      {submissions.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-slate-850 rounded-xl bg-[#090d16]/10">
          <FileCode size={32} className="mx-auto text-slate-700 mb-2" />
          <p className="text-xs text-slate-500 italic">No submissions found for this challenge.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-slate-850 rounded-xl bg-[#080c14]/40">
          <table className="min-w-full divide-y divide-slate-850 text-left text-xs text-slate-300">
            <thead className="bg-[#080c14] text-slate-400 text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Language</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Memory</th>
                <th className="px-4 py-3">Passed</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850/60">
              {submissions.map((sub) => (
                <tr key={sub._id} className="hover:bg-[#090d16]/50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap font-medium">
                    {getStatusBadge(sub.status)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-mono text-[11px] text-indigo-400">
                    {sub.language}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-mono text-slate-300">
                    {sub.runtime}s
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-mono text-slate-300">
                    {formatMemory(sub.memory)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-mono text-slate-300">
                    {sub.testCasesPassed}/{sub.testCasesTotal}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-400">
                    {formatDate(sub.createdAt)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-7 px-3 text-[10px] font-bold border-slate-800"
                      onClick={() => handleOpenCode(sub)}
                    >
                      Inspect
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Code View Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedSubmission && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between pr-6">
                  <span>Submission Inspector</span>
                  <span className="text-xs font-mono text-slate-400">ID: {selectedSubmission._id.substring(0, 8)}</span>
                </DialogTitle>
                <DialogDescription>
                  Review execution logs and source code evaluation parameters.
                </DialogDescription>
              </DialogHeader>

              {/* Status and Parameters Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-xs">
                <div className="p-3 bg-[#080c14] border border-slate-850 rounded-lg space-y-1">
                  <span className="text-slate-500 block uppercase font-bold text-[9px]">Status</span>
                  <div>{getStatusBadge(selectedSubmission.status)}</div>
                </div>
                <div className="p-3 bg-[#080c14] border border-slate-850 rounded-lg space-y-1">
                  <span className="text-slate-500 block uppercase font-bold text-[9px]"><Clock size={10} className="inline mr-1" /> Runtime</span>
                  <span className="text-slate-200 font-mono font-bold block">{selectedSubmission.runtime}s</span>
                </div>
                <div className="p-3 bg-[#080c14] border border-slate-850 rounded-lg space-y-1">
                  <span className="text-slate-500 block uppercase font-bold text-[9px]"><Cpu size={10} className="inline mr-1" /> Memory</span>
                  <span className="text-slate-200 font-mono font-bold block">{formatMemory(selectedSubmission.memory)}</span>
                </div>
                <div className="p-3 bg-[#080c14] border border-slate-850 rounded-lg space-y-1">
                  <span className="text-slate-500 block uppercase font-bold text-[9px]"><Calendar size={10} className="inline mr-1" /> Submitted</span>
                  <span className="text-slate-200 font-medium block truncate">{formatDate(selectedSubmission.createdAt)}</span>
                </div>
              </div>

              {/* Error messages if exists */}
              {selectedSubmission.errorMessage && (
                <div className="mb-4 p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-mono whitespace-pre-wrap max-h-32 overflow-y-auto custom-scrollbar">
                  {selectedSubmission.errorMessage}
                </div>
              )}

              {/* Code Preview container */}
              <div className="space-y-1.5 flex-1 min-h-0">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Code2 size={12} className="text-indigo-400" />
                  <span className="font-semibold text-slate-300">Source Code ({selectedSubmission.language.toUpperCase()})</span>
                </div>
                <pre className="p-4 bg-black/60 border border-slate-850 rounded-xl overflow-x-auto text-xs font-mono text-slate-300 max-h-[350px] custom-scrollbar select-text selection:bg-indigo-500/20">
                  <code>{selectedSubmission.code}</code>
                </pre>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubmissionHistory;