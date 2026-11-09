import { useEffect, useState } from 'react'
import { API_URL } from '../config'
import type { Show } from '../types/Show'

export function useShows() {
  const [shows, setShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchShows() {
      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('Could not fetch shows')
        }

        const data: Show[] = await response.json()
        setShows(data)
      } catch {
        setError('Something went wrong. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchShows()
  }, [])

  return { shows, loading, error }
}