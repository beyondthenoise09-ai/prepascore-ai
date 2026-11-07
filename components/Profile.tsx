import React, { useEffect, useState } from 'react';
import { StudentProfile, ChapterStatus } from '../services/types';
import { 
  User, Settings, LogOut, RefreshCw, 
  ChevronRight, Globe, 
  Bell, Shield, Target, BookOpen, 
  BarChart2, Edit3, Award 
} from 'lucide-react';

interface ProfileProps {
  profile: StudentProfile;
  onLogout: () => void;
  onResetProgress: () => void;
}

const CountUp: React.FC<{ end: number, suffix?: string }> = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    const duration = 1000;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Ease out quart
      const ease = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(ease * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end]);

  return <span>{count}{suffix}</span>;
};

const Profile: React.FC<ProfileProps> = ({ profile, onLogout, onResetProgress }) => {
  // Calculate Stats
  const totalChapters = profile.syllabus.length;
  const attemptedChapters = profile.syllabus.filter(s => s.status !== ChapterStatus.NOT_STARTED);
  const attemptedCount = attemptedChapters.length;
  
  // Calculate Average Accuracy based on progress value (Strong=100, Practiced=70, Weak=30)
  const totalScore = attemptedChapters.reduce((acc, curr) => acc + curr.progress, 0);
  const avgAccuracy = attemptedCount > 0 ? Math.round(totalScore / attemptedCount) : 0;

  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const handleResetConfirm = () => {
    onResetProgress();
    setConfirmReset(false);
    setResetDone(true);
    setTimeout(() => setResetDone(false), 3000);
  };

  return (
    <div className="max-w-md mx-auto space-y-6 animate-page-enter pb-12">
      
      {/* 1. Student Identity Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-slate-300 shadow-inner shrink-0">
          <User className="w-10 h-10" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-slate-900 truncate">{profile.name}</h2>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 truncate">
               Class {profile.className}
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-sm text-slate-500 font-medium truncate">{profile.board}</span>
          </div>
        </div>
      </div>

      {/* 2. Preparation Snapshot */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center hover:border-indigo-100 transition-colors">
          <div className="w-10 h-10 mb-2 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
             <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-2xl font-bold text-slate-800">
            <CountUp end={attemptedCount} />
          </span>
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mt-1">Attempts</span>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center hover:border-indigo-100 transition-colors">
          <div className="w-10 h-10 mb-2 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
             <BarChart2 className="w-5 h-5" />
          </div>
          <span className="text-2xl font-bold text-slate-800">
             <CountUp end={attemptedCount} /> <span className="text-sm text-slate-400 font-medium">/ {totalChapters}</span>
          </span>
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mt-1">Practiced</span>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center hover:border-indigo-100 transition-colors">
          <div className="w-10 h-10 mb-2 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
             <Award className="w-5 h-5" />
          </div>
          <span className="text-2xl font-bold text-slate-800">
             <CountUp end={avgAccuracy} suffix="%" />
          </span>
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mt-1">Accuracy</span>
        </div>
      </div>

      {/* 3. Target Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-5 shadow-lg text-white flex items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1 opacity-90">
            <Target className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">Target Goal</span>
          </div>
          <div className="text-sm font-medium text-indigo-100">
            {profile.board} Exam
          </div>
        </div>

        <div className="text-right relative z-10">
          <div className="text-3xl font-bold tracking-tight">95%</div>
          <div className="text-[10px] opacity-80 mt-1">Min. Score</div>
        </div>
      </div>

      {/* 4. Settings Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-3 bg-slate-50/50 border-b border-slate-100 flex items-center gap-2">
           <Settings className="w-4 h-4 text-slate-400" />
           <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Preferences</span>
        </div>
        
        <div className="divide-y divide-slate-50">
          <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
             <div className="flex items-center gap-3">
               <Globe className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
               <span className="text-sm font-medium text-slate-700">Language</span>
             </div>
             <div className="flex items-center gap-2">
               <span className="text-xs font-medium text-slate-500">English</span>
               <ChevronRight className="w-4 h-4 text-slate-300" />
             </div>
          </div>

          <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
             <div className="flex items-center gap-3">
               <Shield className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
               <span className="text-sm font-medium text-slate-700">Evaluation Mode</span>
             </div>
             <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-2 py-1 rounded">Strict</span>
          </div>

          <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
             <div className="flex items-center gap-3">
               <Bell className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
               <span className="text-sm font-medium text-slate-700">Notifications</span>
             </div>
             <div className="w-10 h-6 bg-slate-200 rounded-full relative cursor-pointer">
               <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm"></div>
             </div>
          </div>

          {resetDone && (
            <div className="p-3 bg-green-50 text-green-700 text-xs font-semibold text-center border-t border-green-100">
              ✓ All syllabus progress has been reset.
            </div>
          )}

          {confirmReset ? (
            <div className="p-4 bg-red-50 border-t border-red-100 space-y-2">
              <p className="text-xs text-red-700 font-bold">Reset all syllabus progress?</p>
              <div className="flex gap-2">
                <button
                  onClick={handleResetConfirm}
                  className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700"
                >
                  Yes, Reset
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="px-3 py-1.5 border border-slate-200 text-xs font-semibold rounded-lg hover:bg-white text-slate-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setConfirmReset(true)}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer group text-left"
            >
               <div className="flex items-center gap-3">
                 <RefreshCw className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" />
                 <span className="text-sm font-medium text-slate-700 group-hover:text-red-600">Reset Progress</span>
               </div>
               <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>
          )}
        </div>
      </div>

      {/* 5. Account Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
        <div className="divide-y divide-slate-50">
          <button 
            onClick={() => onResetProgress()}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer group"
          >
             <div className="flex items-center gap-3">
               <Edit3 className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
               <span className="text-sm font-medium text-slate-700">Re-enter Profile Details</span>
             </div>
             <ChevronRight className="w-4 h-4 text-slate-300" />
          </button>

          {confirmLogout ? (
            <div className="p-4 bg-red-50 border-t border-red-100 space-y-2">
              <p className="text-xs text-red-700 font-bold">Log out and clear current session?</p>
              <div className="flex gap-2">
                <button
                  onClick={() => onLogout()}
                  className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700"
                >
                  Yes, Logout
                </button>
                <button
                  onClick={() => setConfirmLogout(false)}
                  className="px-3 py-1.5 border border-slate-200 text-xs font-semibold rounded-lg hover:bg-white text-slate-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setConfirmLogout(true)}
              className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors cursor-pointer group"
            >
               <div className="flex items-center gap-3">
                 <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-600 transition-colors" />
                 <span className="text-sm font-medium text-slate-700 group-hover:text-red-600">Logout</span>
               </div>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default Profile;