import { StateBudget } from '@/types/budget'

const BASE_URL = process.env.OPENSTATES_API_BASE_URL || 'https://openstates.ng/api/v1'
const API_KEY = process.env.OPENSTATES_API_KEY

export async function fetchStateData(stateCode: string): Promise<StateData> {
  const response = await fetch(`${BASE_URL}/states/${stateCode}`)
  if (!response.ok) {
    throw new Error('Failed to fetch state data')
  }
  return response.json()
}

export async function fetchAllStates(): Promise<StateData[]> {
  const response = await fetch(`${BASE_URL}/states`)
  if (!response.ok) {
    throw new Error('Failed to fetch states')
  }
  return response.json()
}

export async function fetchStateBudgetData(state: string, datasetId: string): Promise<StateBudget> {
  const url = `${BASE_URL}/${state}/dataset/${datasetId}`
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data as StateBudget
  } catch (error) {
    console.error('Error fetching state budget data:', error)
    throw error
  }
}

export const stateDatasetIds: Record<string, string> = {
  'adamawa': '1551',
  // Add other state dataset IDs here
}

