"use client";

import { useState, useEffect } from "react";
import type { Question } from "@/lib/quizData";

type QuestionCardProps = {
  questionData: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (selectedOption: string) => void;
};

export default function QuestionCard({
  questionData,
  questionNumber,
  totalQuestions,
  onAnswer,
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    setSelectedOption(null);
  }, [questionData]);

  const handleClick = (option: string) => {
    if (selectedOption) return;

    setSelectedOption(option);

    setTimeout(() => {
      onAnswer(option);
    }, 1000);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">
        Question {questionNumber} / {totalQuestions}
      </h2>

      <p className="mb-4 text-gray-800">{questionData.question}</p>

      <div className="space-y-3">
        {questionData.options.map((option, index) => {
          let bgColor = "bg-green-700 text-white";

          if (selectedOption) {
            if (option === questionData.answer) {
              bgColor = "bg-green-500 text-white";
            } else if (option === selectedOption) {
              bgColor = "bg-red-500 text-white";
            } else {
              bgColor = "bg-green-700 text-white opacity-60";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleClick(option)}
              disabled={!!selectedOption}
              className={`w-full p-3 rounded shadow-md transition-all duration-300 hover:scale-105 ${bgColor}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
