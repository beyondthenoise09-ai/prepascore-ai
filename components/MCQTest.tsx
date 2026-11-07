import React, { useState, useEffect } from 'react';
import { MCQQuestion, MCQResult, ChapterStatus } from '../services/types';
import { generateMCQs, analyzeMCQResults } from '../services/geminiService';
import { Clock, CheckCircle, XCircle, Loader2, ArrowLeft, Target, BookOpen, AlertOctagon, RefreshCw, Play } from 'lucide-react';

interface MCQTestProps {
  classNameStr: string;
  subject: string;
  chapter: string;
  board: string;
  onUpdateSyllabus: (chapterName: string, status: ChapterStatus) => void;
  onReset: () => void;
}

const MCQTest: React.FC<MCQTestProps> = ({ classNameStr, subject, chapter, board, onUpdateSyllabus, onReset }) => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<MCQQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [result, setResult] = useState<MCQResult | null>(null);
  const [testActive, setTestActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initTest = async () => {
    setLoading(true);
    setError(null);
    setTestActive(false); // Ensure test is not active during generation
    try {
      const qs = await generateMCQs(subject, chapter, board, classNameStr, 10);
      if (qs && qs.length > 0) {
        setQuestions(qs);
        setUserAnswers(new Array(qs.length).fill(-1));
        // Do NOT auto-start. Wait for user Launch.
      } else {
        throw new Error("Failed to generate valid questions");
      }
    } catch (e) {
      console.error(e);
      setError("Unable to generate test. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initTest();
  }, [subject, chapter, board, classNameStr]);

  const handleLaunch = () => {
    setTestActive(true);
    setStartTime(Date.now());
  };

  const handleSubmit = async () => {
    setLoading(true);
    const endTime = Date.now();
    const durationSeconds = (endTime - startTime) / 1000;
    
    try {
        const analysis = await analyzeMCQResults(questions, userAnswers, durationSeconds, { subject, chapter, board });
        setResult(analysis);
        setTestActive(false);
        
        if (analysis.accuracy >= 80) {
          onUpdateSyllabus(chapter, ChapterStatus.STRONG);
        } else if (analysis.accuracy >= 50) {
          onUpdateSyllabus(chapter, ChapterStatus.PRACTICED);
        } else {
          onUpdateSyllabus(chapter, ChapterStatus.WEAK);
        }
    } catch (e) {
        setError("Error analyzing result. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 animate-page-enter">
        <Loader2 className="w-12 h-12 animate-spin mb-4 text-indigo-600" />
        <p className="text-lg font-medium">Preparing your Exam Paper...</p>
        <p className="text-sm">Generating 10 tricky questions for {chapter}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 animate-page-enter">
        <AlertOctagon className="w-12 h-12 mb-4 text-red-500" />
        <p className="text-lg font-bold text-slate-800">Connection Issue</p>
        <p className="text-sm mb-6">{error}</p>
        <div className="flex gap-4">
             <button onClick={onReset} className="px-4 py-2 border rounded-lg hover:bg-slate-50">Cancel</button>
             <button onClick={initTest} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2">
                 <RefreshCw className="w-4 h-4"/> Retry
             </button>
        </div>
      </div>
    );
  }

  // Ready to Launch State (Post-Generation, Pre-Test)
  if (!testActive && !result && questions.length > 0) {
    return (
        <div className="flex flex-col items-center justify-center h-96 animate-page-enter">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center max-w-md w-full">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Exam Paper Ready</h2>
                <div className="bg-slate-50 rounded-lg p-4 mb-6 text-sm text-slate-600 text-left space-y-2 border border-slate-100">
                    <div className="flex justify-between">
                        <span>Subject:</span>
                        <span className="font-semibold text-slate-900">{subject}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Chapter:</span>
                        <span className="font-semibold text-slate-900">{chapter}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Questions:</span>
                        <span className="font-semibold text-slate-900">{questions.length}</span>
                    </div>
                </div>
                <button 
                    onClick={handleLaunch}
                    className="w-full bg-indigo-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-200"
                >
                    <Play className="w-5 h-5 fill-current" /> Launch Test
                </button>
                <button onClick={onReset} className="mt-4 text-slate-400 hover:text-slate-600 text-sm">Cancel</button>
            </div>
        </div>
    );
  }

  if (testActive) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-page-enter">
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div>
            <h3 className="font-bold text-slate-800">{subject} - {chapter}</h3>
            <p className="text-xs text-slate-500">Class {classNameStr} | {board}</p>
          </div>
          <span className="flex items-center gap-2 text-indigo-600 font-semibold bg-indigo-50 px-3 py-1 rounded-full"><Clock className="w-4 h-4"/> Live Test</span>
        </div>

        {questions.map((q, idx) => (
          <div key={q.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-card" style={{ animationDelay: `${idx * 100}ms` }}>
            
            <div className="mb-6">
                <h3 className="text-sm font-bold text-slate-500 uppercase mb-2">Question {idx + 1}:</h3>
                <p className="text-lg font-semibold text-slate-800 leading-relaxed">
                    {q.question}
                </p>
            </div>

            <div className="mb-4">
                <h4 className="text-sm font-bold text-slate-500 uppercase mb-3">Options:</h4>
                <div className="space-y-3">
                    {q.options.map((opt, optIdx) => (
                        <button
                            key={optIdx}
                            onClick={() => {
                                const newAnswers = [...userAnswers];
                                newAnswers[idx] = optIdx;
                                setUserAnswers(newAnswers);
                            }}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-start gap-3 ${
                                userAnswers[idx] === optIdx 
                                ? 'border-indigo-600 bg-indigo-50 shadow-sm' 
                                : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                        >
                            <span className={`font-bold min-w-[24px] ${userAnswers[idx] === optIdx ? 'text-indigo-700' : 'text-slate-500'}`}>
                                {String.fromCharCode(65 + optIdx)})
                            </span>
                            <span className={`${userAnswers[idx] === optIdx ? 'text-indigo-900 font-medium' : 'text-slate-700'}`}>
                                {opt}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="pt-3 mt-4 border-t border-slate-50">
                <p className="text-xs text-slate-400 font-medium">Instruction: "Select ONE option"</p>
            </div>
          </div>
        ))}

        <div className="flex justify-end pt-4 pb-8">
          <button
            onClick={handleSubmit}
            disabled={loading || userAnswers.includes(-1)}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50 flex items-center gap-2 shadow-lg transition-transform"
          >
             {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Submit Test'}
          </button>
        </div>
      </div>
    );
  }

  // Result View
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-page-enter">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-indigo-600" /> Test Analysis
        </h2>

        {/* 1. Test Summary */}
        <div className="mb-8">
           <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">1. Test Summary</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-center">
               <div className="text-3xl font-bold text-slate-800">{result?.total}</div>
               <div className="text-xs text-slate-500 mt-1">Total Questions</div>
             </div>
             <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-center">
               <div className="text-3xl font-bold text-green-600">{result?.correctAnswers}</div>
               <div className="text-xs text-green-700 mt-1">Correct Answers</div>
             </div>
             <div className="bg-red-50 p-4 rounded-lg border border-red-100 text-center">
               <div className="text-3xl font-bold text-red-600">{result?.wrongAnswers}</div>
               <div className="text-xs text-red-700 mt-1">Wrong Answers</div>
             </div>
             <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-center">
               <div className="text-3xl font-bold text-indigo-600">{result?.accuracy}%</div>
               <div className="text-xs text-indigo-700 mt-1">Accuracy Score</div>
             </div>
           </div>
        </div>

        {/* 2. Detailed Mistake Analysis */}
        {result?.detailedFeedback && result.detailedFeedback.length > 0 ? (
          <div className="mb-8">
             <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
               <XCircle className="w-6 h-6 text-red-500" /> Mistake Review
             </h3>
             <div className="space-y-6">
               {result.detailedFeedback.map((item, index) => (
                 <div key={index} className="bg-red-50/50 border border-red-100 rounded-xl p-6 shadow-sm animate-card" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex items-start gap-3 mb-4">
                       <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                          {item.questionNumber}
                       </div>
                       <div>
                          <h4 className="font-bold text-slate-800 text-lg mb-1">Question {item.questionNumber}</h4>
                          <p className="text-slate-700 font-medium">{item.questionText}</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 ml-0 md:ml-11">
                       <div className="bg-white p-4 rounded-lg border border-red-200 shadow-sm">
                          <span className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1 block">Your Answer ❌</span>
                          <p className="text-red-700 font-semibold">{item.userAnswerText}</p>
                       </div>
                       <div className="bg-white p-4 rounded-lg border border-green-200 shadow-sm">
                          <span className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1 block">Correct Answer ✅</span>
                          <p className="text-green-700 font-semibold">{item.correctAnswerText}</p>
                       </div>
                    </div>

                    <div className="ml-0 md:ml-11 bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                       <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                         <BookOpen className="w-4 h-4 text-indigo-500" /> Teacher's Explanation
                       </h5>
                       <div className="text-slate-600 text-sm whitespace-pre-wrap leading-relaxed">
                         {item.explanation}
                       </div>
                       <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 bg-indigo-50 p-3 rounded-lg">
                          <span className="text-lg">📌</span>
                          <div>
                            <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider block mb-1">Exam Tip</span>
                            <p className="text-sm font-medium text-indigo-700">{item.examTip}</p>
                          </div>
                       </div>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        ) : (
          <div className="mb-8 p-6 bg-green-50 rounded-xl border border-green-100 text-center animate-card">
             <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
             <h3 className="text-xl font-bold text-green-700">Perfect Score!</h3>
             <p className="text-green-600">You answered all questions correctly. Keep up the great work!</p>
          </div>
        )}

        {/* 3. Performance Stats & Advice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-card delay-200">
           {/* Speed & Analysis */}
           <div>
             <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Analysis</h3>
             <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-4">
                <div className="flex justify-between items-center">
                   <span className="text-slate-600 font-medium">Speed</span>
                   <span className={`font-bold ${result?.speed === 'Fast' ? 'text-green-600' : result?.speed === 'Slow' ? 'text-red-600' : 'text-yellow-600'}`}>
                     {result?.speed} ({result?.avgTimePerQuestion}s/q)
                   </span>
                </div>
                <div>
                   <span className="text-slate-600 font-medium block mb-2">Weak Concepts</span>
                   <div className="flex flex-wrap gap-2">
                      {result?.weakConcepts.map((c, i) => (
                        <span key={i} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded font-bold">{c}</span>
                      ))}
                      {result?.weakConcepts.length === 0 && <span className="text-xs text-slate-400">None detected</span>}
                   </div>
                </div>
             </div>
           </div>

           {/* General Advice */}
           <div>
             <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Overall Advice</h3>
             <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg h-full">
                <ul className="list-disc list-inside text-sm text-indigo-900 space-y-2">
                  {result?.improvementAdvice.map((advice, i) => (
                    <li key={i}>{advice}</li>
                  ))}
                </ul>
             </div>
           </div>
        </div>

      </div>

      <div className="flex justify-center pt-2">
        <button 
          onClick={onReset}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 flex items-center gap-2 shadow-md transition-all hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4"/> Back to Menu
        </button>
      </div>
    </div>
  );
};

export default MCQTest;