import { useState } from 'react'
import { useNavigate } from 'react-router'
import { API_URL } from '../config'

function AddShow() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Comedy')
  const [status, setStatus] = useState('Want to Watch')
  const [watchedSeasons, setWatchedSeasons] = useState(0)
  const [totalSeasons, setTotalSeasons] = useState(0)
  const [rating, setRating] = useState(0)
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    if (watchedSeasons > totalSeasons) {
      setError('Watched seasons cannot exceed total seasons.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          category,
          status,
          subtitle: `${watchedSeasons}/${totalSeasons}`,
          rating,
          notes,
        }),
      })

      if (!response.ok) {
        throw new Error('Could not add show')
      }

      navigate('/')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form className="show-form" onSubmit={handleSubmit}>
        <h1 className="show-form-title">Add Show</h1>

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
            <option value="0">Not rated</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
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

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Show'}
        </button>
      </form>
    </div>
  )
}

export default AddShow