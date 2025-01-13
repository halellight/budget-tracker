import { NextResponse } from 'next/server'
import { fetchStateBudgetData, stateDatasetIds } from '@/lib/api'

export async function GET(
  request: Request,
  { params }: { params: { state: string } }
) {
  const state = params.state.toLowerCase()
  const datasetId = stateDatasetIds[state]

  if (!datasetId) {
    return NextResponse.json(
      { error: 'State not found or no dataset available' },
      { status: 404 }
    )
  }

  try {
    const data = await fetchStateBudgetData(state, datasetId)
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch state data' },
      { status: 500 }
    )
  }
}

