import fs from 'fs/promises'
import path from 'path'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

async function getAvailableStates() {
  const dataDir = path.join(process.cwd(), 'public', 'data')
  try {
    const files = await fs.readdir(dataDir)
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''))
  } catch (error) {
    console.error('Error reading data directory:', error)
    return []
  }
}

export default async function StatesPage() {
  const states = await getAvailableStates()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Nigerian States</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {states.map((state) => (
          <Link href={`/state/${state}`} key={state}>
            <Card className="hover:bg-accent transition-colors">
              <CardHeader>
                <CardTitle>{state.charAt(0).toUpperCase() + state.slice(1)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>View budget data for {state.charAt(0).toUpperCase() + state.slice(1)} State</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {states.length === 0 && (
        <p className="text-center mt-8">No state data available. Please upload data for states.</p>
      )}
    </div>
  )
}

