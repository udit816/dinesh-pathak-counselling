import React from 'react'

function ContentMedia() {
  return (
    <section id="content" className="py-16 md:py-24 bg-gray-50">
      <div className="section-container">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6 text-center">
          Guidance & Reflections
        </h2>

        {/* Supporting copy */}
        <p className="text-base md:text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto leading-relaxed">
          Short reflections and guidance shared through videos and conversations, addressing common questions around education, relationships, and family decisions.
        </p>

        {/* Placeholder for YouTube/Instagram embeds */}
        {/* TODO: Replace with actual YouTube embed code or Instagram feed when content is ready */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg">
            {/* 16:9 aspect ratio container */}
            <div className="aspect-video flex items-center justify-center">
              <div className="text-center p-8">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-500 font-medium">Video content coming soon</p>
                <p className="text-sm text-gray-400 mt-2">
                  YouTube and social media content will be embedded here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContentMedia