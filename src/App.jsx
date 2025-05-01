import { BrowserRouter as Router, Routes, Route } from 'react-router'

import './App.css'
import Home from './pages/Home'
import TrackerDetail from './pages/TrackerDetail'



function App() {

  return (
    <>
    <Router>
        <Routes>
          <Route path='/Home' element={<Home />} />
          <Route path='trackers/:id' element={<TrackerDetail/>}/>
        </Routes>
      </Router>


    </>
  )
}

export default App
