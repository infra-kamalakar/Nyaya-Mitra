import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertTriangle, Loader2, Mic, MicOff } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantProps {
  language: string;
}

export default function AIAssistant({ language }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am Nyaya Mitra, your AI legal assistant. I can help explain Indian laws, procedures, and your rights. **Please note: I provide educational information, not professional legal advice.** How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice input. Please try Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    // Set language based on selection
    if (language === 'Hindi') recognition.lang = 'hi-IN';
    else if (language === 'Tamil') recognition.lang = 'ta-IN';
    else if (language === 'Telugu') recognition.lang = 'te-IN';
    else if (language === 'Marathi') recognition.lang = 'mr-IN';
    else recognition.lang = 'en-IN';

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev ? `${prev} ${transcript}` : transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Build conversation history for context
      const history = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
      const prompt = `
You are Nyaya Mitra, an AI assistant designed to help Indian citizens understand their laws, rights, and legal procedures.
You must be helpful, polite, and explain complex legal terms in simple, easy-to-understand language.

CRITICAL RULES:
1. You are NOT a lawyer. You CANNOT give professional legal advice.
2. Always include a short disclaimer at the end of your response stating that this is for educational purposes and they should consult a qualified advocate for legal advice.
3. If a user asks about a specific ongoing case or highly sensitive personal issue, advise them to seek immediate legal counsel.
4. Keep answers concise, structured (use bullet points), and easy to read.
5. YOU MUST RESPOND IN THIS LANGUAGE: ${language}. If the user asks in a different language, still try to respond in ${language} or politely explain you are set to ${language}.

Conversation History:
${history}

User: ${userMessage.content}
Assistant:`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || 'I am sorry, I could not generate a response. Please try again.'
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I encountered an error while trying to answer. Please check your connection or try again later.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto bg-white shadow-sm rounded-xl overflow-hidden border border-slate-200">
      {/* Disclaimer Banner */}
      <div className="bg-amber-50 border-b border-amber-200 p-3 flex items-start gap-3 text-amber-800 text-sm">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
        <p>
          <strong>Disclaimer:</strong> This AI assistant provides general educational information about Indian laws. It does not constitute professional legal advice. Always consult a registered advocate for your specific legal needs.
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
            }`}>
              {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
            </div>
            
            <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
            }`}>
              {msg.role === 'user' ? (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              ) : (
                <div className="markdown-body prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-slate-100 prose-pre:text-slate-800">
                  <Markdown>{msg.content}</Markdown>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Bot size={18} />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-5 py-4 shadow-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
              <span className="text-sm text-slate-500">Nyaya Mitra is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex gap-2 max-w-4xl mx-auto relative">
          <button
            onClick={toggleListening}
            className={`absolute left-2 top-1.5 bottom-1.5 aspect-square rounded-full flex items-center justify-center transition-colors z-10 ${
              isListening ? 'bg-rose-100 text-rose-600 animate-pulse' : 'text-slate-400 hover:bg-slate-100 hover:text-indigo-600'
            }`}
            title="Voice Input"
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isListening ? "Listening..." : "Ask a legal question..."}
            className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-full pl-12 pr-14 py-3.5 outline-none transition-all"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1.5 bottom-1.5 aspect-square bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <Send size={18} className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
