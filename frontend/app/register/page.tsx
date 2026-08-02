"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Loader2 } from "lucide-react";
import FloatingField from "@/components/FloatingField";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  const handleChange = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true);

    // Name is stored as auth user metadata (not a profiles table column —
    // the profiles table currently only has bio/level/xp/streak). Accessible
    // later via supabase.auth.getUser() -> data.user.user_metadata.full_name.
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { full_name: formData.name },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // If email confirmation is enabled in Supabase project settings,
    // signUp succeeds but returns no session until the user clicks the
    // confirmation link — show a "check your email" state instead of
    // redirecting straight in.
    if (!data.session) {
      setCheckEmail(true);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  if (checkEmail) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-button bg-gradient-to-br from-accent to-highlight flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">BreakPoint</span>
          </div>
          <div className="bg-secondary-bg border border-border-subtle rounded-card shadow-lg p-6 text-center">
            <h1 className="text-lg font-bold text-text-primary mb-2">Check your email</h1>
            <p className="text-sm text-text-muted">
              We sent a confirmation link to {formData.email}. Click it to activate your account.
            </p>
            <Link
              href="/login"
              className="inline-block mt-5 text-sm text-accent hover:brightness-110 transition"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    );
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
            disabled={loading}
            className="mt-2 flex items-center justify-center gap-2 bg-accent text-white rounded-button py-2 text-sm font-medium hover:brightness-110 active:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Creating account..." : "Register"}
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