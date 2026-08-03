import Link from "next/link";
import { Zap } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="relative z-10 w-full flex items-center justify-between px-6 py-4 bg-secondary-bg border-b border-border-subtle shadow-lg">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-button bg-gradient-to-br from-accent to-highlight flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <span className="text-xl font-bold text-text-primary">BreakPoint</span>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Link
          href="/register"
          className="bg-accent text-white px-4 py-2 rounded-button text-sm font-medium hover:brightness-110 active:brightness-90 transition cursor-pointer"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}