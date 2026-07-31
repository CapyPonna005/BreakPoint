"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import FloatingField from "@/components/FloatingField";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    console.log("Register attempt:", formData);
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
            Create an account
          </h1>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-input">
              {error}
            </p>
          )}

          <FloatingField
            id="name"
            label="Name"
            value={formData.name}
            onChange={handleChange("name")}
            required
          />

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

          <FloatingField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange("confirmPassword")}
            required
          />

          <button
            type="submit"
            className="mt-2 bg-accent text-white rounded-button py-2 text-sm font-medium hover:brightness-110 active:brightness-90 transition cursor-pointer"
          >
            Register
          </button>

          <p className="text-sm text-text-muted text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-accent hover:brightness-110 transition">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}