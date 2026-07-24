"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold mb-2">Something went wrong</h1>
      <p className="text-gray-500 mb-6 max-w-md">
        An unexpected error occurred. You can try again, or head back to the homepage.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition"
        >
          Try Again
        </button>
        
          href="/"
          className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-100 transition"
        <a>
          Back to Home
        </a>
      </div>
    </div>
  );
}