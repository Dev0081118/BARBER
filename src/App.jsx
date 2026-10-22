import React from 'react'
import NavBar from './components/NavBar'
import Hero from './pages/hero'
import WhoareWe from './pages/WhoareWe'
import ScrollWindow from './pages/ScrollWindow'
import Services from './pages/services'
import Packages from './pages/packeges'
import Footer from './components/Footer'
import MeetTheTeam from './pages/MeetTheTeam'
import Review from './pages/reviews'
import PhotoGallery from './pages/PhotoGallary'
import {Routes, Route} from 'react-router-dom'
import Privacy from './pages/privacy'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<><NavBar /><Hero /><WhoareWe /><ScrollWindow /><Services /><Packages /><MeetTheTeam /><Review /><PhotoGallery /><Footer /></>} />
        <Route path="/privacy" element={<><Privacy /></>} />
      </Routes>
    </div>
  )
}

export default App
