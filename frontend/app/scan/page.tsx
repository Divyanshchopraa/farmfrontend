"use client";

import { useState } from "react";
import ChatScreen from "@/components/chat/chatScreen";

export default function ScanPage() {
  const [image, setImage] = useState<string | null>(null);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
  }

  if (image) {
    return <ChatScreen image={image} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <label className="bg-green-600 text-white px-6 py-3 rounded-xl cursor-pointer">
        Upload Crop Image
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          hidden
        />
      </label>
    </div>
  );
}
