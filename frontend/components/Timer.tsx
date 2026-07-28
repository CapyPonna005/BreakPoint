"use client";

import { useState, useEffect } from "react";

type TimerProps = {
  running: boolean;
};

export default function Timer({ running }: TimerProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const display = `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <span className="text-sm font-mono text-highlight font-medium">
      {display}
    </span>
  );
}