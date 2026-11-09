import { BrowserRouter, Routes, Route, Link } from 'react-router'
import Home from './pages/Home'
import AddShow from './pages/AddShow'
import ShowDetails from './pages/ShowDetails'
import './App.css'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Show Tracker</Link>
        <Link to="/add">Add Show</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddShow />} />
          <Route path="/shows/:id" element={<ShowDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
