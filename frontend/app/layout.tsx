import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import ToastContainer from "@/components/ToastContainer";
import "./globals.css";

export const metadata: Metadata = {
  title: "BreakPoint",
  description: "Practice code. Fix bugs. Level up.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased dark:bg-gray-900 dark:text-white transition-colors">
        <ThemeProvider>
          <ToastProvider>
            <Navbar />
            {children}
            <ToastContainer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}