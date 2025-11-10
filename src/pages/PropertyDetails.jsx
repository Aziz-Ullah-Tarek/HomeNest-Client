import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendar, FaTags, FaStar, FaUser } from 'react-icons/fa';
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';
import { useAuth } from '../providers/AuthProvider';
import { toast } from 'react-toastify';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/properties/${id}`);
        setProperty(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching property details:', error);
        setLoading(false);
      }
    };
    fetchPropertyDetails();
  }, [id]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!rating || rating === 0) {
      toast.error('Please select a rating!');
      return;
    }
    if (!review.trim()) {
      toast.error('Please write a review!');
      return;
    }
    
    const newReview = {
      id: Date.now(),
      userName: user?.displayName || 'Anonymous',
      userPhoto: user?.photoURL || null,
      rating: rating / 20, // Convert from 0-100 to 1-5
      review: review,
      date: new Date().toISOString()
    };
    
    setReviews([newReview, ...reviews]);
    setRating(0);
    setReview('');
    toast.success('Review submitted successfully! ⭐');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Property Image */}
        <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl mb-8">
          <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
          <div className="absolute top-6 left-6">
            <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
              <FaTags /> {property.category}
            </span>
          </div>
        </div>

        {/* Property Info */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-4">{property.title}</h1>
          
          <div className="flex items-center text-gray-600 text-lg mb-6">
            <FaMapMarkerAlt className="text-purple-600 mr-2" />
            <span>{property.location}</span>
          </div>

          <div className="text-4xl font-black text-purple-600 mb-6">
            ${property.price?.toLocaleString()}
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{property.description}</p>
          </div>

          {/* Posted By & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t">
            <div className="flex items-center gap-3">
              {property.userPhoto ? (
                <img 
                  src={property.userPhoto} 
                  alt={property.userName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-300"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-linear-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white">
                  <FaUser />
                </div>
              )}
              <div>
                <p className="text-xs text-gray-500 font-semibold">Posted By</p>
                <p className="font-bold text-gray-900">{property.userName || 'Anonymous'}</p>
                <p className="text-xs text-gray-600">{property.userEmail}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FaCalendar className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold">Posted Date</p>
                <p className="font-bold text-gray-900">
                  {new Date(property.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ratings & Reviews */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-2">
            <FaStar className="text-yellow-400" />
            Ratings & Reviews
          </h2>

          {/* Add Review Form */}
          <form onSubmit={handleSubmitReview} className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-8">
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-3">Your Rating *</label>
              <Rating
                onClick={setRating}
                ratingValue={rating}
                size={35}
                fillColor="#fbbf24"
                emptyColor="#d1d5db"
                transition
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">Your Review *</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none resize-none"
                placeholder="Share your thoughts about this property..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
            >
              Submit Review
            </button>
          </form>

          {/* Reviews List */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">All Reviews ({reviews.length})</h3>
            
            {reviews.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <FaStar className="text-gray-300 text-5xl mx-auto mb-4" />
                <p className="text-gray-500 font-semibold">No reviews yet</p>
                <p className="text-sm text-gray-400">Be the first to review this property!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((reviewItem) => (
                  <div key={reviewItem.id} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {reviewItem.userPhoto ? (
                          <img 
                            src={reviewItem.userPhoto} 
                            alt={reviewItem.userName}
                            className="w-12 h-12 rounded-full object-cover border-2 border-purple-300"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-linear-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                            {reviewItem.userName?.charAt(0) || 'A'}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-gray-900">{reviewItem.userName}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(reviewItem.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={i < reviewItem.rating ? 'text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{reviewItem.review}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
