import React from 'react'

function ServiceSelection({ onServiceSelect, selectedService }) {
  const services = [
    {
      id: 'education',
      title: 'Career Counselling',
      price: '₹999',
      duration: '45 minutes',
      icon: (
        <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
      description: 'Academic guidance for students and families making educational decisions',
      includes: [
        'Subject selection guidance',
        'Career path exploration',
        'Higher education planning',
        'Study strategies'
      ]
    },
    {
      id: 'marriage',
      title: 'Marriage & Relationship Guidance',
      price: '₹1499',
      duration: '45 minutes',
      icon: (
        <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      description: 'Thoughtful counselling for marriage-related decisions and relationships',
      includes: [
        'Pre-marriage counselling',
        'Family alignment discussions',
        'Relationship guidance',
        'Conflict resolution'
      ]
    },
    {
      id: 'life',
      title: 'Parenting Guidance',
      price: '₹999',
      duration: '45 minutes',
      icon: (
        <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      description: 'Support during personal transitions and important life decisions',
      includes: [
        'Life transition support',
        'Decision-making guidance',
        'Family discussions',
        'Personal clarity'
      ]
    }
  ]

  return (
    <div className="py-4">
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2 text-center">
        Select Your Service
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        Choose the counselling service that best fits your needs
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className={`border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg ${selectedService?.id === service.id
                ? 'border-emerald-600 bg-emerald-50'
                : 'border-gray-200 hover:border-emerald-300'
              }`}
            onClick={() => onServiceSelect(service)}
          >
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white rounded-full shadow-sm">
                {service.icon}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2 text-center">
              {service.title}
            </h3>

            {/* Price & Duration */}
            <div className="text-center mb-4">
              <p className="text-2xl font-bold text-emerald-600">{service.price}</p>
              <p className="text-sm text-gray-500">{service.duration} session</p>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 text-center">
              {service.description}
            </p>

            {/* Includes */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-700 mb-2">Includes:</p>
              {service.includes.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs text-gray-600">{item}</span>
                </div>
              ))}
            </div>

            {/* Select Button */}
            {selectedService?.id === service.id && (
              <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Selected
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Continue Button */}
      {selectedService && (
        <div className="mt-8 text-center">
          <button
            onClick={() => onServiceSelect(selectedService)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-12 py-4 rounded-lg transition-colors text-lg"
          >
            Continue to Payment
          </button>
        </div>
      )}
    </div>
  )
}

export default ServiceSelection