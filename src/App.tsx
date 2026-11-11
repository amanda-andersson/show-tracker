import { BrowserRouter, Routes, Route, Link } from 'react-router'
import Home from './pages/Home'
import AddShow from './pages/AddShow'
import ShowDetails from './pages/ShowDetails'
import EditShow from './pages/EditShow'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="tv">
        <div className="tv-screen">
          <nav>
            <Link to="/" className="tv-logo">
              PREVIOUSLY ON...
            </Link>

            <span className="nav-subtitle">
              Your personal TV diary
            </span>

            <Link to="/add" className="add-show-link">
              + Add Show
            </Link>
          </nav>

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddShow />} />
              <Route path="/shows/:id" element={<ShowDetails />} />
              <Route path="/shows/:id/edit" element={<EditShow />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>

        <div className="tv-controls">
          <div className="tv-knob"></div>
          <div className="tv-knob"></div>
          <div className="tv-speaker"></div>

          <img
            src="/tv.png"
            alt="I love TV sticker"
            className="tv-sticker"
          />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App