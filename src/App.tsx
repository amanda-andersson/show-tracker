import { BrowserRouter, Routes, Route, Link } from 'react-router'
import Home from './pages/Home'
import AddShow from './pages/AddShow'
import ShowDetails from './pages/ShowDetails'
import EditShow from './pages/EditShow'
import './App.css'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <div className="tv">
        <div className="tv-screen">
          <nav>
            <Link to="/">Show Tracker</Link>
            <Link to="/add">Add Show</Link>
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
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App