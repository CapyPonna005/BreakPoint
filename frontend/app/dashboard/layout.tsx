"use client";

import { useState } from "react";
import { Menu, PanelLeftOpen } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Tooltip from "@/components/Tooltip";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarVisible, setDesktopSidebarVisible] = useState(true);

  return (
    <div className="min-h-screen bg-primary-bg text-text-primary flex">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        desktopVisible={desktopSidebarVisible}
        onToggleDesktop={() => setDesktopSidebarVisible((prev) => !prev)}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-center gap-2 p-4 self-start">
          <div className="md:hidden">
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

          {!desktopSidebarVisible && (
            <div className="hidden md:block">
              <Tooltip label="Show sidebar">
                <button
                  onClick={() => setDesktopSidebarVisible(true)}
                  className="text-text-muted hover:text-text-primary transition"
                  aria-label="Show sidebar"
                >
                  <PanelLeftOpen className="w-6 h-6" />
                </button>
              </Tooltip>
            </div>
          )}
        </div>

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}