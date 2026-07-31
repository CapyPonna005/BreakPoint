"use client";

import { useState } from "react";

type FloatingFieldProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};

export default function FloatingField({
  id,
  label,
  type = "text",
  value,
  onChange,
  required = false,
}: FloatingFieldProps) {
  const [focused, setFocused] = useState(false);
  const isFloated = focused || value.length > 0;

  return (
    <div
      className={`relative border rounded-input px-3 py-2 transition-colors ${
        focused ? "border-accent" : "border-border-subtle"
      }`}
    >
      <label
        htmlFor={id}
        className={`absolute left-2.5 transition-all duration-150 ease-in-out pointer-events-none px-1 bg-secondary-bg ${
          isFloated
            ? `-top-2.5 text-xs ${
                focused ? "text-accent font-medium" : "text-text-secondary"
              }`
            : "top-2 text-sm text-text-muted bg-transparent"
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full bg-transparent text-sm text-text-primary border-0 border-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus:border-none p-0 shadow-none"
      />
    </div>
  );
}