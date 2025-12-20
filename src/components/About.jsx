import React from 'react'

function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-12 text-center">
            About Dinesh Pathak
          </h2>

          {/* Content with image and text */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Profile Image */}
            <div className="w-full md:w-2/5 flex-shrink-0">
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="/dp_01.jpg"
                  alt="Dinesh Pathak - Senior Counsellor reading a book"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Body content */}
            <div className="w-full md:w-3/5 space-y-6 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                Dinesh Pathak is a senior counsellor and life guide who works with individuals and families navigating important personal decisions. His approach is calm, practical, and rooted in careful listening.
              </p>

              <p>
                Over the years, he has guided parents, students, young adults, and families through questions around education choices, marriage decisions, and family matters — helping them arrive at clarity without pressure or judgement.
              </p>

              <p>
                His counselling focuses on perspective, balance, and thoughtful decision-making, especially during moments of uncertainty or transition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About