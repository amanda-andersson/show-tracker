import { Link } from 'react-router'
import {
  Smiley,
  MaskHappy,
  Ghost,
  Crown,
  FilmSlate,
  MagnifyingGlass,
  Heart,
  Television,
} from '@phosphor-icons/react'
import type { Show } from '../types/Show'

interface ShowCardProps {
  show: Show
}

const genreIcons = {
  Comedy: Smiley,
  Drama: MaskHappy,
  Horror: Ghost,
  Reality: Crown,
  Documentary: FilmSlate,
  Mystery: MagnifyingGlass,
  Romance: Heart,
  Other: Television,
}

function ShowCard({ show }: ShowCardProps) {
  const GenreIcon =
    genreIcons[show.category as keyof typeof genreIcons] ?? Television

  return (
    <div className="show-card">
    <div className={`show-card-icon genre-${(show.category ?? 'Other').toLowerCase()}`}>
  <GenreIcon size={48} weight="bold" />
</div>

      <div className="show-card-content">
        <h2>
          <Link to={`/shows/${show.id}`}>{show.title}</Link>
        </h2>

        <p className={`show-status status-${(show.status ?? '').toLowerCase().replaceAll(' ', '-')}`}>
  {show.status}
</p>

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