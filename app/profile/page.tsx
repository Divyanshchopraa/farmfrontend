"use client";
import { useState } from "react";
import Link from "next/link";
import { BottomNav } from "@/components/dashboard/bottom-nav"

const ACTIVITY_HISTORY = [
  { id: 1, action: "Crop health report generated", time: "2 hours ago", icon: "🌿" },
  { id: 2, action: "Soil analysis completed", time: "Yesterday", icon: "🪱" },
  { id: 3, action: "Weather alert acknowledged", time: "2 days ago", icon: "🌤️" },
  { id: 4, action: "Irrigation schedule updated", time: "4 days ago", icon: "💧" },
  { id: 5, action: "Pest detection scan run", time: "1 week ago", icon: "🔍" },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Krish Sharma",
    email: "abc@farmcare.in",
    phone: "+91 98765 43625",
  });

  const [draft, setDraft] = useState({ ...profile });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile({ ...draft });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft({ ...profile });
    setIsEditing(false);
  };

  const inputBase: React.CSSProperties = {
    backgroundColor: "#F8FAF8",
    border: "1.5px solid #D8EAD8",
    color: "#1F3D2B",
    fontFamily: "inherit",
  };

  const inputDisabled: React.CSSProperties = {
    backgroundColor: "#F3F7F4",
    border: "1.5px solid #E5EDE6",
    color: "#6B8F71",
    fontFamily: "inherit",
    cursor: "not-allowed",
  };

  return (
    <>
    <main
      className="min-h-screen px-4 py-10"
      style={{ backgroundColor: "#F3F7F4" }}
    >
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #1F7A4D 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #1F3D2B 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative w-full max-w-sm mx-auto space-y-4">

        {/* ── Avatar + Identity Card ── */}
        <div className="bg-white rounded-2xl shadow-md px-6 py-8 flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative mb-4">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold"
              style={{
                background: "linear-gradient(135deg, #D6EFE1 0%, #A8D9BC 100%)",
                border: "3px solid #1F7A4D",
                color: "#1F3D2B",
                boxShadow: "0 0 0 4px rgba(31,122,77,0.12)",
              }}
            >
              {profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            {/* Online dot */}
            <span
              className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white"
              style={{ backgroundColor: "#1F7A4D" }}
            />
          </div>

          <h1
            className="text-xl font-bold tracking-tight"
            style={{ color: "#1F3D2B", fontFamily: "'Plus Jakarta Sans','DM Sans','Inter',sans-serif" }}
          >
            {profile.name}
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "#6B8F71" }}>{profile.email}</p>

          {/* Member badge */}
          <div
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: "#E8F5EE", color: "#1F7A4D" }}
          >
            🌾 Farm Care Member
          </div>
        </div>

        {/* ── Joined + Stats ── */}
        <div className="bg-white rounded-2xl shadow-md px-6 py-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-base">📅</span>
            <h2 className="text-sm font-bold uppercase tracking-wide" style={{ color: "#1F3D2B" }}>
              Membership
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Member Since", value: "12 Jan 2023", icon: "🗓️" },
              { label: "Days Active", value: "748 days", icon: "🔥" },
              { label: "Reports Run", value: "134", icon: "📊" },
              { label: "Crops Tracked", value: "6", icon: "🌱" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl px-4 py-3"
                style={{ backgroundColor: "#F3F7F4", border: "1.5px solid #E5EDE6" }}
              >
                <p className="text-lg">{stat.icon}</p>
                <p className="text-sm font-bold mt-1" style={{ color: "#1F3D2B" }}>{stat.value}</p>
                <p className="text-xs mt-0.5" style={{ color: "#9DB89E" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Editable Profile Fields ── */}
        <div className="bg-white rounded-2xl shadow-md px-6 py-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="text-base">👤</span>
              <h2 className="text-sm font-bold uppercase tracking-wide" style={{ color: "#1F3D2B" }}>
                Profile Info
              </h2>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-150"
                style={{ backgroundColor: "#E8F5EE", color: "#1F7A4D" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1F7A4D";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#E8F5EE";
                  e.currentTarget.style.color = "#1F7A4D";
                }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-1.414a2 2 0 01.586-1.414z" />
                </svg>
                Edit Profile
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                className="block text-xs font-semibold mb-1.5 tracking-wide uppercase"
                style={{ color: "#4A6B52" }}
              >
                Full Name
              </label>
              <input
                name="name"
                type="text"
                value={isEditing ? draft.name : profile.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                style={isEditing ? inputBase : inputDisabled}
                onFocus={(e) => {
                  if (isEditing) {
                    e.target.style.borderColor = "#1F7A4D";
                    e.target.style.backgroundColor = "#FFFFFF";
                    e.target.style.boxShadow = "0 0 0 3px rgba(31,122,77,0.08)";
                  }
                }}
                onBlur={(e) => {
                  if (isEditing) {
                    e.target.style.borderColor = "#D8EAD8";
                    e.target.style.backgroundColor = "#F8FAF8";
                    e.target.style.boxShadow = "none";
                  }
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-xs font-semibold mb-1.5 tracking-wide uppercase"
                style={{ color: "#4A6B52" }}
              >
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={isEditing ? draft.email : profile.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                style={isEditing ? inputBase : inputDisabled}
                onFocus={(e) => {
                  if (isEditing) {
                    e.target.style.borderColor = "#1F7A4D";
                    e.target.style.backgroundColor = "#FFFFFF";
                    e.target.style.boxShadow = "0 0 0 3px rgba(31,122,77,0.08)";
                  }
                }}
                onBlur={(e) => {
                  if (isEditing) {
                    e.target.style.borderColor = "#D8EAD8";
                    e.target.style.backgroundColor = "#F8FAF8";
                    e.target.style.boxShadow = "none";
                  }
                }}
              />
            </div>

            {/* Phone */}
            <div>
              <label
                className="block text-xs font-semibold mb-1.5 tracking-wide uppercase"
                style={{ color: "#4A6B52" }}
              >
                Phone Number
              </label>
              <input
                name="phone"
                type="tel"
                value={isEditing ? draft.phone : profile.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                style={isEditing ? inputBase : inputDisabled}
                onFocus={(e) => {
                  if (isEditing) {
                    e.target.style.borderColor = "#1F7A4D";
                    e.target.style.backgroundColor = "#FFFFFF";
                    e.target.style.boxShadow = "0 0 0 3px rgba(31,122,77,0.08)";
                  }
                }}
                onBlur={(e) => {
                  if (isEditing) {
                    e.target.style.borderColor = "#D8EAD8";
                    e.target.style.backgroundColor = "#F8FAF8";
                    e.target.style.boxShadow = "none";
                  }
                }}
              />
            </div>
          </div>

          {/* Save / Cancel */}
          {isEditing && (
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                style={{
                  backgroundColor: "#1F7A4D",
                  boxShadow: "0 4px 14px rgba(31,122,77,0.35)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#186640";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#1F7A4D";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  backgroundColor: "#F3F7F4",
                  border: "1.5px solid #D8EAD8",
                  color: "#4A6B52",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#E5EDE6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#F3F7F4";
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* ── Sign Out ── */}
        <div className="bg-white rounded-2xl shadow-md px-6 py-5">
          <button
            className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            style={{
              backgroundColor: "#FFF5F5",
              border: "1.5px solid #FECDCA",
              color: "#B91C1C",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#FEE2E2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#FFF5F5";
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
            </svg>
            Sign Out
          </button>
        </div>

        {/* Bottom padding */}
        <div className="h-4" />
      </div>
    </main>
    <BottomNav />
    </>
  );
}