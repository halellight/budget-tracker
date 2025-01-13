"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { StateData } from '@/types/budget'

export default function UploadPage() {
  const [stateData, setStateData] = useState<StateData | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string)
          setStateData(data)
        } catch (error) {
          console.error("Error parsing JSON:", error)
          alert("Error parsing JSON file. Please make sure it's a valid JSON.")
        }
      }
      reader.readAsText(file)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!stateData) return

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stateData),
      })

      if (response.ok) {
        alert('Data uploaded successfully!')
        setStateData(null)
      } else {
        throw new Error('Failed to upload data')
      }
    } catch (error) {
      console.error('Error uploading data:', error)
      alert('Failed to upload data. Please try again.')
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
          {stateData && (
            <form onSubmit={handleSubmit}>
              <Textarea
                value={JSON.stringify(stateData, null, 2)}
                readOnly
                className="mb-4 h-64"
              />
              <Button type="submit">Upload Data</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

