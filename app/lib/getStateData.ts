import fs from 'fs/promises'
import path from 'path'
import { StateData } from '@/types/budget'

export async function getStateData(state: string): Promise<StateData | null> {
  const filePath = path.join(process.cwd(), 'public', 'data', `${state}.json`)
  try {
    const fileContents = await fs.readFile(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error(`Error reading file for state ${state}:`, error)
    return null
  }
}

