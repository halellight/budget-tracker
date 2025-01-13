export async function getAvailableStates(): Promise<string[]> {
    try {
      const response = await fetch('/api/states')
      if (!response.ok) {
        throw new Error('Failed to fetch states')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching available states:', error)
      return []
    }
  }
  
  