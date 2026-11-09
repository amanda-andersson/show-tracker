import { useState } from 'react'
import { useNavigate } from 'react-router'
import { API_URL } from '../config'

function AddShow() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('Want to Watch')
const [watchedSeasons, setWatchedSeasons] = useState(0)
const [totalSeasons, setTotalSeasons] = useState(0)

  const navigate = useNavigate()
const [error, setError] = useState('')
const [loading, setLoading] = useState(false)

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
      <h1>Add Show</h1>

      <form onSubmit={handleSubmit}>
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
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
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

{error && <p>{error}</p>}
        <button type="submit" disabled={loading}>
  {loading ? 'Adding...' : 'Add Show'}
</button>
      </form>
    </div>
  )
}

export default AddShow