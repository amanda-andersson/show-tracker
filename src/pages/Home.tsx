import { useShows } from '../hooks/useShows'
import { useLocalStorage } from '../hooks/useLocalStorage'
import ShowCard from '../components/ShowCard'

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
        <div className="show-grid">
          {filteredShows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home