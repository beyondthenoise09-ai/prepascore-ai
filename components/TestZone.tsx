import React, { useState, useEffect } from 'react';
import { StudentProfile, ChapterStatus, Subject } from '../services/types';
import MCQTest from './MCQTest';
import EvaluateAnswer from './EvaluateAnswer';
import { Book, CheckCircle2, FileText, PenTool } from 'lucide-react';

interface TestZoneProps {
  profile: StudentProfile;
  onUpdateSyllabus: (chapterName: string, status: ChapterStatus) => void;
}

const TestZone: React.FC<TestZoneProps> = ({ profile, onUpdateSyllabus }) => {
  // Initialize state from localStorage or defaults
  const [state, setState] = useState(() => {
     try {
       const saved = localStorage.getItem('exameval_test_state');
       if (saved) {
         const parsed = JSON.parse(saved);
         // Validate if saved class matches current profile class to avoid inconsistencies
         if (parsed.selectedClass === profile.className) {
            return parsed;
         }
       }
     } catch (e) {
       console.error("Failed to load test state", e);
     }
     return {
       step: 1,
       selectedClass: profile.className,
       selectedSubject: '',
       selectedChapter: '',
       testType: null
     };
  });

  const { step, selectedClass, selectedSubject, selectedChapter, testType } = state;

  // Persist state changes
  useEffect(() => {
    localStorage.setItem('exameval_test_state', JSON.stringify(state));
  }, [state]);

  const updateState = (updates: Partial<typeof state>) => {
    setState((prev: any) => ({ ...prev, ...updates }));
  };

  // Helper to get available chapters based on selection
  const getAvailableChapters = () => {
    // Only use profile syllabus if class matches
    if (selectedClass === profile.className) {
      return profile.syllabus
        .filter(s => s.subject === selectedSubject)
        .map(s => s.chapterName);
    }
    return []; // No chapters available if different class selected (unless we fetch them)
  };

  const handleReset = () => {
    const newState = {
      step: 1,
      selectedClass: profile.className,
      selectedSubject: '',
      selectedChapter: '',
      testType: null
    };
    setState(newState);
    localStorage.removeItem('exameval_test_state');
  };

  if (testType === 'MCQ') {
    return (
      <MCQTest
        classNameStr={selectedClass}
        subject={selectedSubject}
        chapter={selectedChapter}
        board={profile.board}
        onUpdateSyllabus={onUpdateSyllabus}
        onReset={handleReset}
      />
    );
  }

  if (testType === 'SHORT' || testType === 'LONG') {
    return (
      <EvaluateAnswer
        classNameStr={selectedClass}
        subject={selectedSubject}
        chapter={selectedChapter}
        board={profile.board}
        initialMode={testType}
        onUpdateSyllabus={onUpdateSyllabus}
        onReset={handleReset}
      />
    );
  }

  // Wizard UI
  return (
    <div className="max-w-2xl mx-auto py-8 animate-page-enter">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white text-center">
          <h2 className="text-2xl font-bold">Start New Test</h2>
          <p className="opacity-90 mt-1">Configure your exam settings</p>
          
          <div className="flex justify-center mt-6 gap-2">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`h-2 rounded-full transition-all duration-300 ${
                s <= step ? 'bg-white w-8' : 'bg-indigo-400 w-2'
              }`} />
            ))}
          </div>
        </div>

        <div className="p-8 min-h-[400px]">
          {/* Step 1: Class */}
          {step === 1 && (
            <div className="space-y-6 animate-card delay-75">
              <h3 className="text-xl font-bold text-slate-800 text-center">Select Class</h3>
              <div className="space-y-3">
                {['9', '10', '11', '12'].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => updateState({ selectedClass: cls, step: 2 })}
                    className={`w-full p-4 rounded-xl border text-left flex justify-between items-center transition-all ${
                      selectedClass === cls
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold'
                        : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span>Class {cls}</span>
                    {selectedClass === cls && <CheckCircle2 className="w-5 h-5 text-indigo-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Subject */}
          {step === 2 && (
            <div className="space-y-6 animate-card delay-75">
              <div className="flex items-center gap-2 mb-4 text-sm text-slate-500 cursor-pointer hover:text-indigo-600" onClick={() => updateState({ step: 1 })}>
                 Start &gt; Class {selectedClass}
              </div>
              <h3 className="text-xl font-bold text-slate-800 text-center">Select Subject</h3>
              <div className="grid grid-cols-1 gap-3">
                {(Object.values(Subject) as string[]).map((subj) => (
                  <button
                    key={subj}
                    onClick={() => updateState({ selectedSubject: subj, step: 3 })}
                    className="w-full p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 text-left transition-all flex items-center gap-3"
                  >
                    <Book className="w-5 h-5 text-indigo-500" />
                    <span className="font-medium text-slate-700">{subj}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Chapter */}
          {step === 3 && (
            <div className="space-y-6 animate-card delay-75">
              <div className="flex items-center gap-2 mb-4 text-sm text-slate-500 cursor-pointer hover:text-indigo-600" onClick={() => updateState({ step: 2 })}>
                 Class {selectedClass} &gt; {selectedSubject}
              </div>
              <h3 className="text-xl font-bold text-slate-800 text-center">Select Chapter</h3>
              
              {selectedClass === profile.className ? (
                <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                   {getAvailableChapters().length > 0 ? getAvailableChapters().map((ch) => (
                    <button
                      key={ch}
                      onClick={() => updateState({ selectedChapter: ch, step: 4 })}
                      className="w-full p-3 rounded-lg border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 text-left text-sm font-medium text-slate-700 transition-all"
                    >
                      {ch}
                    </button>
                  )) : (
                    <div className="text-center text-slate-500 py-8">
                       <p>Loading syllabus...</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                    <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                        You selected a class different from your profile. Syllabus chapters are not available.
                    </p>
                    <input 
                        type="text" 
                        placeholder="Enter chapter name" 
                        className="w-full border border-slate-300 rounded-lg p-3"
                        value={selectedChapter}
                        onChange={(e) => updateState({ selectedChapter: e.target.value })}
                    />
                    <button 
                        disabled={!selectedChapter}
                        onClick={() => updateState({ step: 4 })}
                        className="w-full bg-indigo-600 text-white p-3 rounded-lg disabled:opacity-50"
                    >
                        Continue
                    </button>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Test Type */}
          {step === 4 && (
            <div className="space-y-6 animate-card delay-75">
              <div className="flex items-center gap-2 mb-4 text-sm text-slate-500 cursor-pointer hover:text-indigo-600" onClick={() => updateState({ step: 3 })}>
                 {selectedSubject} &gt; {selectedChapter}
              </div>
              <h3 className="text-xl font-bold text-slate-800 text-center">Select Test Mode</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => updateState({ testType: 'MCQ' })}
                  className="p-6 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left flex items-start gap-4 group hover:shadow-md"
                >
                  <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">MCQ Test</h4>
                    <p className="text-sm text-slate-500 mt-1">10 Questions • 1 Mark each • Speed & Accuracy</p>
                  </div>
                </button>

                <button
                  onClick={() => updateState({ testType: 'SHORT' })}
                  className="p-6 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left flex items-start gap-4 group hover:shadow-md"
                >
                  <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <PenTool className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Short Answer</h4>
                    <p className="text-sm text-slate-500 mt-1">5 Questions • 2 Marks each • Conceptual</p>
                  </div>
                </button>

                <button
                  onClick={() => updateState({ testType: 'LONG' })}
                  className="p-6 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left flex items-start gap-4 group hover:shadow-md"
                >
                  <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Board Level (Long)</h4>
                    <p className="text-sm text-slate-500 mt-1">2 Questions • 10 Marks each • Detailed</p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestZone;