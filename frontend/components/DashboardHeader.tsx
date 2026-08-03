"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

type DashboardHeaderProps = {
  name: string;
};

export default function DashboardHeader({ name }: DashboardHeaderProps) {
  const [greeting, setGreeting] = useState("Good Afternoon");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
      <div>
        <p className="text-text-muted text-sm mb-1">{greeting} 👋</p>
        <h1 className="text-3xl font-bold text-text-primary">
          Welcome back, {name}!
        </h1>
        <p className="text-text-secondary mt-1">
          Continue improving your debugging skills today.
        </p>
      </div>
      <Link
        href="/dashboard/workspace"
        className="shrink-0 bg-accent text-white px-5 py-2.5 rounded-button font-medium hover:brightness-110 active:brightness-90 transition cursor-pointer text-center"
      >
        Continue Practice
      </Link>
    </div>
  );
}