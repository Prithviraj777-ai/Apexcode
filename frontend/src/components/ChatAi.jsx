import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../utils/axiosClient";
import { Send, Sparkles, Bot, User } from 'lucide-react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function ChatAi({ problem }) {
  const [messages, setMessages] = useState([
    { role: 'model', parts: [{ text: "Hello! I am your AI coding companion. Ask me any conceptual questions, request complexity feedback, or get debugging hints." }] }
  ]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = async (data) => {
    if (data.message.length > 800) {
      setMessages(prev => [
        ...prev,
        { role: 'user', parts: [{ text: data.message.substring(0, 100) + "..." }] },
        { role: 'model', parts: [{ text: "⚠️ I cannot process queries exceeding 800 characters to ensure efficient resource allocation." }] }
      ]);
      reset();
      return;
    }

    const userQuery = data.message;
    setMessages(prev => [...prev, { role: 'user', parts: [{ text: userQuery }] }]);
    reset();
    setLoading(true);

    try {
      const response = await axiosClient.post("/ai/chat", {
        messages: [...messages, { role: 'user', parts: [{ text: userQuery }] }],
        title: problem.title,
        description: problem.description,
        testCases: problem.visibleTestCases,
        startCode: problem.startCode
      });

      setMessages(prev => [
        ...prev,
        { role: 'model', parts: [{ text: response.data.message }] }
      ]);
    } catch (error) {
      console.error("API Error:", error);
      const errorMsg = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      setMessages(prev => [
        ...prev,
        { role: 'model', parts: [{ text: errorMsg }] }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[400px] bg-[#090d16]/20 overflow-hidden">
      {/* AI Assistant Banner */}
      <div className="p-3 border-b border-slate-850 bg-[#080c14] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Sparkles size={14} />
          </div>
          <span className="text-xs font-bold text-white uppercase tracking-wider">AI Coding Copilot</span>
        </div>
        {loading && <span className="loading loading-ring loading-xs text-indigo-400"></span>}
      </div>

      {/* Messages Scroll Panel */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#050811]/10">
        {messages.map((msg, index) => {
          const isModel = msg.role === "model";
          return (
            <div key={index} className={`flex items-start gap-3 max-w-[85%] ${isModel ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}>
              
              {/* Avatar */}
              <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center border text-xs select-none ${
                isModel 
                  ? 'bg-indigo-600/10 border-indigo-500/20 text-indigo-400' 
                  : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}>
                {isModel ? <Bot size={13} /> : <User size={13} />}
              </div>

              {/* Message Bubble */}
              <div className={`p-3 rounded-xl text-xs leading-relaxed whitespace-pre-wrap select-text selection:bg-indigo-500/20 ${
                isModel 
                  ? 'bg-[#090d16] border border-slate-850 text-slate-300' 
                  : 'bg-indigo-600 text-white shadow-md'
              }`}>
                {msg.parts[0].text}
              </div>

            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input controls form */}
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="p-3 border-t border-slate-850 bg-[#080c14] shrink-0"
      >
        <div className="flex items-center gap-2">
          <Input 
            placeholder={loading ? "Generating explanation..." : "Ask for code explanation or hints..."}
            className="flex-1 h-9 text-xs"
            {...register("message", { required: true, minLength: 2 })}
            disabled={loading}
            autoComplete="off"
          />
          <Button 
            type="submit" 
            size="icon" 
            className="h-9 w-9 bg-indigo-600 hover:bg-indigo-500 shrink-0"
            disabled={loading}
          >
            <Send size={13} />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ChatAi;