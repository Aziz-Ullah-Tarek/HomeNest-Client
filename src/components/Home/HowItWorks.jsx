import { FaSearch, FaFileContract, FaKey, FaHandshake } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch />,
      step: '01',
      title: 'Search Property',
      description: 'Browse our extensive collection of properties or use advanced filters to find your perfect match.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <FaFileContract />,
      step: '02',
      title: 'Review Details',
      description: 'Get comprehensive property information, high-quality images, and virtual tours.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <FaHandshake />,
      step: '03',
      title: 'Schedule Visit',
      description: 'Book a property viewing at your convenience with our expert agents.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <FaKey />,
      step: '04',
      title: 'Get Your Keys',
      description: 'Complete the paperwork and move into your dream home hassle-free.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="text-center mb-16">
        <span className="text-purple-600 font-bold text-sm uppercase tracking-wider">Simple Process</span>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 mt-2">How It Works</h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Finding your dream home is easy with our streamlined 4-step process
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connection Lines for Desktop */}
        <div className="hidden lg:block absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-orange-500 to-green-500 opacity-20"></div>

        {steps.map((item, index) => (
          <div
            key={index}
            className="relative group"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-4 border-2 border-transparent hover:border-purple-300 h-full">
              {/* Step Number */}
              <div className="absolute -top-6 left-8">
                <span className="text-6xl font-black text-gray-100 group-hover:text-purple-100 transition-colors">
                  {item.step}
                </span>
              </div>

              {/* Icon */}
              <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl z-10`}>
                {item.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
