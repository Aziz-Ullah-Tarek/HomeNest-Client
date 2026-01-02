import { useState } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Property Buyer',
      image: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      text: 'HomeNest made finding my dream home incredibly easy! The platform is intuitive and the support team was fantastic throughout the entire process.'
    },
    {
      name: 'Michael Chen',
      role: 'Property Seller',
      image: 'https://i.pravatar.cc/150?img=2',
      rating: 5,
      text: 'I sold my property within 2 weeks of listing it on HomeNest. The exposure and quality of buyers was exceptional!'
    },
    {
      name: 'Emily Rodriguez',
      role: 'First-time Buyer',
      image: 'https://i.pravatar.cc/150?img=3',
      rating: 5,
      text: 'As a first-time buyer, I was nervous, but HomeNest guided me every step of the way. Highly recommended!'
    }
  ];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Real stories from real people
          </p>
        </div>

        <div className="relative">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-slate-700">
            <FaQuoteLeft className="text-5xl text-purple-200 dark:text-purple-900 mb-6" />
            
            <div className="flex items-center gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-xl" />
              ))}
            </div>

            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 italic leading-relaxed">
              "{testimonials[currentIndex].text}"
            </p>

            <div className="flex items-center gap-4">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 rounded-full border-4 border-purple-200 dark:border-purple-700"
              />
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 transition-all"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 transition-all"
            >
              <FaChevronRight />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-purple-600 w-8' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
