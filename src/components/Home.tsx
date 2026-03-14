import React, { useState } from 'react';
import { LawCategory, Scenario } from '../data';
import { iconMap } from '../icons';
import { ChevronRight, Shield, BookOpen, MessageSquare, Search } from 'lucide-react';

interface HomeProps {
  categories: LawCategory[];
  scenarios: Scenario[];
  onSelectCategory: (id: string) => void;
  onSelectScenario: (id: string) => void;
  onOpenAssistant: () => void;
}

export default function Home({ categories, scenarios, onSelectCategory, onSelectScenario, onOpenAssistant }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredScenarios = scenarios.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCategories = categories.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.topics.some(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500 opacity-10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6 backdrop-blur-sm">
            <Shield size={16} className="text-emerald-400" />
            <span>Empowering Citizens with Legal Knowledge</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Know Your Rights.<br/>
            <span className="text-emerald-400">Understand Indian Law.</span>
          </h1>
          <p className="text-lg text-indigo-100 mb-8 leading-relaxed">
            Nyaya Mitra simplifies complex Indian laws, helping you navigate everyday legal situations with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onOpenAssistant}
              className="flex items-center justify-center gap-2 bg-white text-indigo-900 px-6 py-3.5 rounded-full font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
            >
              <MessageSquare size={20} />
              Ask AI Legal Assistant
            </button>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-2xl mx-auto -mt-16 relative z-20 px-4">
        <div className="bg-white rounded-full p-2 shadow-lg border border-slate-200 flex items-center focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all">
          <div className="pl-4 text-slate-400">
            <Search size={20} />
          </div>
          <input 
            type="text"
            placeholder="Search for laws, rights, or scenarios (e.g., 'traffic', 'FIR')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 outline-none text-slate-700 bg-transparent"
          />
        </div>
      </section>

      {/* Quick Scenarios */}
      {filteredScenarios.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Common Scenarios</h2>
            <span className="text-sm text-slate-500 font-medium">What to do when...</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredScenarios.map(scenario => {
              const Icon = iconMap[scenario.icon] || BookOpen;
              return (
                <button
                  key={scenario.id}
                  onClick={() => onSelectScenario(scenario.id)}
                  className="text-left bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all group flex flex-col h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{scenario.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 flex-1">{scenario.description}</p>
                  <div className="mt-4 flex items-center text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Guide <ChevronRight size={16} className="ml-1" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Law Categories */}
      {filteredCategories.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map(category => {
              const Icon = iconMap[category.icon] || BookOpen;
              return (
                <button
                  key={category.id}
                  onClick={() => onSelectCategory(category.id)}
                  className="flex items-start gap-4 text-left bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">{category.title}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2">{category.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {filteredScenarios.length === 0 && filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={24} />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No results found</h3>
          <p className="text-slate-500">We couldn't find anything matching "{searchQuery}". Try asking the AI Assistant instead!</p>
          <button 
            onClick={onOpenAssistant}
            className="mt-6 inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-6 py-2.5 rounded-full font-medium hover:bg-indigo-100 transition-colors"
          >
            <MessageSquare size={18} />
            Ask AI Assistant
          </button>
        </div>
      )}
    </div>
  );
}
