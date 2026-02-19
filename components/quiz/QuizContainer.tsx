"use client";

import { useState, useEffect } from "react";
import { quizQuestions, Question } from "@/lib/quizData";
import QuestionCard from "./QuestionCard";

export default function QuizContainer() {
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Shuffle + pick 3 questions (client side)
  useEffect(() => {
    const shuffled = [...quizQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    setSelectedQuestions(shuffled);
  }, []);

  const handleAnswer = (selectedOption: string) => {
    if (selectedOption === selectedQuestions[currentIndex].answer) {
      setScore((prev) => prev + 1);
    }

    const next = currentIndex + 1;

    if (next < selectedQuestions.length) {
      setCurrentIndex(next);
    } else {
      setShowResult(true);
    }
  };

  if (selectedQuestions.length === 0) return null;

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        {showResult ? (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Quiz Completed 🌾</h2>
            <p className="text-lg">
              Your Score: {score} / {selectedQuestions.length}
            </p>
          </div>
        ) : (
          <QuestionCard
            questionData={selectedQuestions[currentIndex]}
            questionNumber={currentIndex + 1}
            totalQuestions={selectedQuestions.length}
            onAnswer={handleAnswer}
          />
        )}
      </div>
    </div>
  );
}
