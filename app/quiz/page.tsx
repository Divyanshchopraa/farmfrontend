"use client";

import { useState } from "react";
import { questions } from "@/lib/quiz";

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // =========================
  // QUIZ FINISHED (MOBILE)
  // =========================
  if (current >= questions.length) {
    return (
      <div className="min-h-screen bg-green-50 px-4 pt-16 pb-32">
        <h1 className="text-2xl font-semibold text-green-700 text-center mb-2">
          Well Done 🎉
        </h1>

        <p className="text-sm text-gray-600 text-center mb-8">
          You completed the quiz
        </p>

        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-xs text-gray-500 text-center">Your Score</p>
          <p className="text-4xl font-bold text-green-700 text-center mt-2">
            {score}/{questions.length}
          </p>
        </div>

        <button
          onClick={() => {
            setCurrent(0);
            setScore(0);
            setSelected(null);
            setSubmitted(false);
          }}
          className="mt-10 w-full bg-green-600 text-white py-4 rounded-2xl text-sm font-medium active:scale-[0.96]"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  const q = questions[current];

  function getOptionStyle(index: number) {
    if (!submitted) return "border-gray-300";

    if (index === q.correct)
      return "border-green-600 bg-green-100 text-green-800";

    if (index === selected)
      return "border-red-600 bg-red-100 text-red-800";

    return "border-gray-300";
  }

  // =========================
  // QUIZ QUESTION (MOBILE)
  // =========================
  return (
    <div className="min-h-screen bg-green-50 px-4 pt-6 pb-32">
      {/* Top info */}
      <p className="text-xs text-gray-500 mb-1">
        Question {current + 1}/{questions.length}
      </p>

      <h1 className="text-lg font-semibold text-green-700 mb-6">
        Crop Knowledge Quiz 🌱
      </h1>

      {/* Question */}
      <p className="text-base font-medium text-gray-900 leading-relaxed mb-6">
        {q.question}
      </p>

      {/* Options (FULL WIDTH) */}
      <div className="space-y-4">
        {q.options.map((opt: string, i: number) => (
          <button
            key={i}
            disabled={submitted}
            onClick={() => setSelected(i)}
            className={`w-full px-4 py-4 rounded-2xl border text-sm text-left
              active:scale-[0.96]
              ${getOptionStyle(i)}
              ${selected === i && !submitted ? "border-green-600" : ""}
            `}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Bottom CTA */}
      {!submitted ? (
        <button
          disabled={selected === null}
          onClick={() => {
            if (selected === q.correct) {
              setScore((prev) => prev + 1);
            }
            setSubmitted(true);
          }}
          className="fixed bottom-20 left-4 right-4 bg-green-600 text-white py-4 rounded-2xl
                     text-sm font-medium disabled:opacity-40 active:scale-[0.96]"
        >
          Submit Answer
        </button>
      ) : (
        <button
          onClick={() => {
            setSubmitted(false);
            setSelected(null);
            setCurrent((prev) => prev + 1);
          }}
          className="fixed bottom-20 left-4 right-4 bg-green-600 text-white py-4 rounded-2xl
                     text-sm font-medium active:scale-[0.96]"
        >
          Next Question →
        </button>
      )}
    </div>
  );
}
