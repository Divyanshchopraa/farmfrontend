"use client"

import { useState } from "react"
import { Mic } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function VoiceCard() {
  const [isListening, setIsListening] = useState(false)

  function toggleListening() {
    setIsListening((prev) => !prev)
  }

  return (
    <Card className="bg-card border-border py-0">
      <CardContent className="flex items-center gap-5 py-5">
        <button
          onClick={toggleListening}
          className={`relative flex-shrink-0 size-16 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            isListening
              ? "bg-destructive shadow-lg shadow-destructive/30 scale-110"
              : "bg-primary shadow-md shadow-primary/20 hover:scale-105"
          }`}
          aria-label={isListening ? "Stop listening" : "Tap and speak your problem"}
        >
          {isListening && (
            <>
              <span className="absolute inset-0 rounded-full bg-destructive/30 animate-ping" />
              <span className="absolute inset-[-4px] rounded-full border-2 border-destructive/40 animate-pulse" />
            </>
          )}
          <Mic className={`size-7 ${isListening ? "text-primary-foreground" : "text-primary-foreground"}`} />
        </button>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground text-base">
            {isListening ? "Listening..." : "Tap & speak your problem"}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Works in any language
          </p>
          {isListening && (
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-destructive rounded-full animate-pulse"
                  style={{
                    height: `${12 + Math.random() * 16}px`,
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: `${0.4 + Math.random() * 0.4}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
