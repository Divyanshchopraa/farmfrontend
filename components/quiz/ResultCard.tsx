type ResultProps = {
  score: number;
  total: number;
  restart: () => void;
};

export default function ResultCard({ score, total, restart }: ResultProps) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Quiz Completed 🎉</h2>

      <p className="text-lg mb-6">
        Your Score: <span className="text-green-600 font-semibold">{score}</span> / {total}
      </p>

      <button
        onClick={restart}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
      >
        Restart Quiz
      </button>
    </div>
  );
}
