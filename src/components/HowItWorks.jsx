import React from 'react'

function HowItWorks() {
  const steps = [
    {
      number: '1',
      description: 'Choose the type of counselling you\'re looking for — education, marriage, or life guidance — based on your current needs.'
    },
    {
      number: '2',
      description: 'Pick a convenient time slot using the online booking calendar. Sessions are scheduled privately and confirmed immediately.'
    },
    {
      number: '3',
      description: 'Sessions are conducted via phone or online meeting, ensuring comfort, privacy, and focused conversation.'
    }
  ]

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white">
      <div className="section-container">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-12 text-center">
          How It Works
        </h2>

        {/* Steps */}
        <div className="max-w-4xl mx-auto space-y-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6 items-start">
              {/* Step Number */}
              <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-serif font-bold text-xl">
                {step.number}
              </div>

              {/* Step Description */}
              <p className="text-base md:text-lg text-gray-700 leading-relaxed pt-2">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Reassurance */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
            All conversations are private and handled with respect and confidentiality.
          </p>

          {/* CTA Button */}
          {/* TODO: Replace href with Calendly link when integration is ready */}
          <a
            href="#booking"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 text-lg"
          >
            Book a Private Session
          </a>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks