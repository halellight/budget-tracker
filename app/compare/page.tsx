import type { Metadata } from "next"
import { getAllStates, getStateData } from "@/lib/api"
import { CompareClient } from "@/components/compare-client"
import type { StateData } from "@/types/budget"

export const metadata: Metadata = {
  title: "Compare States",
  description: "Compare budget data side-by-side for any two Nigerian states. Analyse total budget, sector allocations, and expenditure splits.",
}

interface ComparePageProps {
  searchParams: Promise<{ a?: string }>
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const { a } = await searchParams

  const stateNames = await getAllStates()
  const statesWithData = await Promise.all(
    stateNames.map(async (slug) => {
      const data = await getStateData(slug)
      return data ? { ...data, slug } : null
    })
  )

  const states = statesWithData.filter(Boolean) as (StateData & { slug: string })[]

  return <CompareClient states={states} initialA={a ?? ""} />
}
