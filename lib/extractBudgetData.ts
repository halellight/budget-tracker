import fs from 'fs/promises'
import path from 'path'
import { StateData } from '@/types/budget'

export async function extractBudgetData(state: string): Promise<StateData | null> {
  const filePath = path.join(process.cwd(), 'public', 'data', `${state}.json`)
  try {
    const fileContents = await fs.readFile(filePath, 'utf8')
    const stateData: StateData = JSON.parse(fileContents)
    return stateData
  } catch (error) {
    console.error(`Error reading or parsing file for state ${state}:`, error)
    return null
  }
}

