import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TestZone from './components/TestZone';
import ProfileSetup from './components/ProfileSetup';
import Profile from './components/Profile';
import { StudentProfile, ChapterStatus } from './services/types';
import { generateSyllabus } from './services/geminiService';

const App: React.FC = () => {
  // Initialize state from localStorage to ensure persistence
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(() => {
    try {
      const saved = localStorage.getItem('exameval_profile');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("Failed to load profile", e);
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const isRegeneratingSyllabus = useRef(false);

  // Check for syllabus integrity
  useEffect(() => {
    const verifySyllabus = async () => {
        // Only run if profile exists but has empty syllabus, and we aren't already working on it.
        if (studentProfile && studentProfile.syllabus.length === 0 && !isRegeneratingSyllabus.current) {
            console.log("Syllabus missing. Re-generating...");
            isRegeneratingSyllabus.current = true;
            try {
                const newSyllabus = await generateSyllabus(studentProfile.className, studentProfile.board, studentProfile.subjects);
                // Ensure we only update if we actually got a syllabus back to prevent loop
                if (newSyllabus.length > 0) {
                     const updatedProfile = { ...studentProfile, syllabus: newSyllabus };
                     setStudentProfile(updatedProfile);
                     localStorage.setItem('exameval_profile', JSON.stringify(updatedProfile));
                }
            } catch (e) {
                console.error("Failed to recover syllabus", e);
            } finally {
                isRegeneratingSyllabus.current = false;
            }
        }
    };
    verifySyllabus();
  }, [studentProfile]);

  const handleProfileCreated = (profile: StudentProfile) => {
    setStudentProfile(profile);
    localStorage.setItem('exameval_profile', JSON.stringify(profile));
    setActiveTab('dashboard'); // Ensure navigation to dashboard
  };

  const handleUpdateSyllabus = (chapterName: string, newStatus: ChapterStatus) => {
    if (!studentProfile) return;

    const updatedSyllabus = studentProfile.syllabus.map(item => {
      if (item.chapterName === chapterName) {
        return { ...item, status: newStatus, progress: newStatus === ChapterStatus.STRONG ? 100 : newStatus === ChapterStatus.PRACTICED ? 70 : 30 };
      }
      return item;
    });

    const updatedProfile = {
      ...studentProfile,
      syllabus: updatedSyllabus
    };

    setStudentProfile(updatedProfile);
    localStorage.setItem('exameval_profile', JSON.stringify(updatedProfile));
  };

  const handleLogout = () => {
    setStudentProfile(null);
    localStorage.removeItem('exameval_profile');
    localStorage.removeItem('exameval_test_state'); // Also clear test state
    setActiveTab('dashboard');
  };

  const handleResetProgress = () => {
    if (!studentProfile) return;

    const resetSyllabus = studentProfile.syllabus.map(item => ({
      ...item,
      status: ChapterStatus.NOT_STARTED,
      progress: 0
    }));

    const updatedProfile = {
      ...studentProfile,
      syllabus: resetSyllabus
    };

    setStudentProfile(updatedProfile);
    localStorage.setItem('exameval_profile', JSON.stringify(updatedProfile));
  };

  if (!studentProfile) {
    return <ProfileSetup onProfileCreated={handleProfileCreated} />;
  }

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'dashboard' && <Dashboard profile={studentProfile} />}
      {activeTab === 'test-zone' && (
        <TestZone 
          profile={studentProfile} 
          onUpdateSyllabus={handleUpdateSyllabus} 
        />
      )}
      {activeTab === 'profile' && (
        <Profile 
          profile={studentProfile} 
          onLogout={handleLogout}
          onResetProgress={handleResetProgress}
        />
      )}
    </Layout>
  );
};

export default App;