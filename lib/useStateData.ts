import useSWR from 'swr'
import type { StateData } from '@/types/budget'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useStateData(state: string) {
  const { data, error } = useSWR<StateData>(`/api/states/${state}`, fetcher)

  return {
    stateData: data,
    isLoading: !error && !data,
    isError: error
  }
}

