import React from 'react'

function Hero({ onBookNowClick }) {
  return (
    <section className="bg-gray-50 py-16 md:py-24 lg:py-32">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6">
            Guidance for Life's Important Decisions
          </h2>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-4 leading-relaxed">
            Thoughtful counselling for education, marriage, and family matters — grounded in experience, clarity, and understanding.
          </p>

          {/* Supporting line */}
          <p className="text-base md:text-lg text-gray-600 mb-10 leading-relaxed">
            Private and respectful conversations for individuals and families at important crossroads.
          </p>

          {/* CTA Button */}
          <button
            onClick={onBookNowClick}
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 text-lg mb-6"
          >
            Book a Private Session
          </button>

          {/* Reassurance */}
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Private & confidential conversations
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero