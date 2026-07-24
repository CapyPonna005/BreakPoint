import Button from "@/components/Button";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
      <span className="text-xl font-bold">BreakPoint</span>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button>Get Started</Button>
      </div>
    </nav>
  );
}