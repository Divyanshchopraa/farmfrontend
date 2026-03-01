export type QuizQuestion = {
  question: string;
  options: string[];
  correct: number;
};

export const questions: QuizQuestion[] = [
  {
    question: "Which crop requires the least water?",
    options: ["Rice", "Wheat", "Bajra", "Sugarcane"],
    correct: 2,
  },
  {
    question: "Early blight mainly affects which crop?",
    options: ["Rice", "Tomato", "Wheat", "Maize"],
    correct: 1,
  },
];
