import { Zap } from "lucide-react";
import Button from "@/components/Button";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="relative z-10 w-full flex items-center justify-between px-6 py-4 bg-secondary-bg border-b border-border-subtle shadow-lg">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-button bg-gradient-to-br from-accent to-highlight flex items-center justify-center">
          <Zap className="w-4 h-4 text-text-primary" />
        </div>
        <span className="text-xl font-bold text-text-primary">BreakPoint</span>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button>Get Started</Button>
      </div>
    </nav>
  );
}