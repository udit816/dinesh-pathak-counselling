import React from 'react'

function Services({ onBookNowClick }) {
  const services = [
    {
      title: 'Education Counselling',
      icon: (
        <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      description: 'Guidance for students and parents navigating academic decisions including subject selection, higher education choices, and career direction. Helping families think clearly, reduce confusion, and arrive at balanced decisions during important transitions.',
      forWhom: 'Students, young adults, and parents'
    },
    {
      title: 'Marriage & Relationship Guidance',
      icon: (
        <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      description: 'Thoughtful counselling for individuals and families considering marriage-related decisions. These conversations involve pre-marriage discussions, family alignment, and navigating differing perspectives with care, respect, and clear communication without external pressure.',
      forWhom: 'Individuals, couples, and families'
    },
    {
      title: 'Life & Family Guidance',
      icon: (
        <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      description: 'Support during personal or family transitions including decision-making during periods of change, family discussions, and situations requiring clarity. Sessions are guided by calm conversation, reflection, and practical thinking to help navigate important life moments.',
      forWhom: 'Individuals and families seeking perspective'
    }
  ]

  return (
    <section id="services" className="py-16 md:py-24 bg-gray-50">
      <div className="section-container">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4 text-center">
          Services
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Professional counselling services tailored to your unique needs
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col"
            >
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="p-3 bg-emerald-50 rounded-full">
                  {service.icon}
                </div>
              </div>

              {/* Service Title */}
              <h3 className="text-xl md:text-2xl font-serif font-semibold text-gray-900 mb-4 text-center">
                {service.title}
              </h3>

              {/* Service Description */}
              <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>

              {/* For Whom */}
              <div className="pt-4 border-t border-gray-200 mb-6">
                <p className="text-sm font-medium text-gray-600 text-center">
                  <span className="text-emerald-600 font-semibold">For:</span> {service.forWhom}
                </p>
              </div>

              {/* Book Session Button */}
              <button
                onClick={onBookNowClick}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book a Private Session
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm md:text-base">
            All sessions are conducted with complete confidentiality and care
          </p>
        </div>
      </div>
    </section>
  )
}

export default Services