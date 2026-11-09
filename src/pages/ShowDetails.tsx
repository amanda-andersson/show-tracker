import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { API_URL } from '../config'
import type { Show } from '../types/Show'

function ShowDetails() {
  const { id } = useParams()
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

  if (loading) return <p>Loading show...</p>
  if (error) return <p>{error}</p>
  if (!show) return <p>Show not found.</p>

  return (
    <div>
      <Link to="/">Back to Shows</Link>

      <h1>{show.title}</h1> <Link to={`/shows/${show.id}/edit`}>Edit Show</Link>
      <p>Genre: {show.category}</p>
      <p>Status: {show.status}</p>
      {show.subtitle && (
  <p>Seasons Watched: {show.subtitle}</p>
)}
    </div>
  )
}

export default ShowDetails