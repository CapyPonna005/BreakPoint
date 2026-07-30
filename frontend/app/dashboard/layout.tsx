"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Tooltip from "@/components/Tooltip";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-primary-bg text-text-primary flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="md:hidden p-4 self-start">
          <Tooltip label="Open menu">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-text-muted hover:text-text-primary transition"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </Tooltip>
        </div>

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}