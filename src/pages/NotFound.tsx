import { Link } from 'react-router'

function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, this page doesn't exist.</p>
      <Link to="/">Back to Home</Link>
    </div>
  )
}

export default NotFound