"use client";

import { useState } from "react";
import { Mic, Send } from "lucide-react";

type Props = {
  onSend: (msg: string) => void;
};

export default function ChatInput({ onSend }: Props) {
  const [text, setText] = useState("");

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-3 py-3 flex items-center gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask about your crop..."
        className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
      />
      <button className="p-2 text-gray-500">
        <Mic className="text-green-600" size={20} />
      </button>
      <button
        onClick={() => {
          if (!text.trim()) return;
          onSend(text);
          setText("");
        }}
        className="p-2 text-green-600"
      >
        <Send size={20} />
      </button>

    </div>
  );
}
