import { useState } from 'react';
import { FaPaperPlane, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <FaEnvelope className="text-4xl text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-purple-100 text-lg">
            Subscribe to our newsletter and never miss out on new properties and exclusive deals
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-6 py-4 rounded-full bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 rounded-full bg-white text-purple-600 font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
              ) : (
                <>
                  <FaPaperPlane />
                  Subscribe
                </>
              )}
            </button>
          </div>
          <p className="text-purple-100 text-sm mt-4 text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
