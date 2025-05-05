import { BrowserRouter as Router, Routes, Route } from 'react-router'

import './App.css'
import Home from './pages/Home'
import TrackerDetail from './pages/TrackerDetail'
import TrackerAdd from './pages/TrackerAdd'
import TrackerUpdate from './pages/TrackerUpdate'
import ApplicationAdd from './pages/ApplicationAdd'
import ApplicationUpdate from './pages/ApplicationUpdate'
import DocumentAdd from './pages/DocumentAdd'



function App() {

  return (
    <>
    <Router>
        <Routes>
          <Route path='/Home' element={<Home />} />
          <Route path='trackers/:id' element={<TrackerDetail/>}/>
          <Route path='trackers/add' element={<TrackerAdd/>}/>
          <Route path='trackers/:id/edit' element={<TrackerUpdate/>}/>
          <Route path='trackers/:trackerId/applications/add' element={<ApplicationAdd/>}/>
          <Route path='trackers/:trackerId/applications/:applicationId/edit' element={<ApplicationUpdate/>}/>
          <Route path='documents/add' element={<DocumentAdd/>}/>
        </Routes>
      </Router>


    </>
  )
}

export default App
