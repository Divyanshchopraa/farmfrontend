"use client"

import { useState } from "react"
import { Home, Search, Camera, Clock, User } from "lucide-react"

const navItems = [
  { icon: Home, label: "Home", id: "home" },
  { icon: Camera, label: "Scan", id: "scan" },
  { icon: User, label: "Profile", id: "profile" },
]

export function BottomNav() {
  const [active, setActive] = useState("home")

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border z-50"
      aria-label="Main navigation"
    >
      <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = active === item.id
          const isScan = item.id === "scan"

          if (isScan) {
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className="flex flex-col items-center gap-0.5 -mt-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full"
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="size-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                  <Camera className="size-6 text-primary-foreground" />
                </div>
                <span className="text-[10px] font-medium text-primary mt-0.5">
                  {item.label}
                </span>
              </button>
            )
          }

          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className={`size-5 ${isActive ? "stroke-[2.5]" : ""}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
      {/* Safe area spacer for devices with bottom notch */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  )
}
