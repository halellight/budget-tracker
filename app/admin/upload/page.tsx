"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { StateData } from "@/types/budget"
import SampleData from "./sample-data"

export default function UploadPage() {
  const [stateData, setStateData] = useState<StateData | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string)

          // Validate the data structure
          if (!data.name || !data.code) {
            throw new Error("Invalid data format: missing required fields (name, code)")
          }

          setStateData(data)
        } catch (error) {
          console.error("Error parsing JSON:", error)
          alert(
            `Error parsing JSON file: ${error instanceof Error ? error.message : "Unknown error"}. Please make sure it's a valid JSON.`,
          )
        }
      }
      reader.readAsText(file)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!stateData) return

    try {
      // Make sure we're sending properly formatted JSON
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stateData),
      })

      if (response.ok) {
        alert("Data uploaded successfully!")
        setStateData(null)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to upload data")
      }
    } catch (error) {
      console.error("Error uploading data:", error)
      alert(`Failed to upload data: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Upload State Data</h1>
      <Card>
        <CardHeader>
          <CardTitle>Upload JSON File</CardTitle>
        </CardHeader>
        <CardContent>
          <Input type="file" accept=".json" onChange={handleFileUpload} className="mb-4" />
          <div className="flex flex-col gap-2 mb-4">
            <p className="text-sm text-muted-foreground">
              Upload a JSON file with state budget data. The file should contain state information and budget details.
            </p>
            <SampleData />
          </div>
          {stateData && (
            <form onSubmit={handleSubmit}>
              <Textarea value={JSON.stringify(stateData, null, 2)} readOnly className="mb-4 h-64" />
              <Button type="submit">Upload Data</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

