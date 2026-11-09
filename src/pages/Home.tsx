import { useEffect, useState } from 'react'
import { API_URL } from '../config'
import type { Show } from '../types/Show'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Link } from 'react-router'

function Home() {
  const [shows, setShows] = useState<Show[]>([]) 
  const [filter, setFilter] = useLocalStorage('showFilter', 'All')
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

  const filteredShows =
  filter === 'All'
    ? shows
    : shows.filter((show) => show.status === filter)

  if (loading) return <p>Loading shows...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>My Shows</h1>

      <div>
  <label htmlFor="filter">Filter by status: </label>
  <select
    id="filter"
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
  >
    <option value="All">All</option>
    <option value="Want to Watch">Want to Watch</option>
    <option value="Watching">Watching</option>
    <option value="Up to Date">Up to Date</option>
    <option value="Completed">Completed</option>
    <option value="Dropped">Dropped</option>
  </select>
</div>

      {filteredShows.length === 0 ? (
        <p>No shows added yet.</p>
      ) : (
     filteredShows.map((show) => (
  <div key={show.id}>
    <h2>
      <Link to={`/shows/${show.id}`}>{show.title}</Link>
    </h2>
    <p>{show.status}</p>
  </div>
))
      )}
    </div>
  )
}

export default Home