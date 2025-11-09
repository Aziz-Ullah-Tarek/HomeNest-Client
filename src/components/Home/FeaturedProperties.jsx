import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import axios from 'axios';

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/properties/featured');
      console.log('Fetched featured properties:', response.data.length);
      setProperties(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching featured properties:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Featured Properties</h2>
          <p className="text-gray-600 text-lg">Discover our handpicked selection</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-96"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-linear-to-br from-gray-50 to-purple-50">
      <div className="text-center mb-12">
        <span className="text-purple-600 font-bold text-sm uppercase tracking-wider">Premium Selection</span>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 mt-2">Featured Properties</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover our handpicked selection of premium properties in the best locations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                  {property.status || 'For Sale'}
                </span>
              </div>
              <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300">
                <FaHeart />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center text-gray-600 text-sm mb-3">
                <FaMapMarkerAlt className="text-purple-600 mr-2" />
                <span>{property.location}</span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                {property.title}
              </h3>

              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FaBed className="text-purple-600 mr-1" />
                    <span>{property.bedrooms || 3}</span>
                  </div>
                  <div className="flex items-center">
                    <FaBath className="text-purple-600 mr-1" />
                    <span>{property.bathrooms || 2}</span>
                  </div>
                  <div className="flex items-center">
                    <FaRulerCombined className="text-purple-600 mr-1" />
                    <span>{property.area || '1200'} sqft</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="text-2xl font-black text-purple-600">
                    ${property.price?.toLocaleString() || '250,000'}
                  </p>
                </div>
                <Link
                  to={`/properties/${property._id}`}
                  className="bg-linear-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/properties"
          className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          View All Properties
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProperties;
