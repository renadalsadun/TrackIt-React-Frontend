import { BrowserRouter as Router, Routes, Route } from 'react-router'

import './App.css'
import Home from './pages/Home'


function App() {

  return (
    <>
    <h1>Welcome to App </h1>
    <Router>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>


    </>
  )
}

export default App
