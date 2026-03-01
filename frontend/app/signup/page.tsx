"use client";

import { useState } from "react";
import Link from "next/link";
import {useRouter} from "next/navigation"


const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ backgroundColor: "#F3F7F4" }}
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #1F7A4D 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #1F3D2B 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <span className="text-5xl">🌾</span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md px-8 py-10">
          {/* Heading */}
          <div className="mb-8 text-center">
            <h1
              className="text-2xl font-bold tracking-tight mb-1"
              style={{
                color: "#1F3D2B",
                fontFamily: "'Plus Jakarta Sans', 'DM Sans', 'Inter', sans-serif",
              }}
            >
              Create Account
            </h1>
            <p className="text-sm" style={{ color: "#6B8F71" }}>
              Join{" "}
              <span style={{ color: "#1F7A4D" }} className="font-semibold">
                Farm Care
              </span>{" "}
              and grow smarter
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold mb-1.5 tracking-wide uppercase"
                style={{ color: "#4A6B52" }}
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Arjun Sharma"
                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                  backgroundColor: "#F8FAF8",
                  border: "1.5px solid #D8EAD8",
                  color: "#1F3D2B",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#1F7A4D";
                  e.target.style.backgroundColor = "#FFFFFF";
                  e.target.style.boxShadow = "0 0 0 3px rgba(31,122,77,0.08)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#D8EAD8";
                  e.target.style.backgroundColor = "#F8FAF8";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold mb-1.5 tracking-wide uppercase"
                style={{ color: "#4A6B52" }}
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                  backgroundColor: "#F8FAF8",
                  border: "1.5px solid #D8EAD8",
                  color: "#1F3D2B",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#1F7A4D";
                  e.target.style.backgroundColor = "#FFFFFF";
                  e.target.style.boxShadow = "0 0 0 3px rgba(31,122,77,0.08)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#D8EAD8";
                  e.target.style.backgroundColor = "#F8FAF8";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold mb-1.5 tracking-wide uppercase"
                style={{ color: "#4A6B52" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  className="w-full px-4 py-3.5 pr-12 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{
                    backgroundColor: "#F8FAF8",
                    border: "1.5px solid #D8EAD8",
                    color: "#1F3D2B",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#1F7A4D";
                    e.target.style.backgroundColor = "#FFFFFF";
                    e.target.style.boxShadow = "0 0 0 3px rgba(31,122,77,0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#D8EAD8";
                    e.target.style.backgroundColor = "#F8FAF8";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                  style={{ color: "#6B8F71" }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Password strength */}
            {form.password.length > 0 && (
              <div className="flex gap-1 mt-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor:
                        form.password.length >= (i + 1) * 2
                          ? i < 2 ? "#F59E0B" : "#1F7A4D"
                          : "#E5EDE6",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              onClick={() => {sleep(3000).then(()=>{console.log('a')})  ;router.push("/")}}
              className="w-full py-4 rounded-xl text-sm font-semibold text-white transition-all duration-200 mt-2 relative overflow-hidden"
              style={{
                backgroundColor: loading ? "#5BA87C" : "#1F7A4D",
                boxShadow: loading ? "none" : "0 4px 14px rgba(31,122,77,0.35)",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  (e.currentTarget).style.backgroundColor = "#186640";
                  (e.currentTarget).style.boxShadow = "0 6px 20px rgba(31,122,77,0.45)";
                  (e.currentTarget).style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  (e.currentTarget).style.backgroundColor = "#1F7A4D";
                  (e.currentTarget).style.boxShadow = "0 4px 14px rgba(31,122,77,0.35)";
                  (e.currentTarget).style.transform = "translateY(0)";
                }
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ backgroundColor: "#E5EDE6" }} />
            <span className="text-xs" style={{ color: "#9DB89E" }}>or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: "#E5EDE6" }} />
          </div>

          {/* Sign In link */}
          <p className="text-center text-sm" style={{ color: "#6B8F71" }}>
            Already have an account?{" "}
            <Link
              href="/signIn"
              className="font-semibold transition-colors duration-150 hover:underline underline-offset-2"
              style={{ color: "#1F7A4D" }}
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-6" style={{ color: "#9DB89E" }}>
          By signing up, you agree to our{" "}
          <Link href="/terms" className="underline underline-offset-2 hover:opacity-80" style={{ color: "#6B8F71" }}>
            Terms
          </Link>{" "}
          &{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:opacity-80" style={{ color: "#6B8F71" }}>
            Privacy Policy
          </Link>
        </p>
      </div>
    </main>
  );
}