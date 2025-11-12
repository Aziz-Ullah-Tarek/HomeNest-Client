import { useEffect, useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const MyRatings = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyReviews = async () => {
    try {
      const response = await axios.get(`https://homenest-server.vercel.app/reviews/user/${user.email}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchMyReviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleDeleteReview = async (reviewId) => {
    const result = await Swal.fire({
      title: 'Delete Review?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://homenest-server.vercel.app/reviews/${reviewId}`);
        setReviews(reviews.filter(review => review._id !== reviewId));
        
        Swal.fire({
          title: 'Deleted!',
          text: 'Your review has been deleted.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error deleting review:', error);
        toast.error('Failed to delete review');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent mb-4">
            My Ratings & Reviews
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You have submitted {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
          </p>
        </div>

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Reviews Yet</h3>
            <p className="text-gray-500 dark:text-gray-400">You haven't submitted any reviews yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div 
                key={review._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                {/* Property Thumbnail */}
                {review.propertyImage && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={review.propertyImage} 
                      alt={review.propertyName}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Property Name */}
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-400 mb-3">
                    {review.propertyName}
                  </h3>

                  {/* Star Rating */}
                  <div className="mb-4 flex items-center gap-3">
                    <Rating
                      initialValue={review.rating}
                      readonly
                      size={25}
                      fillColor="#fbbf24"
                      emptyColor="#d1d5db"
                    />
                    <span className="text-lg font-semibold text-gray-700 dark:text-gray-400">
                      {review.rating}.0
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {review.review}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      {review.userPhoto && (
                        <img 
                          src={review.userPhoto} 
                          alt={review.userName}
                          className="w-8 h-8 rounded-full"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div className="text-sm">
                        <p className="font-semibold text-gray-700">{review.userName}</p>
                        <p className="text-gray-500 text-xs">{formatDate(review.createdAt)}</p>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="px-4 py-2 bg-red-400 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-300 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRatings;