// components/analysis/result.tsx

export default function ResultScreen({ data }: { data: any }) {
  return (
    <div className="min-h-screen bg-green-50 px-4 pt-6 pb-32">
      <h1 className="text-lg font-semibold text-green-700 mb-4">
        Crop Analysis Result 🌱
      </h1>

      <div className="bg-white rounded-2xl p-4 shadow space-y-4">
        <p className="text-sm">
          <span className="font-medium">Crop:</span> {data.crop_name}
        </p>

        <p className="text-sm">
          <span className="font-medium">Issue:</span> {data.disease_or_issue}
        </p>

        <p className="text-sm">
          <span className="font-medium">Confidence:</span>{" "}
          {data.confidence_level}
        </p>

        <div>
          <p className="text-sm font-medium mb-1">Analysis</p>
          <p className="text-sm text-gray-700">{data.analysis}</p>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">
            Recommended Measures
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            {data.recommended_measures.map((step: string, i: number) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
