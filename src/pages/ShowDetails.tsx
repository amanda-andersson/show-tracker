import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { API_URL } from '../config'
import type { Show } from '../types/Show'
import { genreIcons } from '../genreIcons'

function ShowDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
const [deleting, setDeleting] = useState(false)
  const [show, setShow] = useState<Show | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchShow() {
      try {
        const response = await fetch(`${API_URL}/${id}`)

        if (!response.ok) {
          throw new Error('Could not fetch show')
        }

        const data: Show = await response.json()
        setShow(data)
      } catch {
        setError('Something went wrong. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchShow()
  }, [id])

  async function handleDelete() {
    const confirmed = window.confirm(
      'Are you sure you want to delete this show?'
    )

    if (!confirmed) return

    setDeleting(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Could not delete show')
      }

      navigate('/')
    } catch {
      setError('Could not delete show. Please try again.')
      setDeleting(false)
    }
  }

  if (loading) return <p>Loading show...</p>
  if (error) return <p>{error}</p>
  if (!show) return <p>Show not found.</p>

  return (
    <div>
      <Link to="/">Back to Shows</Link>

      <h1>
  {genreIcons[show.category ?? 'Other'] ?? '📺'} {show.title}
</h1>
      <Link to={`/shows/${show.id}/edit`}>Edit Show</Link> <button onClick={handleDelete} disabled={deleting}>
  {deleting ? 'Deleting...' : 'Delete Show'}
</button>
      <div className="show-details-info">
  <p><strong>Genre:</strong> {show.category}</p>
  <p><strong>Status:</strong> {show.status}</p>

  {show.subtitle && (
    <p><strong>Seasons Watched:</strong> {show.subtitle}</p>
  )}

  {show.rating != null && show.rating > 0 && (
    <p className="show-rating">
      {'★'.repeat(show.rating)}
      {'☆'.repeat(5 - show.rating)}
    </p>
  )}

  {show.notes && (
    <div className="show-notes">
      <h2>Notes</h2>
      <p>{show.notes}</p>
    </div>
  )}
</div>
    </div>
  )
}

export default ShowDetails