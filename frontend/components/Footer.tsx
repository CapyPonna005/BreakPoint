import Link from "next/link";
import { Zap, LogIn, UserPlus } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface border-t border-border-subtle py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 items-center gap-6">
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <div className="w-7 h-7 rounded-button bg-gradient-to-br from-accent to-highlight flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold text-text-primary">BreakPoint</span>
        </div>

        <div className="flex items-center justify-center gap-6">
          <Link
            href="/login"
            className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition"
          >
            <LogIn className="w-3.5 h-3.5" />
            Log in
          </Link>
          <Link
            href="/register"
            className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Sign up
          </Link>
        </div>

        <p className="text-sm text-text-muted text-center sm:text-right">
          &copy; {year} BreakPoint. All rights reserved.
        </p>
      </div>
    </footer>
  );
}