"use client"

import { Button } from "@/components/ui/button"

const sampleData = {
  name: "Lagos",
  code: "lagos",
  capital: "Ikeja",
  region: "South West",
  budgets: [
    {
      year: "2023",
      totalBudget: 1768200000000,
      recurrentExpenditure: 850000000000,
      capitalExpenditure: 918200000000,
      sectorAllocations: {
        education: 173000000000,
        health: 125000000000,
        infrastructure: 354000000000,
        agriculture: 62000000000,
        security: 84000000000,
      },
      revenue: {
        igr: 850000000000,
        faac: 300000000000,
        grants: 50000000000,
        loans: 568200000000,
      },
    },
  ],
}

export default function SampleData() {
  const downloadSample = () => {
    const dataStr = JSON.stringify(sampleData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "sample-lagos-data.json"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Button onClick={downloadSample} variant="outline" className="mt-4">
      Download Sample Data
    </Button>
  )
}

