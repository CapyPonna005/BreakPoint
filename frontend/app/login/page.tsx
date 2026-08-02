"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Loader2 } from "lucide-react";
import FloatingField from "@/components/FloatingField";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh(); // ensures Server Components (e.g. Sidebar auth state) pick up the new session
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
            disabled={loading}
            className="mt-1 flex items-center justify-center gap-2 bg-accent text-white rounded-button py-2 text-sm font-medium hover:brightness-110 active:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Logging in..." : "Log In"}
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