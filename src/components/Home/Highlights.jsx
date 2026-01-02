import { FaClock, FaShieldAlt, FaUserCheck, FaChartLine } from 'react-icons/fa';

const Highlights = () => {
  const highlights = [
    {
      icon: <FaClock />,
      title: 'Quick Listings',
      description: 'List your property in minutes',
      stat: '< 5 min'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Verified Properties',
      description: 'All listings are verified',
      stat: '100%'
    },
    {
      icon: <FaUserCheck />,
      title: 'Trusted Agents',
      description: 'Connect with certified agents',
      stat: '500+'
    },
    {
      icon: <FaChartLine />,
      title: 'Market Insights',
      description: 'Real-time property analytics',
      stat: 'Live'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Platform Highlights
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            What makes HomeNest stand out
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-slate-700 text-center hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-2xl">
                  {item.icon}
                </div>
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                  {item.stat}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
