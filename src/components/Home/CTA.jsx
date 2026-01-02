import { Link } from 'react-router-dom';
import { FaArrowRight, FaPlusCircle } from 'react-icons/fa';

const CTA = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Ready to Find Your Dream Home?
              </h2>
              <p className="text-purple-100 text-lg mb-8">
                Join thousands of happy homeowners who found their perfect property through HomeNest. Start your journey today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/properties"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                >
                  Browse Properties
                  <FaArrowRight />
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-purple-600 transition-all"
                >
                  <FaPlusCircle />
                  Get Started Free
                </Link>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="text-4xl font-black text-white mb-2">10K+</div>
                    <div className="text-purple-100">Properties</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="text-4xl font-black text-white mb-2">5K+</div>
                    <div className="text-purple-100">Happy Clients</div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="text-4xl font-black text-white mb-2">50+</div>
                    <div className="text-purple-100">Cities</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="text-4xl font-black text-white mb-2">98%</div>
                    <div className="text-purple-100">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
