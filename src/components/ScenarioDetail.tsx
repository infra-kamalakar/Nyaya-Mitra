import React from 'react';
import { Scenario } from '../data';
import { iconMap } from '../icons';
import { ArrowLeft, BookOpen, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ScenarioDetailProps {
  scenario: Scenario;
  onBack: () => void;
}

export default function ScenarioDetail({ scenario, onBack }: ScenarioDetailProps) {
  const Icon = iconMap[scenario.icon] || BookOpen;

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium mb-8 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Home
      </button>

      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
          <div className="w-20 h-20 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-inner">
            <Icon size={40} />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium mb-4">
              <ShieldAlert size={16} />
              <span>Action Guide</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{scenario.title}</h1>
            <p className="text-lg text-slate-600 leading-relaxed">{scenario.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Steps */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">1</div>
            What to do
          </h2>
          <div className="space-y-6">
            {scenario.steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-slate-500 font-semibold text-sm shrink-0 z-10">
                    {index + 1}
                  </div>
                  {index !== scenario.steps.length - 1 && (
                    <div className="w-0.5 h-full bg-slate-100 mt-2"></div>
                  )}
                </div>
                <p className="text-slate-700 leading-relaxed pt-1 pb-4">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rights */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 h-fit sticky top-24">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">2</div>
            Know Your Rights
          </h2>
          <ul className="space-y-4">
            {scenario.rights.map((right, index) => (
              <li key={index} className="flex items-start gap-3 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50">
                <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-700 leading-relaxed">{right}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
