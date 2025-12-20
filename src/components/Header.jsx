import React from 'react'

function Header({ onBookNowClick }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="section-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo and tagline */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
              Dinesh Pathak
            </h1>
            <p className="text-xs md:text-sm text-gray-600 mt-1">
              Senior Counsellor & Life Guide
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={onBookNowClick}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 md:px-6 py-2 md:py-3 rounded-lg transition-colors duration-200 text-sm md:text-base"
          >
            Book a Private Session
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header