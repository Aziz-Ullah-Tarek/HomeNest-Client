import { FaUsers, FaBuilding, FaMapMarkedAlt, FaSmile } from 'react-icons/fa';

const Statistics = () => {
  const stats = [
    {
      icon: <FaUsers />,
      number: '10,000+',
      label: 'Happy Clients',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <FaBuilding />,
      number: '5,000+',
      label: 'Properties Listed',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <FaMapMarkedAlt />,
      number: '50+',
      label: 'Cities Covered',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <FaSmile />,
      number: '98%',
      label: 'Satisfaction Rate',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        <div className="text-center mb-16">
          <span className="text-pink-400 font-bold text-sm uppercase tracking-wider">Our Achievements</span>
          <h2 className="text-4xl md:text-5xl font-black mb-4 mt-2">Numbers Speak for Themselves</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Join thousands of satisfied customers who found their dream homes with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/20 group hover:scale-105"
            >
              <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl`}>
                {stat.icon}
              </div>
              <h3 className="text-5xl font-black mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {stat.number}
              </h3>
              <p className="text-gray-300 text-lg font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
