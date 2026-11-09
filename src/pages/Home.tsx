import { useEffect, useState } from 'react'
import { API_URL } from '../config'
import type { Show } from '../types/Show'

function Home() {
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

  if (loading) return <p>Loading shows...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>My Shows</h1>

      {shows.length === 0 ? (
        <p>No shows added yet.</p>
      ) : (
        shows.map((show) => (
          <div key={show.id}>
            <h2>{show.title}</h2>
            <p>{show.status}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default Home