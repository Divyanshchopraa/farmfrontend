export type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};

export const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Which crop requires the most water?",
    options: ["Wheat", "Rice", "Maize", "Gram"],
    answer: "Rice",
  },
  {
    id: 2,
    question: "Which nutrient deficiency causes yellow leaves in plants?",
    options: ["Nitrogen", "Potassium", "Calcium", "Magnesium"],
    answer: "Nitrogen",
  },
  {
    id: 3,
    question: "Best season to grow wheat in India?",
    options: ["Kharif", "Rabi", "Summer", "Monsoon"],
    answer: "Rabi",
  },
  {
    id: 4,
    question: "Which crop is mainly grown in Punjab?",
    options: ["Tea", "Rice", "Coffee", "Rubber"],
    answer: "Rice",
  },
  {
    id: 5,
    question: "Which soil is best for cotton?",
    options: ["Black Soil", "Sandy Soil", "Red Soil", "Clay Soil"],
    answer: "Black Soil",
  },
  {
    id: 6,
    question: "Which pest commonly attacks rice crops?",
    options: ["Stem Borer", "Aphids", "Whitefly", "Locust"],
    answer: "Stem Borer",
  },
];
