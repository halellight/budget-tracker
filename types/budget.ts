export interface StateBudget {
  year: string;
  totalBudget: number;
  recurrentExpenditure: number;
  capitalExpenditure: number;
  sectorAllocations: {
    [sector: string]: number;
  };
  revenue: {
    [source: string]: number;
  };
}

export interface StateData {
  name: string;
  code: string;
  capital: string;
  region: string;
  budgets: StateBudget[];
}

