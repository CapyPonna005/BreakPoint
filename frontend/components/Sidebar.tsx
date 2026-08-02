"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Code2, LogOut, X, Sparkles, PanelLeftClose } from "lucide-react";
import Tooltip from "@/components/Tooltip";
import { createClient } from "@/lib/supabase/client";

const links = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Practice", href: "/dashboard/practice", icon: Code2 },
  { label: "Create", href: "/dashboard/create", icon: Sparkles },
];

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  desktopVisible: boolean;
  onToggleDesktop: () => void;
};

export default function Sidebar({ isOpen, onClose, desktopVisible, onToggleDesktop }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    onClose();
    router.push("/login");
    router.refresh(); // clears any Server Component state that read the old session
  }

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 z-40 shrink-0 h-screen bg-secondary-bg border-r border-border-subtle shadow-lg p-4 pt-6 flex flex-col justify-between transition-all duration-300 overflow-hidden ${
          isOpen ? "translate-x-0 w-56" : "-translate-x-full w-56"
        } ${
          desktopVisible
            ? "md:translate-x-0 md:w-56 md:p-4 md:pt-6"
            : "md:-translate-x-full md:w-0 md:p-0 md:border-r-0"
        }`}
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="md:hidden">
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

            <div className="hidden md:block ml-auto">
              <Tooltip label="Hide sidebar">
                <button
                  onClick={onToggleDesktop}
                  className="text-text-muted hover:text-text-primary transition"
                  aria-label="Hide sidebar"
                >
                  <PanelLeftClose className="w-5 h-5" />
                </button>
              </Tooltip>
            </div>
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
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-button text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-accent/15 text-accent"
                      : "text-text-muted hover:bg-primary-bg hover:text-text-secondary"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-accent rounded-badge" />
                  )}
                  <Icon className="w-4 h-4 shrink-0" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-button text-sm font-medium text-text-muted hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer whitespace-nowrap"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Logout
        </button>
      </aside>
    </>
  );
}