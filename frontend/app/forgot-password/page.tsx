"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm border rounded-lg p-6">
        {submitted ? (
          <div className="text-center">
            <h1 className="text-xl font-bold mb-2">Check your email</h1>
            <p className="text-sm text-gray-500">
              If an account exists for {email}, a password reset link has been sent.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h1 className="text-xl font-bold text-center mb-2">Reset your password</h1>
            <p className="text-sm text-gray-500 text-center mb-2">
              Enter your email and we'll send you a reset link.
            </p>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm text-gray-600">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border rounded-md px-3 py-2 text-sm"
              />
            </div>

            <button
              type="submit"
              className="mt-2 bg-black text-white rounded-md py-2 text-sm font-medium hover:bg-gray-800 transition"
            >
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}