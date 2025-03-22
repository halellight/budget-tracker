import type { StateBudget, StateData } from "@/types/budget"
import fs from "fs/promises"
import path from "path"

// Get data for a specific state from the uploaded JSON files
export async function getStateData(stateCode: string): Promise<StateData | null> {
  try {
    const filePath = path.join(process.cwd(), "public", "data", `${stateCode.toLowerCase()}.json`)
    const fileContents = await fs.readFile(filePath, "utf8")
    return JSON.parse(fileContents) as StateData
  } catch (error) {
    console.error(`Error reading file for state ${stateCode}:`, error)
    return null
  }
}

// Get a list of all available states from the uploaded JSON files
export async function getAllStates(): Promise<string[]> {
  try {
    const dataDir = path.join(process.cwd(), "public", "data")
    const files = await fs.readdir(dataDir)
    return files.filter((file) => file.endsWith(".json")).map((file) => file.replace(".json", ""))
  } catch (error) {
    console.error("Error reading data directory:", error)
    return []
  }
}

// Get budget data for a specific state
export async function fetchStateBudgetData(state: string): Promise<StateBudget | null> {
  try {
    const stateData = await getStateData(state)
    if (!stateData || !stateData.budgets || stateData.budgets.length === 0) {
      return null
    }

    // Return the most recent budget
    return stateData.budgets[stateData.budgets.length - 1]
  } catch (error) {
    console.error("Error fetching state budget data:", error)
    return null
  }
}

