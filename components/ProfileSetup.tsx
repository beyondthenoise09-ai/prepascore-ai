import React, { useState } from 'react';
import { Board, Subject, StudentProfile } from '../services/types';
import { generateSyllabus } from '../services/geminiService';
import { GraduationCap, Loader2, BookOpen } from 'lucide-react';

interface ProfileSetupProps {
  onProfileCreated: (profile: StudentProfile) => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onProfileCreated }) => {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [board, setBoard] = useState<string>('');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleSubject = (subj: Subject) => {
    setSubjects(prev => 
      prev.includes(subj) ? prev.filter(s => s !== subj) : [...prev, subj]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !className || !board || subjects.length === 0) return;

    setLoading(true);
    try {
      // The generateSyllabus function now internally handles errors and returns fallback data
      // so this will rarely fail, ensuring the user can proceed.
      const syllabus = await generateSyllabus(className, board as Board, subjects);
      
      const profile: StudentProfile = {
        name,
        className,
        board: board as Board,
        subjects,
        syllabus
      };
      onProfileCreated(profile);
    } catch (error) {
      console.error("Failed to create profile", error);
      // Even if catastrophic failure, proceed with empty syllabus rather than blocking
      const profile: StudentProfile = {
        name,
        className,
        board: board as Board,
        subjects,
        syllabus: []
      };
      onProfileCreated(profile);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-soft-gradient flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl p-8 border border-slate-100 animate-fade-scale">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4 animate-float">
            <GraduationCap className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Setup Your Profile</h1>
          <p className="text-slate-500 mt-2">Let's personalize your exam preparation.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition placeholder:text-slate-400"
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Class</label>
              <select
                className={`w-full border border-slate-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-indigo-500 outline-none ${!className ? 'text-slate-400' : 'text-slate-900'}`}
                value={className}
                onChange={e => setClassName(e.target.value)}
                required
              >
                <option value="" disabled>Select your class</option>
                {[9, 10, 11, 12].map((c: number) => <option key={c} value={c} className="text-slate-900">Class {c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Board / Exam</label>
              <select
                className={`w-full border border-slate-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-indigo-500 outline-none ${!board ? 'text-slate-400' : 'text-slate-900'}`}
                value={board}
                onChange={e => setBoard(e.target.value)}
                required
              >
                <option value="" disabled>Select your board / exam</option>
                {(Object.values(Board) as string[]).map(b => <option key={b} value={b} className="text-slate-900">{b}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Select Subjects</label>
            <div className="grid grid-cols-2 gap-3">
              {(Object.values(Subject) as string[]).map(s => (
                <button
                  type="button"
                  key={s}
                  onClick={() => toggleSubject(s as Subject)}
                  className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                    subjects.includes(s as Subject)
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'border-slate-200 hover:border-indigo-300 text-slate-600'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                     subjects.includes(s as Subject) ? 'border-indigo-600 bg-indigo-600' : 'border-slate-400'
                  }`}>
                    {subjects.includes(s as Subject) && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !name || !className || !board || subjects.length === 0}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg disabled:opacity-70 flex justify-center items-center gap-2 hover:shadow-indigo-200"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-6 h-6" /> Generating Syllabus...
              </>
            ) : (
              <>
                Start Learning <BookOpen className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;