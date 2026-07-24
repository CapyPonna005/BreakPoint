import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-bold mb-2">404</h1>
      <p className="text-gray-500 mb-6">
        This page doesn't exist — looks like you hit a breakpoint we didn't set.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}