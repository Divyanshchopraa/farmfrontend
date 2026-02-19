// components/analysis/loadingscreen.tsx

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-gray-600">
          Analyzing crop image...
        </p>
      </div>
    </div>
  );
}
