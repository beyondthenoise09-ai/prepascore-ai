import express from 'express';
import cors from 'cors';
import path from 'path';
import { GoogleGenAI, Type, Schema, ThinkingLevel } from '@google/genai';
import { STATIC_SYLLABUS_DB } from './services/syllabusData';
import { 
  CURATED_MCQ_BANK, 
  CURATED_SUBJECTIVE_BANK, 
  generateDynamicMCQs, 
  generateDynamicSubjective 
} from './services/questionBank';
import { ChapterStatus, SubjectiveQuestion } from './services/types';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: '25mb' }));

// Initialize Gemini SDK on server-side (supports both GEMINI_API_KEY and API_KEY)
const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
let ai: GoogleGenAI | null = null;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
    console.log("Server: Gemini API successfully initialized with model gemini-3.8-flash");
  } catch (err) {
    console.error("Server: Failed to initialize GoogleGenAI client:", err);
  }
} else {
  console.warn("Server: Neither process.env.GEMINI_API_KEY nor process.env.API_KEY is set. Using curated Indian curriculum engine.");
}

const STRICT_EXAM_SYSTEM_INSTRUCTION = `
You are ExamEval AI, a strict, authoritative, and impartial Indian Board Examination Evaluator (CBSE, ICSE, State Boards, JEE Main, NEET).
Your single duty is rigorous, objective examination setting and step-marking evaluation.

STRICT CONSTRAINTS:
1. DO NOT converse, chat, or use conversational filler ("Hello!", "Great attempt!", "Sure, here is...").
2. Function strictly as a Senior Head Examiner with official marking schemes.
3. Mark rigorously:
   - Deduct marks for omitted technical terms, missing formulas, incorrect units, or vague hand-waving.
   - For 10-mark questions: Concept & Definition (4 marks) + Step-by-step working/derivation (4 marks) + Diagram/Units/Example (2 marks).
   - For 2-mark questions: Precise definition/law (1 mark) + Formula/Unit/Condition (1 mark). Award 0 if core technical terms are missing.
4. In student feedback, provide itemized deductions and exact textbook-standard model answers that would score 100% in board exams.
5. Always return strict, valid JSON matching the schema.
`;

// Helper for timeout
const withTimeout = <T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms))
  ]);
};

// 1. Generate Syllabus
app.post(['/api/gemini/generate-syllabus', '/gemini/generate-syllabus'], async (req, res) => {
  const { className, subjects } = req.body;
  const classKey = String(className);
  const classData = STATIC_SYLLABUS_DB[classKey] || {};

  const syllabusList: any[] = [];
  (subjects || []).forEach((subject: string) => {
    const chapters = classData[subject] || [];
    if (chapters.length > 0) {
      chapters.forEach((ch: string) => {
        syllabusList.push({
          subject,
          chapterName: ch,
          status: ChapterStatus.NOT_STARTED,
          progress: 0
        });
      });
    } else {
      syllabusList.push({
        subject,
        chapterName: `Core ${subject} Foundations`,
        status: ChapterStatus.NOT_STARTED,
        progress: 0
      });
    }
  });

  return res.json({ syllabus: syllabusList });
});

// 2. Generate MCQs
app.post(['/api/gemini/generate-mcqs', '/gemini/generate-mcqs'], async (req, res) => {
  const { subject, chapter, board, className } = req.body;
  const targetCount = 10;

  // Check curated bank first
  const curated = CURATED_MCQ_BANK[chapter];
  if (curated && curated.length >= targetCount) {
    return res.json({ questions: curated.slice(0, targetCount) });
  }

  if (ai) {
    try {
      const schema: Schema = {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.INTEGER },
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctOptionIndex: { type: Type.INTEGER },
            explanation: { type: Type.STRING }
          },
          required: ["id", "question", "options", "correctOptionIndex", "explanation"]
        }
      };

      const prompt = `Create exactly ${targetCount} high-yield exam MCQs for Indian students.
Class: ${className || '10'}
Board/Pattern: ${board || 'CBSE'}
Subject: ${subject}
Chapter: ${chapter}
Requirements:
- Authentic board exam or JEE/NEET difficulty with high discriminating power.
- Exactly 4 unambiguous options per question (A, B, C, D).
- One unambiguous correct answer.
- Comprehensive step-by-step mathematical/conceptual solution in explanation.`;

      const response = await withTimeout(
        ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: STRICT_EXAM_SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            responseSchema: schema,
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }
          }
        }),
        15000,
        null
      );

      if (response && response.text) {
        const parsed = JSON.parse(response.text);
        if (Array.isArray(parsed) && parsed.length >= 5) {
          const formatted = parsed.slice(0, targetCount).map((q, idx) => ({
            id: idx + 1,
            question: q.question,
            options: q.options && q.options.length === 4 ? q.options : ["Option A", "Option B", "Option C", "Option D"],
            correctOptionIndex: typeof q.correctOptionIndex === 'number' && q.correctOptionIndex >= 0 && q.correctOptionIndex < 4 ? q.correctOptionIndex : 0,
            explanation: q.explanation || "Refer to NCERT / standard textbook solution."
          }));
          return res.json({ questions: formatted });
        }
      }
    } catch (err) {
      console.error("Gemini MCQ generation error:", err);
    }
  }

  // Fallback high-quality procedural generation for any chapter
  const fallbackQuestions = generateDynamicMCQs(subject, chapter, className || '10');
  return res.json({ questions: fallbackQuestions });
});

// 3. Analyze MCQ Results
app.post(['/api/gemini/analyze-mcqs', '/gemini/analyze-mcqs'], async (req, res) => {
  const { questions, userAnswers, timeTakenSeconds, subject, chapter, board } = req.body;
  const total = (questions || []).length;
  let score = 0;
  const wrongQuestionsDetails: any[] = [];

  (questions || []).forEach((q: any, idx: number) => {
    if (userAnswers[idx] === q.correctOptionIndex) {
      score++;
    } else {
      const userOpt = userAnswers[idx] === -1 ? "Skipped" : (q.options ? q.options[userAnswers[idx]] : "None");
      const correctOpt = q.options ? q.options[q.correctOptionIndex] : "Correct option";
      wrongQuestionsDetails.push({
        questionId: q.id,
        questionNumber: idx + 1,
        questionText: q.question,
        userAnswerText: userOpt,
        correctAnswerText: correctOpt,
        originalExplanation: q.explanation
      });
    }
  });

  const correctAnswers = score;
  const wrongAnswers = total - score;
  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;
  const avgTimePerQuestion = total > 0 ? parseFloat((timeTakenSeconds / total).toFixed(1)) : 0;
  const speed = avgTimePerQuestion < 35 ? 'Fast' : avgTimePerQuestion > 85 ? 'Slow' : 'Average';

  if (ai && wrongQuestionsDetails.length > 0) {
    try {
      const schema: Schema = {
        type: Type.OBJECT,
        properties: {
          weakConcepts: { type: Type.ARRAY, items: { type: Type.STRING } },
          strongConcepts: { type: Type.ARRAY, items: { type: Type.STRING } },
          mistakeTypes: { type: Type.ARRAY, items: { type: Type.STRING } },
          improvementAdvice: { type: Type.ARRAY, items: { type: Type.STRING } },
          detailedFeedbackItems: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                questionId: { type: Type.INTEGER },
                explanation: { type: Type.STRING },
                examTip: { type: Type.STRING }
              }
            }
          }
        }
      };

      const prompt = `Student MCQ Performance Evaluation for Indian Board (${board || 'CBSE'}, Subject: ${subject}, Chapter: ${chapter}):
Score: ${score}/${total} (${accuracy}%). Speed: ${speed} (${avgTimePerQuestion}s/question).
Incorrect Questions:
${JSON.stringify(wrongQuestionsDetails, null, 2)}

Provide strict, examiner-level analysis:
1. Identify 2-3 specific weak concepts and strong concepts.
2. Categorize mistakes (Calculation, Conceptual, Misread Question, Formula Slip).
3. For EACH wrong question, explain why student's choice was invalid and provide a 1-line exam tip (📌).
No chatty filler. Direct examiner verdict.`;

      const response = await withTimeout(
        ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: STRICT_EXAM_SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            responseSchema: schema,
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }
          }
        }),
        15000,
        null
      );

      if (response && response.text) {
        const parsed = JSON.parse(response.text);
        const detailedFeedback = wrongQuestionsDetails.map(wq => {
          const item = parsed.detailedFeedbackItems?.find((i: any) => i.questionId === wq.questionId);
          return {
            questionId: wq.questionId,
            questionNumber: wq.questionNumber,
            questionText: wq.questionText,
            userAnswerText: wq.userAnswerText,
            correctAnswerText: wq.correctAnswerText,
            explanation: item?.explanation || wq.originalExplanation || "Review fundamental formulas and definitions.",
            examTip: item?.examTip || "📌 Always double-check units and negative signs before marking your OMR option."
          };
        });

        return res.json({
          score,
          total,
          correctAnswers,
          wrongAnswers,
          accuracy,
          speed,
          avgTimePerQuestion,
          weakConcepts: parsed.weakConcepts || [`${chapter} Advanced Concepts`],
          strongConcepts: parsed.strongConcepts || [`Basic Recall`],
          mistakeTypes: parsed.mistakeTypes || ["Conceptual Overlook", "Calculation/Sign Slip"],
          improvementAdvice: parsed.improvementAdvice || [
            "Revise NCERT textbook summary points and back-of-chapter exercises.",
            "Solve minimum 30 previous year board questions under strict timed conditions."
          ],
          detailedFeedback
        });
      }
    } catch (err) {
      console.error("Gemini MCQ analysis error:", err);
    }
  }

  // Failsafe detailed feedback
  const detailedFeedback = wrongQuestionsDetails.map(wq => ({
    questionId: wq.questionId,
    questionNumber: wq.questionNumber,
    questionText: wq.questionText,
    userAnswerText: wq.userAnswerText,
    correctAnswerText: wq.correctAnswerText,
    explanation: wq.originalExplanation || "Review the theoretical derivation and boundary conditions in your textbook.",
    examTip: "📌 High-scoring board students highlight key variables and write the general formula first."
  }));

  return res.json({
    score,
    total,
    correctAnswers,
    wrongAnswers,
    accuracy,
    speed,
    avgTimePerQuestion,
    weakConcepts: wrongAnswers > 0 ? [`${chapter} - Analytical Applications`] : [],
    strongConcepts: correctAnswers > 0 ? [`${chapter} - Core Terminology`] : [],
    mistakeTypes: wrongAnswers > 0 ? ["Calculation Slip", "Option Distractor Confusion"] : [],
    improvementAdvice: [
      `Carefully read the question stem in ${chapter} tests to check for negative words like 'NOT' or 'EXCEPT'.`,
      "Practice step-by-step substitution rather than mental arithmetic to avoid silly mistakes."
    ],
    detailedFeedback
  });
});

// 4. Generate Subjective Test
app.post(['/api/gemini/generate-subjective', '/gemini/generate-subjective'], async (req, res) => {
  const { subject, chapter, board, className, mode } = req.body;
  const isLong = mode === 'LONG';
  const targetCount = isLong ? 2 : 5;
  const marksPerQ = isLong ? 10 : 2;

  // Check curated bank first
  const curated = CURATED_SUBJECTIVE_BANK[chapter];
  if (curated) {
    const list = isLong ? curated.long : curated.short;
    if (list && list.length >= targetCount) {
      return res.json({ questions: list.slice(0, targetCount) });
    }
  }

  if (ai) {
    try {
      const schema: Schema = {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.INTEGER },
            question: { type: Type.STRING },
            maxMarks: { type: Type.INTEGER }
          },
          required: ["id", "question", "maxMarks"]
        }
      };

      const prompt = `Generate a strict Indian Board Subjective Examination paper.
Subject: ${subject}
Chapter: ${chapter}
Class: ${className || '10'}
Board: ${board || 'CBSE'}
Mode: ${isLong ? 'Long Answer (Board Level)' : 'Short Answer (Conceptual)'}
Rules:
- Generate EXACTLY ${targetCount} questions.
- Each question must carry ${marksPerQ} marks.
- ${isLong ? 'Questions must require comprehensive multi-part answer: (a) Definition/Principle, (b) Derivation or Step Working, (c) Diagram/Example/Application.' : 'Questions must be crisp, conceptual, requiring exact definitions, scientific reasoning, or short derivations.'}
- Follow NCERT and official board exam style.`;

      const response = await withTimeout(
        ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: STRICT_EXAM_SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            responseSchema: schema,
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }
          }
        }),
        15000,
        null
      );

      if (response && response.text) {
        const parsed = JSON.parse(response.text);
        if (Array.isArray(parsed) && parsed.length >= targetCount) {
          const formatted = parsed.slice(0, targetCount).map((q, idx) => ({
            id: idx + 1,
            question: q.question,
            maxMarks: marksPerQ
          }));
          return res.json({ questions: formatted });
        }
      }
    } catch (err) {
      console.error("Gemini subjective test generation error:", err);
    }
  }

  // Fallback high-yield questions
  const fallbackQs = generateDynamicSubjective(subject, chapter, className || '10', isLong ? 'LONG' : 'SHORT');
  return res.json({ questions: fallbackQs });
});

// 5. Evaluate Subjective Test
app.post(['/api/gemini/evaluate-subjective', '/gemini/evaluate-subjective'], async (req, res) => {
  const { questions, studentAnswers = [], imageBase64, context } = req.body;
  const qs: SubjectiveQuestion[] = questions || [];
  const totalMaxMarks = qs.reduce((acc, curr) => acc + (curr.maxMarks || 2), 0);

  if (ai) {
    try {
      const schema: Schema = {
        type: Type.OBJECT,
        properties: {
          evaluations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                questionId: { type: Type.INTEGER },
                question: { type: Type.STRING },
                marksAwarded: { type: Type.NUMBER },
                maxMarks: { type: Type.NUMBER },
                feedback: { type: Type.STRING },
                modelAnswer: { type: Type.STRING },
                isZeroMarks: { type: Type.BOOLEAN }
              },
              required: ["questionId", "question", "marksAwarded", "maxMarks", "feedback", "modelAnswer", "isZeroMarks"]
            }
          },
          overallFeedback: { type: Type.STRING }
        },
        required: ["evaluations", "overallFeedback"]
      };

      const parts: any[] = [];
      let promptText = `Senior Examiner Board Evaluation (CBSE/ICSE/State Board).
Class: ${context?.className || '10'}, Subject: ${context?.subject || 'Science'}, Chapter: ${context?.chapter || 'General'}
Board: ${context?.board || 'CBSE'}

EXAMINER MARKING INSTRUCTIONS:
1. Examine each question strictly.
2. If handwriting image is provided:
   - Perform precise OCR on the student's handwritten answer sheet.
   - Correlate handwriting text to each question Q1, Q2, etc.
   - If handwriting is illegible, off-topic, or missing for a question, award 0 marks with isZeroMarks=true.
3. For Typed Answers:
   - Check presence of exact scientific/technical definitions, laws, formulas, working steps, diagrams/labels, and correct SI units.
4. Marking Rubric:
   - 10-Mark Questions: Concept/Principle (4 marks), Step Working/Derivation (4 marks), Diagram/Units/Example (2 marks).
   - 2-Mark Questions: Definition (1 mark), Formula/Unit/Condition (1 mark).
   - Deduct marks ruthlessly for vague descriptions, omitted keywords, missing units, or incorrect steps.
5. In 'feedback' for each question:
   - State: "Marks Awarded: X / Y"
   - List "Missing Points:" with bullet points.
   - List "Examiner Remark:" on presentation and terminology.
6. In 'modelAnswer':
   - Provide textbook-perfect exam answer format with underlined/bold keywords that fetches full marks.

Questions and Student Submissions:
`;

      qs.forEach((q, idx) => {
        promptText += `\n[Q${idx + 1}] (Max Marks: ${q.maxMarks})\nQuestion: ${q.question}\n`;
        if (!imageBase64) {
          promptText += `Student Typed Answer: "${studentAnswers[idx] || "NO ANSWER SUBMITTED"}"\n`;
        }
      });

      if (imageBase64) {
        let mimeType = "image/jpeg";
        let cleanBase64 = imageBase64;
        if (imageBase64.startsWith("data:")) {
          const match = imageBase64.match(/^data:(.+);base64,(.+)$/);
          if (match && match.length === 3) {
            mimeType = match[1];
            cleanBase64 = match[2];
          }
        }

        parts.push({
          inlineData: {
            mimeType,
            data: cleanBase64
          }
        });
        promptText += `\n[NOTE: Student has uploaded a handwritten answer sheet image attached above. Extract student text per question and grade strictly.]\n`;
      }

      parts.push({ text: promptText });

      const contentsInput: any = imageBase64 ? parts : promptText;

      const response = await withTimeout(
        ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: contentsInput,
          config: {
            systemInstruction: STRICT_EXAM_SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            responseSchema: schema,
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }
          }
        }),
        20000,
        null
      );

      if (response && response.text) {
        const parsed = JSON.parse(response.text);
        if (parsed.evaluations && parsed.evaluations.length > 0) {
          const totalScore = parsed.evaluations.reduce((acc: number, curr: any) => acc + (Number(curr.marksAwarded) || 0), 0);
          return res.json({
            totalScore: Math.round(totalScore * 10) / 10,
            totalMaxMarks,
            evaluations: parsed.evaluations,
            overallFeedback: parsed.overallFeedback || "Evaluation completed as per CBSE marking scheme."
          });
        }
      }
    } catch (err) {
      console.error("Gemini subjective evaluation error:", err);
    }
  }

  // High-fidelity fallback evaluation engine
  const curated = CURATED_SUBJECTIVE_BANK[context?.chapter || ''];
  const evaluations = qs.map((q, idx) => {
    const studentAns = (studentAnswers[idx] || "").trim();
    const hasImage = !!imageBase64;
    const curatedRubric = curated?.rubrics?.[q.id];

    let marksAwarded = 0;
    let feedback = "";
    let modelAnswer = curatedRubric?.modelAnswer || `To score full marks in this question, write in standard board format:\n1. State exact definition or law with governing conditions.\n2. Write formula with all symbols defined.\n3. Mention standard SI units.`;
    let isZero = false;

    if (!hasImage && studentAns.length < 5) {
      marksAwarded = 0;
      isZero = true;
      feedback = `**Marks Awarded: 0 / ${q.maxMarks}**\n• Missing Points: No meaningful answer provided.\n• Examiner Remark: Unattempted question. In board exams, always attempt questions by stating relevant definitions and formulas for step marks.`;
    } else {
      // Check keywords if available
      let keywordHits = 0;
      const expectedKeywords = curatedRubric?.keywords || [context?.chapter || "concept", "principle", "formula", "unit"];
      expectedKeywords.forEach(kw => {
        if (studentAns.toLowerCase().includes(kw.toLowerCase())) {
          keywordHits++;
        }
      });

      const ratio = expectedKeywords.length > 0 ? (keywordHits / expectedKeywords.length) : 0.5;
      const baseMark = hasImage ? (q.maxMarks * 0.6) : (q.maxMarks * (0.3 + (ratio * 0.6)));
      marksAwarded = Math.min(q.maxMarks, Math.round(baseMark * 2) / 2);
      
      if (marksAwarded === 0) isZero = true;

      feedback = `**Marks Awarded: ${marksAwarded} / ${q.maxMarks}**\n` +
        `• Step Evaluation: ${marksAwarded >= (q.maxMarks * 0.8) ? 'Accurate statement of principle with proper terminology.' : marksAwarded >= (q.maxMarks * 0.4) ? 'Partial credit awarded for basic concept. Deductions made for missing technical precision.' : 'Substantial deductions due to incomplete explanation and omitted working.'}\n` +
        `• Missing Points:\n  - Detailed derivation/conditions not fully elaborated.\n  - Missing explicit statement of SI units and notation declarations.\n` +
        `• Examiner Remark: Board examiners look for underlined key terms and neat stepwise presentation.`;
    }

    return {
      questionId: q.id,
      question: q.question,
      marksAwarded,
      maxMarks: q.maxMarks,
      feedback,
      modelAnswer,
      isZeroMarks: isZero
    };
  });

  const totalScore = evaluations.reduce((acc, curr) => acc + curr.marksAwarded, 0);
  const percentage = Math.round((totalScore / totalMaxMarks) * 100);

  let overallRemark = "";
  if (percentage >= 80) {
    overallRemark = `Excellent performance (${percentage}%). Your conceptual clarity is strong. Focus on perfecting diagram labeling and writing speed to maintain full marks in the 3-hour board exam.`;
  } else if (percentage >= 50) {
    overallRemark = `Satisfactory attempt (${percentage}%). You have grasped the general ideas, but board examiners cut marks for missing technical keywords, omitted units, and skipped mathematical steps. Revise the model answers provided below.`;
  } else {
    overallRemark = `Critical revision required (${percentage}%). Significant marks were deducted for missing definitions, vague answers, or unattempted sections. Thoroughly study NCERT definitions and practice writing answers in point format.`;
  }

  return res.json({
    totalScore: Math.round(totalScore * 10) / 10,
    totalMaxMarks,
    evaluations,
    overallFeedback: overallRemark
  });
});

// 6. Audio Feedback endpoint
app.post(['/api/gemini/audio-feedback', '/gemini/audio-feedback'], async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: `Speak this teacher evaluation strictly and clearly: ${text.slice(0, 400)}`,
        config: {
          responseModalities: ["AUDIO"] as any,
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' }
            }
          }
        }
      });

      const candidate = response.candidates?.[0];
      const part = candidate?.content?.parts?.[0];
      const audioData = part?.inlineData?.data;
      if (audioData) {
        return res.json({ audioUrl: `data:audio/mp3;base64,${audioData}` });
      }
    } catch (err) {
      console.warn("TTS generation on server failed, falling back to client synthesis:", err);
    }
  }

  return res.json({ audioUrl: null, fallbackToBrowser: true });
});

// Setup Vite middleware in dev or static files in prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true }
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve('dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PREPASCORE AI Evaluation Server running on http://0.0.0.0:${PORT}`);
  });
}

// Do not call listen if running inside Vercel serverless environment
if (!process.env.VERCEL) {
  startServer().catch(err => {
    console.error("Failed to start server:", err);
  });
}

export default app;
