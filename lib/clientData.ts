import { StateData } from '@/types/budget'

export function getClientData(stateData: StateData) {
  const latestBudget = stateData.budgets[stateData.budgets.length - 1]

  const sectorData = Object.entries(latestBudget.sectorAllocations).map(([sector, amount]) => ({
    sector: sector.charAt(0).toUpperCase() + sector.slice(1),
    amount: Number(amount), // Ensure amount is a number
  }))

  const revenueData = Object.entries(latestBudget.revenue).map(([source, amount]) => ({
    source: source.toUpperCase(),
    amount: Number(amount), // Ensure amount is a number
  }))

  return {
    sectorData,
    revenueData,
    totalBudget: Number(latestBudget.totalBudget),
    recurrentExpenditure: Number(latestBudget.recurrentExpenditure),
    capitalExpenditure: Number(latestBudget.capitalExpenditure),
    year: latestBudget.year,
  }
}

