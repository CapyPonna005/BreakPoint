"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Loader2 } from "lucide-react";
import FloatingField from "@/components/FloatingField";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // NOTE: redirectTo points to /reset-password, which doesn't exist yet —
    // that page (a form to set a new password, reached via the emailed link)
    // is a separate follow-up piece, not built in this pass.
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    // Deliberately don't surface "user not found" type errors here — doing
    // so would let someone probe which emails have accounts. Show the same
    // "check your email" state regardless, only surface real failures
    // (e.g. rate limiting) as an error.
    if (error && error.status !== 400) {
      console.error("Reset password error:", error);
      setError(error.message || "Something went wrong. Please try again.");
      return;
    }

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

              {error && (
                <p className="text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-input">
                  {error}
                </p>
              )}

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
                disabled={loading}
                className="mt-2 flex items-center justify-center gap-2 bg-accent text-white rounded-button py-2 text-sm font-medium hover:brightness-110 active:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Sending..." : "Send Reset Link"}
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