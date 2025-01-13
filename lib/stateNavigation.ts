import { getAvailableStates } from './getAvailableStates'

export async function getNextState(currentState: string): Promise<string | null> {
  try {
    const states = await getAvailableStates()
    const currentIndex = states.indexOf(currentState)
    if (currentIndex === -1 || currentIndex === states.length - 1) {
      return null
    }
    return states[currentIndex + 1]
  } catch (error) {
    console.error('Error getting next state:', error)
    return null
  }
}

