import { FaCalendar, FaUser, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const RecentBlogs = () => {
  const blogs = [
    {
      title: '10 Tips for First-Time Home Buyers',
      excerpt: 'Essential advice to help you navigate the home buying process with confidence...',
      author: 'Sarah Johnson',
      date: 'Dec 28, 2025',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
      category: 'Buying Guide'
    },
    {
      title: 'How to Increase Your Property Value',
      excerpt: 'Smart renovations and improvements that give you the best return on investment...',
      author: 'Michael Chen',
      date: 'Dec 25, 2025',
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop',
      category: 'Investment'
    },
    {
      title: 'Real Estate Market Trends 2026',
      excerpt: 'Expert analysis of current market conditions and predictions for the coming year...',
      author: 'Emily Rodriguez',
      date: 'Dec 20, 2025',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
      category: 'Market Analysis'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              Latest Insights
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Expert tips and market updates
            </p>
          </div>
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold hover:shadow-lg transition-all"
          >
            View All
            <FaArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <article
              key={index}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-slate-700 group"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                    {blog.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-purple-600 dark:text-purple-400" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendar className="text-pink-600 dark:text-pink-400" />
                    <span>{blog.date}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentBlogs;
