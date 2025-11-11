import { FaShieldAlt, FaHome, FaHandshake, FaChartLine, FaHeadset, FaAward } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: 'Trusted & Secure',
      description: 'All properties are verified and transactions are 100% secure with our advanced encryption.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <FaHome />,
      title: 'Wide Selection',
      description: 'Browse thousands of properties from apartments to luxury villas in prime locations.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <FaHandshake />,
      title: 'Expert Guidance',
      description: 'Our experienced agents provide personalized assistance throughout your journey.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: <FaChartLine />,
      title: 'Best Market Prices',
      description: 'Get competitive pricing with market analysis and transparent pricing policies.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <FaHeadset />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you with any queries or concerns.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: <FaAward />,
      title: 'Award Winning',
      description: 'Recognized for excellence in real estate services with multiple industry awards.',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="text-center mb-16">
        <span className="text-purple-600 dark:text-purple-400 font-bold text-sm uppercase tracking-wider">Our Advantages</span>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-4 mt-2">Why Choose HomeNest?</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
          We provide the best real estate experience with our commitment to excellence, transparency, and customer satisfaction
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group p-8 rounded-2xl bg-gray-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
