"use client";

import { useState } from "react";
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
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
    <div className="relative min-h-screen bg-primary-bg text-text-primary flex">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        desktopVisible={desktopSidebarVisible}
      />

      {/* Sits directly on the sidebar/content seam. left tracks the sidebar's
          current width (14rem open, 0 closed) so it always rides the edge as
          it animates. Desktop only — mobile keeps the hamburger drawer. */}
      <div
        className={`hidden md:block fixed top-1/2 -translate-y-1/2 -translate-x-1/2 z-40 transition-[left] duration-300 ${
          desktopSidebarVisible ? "left-56" : "left-0"
        }`}
      >
        <Tooltip label={desktopSidebarVisible ? "Hide sidebar" : "Show sidebar"}>
          <button
            onClick={() => setDesktopSidebarVisible((prev) => !prev)}
            className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary-bg border border-border-subtle text-text-muted hover:text-text-primary hover:border-accent/50 transition cursor-pointer"
            aria-label={desktopSidebarVisible ? "Hide sidebar" : "Show sidebar"}
          >
            {desktopSidebarVisible ? (
              <PanelLeftClose className="w-3.5 h-3.5" />
            ) : (
              <PanelLeftOpen className="w-3.5 h-3.5" />
            )}
          </button>
        </Tooltip>
      </div>

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
        </div>

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}