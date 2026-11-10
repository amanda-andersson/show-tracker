import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { API_URL } from '../config'
import type { Show } from '../types/Show'

function EditShow() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('Want to Watch')
  const [watchedSeasons, setWatchedSeasons] = useState(0)
  const [totalSeasons, setTotalSeasons] = useState(0)
  const [rating, setRating] = useState(0)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchShow() {
      try {
        const response = await fetch(`${API_URL}/${id}`)

        if (!response.ok) {
          throw new Error('Could not fetch show')
        }

        const data: Show = await response.json()

        setTitle(data.title)
        setCategory(data.category ?? '')
        setStatus(data.status ?? 'Want to Watch')
        setRating(data.rating ?? 0)
        setNotes(data.notes ?? '')

        const [watched, total] = (data.subtitle ?? '0/0')
          .split('/')
          .map(Number)

        setWatchedSeasons(watched || 0)
        setTotalSeasons(total || 0)
      } catch {
        setError('Could not load show.')
      } finally {
        setLoading(false)
      }
    }

    fetchShow()
  }, [id])

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    if (watchedSeasons > totalSeasons) {
      setError('Watched seasons cannot exceed total seasons.')
      return
    }

    setSaving(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          category,
          status,
          subtitle: `${watchedSeasons}/${totalSeasons}`,
          ...(rating > 0 && { rating }),
          notes,
        }),
      })

      if (!response.ok) {
        throw new Error('Could not update show')
      }

      navigate(`/shows/${id}`)
    } catch {
      setError('Could not save changes. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p>Loading show...</p>

  return (
    <div>
      <form className="show-form" onSubmit={handleSubmit}>
        <h1 className="show-form-title">Edit Show</h1>

        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Genre</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Reality">Reality</option>
            <option value="Documentary">Documentary</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Want to Watch">Want to Watch</option>
            <option value="Watching">Watching</option>
            <option value="Up to Date">Up to Date</option>
            <option value="Completed">Completed</option>
            <option value="Dropped">Dropped</option>
          </select>
        </div>

        <div className="seasons-row">
          <div>
            <label htmlFor="watchedSeasons">Seasons Watched</label>
            <input
              id="watchedSeasons"
              type="number"
              min="0"
              value={watchedSeasons}
              onChange={(e) => setWatchedSeasons(Number(e.target.value))}
            />
          </div>

          <div>
            <label htmlFor="totalSeasons">Total Seasons</label>
            <input
              id="totalSeasons"
              type="number"
              min="0"
              value={totalSeasons}
              onChange={(e) => setTotalSeasons(Number(e.target.value))}
            />
          </div>
        </div>

        <div>
          <label htmlFor="rating">Rating (1–5)</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={0}>Not rated</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>

        <div>
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}

export default EditShow