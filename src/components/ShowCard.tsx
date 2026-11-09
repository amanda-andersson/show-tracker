import { Link } from 'react-router'
import type { Show } from '../types/Show'
import { genreIcons } from '../genreIcons'

interface ShowCardProps {
  show: Show
}

function ShowCard({ show }: ShowCardProps) {
  return (
    <div>
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
  )
}

export default ShowCard