import { Link } from 'react-router'
import { useShows } from '../hooks/useShows'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { genreIcons } from '../genreIcons'

function Home() {
  const { shows, loading, error } = useShows()
  const [filter, setFilter] = useLocalStorage('showFilter', 'All')

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
              <Link to={`/shows/${show.id}`}>
                {genreIcons[show.category ?? 'Other'] ?? '📺'} {show.title}
              </Link>
            </h2>

            <p>{show.status}</p>

            {show.subtitle && (
  <p>Seasons Watched: {show.subtitle}</p>
)}

            {show.rating != null && show.rating > 0 && (
              <p>
  {'★'.repeat(show.rating)}
  {'☆'.repeat(5 - show.rating)}
</p>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default Home