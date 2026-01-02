import { FaHome, FaUsers, FaAward, FaHandshake, FaCheckCircle } from 'react-icons/fa';
import { MdRealEstateAgent } from 'react-icons/md';

const About = () => {
  const features = [
    {
      icon: <FaHome className="text-4xl text-purple-600 dark:text-purple-400" />,
      title: 'Wide Selection',
      description: 'Browse through thousands of properties across different categories and locations.'
    },
    {
      icon: <FaUsers className="text-4xl text-pink-600 dark:text-pink-400" />,
      title: 'Trusted Community',
      description: 'Join a community of verified property owners and genuine buyers.'
    },
    {
      icon: <FaAward className="text-4xl text-purple-600 dark:text-purple-400" />,
      title: 'Quality Assured',
      description: 'Every listing is verified to ensure quality and authenticity.'
    },
    {
      icon: <FaHandshake className="text-4xl text-pink-600 dark:text-pink-400" />,
      title: 'Easy Transactions',
      description: 'Seamless process from browsing to closing the deal.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Properties Listed' },
    { number: '5,000+', label: 'Happy Customers' },
    { number: '50+', label: 'Cities Covered' },
    { number: '98%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-3xl shadow-2xl">
              <MdRealEstateAgent className="text-6xl text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            About HomeNest
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Your trusted partner in finding the perfect property. We connect buyers with their dream homes and help sellers reach the right audience.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 md:p-12 mb-12 border border-gray-100 dark:border-slate-700">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 text-center">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed text-center max-w-4xl mx-auto">
            At HomeNest, we believe everyone deserves to find their perfect home. Our mission is to make property hunting 
            simple, transparent, and enjoyable. We leverage modern technology to connect buyers and sellers, providing a 
            seamless experience from search to settlement.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-10 text-center">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-slate-700 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-10 text-center">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-purple-100 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-slate-700">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-8 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Transparency', description: 'We believe in honest and open communication with all our users.' },
              { title: 'Quality', description: 'We maintain high standards for every property listed on our platform.' },
              { title: 'Innovation', description: 'We continuously improve our platform to serve you better.' }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <FaCheckCircle className="text-5xl text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
