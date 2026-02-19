"use client";
import { puter } from "@heyputer/puter.js";
import { useState } from "react";
import ChatMessage from "./chatMessage";
import ChatInput from "./chatInput";
import { Volume2 } from "lucide-react";
import { mockAnalysis } from "@/lib/mock-analysis";

export default function ChatScreen({ image }: { image: string }) {
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; content: string }[]
  >([
    {
      role: "bot",
      content: `🌱 Crop: ${mockAnalysis.crop_name}

Issue: ${mockAnalysis.disease_or_issue}
Confidence: ${mockAnalysis.confidence_level}

Analysis:
${mockAnalysis.analysis}

Recommended Steps:
${mockAnalysis.recommended_measures.join("\n")}`,
    },
  ]);

  function handleSend(text: string) {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      { role: "bot", content: "Processing your question..." },
    ]);
  }

  return (
    <div className="min-h-screen bg-green-50 pb-28 px-4 pt-4">
      {/* Uploaded image */}
      <img
        src={image}
        alt="Uploaded crop"
        className="w-full rounded-2xl mb-4"
      />

      {/* Chat messages */}
      <div className="space-y-4">
<div className="space-y-4">
  {messages.map((msg, i) => {
    const isBot = msg.role === "bot";

    return (
      <div
        key={i}
        className={`relative flex ${
          isBot ? "justify-end" : "justify-start"
        } group`}
      >
        {/* Chat bubble */}
        {!isBot && 
        (        <button
          onClick={() => {
            puter.ai
              .txt2speech(msg.content, {
                voice: "Joanna",
                engine: "neural",
                language: "en-US",
              })
              .then((audio) => {
                audio.play();
              });
          }}
          className={`
            absolute top-1/2 -translate-y-1/2
             mr-2
            opacity-0 group-hover:opacity-100
            transition-opacity duration-200
            text-green-600
          `}
        >
          <Volume2 size={18} />
        </button>)}
        <ChatMessage role={msg.role} message={msg.content} />
                    {isBot && 
        (        <button
          onClick={() => {
            puter.ai
              .txt2speech(msg.content, {
                voice: "Joanna",
                engine: "neural",
                language: "en-US",
              })
              .then((audio) => {
                audio.play();
              });
          }}
          className={`
            absolute top-1/2 -translate-y-1/2
             mr-2
            opacity-0 group-hover:opacity-100
            transition-opacity duration-200
            text-green-600
          `}
        >
          <Volume2 size={18} />
        </button>)}
      </div>
    );
  })}
</div>

      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
}
