"use client";

import { puter } from "@heyputer/puter.js";
import { useState, useRef } from "react";
import { Mic, Send, Globe } from "lucide-react";

const INDIAN_LANGUAGES = [
  { code: "hi-IN", label: "हिन्दी (Hindi)" },
  { code: "bn-IN", label: "বাংলা (Bengali)" },
  { code: "ta-IN", label: "தமிழ் (Tamil)" },
  { code: "te-IN", label: "తెలుగు (Telugu)" },
  { code: "kn-IN", label: "ಕನ್ನಡ (Kannada)" },
  { code: "ml-IN", label: "മലയാളം (Malayalam)" },
  { code: "gu-IN", label: "ગુજરાતી (Gujarati)" },
  { code: "mr-IN", label: "मराठी (Marathi)" },
  { code: "en-IN", label: "English (India)" },
  { code: "pa-IN", label: "ਪੰਜਾਬੀ (Punjabi)" },
];

type Props = {
  onSend: (msg: string) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
};

export default function ChatInput({
  onSend,
  language,
  onLanguageChange,
}: Props) {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  async function handleMicClick() {
    // If currently recording, stop it
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      return;
    }

    // Start recording
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        // Stop all tracks to release the mic
        stream.getTracks().forEach((track) => track.stop());

        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        setIsTranscribing(true);

        try {
          const result = await puter.ai.speech2txt(audioBlob, {
            language: language,
          });
          const transcribedText =
            typeof result === "string" ? result : result.text;

          if (transcribedText && transcribedText.trim()) {
            onSend(transcribedText.trim());
          }
        } catch (err) {
          console.error("Speech-to-text error:", err);
        } finally {
          setIsTranscribing(false);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access error:", err);
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-3 py-2 flex flex-col gap-2">
      {/* Language selector row */}
      <div className="flex items-center gap-2 px-1">
        <Globe size={16} className="text-green-600 shrink-0" />
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="text-xs bg-gray-100 rounded-lg px-2 py-1 outline-none text-gray-700 border border-gray-200"
        >
          {INDIAN_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && text.trim()) {
              onSend(text);
              setText("");
            }
          }}
          placeholder="Ask about your crop..."
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
          disabled={isRecording || isTranscribing}
        />

        {/* Mic button */}
        <button
          onClick={handleMicClick}
          disabled={isTranscribing}
          className={`p-2 rounded-full transition-all duration-200 ${isRecording
              ? "bg-red-100 text-red-600 animate-pulse"
              : isTranscribing
                ? "text-gray-300 cursor-not-allowed"
                : "text-green-600"
            }`}
        >
          <Mic size={20} />
        </button>

        {/* Send button */}
        <button
          onClick={() => {
            if (!text.trim()) return;
            onSend(text);
            setText("");
          }}
          className="p-2 text-green-600"
          disabled={isRecording || isTranscribing}
        >
          <Send size={20} />
        </button>
      </div>

      {/* Recording / transcribing status */}
      {(isRecording || isTranscribing) && (
        <div className="text-xs text-center pb-1">
          {isRecording && (
            <span className="text-red-500 flex items-center justify-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Recording… tap mic to stop
            </span>
          )}
          {isTranscribing && (
            <span className="text-green-600">Transcribing…</span>
          )}
        </div>
      )}
    </div>
  );
}
