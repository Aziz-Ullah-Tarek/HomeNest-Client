import { FaSearch, FaHandshake, FaKey, FaShieldAlt, FaChartLine, FaHeadset } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: <FaSearch />,
      title: 'Property Search',
      description: 'Advanced search filters to find your perfect property quickly and easily.'
    },
    {
      icon: <FaHandshake />,
      title: 'Buy & Sell',
      description: 'Seamless buying and selling experience with verified listings.'
    },
    {
      icon: <FaKey />,
      title: 'Rent Properties',
      description: 'Find rental properties or list yours for rent with ease.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Secure Transactions',
      description: 'Your data and transactions are protected with top-tier security.'
    },
    {
      icon: <FaChartLine />,
      title: 'Market Analysis',
      description: 'Get insights on property values and market trends in real-time.'
    },
    {
      icon: <FaHeadset />,
      title: '24/7 Support',
      description: 'Our support team is always ready to help you with any questions.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Everything you need for your property journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-slate-700 group"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
