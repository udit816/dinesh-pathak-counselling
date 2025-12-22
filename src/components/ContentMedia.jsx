import React from 'react'
const bookImages = {
  'Bacchon ke Sunahre Bhavishya ke Sutra': new URL('../assets/Bacchon_ke_Sunahre_Bhavishya_ke_Sutra.jpg', import.meta.url).href,
  'Bacchon ki Safalta ke Mantra': new URL('../assets/Bacchon_ki_Safalta_ke_Mantra.jpg', import.meta.url).href,
  Tina: new URL('../assets/Tina.jpg', import.meta.url).href,
  'Ummeed Ki Kiran: Desh Ki Yuva Peedhi Ko Samarpit Ek Prayas': new URL('../assets/Ummeed_Ki_Kiran.jpg', import.meta.url).href,
  'Bas Thoda Saa': new URL('../assets/Bas_thoda_saa.jpeg', import.meta.url).href,
}

function ContentMedia() {
  const books = [
    {
      title: 'Bacchon ke Sunahre Bhavishya ke Sutra',
      link: 'https://www.amazon.in/-/hi/Dinesh-Pathak/dp/8188457868',
      image: bookImages['Bacchon ke Sunahre Bhavishya ke Sutra'],
    },
    {
      title: 'Bacchon ki Safalta ke Mantra',
      link: 'https://www.amazon.in/-/hi/Dinesh-Pathak/dp/8171383211',
      image: bookImages['Bacchon ki Safalta ke Mantra'],
    },
    {
      title: 'Tina',
      link: 'https://www.amazon.in/Tina-Dinesh-Pathak/dp/8187770384',
      image: bookImages.Tina,
    },
    {
      title: 'Ummeed Ki Kiran: Desh Ki Yuva Peedhi Ko Samarpit Ek Prayas',
      link: 'https://www.amazon.in/-/hi/Dinesh-Pathak-ebook/dp/B07V64S4TV',
      image: bookImages['Ummeed Ki Kiran: Desh Ki Yuva Peedhi Ko Samarpit Ek Prayas'],
    },
    {
      title: 'Bas Thoda Saa',
      link: '',
      image: bookImages['Bas Thoda Saa'],
    },
  ]

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

        {/* YouTube embed */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
            {/* 16:9 aspect ratio container */}
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/XwRq4sBFTr4"
                title="Guidance and reflections by Dinesh Pathak"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Books Section */}
        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 text-center mb-10">
            Books by Dinesh Pathak
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            {books.map((book) => (
              <div key={book.title} className="flex flex-col items-center gap-3 w-40">
                <div className="w-40 h-60 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                </div>
                <p className="text-center text-sm font-medium text-gray-800 h-24 flex items-center justify-center px-2">
                  {book.title}
                </p>
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-amber-500 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-amber-600"
                >
                  Buy on Amazon
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContentMedia