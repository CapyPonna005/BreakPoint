"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Login attempt:", { email, password, rememberMe });
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
          className="bg-secondary-bg/90 border border-border-subtle rounded-card shadow-lg p-6 flex flex-col gap-4"
        >
          <h1 className="text-lg font-bold text-text-primary text-center mb-1">
            Log in to your account
          </h1>

          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
              className="peer w-full bg-primary-bg border border-border-subtle rounded-input px-3 pt-4 pb-1.5 text-sm text-text-primary"
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-1/2 -translate-y-1/2 px-1 bg-secondary-bg text-sm text-text-muted transition-all pointer-events-none peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-text-secondary"
            >
              Email
            </label>
          </div>

          <div className="relative">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
              className="peer w-full bg-primary-bg border border-border-subtle rounded-input px-3 pt-4 pb-1.5 text-sm text-text-primary"
            />
            <label
              htmlFor="password"
              className="absolute left-3 top-1/2 -translate-y-1/2 px-1 bg-secondary-bg text-sm text-text-muted transition-all pointer-events-none peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-text-secondary"
            >
              Password
            </label>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-text-muted cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-accent w-3.5 h-3.5 cursor-pointer"
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="text-accent hover:brightness-110 transition"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="mt-2 bg-accent text-white rounded-button py-2 text-sm font-medium hover:brightness-110 active:brightness-90 transition cursor-pointer"
          >
            Log In
          </button>

          <p className="text-sm text-text-muted text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-accent hover:brightness-110 transition">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}