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
                Dinesh Pathak is a journalist by profession, but his work and purpose have long been deeply rooted in the lives of children and young people. His focus lies in understanding their challenges and supporting them—along with their parents and teachers—in addressing the everyday questions and decisions that shape growth, confidence, and direction.
              </p>

              <p>
                He strongly believes that children and youth represent the future of the country, and that nurturing them with clarity, values, and balanced guidance is essential to building a healthier society. With this belief at the core of his work, he has spent years engaging directly with students, educators, and families across schools and colleges, offering perspective, conversation, and practical support.
              </p>

              <p>
                Dinesh Pathak is the author of five books, all centered on parenting and youth development. His writing reflects real-world concerns around education, career choices, family expectations, and personal growth. He currently works with TV9 BharatVarsh as an author, where his articles and video content focus primarily on careers and education, helping young people and parents make informed, thoughtful decisions.
              </p>

              <p>
                In addition, he serves as Director – BTG Program at Protecon BTG Pvt Ltd. BTG, which stands for Bridging the Gap, is an initiative aimed at supporting young professionals as they transition from academics to industry. In this role, he oversees the Protecon BTG Certification Program, along with several certification programs designed for engineering graduates and MBA pass-outs, helping them build practical skills and career readiness.
              </p>

              <p>
                Across journalism, authorship, education programs, and counselling, his work remains guided by a single principle: listening carefully, engaging honestly, and helping individuals and families arrive at clarity without pressure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About