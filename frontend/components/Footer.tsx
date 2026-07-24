export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full py-8 px-4 text-center text-gray-400 border-t">
      <p>&copy; {year} BreakPoint. All rights reserved.</p>
    </footer>
  );
}