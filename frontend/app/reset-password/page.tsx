"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Loader2 } from "lucide-react";
import FloatingField from "@/components/FloatingField";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  // null = still checking, false = no valid recovery session, true = ready
  const [sessionValid, setSessionValid] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // The Supabase browser client auto-detects the recovery token from the
    // URL (the link from resetPasswordForEmail) and establishes a session
    // before this fires. If someone lands here without a valid token
    // (e.g. visited the URL directly, or the link expired), there's no
    // session and updateUser would fail.
    supabase.auth.getSession().then(({ data }) => {
      setSessionValid(!!data.session);
    });
  }, [supabase]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(true);
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
          {sessionValid === null ? (
            <p className="text-sm text-text-muted text-center py-4">Verifying reset link...</p>
          ) : sessionValid === false ? (
            <div className="text-center">
              <h1 className="text-lg font-bold text-text-primary mb-2">
                Link invalid or expired
              </h1>
              <p className="text-sm text-text-muted">
                This password reset link no longer works. Request a new one to continue.
              </p>
              <Link
                href="/forgot-password"
                className="inline-block mt-5 text-sm text-accent hover:brightness-110 transition"
              >
                Request a new link
              </Link>
            </div>
          ) : success ? (
            <div className="text-center">
              <h1 className="text-lg font-bold text-text-primary mb-2">
                Password updated
              </h1>
              <p className="text-sm text-text-muted mb-5">
                Your password has been changed. You can log in with it now.
              </p>
              <button
                onClick={() => router.push("/login")}
                className="bg-accent text-white rounded-button px-5 py-2 text-sm font-medium hover:brightness-110 active:brightness-90 transition cursor-pointer"
              >
                Go to login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <h1 className="text-lg font-bold text-text-primary text-center mb-1">
                Set a new password
              </h1>

              {error && (
                <p className="text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-input">
                  {error}
                </p>
              )}

              <FloatingField
                id="password"
                label="New Password"
                type="password"
                value={password}
                onChange={setPassword}
                required
              />

              <FloatingField
                id="confirmPassword"
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex items-center justify-center gap-2 bg-accent text-white rounded-button py-2 text-sm font-medium hover:brightness-110 active:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}