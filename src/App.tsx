import React, { useState } from 'react';
import { lawCategories, scenarios } from './data';
import Home from './components/Home';
import CategoryDetail from './components/CategoryDetail';
import ScenarioDetail from './components/ScenarioDetail';
import AIAssistant from './components/AIAssistant';
import Helplines from './components/Helplines';
import DocumentGenerator from './components/DocumentGenerator';
import Quiz from './components/Quiz';
import { Scale, MessageSquare, Home as HomeIcon, Phone, FileText, HelpCircle, Globe } from 'lucide-react';

type ViewState = 
  | { type: 'home' }
  | { type: 'category', id: string }
  | { type: 'scenario', id: string }
  | { type: 'assistant' }
  | { type: 'helplines' }
  | { type: 'templates' }
  | { type: 'quiz' };

const LANGUAGES = ['English', 'Hindi', 'Tamil', 'Telugu', 'Marathi'];

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>({ type: 'home' });
  const [language, setLanguage] = useState('English');

  const renderView = () => {
    switch (currentView.type) {
      case 'home':
        return (
          <Home 
            categories={lawCategories} 
            scenarios={scenarios}
            onSelectCategory={(id) => setCurrentView({ type: 'category', id })}
            onSelectScenario={(id) => setCurrentView({ type: 'scenario', id })}
            onOpenAssistant={() => setCurrentView({ type: 'assistant' })}
          />
        );
      case 'category':
        const category = lawCategories.find(c => c.id === currentView.id);
        return category ? (
          <CategoryDetail 
            category={category} 
            onBack={() => setCurrentView({ type: 'home' })} 
          />
        ) : (
          <div className="text-center py-12 text-slate-500">Category not found.</div>
        );
      case 'scenario':
        const scenario = scenarios.find(s => s.id === currentView.id);
        return scenario ? (
          <ScenarioDetail 
            scenario={scenario} 
            onBack={() => setCurrentView({ type: 'home' })} 
          />
        ) : (
          <div className="text-center py-12 text-slate-500">Scenario not found.</div>
        );
      case 'assistant':
        return <AIAssistant language={language} />;
      case 'helplines':
        return <Helplines />;
      case 'templates':
        return <DocumentGenerator />;
      case 'quiz':
        return <Quiz />;
      default:
        return <div className="text-center py-12 text-slate-500">View not found.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => setCurrentView({ type: 'home' })}
            className="flex items-center gap-2 text-indigo-900 font-bold text-xl hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Scale size={20} />
            </div>
            <span className="hidden sm:inline">Nyaya Mitra</span>
          </button>
          
          <div className="flex items-center gap-2">
            <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setCurrentView({ type: 'home' })}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  currentView.type === 'home' 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <HomeIcon size={18} />
                <span className="hidden lg:inline">Home</span>
              </button>
              <button 
                onClick={() => setCurrentView({ type: 'templates' })}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  currentView.type === 'templates' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FileText size={18} />
                <span className="hidden lg:inline">Templates</span>
              </button>
              <button 
                onClick={() => setCurrentView({ type: 'quiz' })}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  currentView.type === 'quiz' 
                    ? 'bg-amber-50 text-amber-700' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <HelpCircle size={18} />
                <span className="hidden lg:inline">Quiz</span>
              </button>
              <button 
                onClick={() => setCurrentView({ type: 'helplines' })}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  currentView.type === 'helplines' 
                    ? 'bg-rose-50 text-rose-700' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Phone size={18} />
                <span className="hidden lg:inline">Helplines</span>
              </button>
              <button 
                onClick={() => setCurrentView({ type: 'assistant' })}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  currentView.type === 'assistant' 
                    ? 'bg-emerald-50 text-emerald-700' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <MessageSquare size={18} />
                <span className="hidden lg:inline">AI Assistant</span>
              </button>
            </nav>

            <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            <div className="relative hidden sm:flex items-center">
              <Globe size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="pl-9 pr-8 py-2 bg-slate-100 border-transparent rounded-full text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer hover:bg-slate-200 transition-colors"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {renderView()}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <p className="mb-2">© {new Date().getFullYear()} Nyaya Mitra. Built for educational purposes.</p>
          <p className="max-w-2xl mx-auto text-slate-500 text-xs leading-relaxed">
            The information provided on this app does not, and is not intended to, constitute legal advice; instead, all information, content, and materials available on this site are for general informational purposes only. Information on this app may not constitute the most up-to-date legal or other information.
          </p>
        </div>
      </footer>
    </div>
  );
}
