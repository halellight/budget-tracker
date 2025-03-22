"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FileUploadProps {
  accept?: string
  onChange: (file: File | null) => void
}

export function FileUpload({ accept = ".json", onChange }: FileUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    if (file) {
      setFileName(file.name)
      onChange(file)
    } else {
      setFileName(null)
      onChange(null)
    }
  }

  return (
    <div className="space-y-2">
      <Input type="file" accept={accept} onChange={handleFileChange} className="hidden" id="file-upload" />
      <label htmlFor="file-upload">
        <Button type="button" variant="outline" className="w-full cursor-pointer" asChild>
          <span>{fileName ? fileName : "Choose File"}</span>
        </Button>
      </label>
      {fileName && <p className="text-sm text-muted-foreground">Selected file: {fileName}</p>}
    </div>
  )
}

