export type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};

export const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What is the primary function of chloroplasts in plant cells?",
    options: [
      "To store water",
      "To produce energy through photosynthesis",
      "To break down waste materials",
      "To transport nutrients"
    ],
    answer: "To produce energy through photosynthesis"
  },
  {
    id: 2,
    question: "Which gas is most abundant in Earth's atmosphere?",
    options: [
      "Oxygen",
      "Carbon dioxide",
      "Nitrogen",
      "Argon"
    ],
    answer: "Nitrogen"
  },
  {
    id: 3,
    question: "What is the process by which plants convert sunlight into chemical energy?",
    options: [
      "Respiration",
      "Fermentation",
      "Photosynthesis",
      "Transpiration"
    ],
    answer: "Photosynthesis"
  }
];
