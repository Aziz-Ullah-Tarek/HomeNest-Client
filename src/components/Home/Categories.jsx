import { FaHome, FaBuilding, FaStore, FaTree, FaWarehouse, FaCity } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    { name: 'Residential', icon: <FaHome />, count: '2,500+', color: 'from-blue-500 to-blue-600' },
    { name: 'Commercial', icon: <FaBuilding />, count: '1,200+', color: 'from-purple-500 to-purple-600' },
    { name: 'Rent', icon: <FaStore />, count: '3,800+', color: 'from-pink-500 to-pink-600' },
    { name: 'Land', icon: <FaTree />, count: '950+', color: 'from-green-500 to-green-600' },
    { name: 'Sale', icon: <FaWarehouse />, count: '4,200+', color: 'from-orange-500 to-orange-600' },
    { name: 'Urban', icon: <FaCity />, count: '1,800+', color: 'from-indigo-500 to-indigo-600' }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Find properties that match your needs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to="/properties"
              className="group bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-slate-700"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-white text-3xl transform group-hover:rotate-12 transition-transform duration-300`}>
                {category.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-2">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                {category.count}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
