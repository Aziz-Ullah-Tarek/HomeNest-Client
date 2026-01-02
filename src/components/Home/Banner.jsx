import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Banner = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const response = await fetch('https://homenest-server.vercel.app/sliders');
      const data = await response.json();
      setSliders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sliders:', error);
      setLoading(false);
    }
  };

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight * 0.65,
      behavior: 'smooth'
    });
  };

  if (loading) {
    return (
      <div className="h-[65vh] bg-gradient-to-br from-purple-100 to-pink-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  if (!sliders || sliders.length === 0) {
    return (
      <div className="h-[65vh] bg-gradient-to-br from-purple-100 to-pink-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-gray-700 dark:text-gray-300 font-semibold">No sliders available</p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Please add sliders to your database</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative -mt-24 pt-24">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        loop={true}
        className="h-[65vh] max-h-[700px] rounded-b-3xl overflow-hidden"
      >
        {sliders.map((slide, index) => (
          <SwiperSlide key={slide._id || index}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl animate-fadeIn">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed drop-shadow-lg">
                      {slide.subtitle}
                    </p>
                    <Link
                      to={slide.buttonLink}
                      className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 hover:scale-105"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={scrollToNextSection}
          className="flex flex-col items-center gap-2 text-white hover:text-purple-300 transition-colors animate-bounce"
          aria-label="Scroll to next section"
        >
          <span className="text-sm font-semibold drop-shadow-lg">Explore More</span>
          <FaChevronDown className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
