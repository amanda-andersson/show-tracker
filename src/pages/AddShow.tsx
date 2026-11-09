import { useState } from 'react'
import { useNavigate } from 'react-router'
import { API_URL } from '../config'

function AddShow() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('Want to Watch')

  const navigate = useNavigate()
const [error, setError] = useState('')
const [loading, setLoading] = useState(false)

async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
  e.preventDefault()
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

{error && <p>{error}</p>}
        <button type="submit" disabled={loading}>
  {loading ? 'Adding...' : 'Add Show'}
</button>
      </form>
    </div>
  )
}

export default AddShow