"use client";

import { useEffect, useState } from "react";
import { questions } from "@/lib/quiz";
import { Question, quizQuestions } from "@/lib/quizData";


export default function QuizPage() {
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Randomly pick 3 questions (client side only)
  useEffect(() => {
    const shuffled = [...quizQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    setSelectedQuestions(shuffled);
  }, []);

  if (selectedQuestions.length === 0) return null;

  const currentQuestion = selectedQuestions[currentIndex];

  const handleClick = (option: string) => {
    if (selectedOption) return;

    setSelectedOption(option);

    if (option === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      const next = currentIndex + 1;

      if (next < selectedQuestions.length) {
        setCurrentIndex(next);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        {showResult ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-800 outline-none select-none">
              Quiz Completed 🌾
            </h2>
            <p className="text-lg outline-none select-none">
              Your Score: {score} / {selectedQuestions.length}
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-2 text-green-900 outline-none select-none">
              Question {currentIndex + 1} / {selectedQuestions.length}
            </h2>

            <p className="mb-4 text-gray-800">
              {currentQuestion.question}
            </p>

            <div className="space-y-3 outline-none select-none">
              {currentQuestion.options.map((option, index) => {
                let buttonStyle =
                  "bg-green-800 text-white hover:bg-green-900";

                if (selectedOption) {
                  if (option === currentQuestion.answer) {
                    buttonStyle = "bg-green-500 text-white";
                  } else if (option === selectedOption) {
                    buttonStyle = "bg-red-500 text-white";
                  } else {
                    buttonStyle =
                      "bg-green-800 text-white opacity-60";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleClick(option)}
                    disabled={!!selectedOption}
                    className={`w-full p-3 rounded shadow-md transition-all duration-300 ${buttonStyle}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}