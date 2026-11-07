import React from 'react';
import { StudentProfile, ChapterStatus } from '../services/types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  profile: StudentProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ profile }) => {
  // Stats Calculation based on COVERAGE (Attempted vs Not Started)
  const totalChapters = profile.syllabus.length;
  
  // Rule: "If chapter tested first time -> mark chapter as 'Attempted'"
  // We count any chapter that is NOT 'Not Started' as covered/completed in terms of syllabus tracking.
  const completedChapters = profile.syllabus.filter(s => 
    s.status !== ChapterStatus.NOT_STARTED
  ).length;
  
  const remainingChapters = totalChapters - completedChapters;
  const progressPercent = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;

  // Chart Data
  const data = [
    { name: 'Completed', value: completedChapters, color: '#6366f1' }, // Indigo-500
    { name: 'Remaining', value: remainingChapters, color: '#f1f5f9' }, // Slate-100
  ];

  // Logic for friendly text
  const motivationLine = progressPercent < 15 
    ? "Start small. Consistency builds scores." 
    : "Good progress. Keep the rhythm.";

  // Logic for Smart Insight
  const weakCount = profile.syllabus.filter(s => s.status === ChapterStatus.WEAK).length;
  const attemptedCount = profile.syllabus.filter(s => s.status !== ChapterStatus.NOT_STARTED).length;
  
  let insight = "Consistency is key. You are doing great.";
  
  // Refined insight logic based on accuracy proxy
  if (attemptedCount > 0 && (weakCount / attemptedCount) > 0.4) {
    insight = "Your syllabus coverage is good, but accuracy needs improvement. Revise weak chapters.";
  } else if (weakCount > 2) {
    insight = "Don't just rush through chapters. Revise the basics of your weak topics.";
  } else if (progressPercent > 80) {
    insight = "Almost done! Focus on mock tests and timing now.";
  } else if (progressPercent > 50) {
    insight = "Halfway there. Keep maintaining your streak.";
  } else if (progressPercent === 0) {
    insight = "Pick your favorite subject to start. Build momentum.";
  } else {
    insight = "Focus on completing one chapter at a time.";
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans text-slate-800 animate-page-enter">
      
      {/* 1. Greeting & Target */}
      <header className="space-y-3 animate-card delay-75">
        <h1 className="text-3xl font-bold text-slate-900">Hello, {profile.name}</h1>
        <div className="inline-flex items-center px-4 py-2 bg-indigo-50 rounded-full text-indigo-700 font-medium text-sm">
          Target: Score 95% in {profile.board}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 2. Syllabus Completion */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between min-h-[220px] animate-card delay-100 transition-shadow hover:shadow-md">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-4">Syllabus Completion</h2>
          
          <div className="flex items-center gap-6 flex-1">
            <div className="relative w-32 h-32 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    innerRadius={42}
                    outerRadius={56}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                    isAnimationActive={true}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-xl font-bold text-indigo-600">{progressPercent}%</span>
              </div>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <span className="text-slate-500">Completed: <span className="font-semibold text-slate-900">{completedChapters}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                <span className="text-slate-500">Remaining: <span className="font-semibold text-slate-900">{remainingChapters}</span></span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-50 text-slate-600 text-sm font-medium">
            {motivationLine}
          </div>
        </div>

        {/* 3. Smart Student Insight */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col min-h-[220px] animate-card delay-200 transition-shadow hover:shadow-md">
           <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-4">Smart Student Insight</h2>
           <div className="flex-1 flex items-center justify-center p-4 bg-indigo-50/50 rounded-xl">
             <p className="text-lg text-slate-700 font-medium leading-relaxed text-center">
               “{insight}”
             </p>
           </div>
        </div>
      </div>

      {/* 4. Subject Status */}
      <section className="animate-card delay-300">
        <h2 className="text-lg font-bold text-slate-800 mb-5 pl-1">Subject Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {profile.subjects.map(subject => {
            const subjectChapters = profile.syllabus.filter(s => s.subject === subject);
            const totalSub = subjectChapters.length;
            const attemptedSub = subjectChapters.filter(s => s.status !== ChapterStatus.NOT_STARTED).length;
            const subPercent = totalSub > 0 ? Math.round((attemptedSub / totalSub) * 100) : 0;
            
            return (
              <div key={subject} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-100 transition-all hover:shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-slate-800 text-sm">{subject}</h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-lg transition-colors ${
                    subPercent === 0 ? 'bg-slate-100 text-slate-500' : 'bg-green-50 text-green-700'
                  }`}>
                    {subPercent === 0 ? 'Not Started' : `${subPercent}%`}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${subPercent === 0 ? 'bg-transparent' : 'bg-indigo-500'}`} 
                    style={{ width: `${subPercent}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default Dashboard;