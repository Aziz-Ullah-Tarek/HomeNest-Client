import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube,
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaHeart,
  FaArrowRight
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdRealEstateAgent } from 'react-icons/md';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaFacebookF />, url: 'https://facebook.com', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: <FaXTwitter />, url: 'https://twitter.com', label: 'X (Twitter)', color: 'hover:bg-black' },
    { icon: <FaInstagram />, url: 'https://instagram.com', label: 'Instagram', color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600' },
    { icon: <FaLinkedinIn />, url: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { icon: <FaYoutube />, url: 'https://youtube.com', label: 'YouTube', color: 'hover:bg-red-600' },
  ];

  return (
    <footer className="relative bg-gray-900 text-white">
      {/* CTA Section - Like the image */}
      {/* <div className="relative bg-gray-800 rounded-t-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left max-w-xl">
              <h3 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Ready to find your dream home?
              </h3>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-1 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Sign up for free
              </Link>
              <Link
                to="/properties"
                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-1 rounded-full font-bold transition-all duration-300 flex items-center space-x-2"
              >
                <span>Browse properties</span>
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Footer - Simple Layout */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            
            {/* Logo and Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
                  <MdRealEstateAgent className="text-2xl text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">HomeNest</h2>
                  <p className="text-xs text-gray-400">Find Your Dream</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Your trusted partner in finding the perfect property.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4">About</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">Home</Link></li>
                <li><Link to="/properties" className="text-gray-400 hover:text-white text-sm transition-colors">Properties</Link></li>
                <li><Link to="/add-property" className="text-gray-400 hover:text-white text-sm transition-colors">Add Property</Link></li>
              </ul>
            </div>

            {/* User Links */}
            <div>
              <h4 className="font-bold mb-4">My Account</h4>
              <ul className="space-y-2">
                <li><Link to="/my-properties" className="text-gray-400 hover:text-white text-sm transition-colors">My Properties</Link></li>
                <li><Link to="/my-ratings" className="text-gray-400 hover:text-white text-sm transition-colors">My Ratings</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms and conditions</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
                <li><Link to="/cookie-policy" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-4">Let's chat!</h4>
              <a href="mailto:info@homenest.com" className="text-gray-400 hover:text-white text-sm transition-colors block mb-3">
                info@homenest.com
              </a>
              
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 border-2 border-pink-500 rounded flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300"
                    aria-label={social.label}
                  >
                    <span className="text-sm">{social.icon}</span>
                  </a>
                  
                ))}
                
              </div>
              <div>
                <div>
                <p className='text-sm mt-1'>Designed by<a  className="text-pink-500 text-sm hover:underline " href="https://github.com/Aziz-Ullah-Tarek">Aziz Ullah Tarek</a></p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
