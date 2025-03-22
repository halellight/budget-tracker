import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { getAllStates } from "@/lib/api"

export default async function StatesPage() {
  const states = await getAllStates()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Nigerian States</h1>

      {states.length === 0 ? (
        <div className="text-center mt-8">
          <p className="mb-4">No state data available. Please upload data for states.</p>
          <Link href="/admin/upload" className="text-primary hover:underline">
            Go to Upload Page
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {states.map((state) => (
            <Link href={`/state/${state}`} key={state}>
              <Card className="hover:bg-accent transition-colors">
                <CardHeader>
                  <CardTitle className="capitalize">{state}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>View budget data for {state.charAt(0).toUpperCase() + state.slice(1)} State</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

