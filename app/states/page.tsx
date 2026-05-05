import type { Metadata } from "next"
import { getAllStates, getStateData } from "@/lib/api"
import { StatesClient } from "@/components/states-client"
import type { StateData } from "@/types/budget"

export const metadata: Metadata = {
  title: "All Nigerian States",
  description: "Explore budget data for all 36 Nigerian states and the FCT. Filter by region, search by name, and compare total budget sizes.",
}

export default async function StatesPage() {
  const stateNames = await getAllStates()

  const statesWithData = await Promise.all(
    stateNames.map(async (slug) => {
      const data = await getStateData(slug)
      return data ? { ...data, slug } : null
    })
  )

  const states = statesWithData.filter(Boolean) as (StateData & { slug: string })[]

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      {/* Page header */}
      <div className="mb-10">
        <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Budget Data</p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">All Nigerian States</h1>
        <p className="text-muted-foreground max-w-2xl">
          Comprehensive 2024 budget data for all 36 states and the Federal Capital Territory.
          Search, filter by region, and explore how each state allocates its resources.
        </p>
      </div>

      <StatesClient states={states} />
    </div>
  )
}
