import React, { useState } from 'react';
import { HelpCircle, Award, ArrowRight, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';

const quizQuestions = [
  {
    id: 1,
    question: "Can a traffic police officer snatch your car or bike keys during a routine check?",
    options: [
      "Yes, if you don't show your license.",
      "Yes, it is standard procedure.",
      "No, they do not have the right to take your keys.",
      "Only if you are speeding."
    ],
    correctAnswer: 2,
    explanation: "Under the Motor Vehicles Act, traffic police officers do not have the authority to snatch your vehicle keys. You should cooperate and show your documents, but they cannot forcibly take your keys."
  },
  {
    id: 2,
    question: "What is the maximum time a person can be held in police custody without being presented before a magistrate?",
    options: [
      "12 hours",
      "24 hours",
      "48 hours",
      "72 hours"
    ],
    correctAnswer: 1,
    explanation: "Article 22(2) of the Indian Constitution and Section 57 of the CrPC (now BNSS) mandate that an arrested person must be produced before a magistrate within 24 hours of arrest, excluding travel time."
  },
  {
    id: 3,
    question: "Can a woman be arrested after sunset and before sunrise?",
    options: [
      "Yes, anytime.",
      "No, never under any circumstances.",
      "Generally no, except in exceptional circumstances with a prior order from a Judicial Magistrate.",
      "Only by a male police officer."
    ],
    correctAnswer: 2,
    explanation: "Section 46(4) of the CrPC (and corresponding BNSS section) states that no woman shall be arrested after sunset and before sunrise. In exceptional circumstances, a woman police officer must obtain prior permission from a Judicial Magistrate."
  },
  {
    id: 4,
    question: "Is it mandatory to pay the 'Service Charge' added to your restaurant bill?",
    options: [
      "Yes, it is a government tax.",
      "Yes, if it is printed on the menu.",
      "No, it is completely voluntary and optional.",
      "Only if the bill is above ₹1000."
    ],
    correctAnswer: 2,
    explanation: "According to the Department of Consumer Affairs, paying a service charge is completely voluntary. If you are not satisfied with the service, you can ask the restaurant to remove it from the bill."
  },
  {
    id: 5,
    question: "Can a shopkeeper charge you more than the Maximum Retail Price (MRP) for a packaged product?",
    options: [
      "Yes, if the shop is in a premium location.",
      "Yes, if they provide cooling charges (like for cold drinks).",
      "No, charging above MRP is an offense.",
      "Yes, during late night hours."
    ],
    correctAnswer: 2,
    explanation: "Under the Legal Metrology (Packaged Commodities) Rules, no retail dealer or other person can sell any packaged commodity at a price higher than the MRP. 'Cooling charges' cannot be added above the MRP."
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  const question = quizQuestions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 mb-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium mb-4">
            <HelpCircle size={16} />
            <span>Interactive Learning</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Know Your Rights Quiz</h1>
          <p className="text-lg text-slate-600">
            Test your knowledge about basic Indian laws and citizen rights.
          </p>
        </div>
      </div>

      {!showResults ? (
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6 text-sm font-medium text-slate-500">
            <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
            <span>Score: {score}</span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-8">
            {question.question}
          </h2>

          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => {
              let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all ";
              
              if (!isAnswered) {
                buttonClass += "border-slate-200 hover:border-indigo-300 hover:bg-slate-50";
              } else if (index === question.correctAnswer) {
                buttonClass += "border-emerald-500 bg-emerald-50 text-emerald-900";
              } else if (index === selectedOption) {
                buttonClass += "border-rose-500 bg-rose-50 text-rose-900";
              } else {
                buttonClass += "border-slate-200 opacity-50";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={isAnswered}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {isAnswered && index === question.correctAnswer && <CheckCircle2 size={20} className="text-emerald-600" />}
                    {isAnswered && index === selectedOption && index !== question.correctAnswer && <XCircle size={20} className="text-rose-600" />}
                  </div>
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="bg-indigo-50 rounded-xl p-5 mb-8 border border-indigo-100">
              <h3 className="font-bold text-indigo-900 mb-2">Explanation:</h3>
              <p className="text-indigo-800 text-sm leading-relaxed">{question.explanation}</p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200 text-center">
          <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Quiz Completed!</h2>
          <p className="text-lg text-slate-600 mb-8">
            You scored <span className="font-bold text-indigo-600">{score}</span> out of <span className="font-bold">{quizQuestions.length}</span>.
          </p>
          
          <div className="max-w-md mx-auto bg-slate-50 rounded-xl p-6 mb-8 border border-slate-200">
            <p className="text-slate-700">
              {score === quizQuestions.length 
                ? "Excellent! You have a great understanding of your basic rights." 
                : score >= quizQuestions.length / 2 
                  ? "Good job! You know your basics, but there's always more to learn." 
                  : "Keep learning! Knowing your rights is the first step to empowerment."}
            </p>
          </div>

          <button
            onClick={restartQuiz}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
