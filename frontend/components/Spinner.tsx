export default function Spinner() {
  return (
    <div
      className="w-6 h-6 border-2 border-gray-300 border-t-black dark:border-gray-600 dark:border-t-white rounded-full animate-spin"
      role="status"
      aria-label="Loading"
    />
  );
}