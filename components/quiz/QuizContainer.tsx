"use client";

import { useState, useEffect } from "react";
import { quizQuestions } from "@/lib/quizData";
import QuestionCard from "./QuestionCard";
import ResultCard from "./ResultCard";

export default function QuizContainer() {
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // ✅ Run randomization only on client after mount
  useEffect(() => {
    const shuffled = [...quizQuestions]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    setSelectedQuestions(shuffled);
  }, []);

  const handleAnswer = (selectedOption: string) => {
    if (selectedOption === selectedQuestions[currentQuestion].answer) {
      setScore(prev => prev + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < selectedQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    window.location.reload();
  };

  // ⛔ Prevent rendering before questions are ready
  if (selectedQuestions.length === 0) return null;

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
      {showResult ? (
        <ResultCard
          score={score}
          total={selectedQuestions.length}
          restart={restartQuiz}
        />
      ) : (
        <QuestionCard
          questionData={selectedQuestions[currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={selectedQuestions.length}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}
