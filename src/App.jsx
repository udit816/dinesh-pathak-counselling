import React, { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import ContentMedia from './components/ContentMedia'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'

function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const openBookingModal = () => setIsBookingModalOpen(true)
  const closeBookingModal = () => setIsBookingModalOpen(false)

  return (
    <div className="min-h-screen bg-white">
      <Header onBookNowClick={openBookingModal} />
      <main>
        <Hero onBookNowClick={openBookingModal} />
        <About />
        <Services onBookNowClick={openBookingModal} />
        <HowItWorks />
        <ContentMedia />
      </main>
      <Footer />
      
      {/* Booking Modal */}
      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
    </div>
  )
}

export default App