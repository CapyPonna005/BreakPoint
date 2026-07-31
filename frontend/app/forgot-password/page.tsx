"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import FloatingField from "@/components/FloatingField";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    setSubmitted(true);
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

        <div className="bg-secondary-bg border border-border-subtle rounded-card shadow-lg p-6">
          {submitted ? (
            <div className="text-center">
              <h1 className="text-lg font-bold text-text-primary mb-2">
                Check your email
              </h1>
              <p className="text-sm text-text-muted">
                If an account exists for {email}, a password reset link has been sent.
              </p>
              <Link
                href="/login"
                className="inline-block mt-5 text-sm text-accent hover:brightness-110 transition"
              >
                Back to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <h1 className="text-lg font-bold text-text-primary text-center mb-1">
                Reset password
              </h1>
              <p className="text-sm text-text-muted text-center mb-2">
                Enter your email and we&apos;ll send you a reset link.
              </p>

              <FloatingField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                required
              />

              <button
                type="submit"
                className="mt-2 bg-accent text-white rounded-button py-2 text-sm font-medium hover:brightness-110 active:brightness-90 transition cursor-pointer"
              >
                Send Reset Link
              </button>

              <p className="text-sm text-text-muted text-center">
                Remembered your password?{" "}
                <Link href="/login" className="text-accent hover:brightness-110 transition">
                  Log in
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}