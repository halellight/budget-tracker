"use client"

import { useState, useCallback } from "react"
import { Upload, FileJson, CheckCircle2, AlertCircle, RefreshCcw } from "lucide-react"

export default function AdminUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile?.type === "application/json") {
      setFile(droppedFile)
      generatePreview(droppedFile)
    } else {
      setStatus("error")
      setMessage("Please upload a valid JSON file.")
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      generatePreview(selectedFile)
    }
  }, [])

  const generatePreview = (f: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        JSON.parse(e.target?.result as string)
        setStatus("idle")
        setMessage("")
      } catch {
        setStatus("error")
        setMessage("Invalid JSON structure.")
      }
    }
    reader.readAsText(f)
  }

  const handleUpload = async () => {
    if (!file) return

    setStatus("uploading")
    try {
      const fileContent = await file.text()
      const jsonData = JSON.parse(fileContent)

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      })

      if (response.ok) {
        setStatus("success")
        setMessage(`Successfully uploaded data for ${jsonData.name} State.`)
      } else {
        const data = await response.json()
        throw new Error(data.error || "Upload failed")
      }
    } catch (error) {
      console.error(error)
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "An unexpected error occurred.")
    }
  }

  const resetForm = () => {
    setFile(null)
    setMessage("")
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-16 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-2">
          Data Portal
        </h1>
        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Contribute state budget data via JSON upload
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Upload Zone */}
        <div>
          <div
            className={`sharp-border bg-card p-12 flex flex-col items-center justify-center text-center transition-all ${
              isDragging ? "border-primary bg-primary/5" : "hover:border-primary"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 sharp-border bg-background flex items-center justify-center mb-6">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            
            <p className="text-lg font-black uppercase tracking-tight mb-2">
              {file ? file.name : "Drag & Drop JSON"}
            </p>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
              or click below to browse
            </p>

            <label className="cursor-pointer inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors">
              <input
                type="file"
                className="hidden"
                accept=".json"
                onChange={handleFileSelect}
              />
              Select File
            </label>
          </div>

          {/* Status Message */}
          {status !== "idle" && (
            <div className={`mt-6 p-4 sharp-border flex gap-3 ${
              status === "success" ? "bg-primary/10 border-primary" :
              status === "error" ? "bg-destructive/10 border-destructive" :
              "bg-card"
            }`}>
              {status === "success" && <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />}
              {status === "error" && <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />}
              {status === "uploading" && <RefreshCcw className="w-5 h-5 text-muted-foreground animate-spin flex-shrink-0" />}
              
              <div>
                <p className={`text-sm font-bold uppercase tracking-wider ${
                  status === "success" ? "text-primary" :
                  status === "error" ? "text-destructive" :
                  "text-foreground"
                }`}>
                  {status === "uploading" ? "Uploading Data..." : status === "success" ? "Success" : "Error"}
                </p>
                {message && <p className="text-xs font-medium text-muted-foreground mt-1">{message}</p>}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleUpload}
              disabled={!file || status === "uploading" || status === "success"}
              className="flex-1 py-4 sharp-border bg-foreground text-background font-black uppercase tracking-widest text-sm hover:bg-primary disabled:opacity-50 transition-colors"
            >
              Upload Data
            </button>
            {(file || status !== "idle") && (
              <button
                onClick={resetForm}
                className="px-6 py-4 sharp-border bg-card text-foreground font-bold uppercase tracking-widest text-sm hover:border-primary transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Schema Instructions */}
        <div className="sharp-border bg-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <FileJson className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-black uppercase tracking-tight">Required Schema</h2>
          </div>
          
          <p className="text-sm font-medium text-muted-foreground mb-6 leading-relaxed">
            Your JSON file must strictly adhere to the StateData TypeScript interface. It will automatically overwrite existing state data on success.
          </p>

          <pre className="bg-background sharp-border p-4 text-[10px] sm:text-xs overflow-x-auto text-muted-foreground font-mono leading-relaxed">
{`{
  "name": "State Name",
  "code": "state_code",
  "capital": "Capital City",
  "region": "South-West",
  "currentGovernor": "Gov Name",
  "population": 10.5,
  "description": "...",
  "website": "https://...",
  "budgets": [
    {
      "year": "2024",
      "totalBudget": 1000000000,
      "recurrentExpenditure": 400000000,
      "capitalExpenditure": 600000000,
      "sectorAllocations": {
        "education": 150000000,
        "health": 100000000
      },
      "revenue": {
        "igr": 500000000,
        "faac": 500000000
      }
    }
  ]
}`}
          </pre>
        </div>
      </div>
    </div>
  )
}
