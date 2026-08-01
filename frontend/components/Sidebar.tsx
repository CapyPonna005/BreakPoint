"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Code2, FileCode, LogOut, X, Sparkles } from "lucide-react";
import Tooltip from "@/components/Tooltip";

const links = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Practice", href: "/dashboard/practice", icon: Code2 },
  { label: "Create", href: "/dashboard/create", icon: Sparkles },
  { label: "Snippets", href: "/dashboard/snippets", icon: FileCode },
];

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 z-40 w-56 shrink-0 h-screen bg-secondary-bg border-r border-border-subtle shadow-lg p-4 pt-6 flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          <div className="md:hidden mb-4">
            <Tooltip label="Close menu">
              <button
                onClick={onClose}
                className="text-text-muted hover:text-text-primary transition"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </Tooltip>
          </div>

          <nav className="flex flex-col gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-button text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent/15 text-accent"
                      : "text-text-muted hover:bg-primary-bg hover:text-text-secondary"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-accent rounded-badge" />
                  )}
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-button text-sm font-medium text-text-muted hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Link>
      </aside>
    </>
  );
}