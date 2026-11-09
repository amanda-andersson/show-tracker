import { Link } from 'react-router'
import type { Show } from '../types/Show'
import { genreIcons } from '../genreIcons'

interface ShowCardProps {
  show: Show
}

function ShowCard({ show }: ShowCardProps) {
  return (
    <div className="show-card">
      <div className="show-card-icon">
        {genreIcons[show.category ?? 'Other'] ?? '📺'}
      </div>

      <div className="show-card-content">
        <h2>
          <Link to={`/shows/${show.id}`}>
            {show.title}
          </Link>
        </h2>

        <p className="show-status">{show.status}</p>

        {show.subtitle && (
          <p>Seasons Watched: {show.subtitle}</p>
        )}

        {show.rating != null && show.rating > 0 && (
          <p className="show-rating">
            {'★'.repeat(show.rating)}
            {'☆'.repeat(5 - show.rating)}
          </p>
        )}
      </div>
    </div>
  )
}

export default ShowCard