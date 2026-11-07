import React, { useState, useEffect, useRef } from 'react';
import { SubjectiveQuestion, SubjectiveResult, ChapterStatus } from '../services/types';
import { generateSubjectiveTest, evaluateSubjectiveTest, generateAudioFeedback } from '../services/geminiService';
import { Upload, CheckCircle, AlertTriangle, Loader2, X, Mic, ArrowLeft, PenTool, Image as ImageIcon, Play } from 'lucide-react';

interface EvaluateAnswerProps {
  classNameStr: string;
  subject: string;
  chapter: string;
  board?: string;
  initialMode: 'SHORT' | 'LONG';
  onUpdateSyllabus: (chapterName: string, status: ChapterStatus) => void;
  onReset: () => void;
}

const EvaluateAnswer: React.FC<EvaluateAnswerProps> = ({ classNameStr, subject, chapter, board = 'CBSE', initialMode, onUpdateSyllabus, onReset }) => {
  const [step, setStep] = useState<'LOADING' | 'READY' | 'TEST' | 'RESULT'>('LOADING');
  const [questions, setQuestions] = useState<SubjectiveQuestion[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<SubjectiveResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Audio
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioLoading, setAudioLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load Test
  useEffect(() => {
    const initTest = async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const qs = await generateSubjectiveTest(subject, chapter, board, classNameStr, initialMode);
        if (qs && qs.length > 0) {
            setQuestions(qs);
            setAnswers(new Array(qs.length).fill(''));
            setStep('READY');
        } else {
             throw new Error("No questions generated.");
        }
      } catch (e) {
         setErrorMsg("Unable to load test questions.");
      } finally {
         setLoading(false);
      }
    };
    initTest();
  }, [subject, chapter, classNameStr, board, initialMode]);

  const [validationWarning, setValidationWarning] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationWarning(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
          setValidationWarning("Image is too large. Please upload an image smaller than 5MB.");
          return;
      }
      if (!file.type.startsWith('image/')) {
          setValidationWarning("Please upload a valid image file (JPG or PNG).");
          return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        // Store the full Data URL (e.g., "data:image/jpeg;base64,...")
        setImagePreview(reader.result as string);
        setSelectedImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const hasText = answers.some(a => a.trim().length > 0);
    if (!hasText && !selectedImage) {
      setValidationWarning("Please enter your answers in the fields above or upload a photo of your answer sheet.");
      return;
    }
    setValidationWarning(null);

    setLoading(true);
    setErrorMsg(null);
    const isImageUpload = !!(selectedImage && imagePreview);
    setStatusText(isImageUpload ? "Analyzing answer sheet..." : "Checking your answers...");

    const attemptEvaluation = async () => {
        try {
            // Pass the full Data URL to the service; it handles extraction/mime-types.
            const evalResult = await evaluateSubjectiveTest(
                questions,
                answers,
                imagePreview, 
                { className: classNameStr, subject, chapter, board }
            );

            // Strict rule: Never pending, always show result
            setResult(evalResult);
            
            // Update Syllabus Logic
            const percentage = Math.round((evalResult.totalScore / evalResult.totalMaxMarks) * 100);
            let newStatus = ChapterStatus.WEAK;
            if (percentage >= 80) newStatus = ChapterStatus.STRONG;
            else if (percentage >= 50) newStatus = ChapterStatus.PRACTICED;
            onUpdateSyllabus(chapter, newStatus);
            
            setStep('RESULT');

        } catch (error) {
            console.error(error);
            setErrorMsg("Critical error during evaluation. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    attemptEvaluation();
  };

  const handlePlayFeedback = async () => {
    if (!result?.overallFeedback) return;
    if (audioUrl) {
      audioRef.current?.play();
      return;
    }
    setAudioLoading(true);
    const url = await generateAudioFeedback(result.overallFeedback);
    if (url) {
      setAudioUrl(url);
      setTimeout(() => {
        const audio = new Audio(url);
        audioRef.current = audio;
        audio.play();
      }, 100);
    }
    setAudioLoading(false);
  };

  if (step === 'LOADING' || loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 animate-page-enter">
        <Loader2 className="w-12 h-12 animate-spin mb-4 text-indigo-600" />
        <p className="text-lg font-medium">
          {loading ? statusText : (step === 'LOADING' ? 'Preparing Practice Set...' : 'Evaluating your answers...')}
        </p>
        <p className="text-sm text-slate-400 mt-2 max-w-xs text-center">
            PREPASCORE AI Examiner is reviewing your {initialMode === 'SHORT' ? 'Short' : 'Long'} Answer sheet...
        </p>
      </div>
    );
  }

  if (errorMsg) {
      return (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500 animate-page-enter px-4 text-center">
              <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-lg font-bold text-slate-800">Something went wrong</h3>
              <p className="text-sm text-slate-600 mb-4">{errorMsg}</p>
              <div className="flex gap-3">
                  <button onClick={onReset} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">Cancel</button>
                  <button onClick={() => { setErrorMsg(null); if(step === 'TEST') handleSubmit(); else onReset(); }} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Retry</button>
              </div>
          </div>
      )
  }

  // New READY state
  if (step === 'READY') {
    return (
        <div className="flex flex-col items-center justify-center h-96 animate-page-enter">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center max-w-md w-full">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Practice Set Ready</h2>
                <div className="bg-slate-50 rounded-lg p-4 mb-6 text-sm text-slate-600 text-left space-y-2 border border-slate-100">
                     <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-semibold text-slate-900">{initialMode === 'SHORT' ? 'Short Answers' : 'Long Answers'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Questions:</span>
                        <span className="font-semibold text-slate-900">{questions.length}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Total Marks:</span>
                        <span className="font-semibold text-slate-900">{questions.reduce((a,b) => a + b.maxMarks, 0)}</span>
                    </div>
                </div>
                <button 
                    onClick={() => setStep('TEST')}
                    className="w-full bg-indigo-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-200"
                >
                    <Play className="w-5 h-5 fill-current" /> Start Writing
                </button>
                <button onClick={onReset} className="mt-4 text-slate-400 hover:text-slate-600 text-sm">Cancel</button>
            </div>
        </div>
    );
  }

  if (step === 'TEST') {
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-page-enter">
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200">
           <div>
             <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <PenTool className="w-5 h-5 text-indigo-600" />
                {initialMode === 'SHORT' ? 'Short Answer' : 'Long Answer'} Practice
             </h2>
             <p className="text-sm text-slate-500">{questions.length} Questions • Total {questions.reduce((a,b)=>a+b.maxMarks,0)} Marks</p>
           </div>
           <button onClick={onReset} className="text-slate-400 hover:text-slate-600">
             <ArrowLeft className="w-5 h-5" />
           </button>
        </div>

        <div className="space-y-6">
          {questions.map((q, idx) => (
             <div key={q.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-card" style={{ animationDelay: `${idx * 75}ms` }}>
                <div className="flex justify-between mb-3">
                   <span className="font-bold text-slate-700">Q{idx + 1}. {q.question}</span>
                   <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded h-fit">{q.maxMarks} Marks</span>
                </div>
                {!imagePreview && (
                  <textarea
                    className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none resize-y min-h-[100px]"
                    placeholder="Type your answer here..."
                    value={answers[idx]}
                    onChange={(e) => {
                      const newAnswers = [...answers];
                      newAnswers[idx] = e.target.value;
                      setAnswers(newAnswers);
                    }}
                  />
                )}
             </div>
          ))}

          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 animate-card delay-300">
            <div className="flex items-start gap-4">
               <div className="p-3 bg-white rounded-full text-indigo-600 shadow-sm">
                 <ImageIcon className="w-6 h-6" />
               </div>
               <div className="flex-1">
                 <h3 className="font-bold text-indigo-900">Handwritten Answer?</h3>
                 <p className="text-sm text-indigo-700 mb-3">Upload a clear photo of your answer sheet. Max 5MB.</p>
                 {!imagePreview ? (
                   <label className="inline-flex items-center gap-2 bg-white text-indigo-700 px-4 py-2 rounded-lg border border-indigo-200 cursor-pointer hover:bg-indigo-50 font-medium">
                     <Upload className="w-4 h-4" /> Upload Photo
                     <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                   </label>
                 ) : (
                    <div className="relative w-48 h-32 bg-slate-200 rounded-lg overflow-hidden border border-slate-300">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button onClick={() => { setSelectedImage(null); setImagePreview(null); }} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-sm">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                 )}
               </div>
            </div>
          </div>

          {validationWarning && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>{validationWarning}</span>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 shadow-lg transition-transform"
          >
             Evaluate My Answers
          </button>
        </div>
      </div>
    );
  }

  // RESULT VIEW
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-page-enter">
      <div className="text-white p-6 rounded-xl shadow-lg flex justify-between items-center bg-slate-800">
         <div>
           <h2 className="text-2xl font-bold">Result Declared</h2>
           <p className="text-slate-100 opacity-90">Evaluated by PREPASCORE AI Examiner</p>
         </div>
         <div className="text-right">
            <div className="text-4xl font-bold text-white">
            {result?.totalScore} <span className="text-xl text-slate-400">/ {result?.totalMaxMarks}</span>
            </div>
            <div className="text-xs uppercase tracking-wide font-semibold text-slate-400 mt-1">Total Score</div>
         </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 animate-card delay-75">
         <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-slate-800 text-lg">Overall Feedback</h3>
            <button 
                onClick={handlePlayFeedback}
                disabled={audioLoading}
                className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-sm font-medium transition-colors"
            >
                {audioLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <Mic className="w-4 h-4" />}
                {audioLoading ? 'Loading...' : 'Listen'}
            </button>
         </div>
         <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100 whitespace-pre-wrap">
           {result?.overallFeedback}
         </p>
      </div>

      <div className="space-y-6">
            <h3 className="font-bold text-slate-800 text-lg animate-card delay-150">Detailed Evaluation</h3>
            {result?.evaluations.map((evalItem, idx) => (
            <div key={idx} className={`bg-white p-6 rounded-xl border shadow-sm animate-card ${evalItem.isZeroMarks ? 'border-red-200' : 'border-slate-200'}`} style={{ animationDelay: `${200 + (idx * 100)}ms` }}>
                <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-slate-800 w-3/4">Q{idx+1}. {evalItem.question}</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    evalItem.isZeroMarks ? 'bg-red-100 text-red-700' : 
                    (evalItem.marksAwarded === evalItem.maxMarks) ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                    {evalItem.marksAwarded} / {evalItem.maxMarks}
                </span>
                </div>

                <div className="space-y-4">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <p className="text-sm font-semibold text-slate-500 mb-1">Examiner Feedback:</p>
                        <p className="text-slate-700 text-sm whitespace-pre-wrap">{evalItem.feedback}</p>
                    </div>

                    {evalItem.isZeroMarks && (
                    <div className="bg-red-50 p-3 rounded-lg border border-red-100 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-red-700">Zero Marks Awarded</p>
                            <p className="text-xs text-red-600">Answer missing or completely incorrect.</p>
                        </div>
                    </div>
                    )}

                    <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                    <p className="text-sm font-semibold text-green-800 mb-1 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3" /> Model Answer:
                    </p>
                    <p className="text-slate-800 text-sm whitespace-pre-wrap">{evalItem.modelAnswer}</p>
                    </div>
                </div>
            </div>
            ))}
      </div>

      <div className="flex justify-center pt-4">
        <button 
          onClick={onReset}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 flex items-center gap-2 transition-transform hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4"/> Back to Menu
        </button>
      </div>
    </div>
  );
};

export default EvaluateAnswer;