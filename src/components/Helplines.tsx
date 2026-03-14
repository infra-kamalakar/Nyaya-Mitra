import React from 'react';
import { Phone, ShieldAlert, HeartPulse, Flame, MonitorSmartphone, Baby, Users } from 'lucide-react';

const helplines = [
  { id: 'national', name: 'National Emergency', number: '112', icon: ShieldAlert, desc: 'Single emergency number for Police, Fire, and Ambulance.' },
  { id: 'police', name: 'Police', number: '100', icon: ShieldAlert, desc: 'Direct line to local police control room.' },
  { id: 'women', name: 'Women Helpline', number: '1091', icon: Users, desc: 'For women in distress or facing domestic violence/harassment.' },
  { id: 'cyber', name: 'Cyber Crime', number: '1930', icon: MonitorSmartphone, desc: 'To report financial cyber frauds immediately.' },
  { id: 'child', name: 'Child Helpline', number: '1098', icon: Baby, desc: 'For children in need of care and protection.' },
  { id: 'ambulance', name: 'Ambulance', number: '102', icon: HeartPulse, desc: 'Medical emergencies and ambulance services.' },
  { id: 'fire', name: 'Fire Brigade', number: '101', icon: Flame, desc: 'For fire emergencies and rescue operations.' },
  { id: 'legal', name: 'Free Legal Aid (NALSA)', number: '15100', icon: Phone, desc: 'National Legal Services Authority for free legal advice.' }
];

export default function Helplines() {
  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-sm font-medium mb-4">
            <Phone size={16} />
            <span>Emergency Contacts</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Important Helplines</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Quick access to essential national helplines in India. Tap any card to call immediately from your mobile device.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {helplines.map((helpline) => (
          <a
            key={helpline.id}
            href={`tel:${helpline.number}`}
            className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-slate-200 hover:border-rose-300 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <helpline.icon size={24} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-slate-900">{helpline.name}</h3>
                <span className="text-lg font-bold text-rose-600">{helpline.number}</span>
              </div>
              <p className="text-sm text-slate-500">{helpline.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
