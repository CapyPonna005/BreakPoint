"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import FloatingField from "@/components/FloatingField";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    console.log("Login attempt:", formData);
  }

  return (
    <div className="min-h-screen bg-primary-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-button bg-gradient-to-br from-accent to-highlight flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-text-primary">BreakPoint</span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-secondary-bg border border-border-subtle rounded-card shadow-lg p-6 flex flex-col gap-4"
        >
          <h1 className="text-lg font-bold text-text-primary text-center mb-1">
            Welcome back
          </h1>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-input">
              {error}
            </p>
          )}

          <FloatingField
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
            required
          />

          <FloatingField
            id="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange("password")}
            required
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1 text-xs text-text-muted cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-3 accent-accent cursor-pointer"
              />
              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="text-xs text-text-muted hover:text-accent transition"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="mt-1 bg-accent text-white rounded-button py-2 text-sm font-medium hover:brightness-110 active:brightness-90 transition cursor-pointer"
          >
            Log In
          </button>

          <p className="text-sm text-text-muted text-center">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-accent hover:brightness-110 transition"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}