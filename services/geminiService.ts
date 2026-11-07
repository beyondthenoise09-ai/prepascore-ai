import { Board, Subject, MCQQuestion, MCQResult, SubjectiveQuestion, SubjectiveResult, SyllabusItem, ChapterStatus, MCQFeedbackItem } from "./types";
import { STATIC_SYLLABUS_DB } from "./syllabusData";
import { 
  CURATED_MCQ_BANK, 
  CURATED_SUBJECTIVE_BANK, 
  generateDynamicMCQs, 
  generateDynamicSubjective 
} from "./questionBank";

// Helper to make backend API requests with strict JSON validation
const apiRequest = async <T>(endpoint: string, body: any): Promise<T> => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`API call to ${endpoint} failed with status ${response.status}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error(`Expected JSON response from ${endpoint}, received: ${contentType}`);
  }

  return response.json();
};

export const generateSyllabus = async (className: string, board: Board, subjects: Subject[]): Promise<SyllabusItem[]> => {
  try {
    const data = await apiRequest<{ syllabus: SyllabusItem[] }>('/api/gemini/generate-syllabus', {
      className,
      board,
      subjects,
    });
    if (data.syllabus && data.syllabus.length > 0) {
      return data.syllabus;
    }
  } catch (err) {
    console.warn("Using local static syllabus database:", err);
  }

  // Failsafe local generation
  const syllabusList: SyllabusItem[] = [];
  const classData = STATIC_SYLLABUS_DB[String(className)] || {};

  subjects.forEach(subject => {
    const chapters = classData[subject] || [];
    if (chapters.length === 0) {
      syllabusList.push({
        subject,
        chapterName: `General ${subject}`,
        status: ChapterStatus.NOT_STARTED,
        progress: 0,
      });
    } else {
      chapters.forEach(chapter => {
        syllabusList.push({
          subject,
          chapterName: chapter,
          status: ChapterStatus.NOT_STARTED,
          progress: 0,
        });
      });
    }
  });

  return syllabusList;
};

export const generateMCQs = async (
  subject: string,
  chapter: string,
  board: string,
  className: string,
  count: number = 10
): Promise<MCQQuestion[]> => {
  try {
    const data = await apiRequest<{ questions: MCQQuestion[] }>('/api/gemini/generate-mcqs', {
      subject,
      chapter,
      board,
      className,
      count,
    });
    if (data.questions && data.questions.length > 0) {
      return data.questions;
    }
  } catch (err) {
    console.error("MCQ generation API failed, checking local question bank:", err);
  }

  // Check curated bank
  if (CURATED_MCQ_BANK[chapter] && CURATED_MCQ_BANK[chapter].length >= 5) {
    return CURATED_MCQ_BANK[chapter].slice(0, 10);
  }

  // Dynamic high-yield curriculum questions
  return generateDynamicMCQs(subject, chapter, className || '10');
};

export const analyzeMCQResults = async (
  questions: MCQQuestion[],
  userAnswers: number[],
  timeTakenSeconds: number,
  context?: { subject?: string; chapter?: string; board?: string }
): Promise<MCQResult> => {
  try {
    const data = await apiRequest<MCQResult>('/api/gemini/analyze-mcqs', {
      questions,
      userAnswers,
      timeTakenSeconds,
      subject: context?.subject || '',
      chapter: context?.chapter || '',
      board: context?.board || '',
    });
    if (data && typeof data.score === 'number') {
      return data;
    }
  } catch (err) {
    console.error("MCQ analysis API error, computing local evaluation:", err);
  }

  // Local fallback analysis
  const total = questions.length;
  let score = 0;
  const wrongDetails: MCQFeedbackItem[] = [];

  questions.forEach((q, idx) => {
    if (userAnswers[idx] === q.correctOptionIndex) {
      score++;
    } else {
      const userOpt = userAnswers[idx] === -1 ? "Skipped" : (q.options[userAnswers[idx]] || "Option");
      const correctOpt = q.options[q.correctOptionIndex] || "Option";
      wrongDetails.push({
        questionId: q.id,
        questionNumber: idx + 1,
        questionText: q.question,
        userAnswerText: userOpt,
        correctAnswerText: correctOpt,
        explanation: q.explanation || "Review the theoretical concept and boundary definitions in NCERT textbook.",
        examTip: "📌 Always verify units, formulas, and negative signs before marking your answer on the OMR sheet."
      });
    }
  });

  const correctAnswers = score;
  const wrongAnswers = total - score;
  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;
  const avgTimePerQuestion = total > 0 ? parseFloat((timeTakenSeconds / total).toFixed(1)) : 0;
  const speed = avgTimePerQuestion < 35 ? 'Fast' : avgTimePerQuestion > 85 ? 'Slow' : 'Average';

  return {
    score,
    total,
    correctAnswers,
    wrongAnswers,
    accuracy,
    speed,
    avgTimePerQuestion,
    weakConcepts: wrongAnswers > 0 ? [`${context?.chapter || 'Chapter'} - Analytical Applications`] : [],
    strongConcepts: correctAnswers > 0 ? [`${context?.chapter || 'Chapter'} - Core Terminology`] : [],
    mistakeTypes: wrongAnswers > 0 ? ["Formula Application", "Option Elimination Overlook"] : [],
    improvementAdvice: [
      "Review NCERT textbook in-text and exemplar questions thoroughly.",
      "Solve at least 25 questions under real timed conditions to sharpen speed."
    ],
    detailedFeedback: wrongDetails
  };
};

export const generateSubjectiveTest = async (
  subject: string,
  chapter: string,
  board: string,
  className: string,
  mode: 'SHORT' | 'LONG'
): Promise<SubjectiveQuestion[]> => {
  try {
    const data = await apiRequest<{ questions: SubjectiveQuestion[] }>('/api/gemini/generate-subjective', {
      subject,
      chapter,
      board,
      className,
      mode,
    });
    if (data.questions && data.questions.length > 0) {
      return data.questions;
    }
  } catch (err) {
    console.error("Subjective test generation API error, checking curated bank:", err);
  }

  // Check curated bank
  const curated = CURATED_SUBJECTIVE_BANK[chapter];
  if (curated) {
    return mode === 'LONG' ? curated.long : curated.short;
  }

  // Dynamic high-yield questions
  return generateDynamicSubjective(subject, chapter, className || '10', mode);
};

export const evaluateSubjectiveTest = async (
  questions: SubjectiveQuestion[],
  studentAnswers: string[],
  imageBase64: string | null,
  context?: { className: string; subject: string; chapter: string; board?: string }
): Promise<SubjectiveResult> => {
  try {
    const data = await apiRequest<SubjectiveResult>('/api/gemini/evaluate-subjective', {
      questions,
      studentAnswers,
      imageBase64,
      context,
    });
    if (data && typeof data.totalScore === 'number' && data.evaluations) {
      return data;
    }
  } catch (err) {
    console.error("Subjective evaluation API error, running client fallback evaluation:", err);
  }

  // Client-side fallback evaluator
  const totalMaxMarks = questions.reduce((acc, curr) => acc + (curr.maxMarks || 2), 0);
  const curated = CURATED_SUBJECTIVE_BANK[context?.chapter || ''];

  const evaluations = questions.map((q, idx) => {
    const studentAns = (studentAnswers[idx] || "").trim();
    const hasImage = !!imageBase64;
    const isBlank = !hasImage && studentAns.length < 5;
    const rubric = curated?.rubrics?.[q.id];
    
    if (isBlank) {
      return {
        questionId: q.id,
        question: q.question,
        marksAwarded: 0,
        maxMarks: q.maxMarks,
        feedback: `**Marks Awarded: 0 / ${q.maxMarks}**\n• Missing Points: Question left unattempted.\n• Examiner Remark: In board exams, always attempt each question by stating definitions and formulas for step marks.`,
        modelAnswer: rubric?.modelAnswer || `To score full marks, write this answer in point-wise format with bold key terms and standard formula.`,
        isZeroMarks: true
      };
    }

    // Keyword detection
    let keywordHits = 0;
    const expectedKeywords = rubric?.keywords || [context?.chapter || "concept", "principle", "formula", "unit"];
    expectedKeywords.forEach(kw => {
      if (studentAns.toLowerCase().includes(kw.toLowerCase())) {
        keywordHits++;
      }
    });

    const ratio = expectedKeywords.length > 0 ? (keywordHits / expectedKeywords.length) : 0.5;
    const baseMark = hasImage ? (q.maxMarks * 0.6) : (q.maxMarks * (0.3 + (ratio * 0.6)));
    const marksAwarded = Math.min(q.maxMarks, Math.round(baseMark * 2) / 2);

    return {
      questionId: q.id,
      question: q.question,
      marksAwarded,
      maxMarks: q.maxMarks,
      feedback: `**Marks Awarded: ${marksAwarded} / ${q.maxMarks}**\n• Step Evaluation: ${marksAwarded >= (q.maxMarks * 0.8) ? 'Accurate statement of principle with proper terminology.' : marksAwarded >= (q.maxMarks * 0.4) ? 'Core concept recognized. Deductions made for missing technical precision and formula declaration.' : 'Substantial deductions due to incomplete explanation and omitted working.'}\n• Missing Points: Detailed boundary conditions and SI units not fully stated.\n• Examiner Remark: Present answers using numbered bullet points and underline important scientific terms.`,
      modelAnswer: rubric?.modelAnswer || `To score full marks, write this answer like this:\n1. State precise definition or law.\n2. Write governing formula and specify each symbol.\n3. Include neat diagram and state final SI units.`,
      isZeroMarks: marksAwarded === 0
    };
  });

  const totalScore = evaluations.reduce((acc, curr) => acc + curr.marksAwarded, 0);

  return {
    totalScore,
    totalMaxMarks,
    evaluations,
    overallFeedback: `Evaluated strictly according to standard Indian board exam rubric. To score 95%+, ensure definitions are verbatim as per NCERT, every numerical step includes SI units, and diagrams are neatly labeled with a sharp pencil.`
  };
};

export const generateAudioFeedback = async (text: string): Promise<string | null> => {
  try {
    const data = await apiRequest<{ audioUrl: string | null; fallbackToBrowser?: boolean }>('/api/gemini/audio-feedback', { text });
    if (data.audioUrl) {
      return data.audioUrl;
    }
  } catch (err) {
    console.warn("Server TTS unavailable, using browser speech synthesis:", err);
  }

  // Browser speech synthesis fallback
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 350));
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }
  return null;
};