import React, { useState } from 'react';
import { FileText, Copy, CheckCircle, Download } from 'lucide-react';

const templates = [
  {
    id: 'rti',
    name: 'RTI Application',
    description: 'Draft a Right to Information application to seek information from a government department.',
    generate: (data: any) => `To,
The Public Information Officer (PIO),
[Department Name]
[Department Address]

Date: ${data.date || '[Date]'}

Subject: Application under the Right to Information Act, 2005

Respected Sir/Madam,

I, ${data.fullName || '[Your Name]'}, residing at ${data.address || '[Your Address]'}, wish to seek information under the RTI Act, 2005.

Details of Information Sought:
${data.details || '[Enter the specific questions or information you are seeking here]'}

I have attached the requisite fee of Rs. 10/- via [Postal Order / Demand Draft / Online Payment]. 

Please provide the information at the address mentioned above.

Yours faithfully,
${data.fullName || '[Your Name]'}
Signature: _________________`
  },
  {
    id: 'fir',
    name: 'Police Complaint (FIR)',
    description: 'Draft a formal written complaint to the police station regarding an incident.',
    generate: (data: any) => `To,
The Station House Officer (SHO),
[Police Station Name]
[City/District]

Date: ${data.date || '[Date]'}

Subject: Formal Complaint regarding ${data.subject || '[Incident Type]'}

Respected Sir/Madam,

I, ${data.fullName || '[Your Name]'}, residing at ${data.address || '[Your Address]'}, would like to bring the following incident to your attention for immediate action.

Details of the Incident:
${data.details || '[Describe what happened, when it happened, where it happened, and who was involved. Be as specific as possible.]'}

I request you to kindly register a First Information Report (FIR) under the appropriate sections of the law and initiate an investigation into this matter.

Thanking you,

Yours sincerely,
${data.fullName || '[Your Name]'}
Contact: [Your Phone Number]
Signature: _________________`
  },
  {
    id: 'consumer',
    name: 'Consumer Forum Complaint',
    description: 'Draft a complaint against a seller or service provider for deficiency in service or defective goods.',
    generate: (data: any) => `BEFORE THE DISTRICT CONSUMER DISPUTES REDRESSAL COMMISSION
AT [City/District Name]

COMPLAINT NO. _______ OF 20__

IN THE MATTER OF:
${data.fullName || '[Your Name]'}
${data.address || '[Your Address]'}
... Complainant

VERSUS

[Name of the Company/Seller]
[Address of the Company/Seller]
... Opposite Party

Date: ${data.date || '[Date]'}

Subject: Complaint regarding ${data.subject || '[Defective Product / Deficiency in Service]'}

Respected Sir/Madam,

1. That the Complainant purchased [Product/Service] from the Opposite Party on [Date of Purchase] for an amount of Rs. [Amount].
2. That the following issue occurred:
${data.details || '[Describe the defect or deficiency in detail]'}
3. That the Complainant contacted the Opposite Party multiple times, but no resolution was provided.

PRAYER:
It is therefore respectfully prayed that this Hon'ble Commission may be pleased to direct the Opposite Party to:
a) Refund the amount of Rs. [Amount]
b) Pay compensation for mental agony
c) Pay the cost of litigation

Complainant
${data.fullName || '[Your Name]'}`
  }
];

export default function DocumentGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    subject: '',
    details: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [copied, setCopied] = useState(false);

  const activeTemplate = templates.find(t => t.id === selectedTemplate);
  const generatedText = activeTemplate ? activeTemplate.generate(formData) : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
          <FileText size={16} />
          <span>Legal Drafts</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Document Templates</h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Generate standard legal drafts easily. Fill in your details below, and copy the generated text to use for your official applications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">1. Select Template</h2>
            <div className="space-y-3">
              {templates.map(template => (
                <label 
                  key={template.id}
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                    selectedTemplate === template.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-200 hover:border-blue-200'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="template" 
                    value={template.id}
                    checked={selectedTemplate === template.id}
                    onChange={() => setSelectedTemplate(template.id)}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">{template.name}</div>
                    <div className="text-sm text-slate-500 mt-1">{template.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 mb-2">2. Enter Details</h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input 
                type="text" 
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="e.g., Rahul Sharma"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
              <input 
                type="text" 
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="e.g., 123, MG Road, Bangalore"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subject / Incident Type</label>
              <input 
                type="text" 
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="e.g., Theft of Mobile Phone"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Details</label>
              <textarea 
                value={formData.details}
                onChange={e => setFormData({...formData, details: e.target.value})}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none h-32 resize-none"
                placeholder="Describe the specific details, questions, or incident here..."
              />
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">3. Preview & Copy</h2>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
              >
                {copied ? <CheckCircle size={16} className="text-emerald-600" /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy Text'}
              </button>
            </div>
            
            <div className="flex-1 bg-slate-50 p-6 rounded-xl border border-slate-200 font-mono text-sm text-slate-800 whitespace-pre-wrap overflow-y-auto">
              {generatedText}
            </div>
            
            <div className="mt-4 text-sm text-slate-500 flex items-start gap-2">
              <span className="text-amber-500 font-bold">Note:</span>
              <p>Replace the bracketed text like [Department Name] with actual details before submitting. This is a standard template and may need modifications based on your specific case.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
