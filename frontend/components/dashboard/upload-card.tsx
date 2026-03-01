"use client"

import { useState, useRef } from "react"
import { Camera, Upload, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function UploadCard() {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleClick() {
    fileInputRef.current?.click()
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(true)
  }

  function handleDragLeave() {
    setIsDragOver(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(false)
  }

  return (
    <Card
      className={`border-2 border-dashed cursor-pointer transition-all duration-200 py-0 ${
        isDragOver
          ? "border-primary bg-primary/10 scale-[1.02]"
          : "border-primary/30 bg-primary/5 hover:border-primary/60 hover:bg-primary/10"
      }`}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      aria-label="Upload crop photo to detect disease"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        aria-hidden="true"
      />
      <CardContent className="flex flex-col items-center py-8 gap-4">
        <div className="size-20 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
          <Camera className="size-10 text-primary-foreground" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold text-foreground">
            Upload Crop Photo
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Detect disease instantly
          </p>
        </div>
        <div className="flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-6 py-3 font-semibold text-sm shadow-md shadow-primary/20 hover:bg-accent transition-colors">
          <Upload className="size-4" />
          Take or Upload Photo
          <ArrowRight className="size-4" />
        </div>
      </CardContent>
    </Card>
  )
}
