import React from 'react';
import { LawCategory } from '../data';
import { iconMap } from '../icons';
import { ArrowLeft, BookOpen, ChevronDown } from 'lucide-react';

interface CategoryDetailProps {
  category: LawCategory;
  onBack: () => void;
}

export default function CategoryDetail({ category, onBack }: CategoryDetailProps) {
  const Icon = iconMap[category.icon] || BookOpen;

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium mb-8 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Home
      </button>

      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 mb-8">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Icon size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{category.title}</h1>
            <p className="text-lg text-slate-500">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Topics</h2>
        {category.topics.map((topic, index) => (
          <details 
            key={topic.id} 
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden [&_summary::-webkit-details-marker]:hidden"
            open={index === 0}
          >
            <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors">
              <h3 className="text-xl font-semibold text-slate-900">{topic.title}</h3>
              <ChevronDown size={24} className="text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="p-6 pt-0 border-t border-slate-100">
              <p className="text-slate-600 mb-6 leading-relaxed bg-slate-50 p-4 rounded-xl">
                {topic.summary}
              </p>
              <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                Important Points to Remember
              </h4>
              <ul className="space-y-3">
                {topic.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="text-emerald-500 font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
