"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, User, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      // TODO: Replace with actual authentication API call
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Invalid credentials");
      }

      const data = await response.json();
      
      // Store auth token
      if (data.token) {
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("admin_user", JSON.stringify(data.user));
      }

      // Redirect to admin dashboard
      router.push("/admin/blogs/create");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Login failed. Please try again.");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-rose-500 to-rose-700">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Admin Access</h1>
          <p className="mt-2 text-neutral-400">
            Sign in to manage blog posts
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-white"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="w-5 h-5 text-neutral-500" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                  className="w-full rounded-lg border border-neutral-800 bg-black pl-10 pr-4 py-3 text-white placeholder-neutral-500 transition-colors focus:border-rose-600 focus:outline-none focus:ring-1 focus:ring-rose-600"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-white"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-neutral-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-neutral-800 bg-black pl-10 pr-12 py-3 text-white placeholder-neutral-500 transition-colors focus:border-rose-600 focus:outline-none focus:ring-1 focus:ring-rose-600"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 hover:text-neutral-300 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {status === "error" && errorMessage && (
              <div className="rounded-lg border border-red-800 bg-red-950/50 px-4 py-3 text-red-400 text-sm">
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-lg bg-rose-600 px-6 py-3 font-medium text-white transition-all hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-neutral-400 hover:text-rose-500 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Security Notice */}
        <div className="mt-8 text-center text-xs text-neutral-600">
          <p>This is a secure admin area</p>
          <p className="mt-1">Unauthorized access is prohibited</p>
        </div>
      </div>
    </div>
  );
}
