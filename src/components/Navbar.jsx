import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHome, FaBars, FaTimes, FaUser, FaBuilding, FaPlusCircle, FaStar } from 'react-icons/fa';
import { MdRealEstateAgent, MdDashboard } from 'react-icons/md';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { useAuth } from '../providers/AuthProvider';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Logout failed!');
    }
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/properties', label: 'All Properties', icon: <MdRealEstateAgent /> },
  ];

  const privateLinks = [
    { path: '/add-property', label: 'Add Properties', icon: <FaPlusCircle /> },
    { path: '/my-properties', label: 'My Properties', icon: <FaBuilding /> },
    { path: '/my-ratings', label: 'My Ratings', icon: <FaStar /> },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white shadow-2xl backdrop-blur-lg' 
        : 'bg-white/95 backdrop-blur-sm shadow-lg'
    }`}>
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Modern Design */}
          <Link to="/" className="flex items-center space-x-3 group relative">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MdRealEstateAgent className="text-3xl text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
                HomeNest
              </h1>
              <p className="text-xs font-semibold text-gray-500 tracking-wider">FIND YOUR DREAM</p>
            </div>
          </Link>

          {/* Desktop Navigation - Pill Style */}
          <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-2 py-2 space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:bg-white hover:text-purple-600 hover:shadow-md'
                  }`
                }
              >
                <span className="text-base">{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            ))}

            {user && privateLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:bg-white hover:text-purple-600 hover:shadow-md'
                  }`
                }
              >
                <span className="text-base">{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Auth Buttons - Modern Design */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-3 bg-linear-to-r from-purple-50 to-pink-50 border-2 border-purple-200 px-5 py-2.5 rounded-full">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || 'User'} 
                      className="w-9 h-9 rounded-full object-cover border-2 border-purple-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className="w-9 h-9 rounded-full bg-linear-to-r from-purple-600 to-pink-600 flex items-center justify-center"
                    style={{ display: user.photoURL ? 'none' : 'flex' }}
                  >
                    <FaUser className="text-white text-sm" />
                  </div>
                  <span className="text-gray-800 font-bold">{user.displayName || user.email?.split('@')[0] || 'User'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-gray-800 text-white px-6 py-2.5 rounded-full font-bold hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <BiLogOut className="text-lg" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 border-2 border-purple-600 text-purple-600 px-6 py-2.5 rounded-full font-bold hover:bg-purple-50 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                >
                  <BiLogIn className="text-lg" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center space-x-2 bg-linear-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-full font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <FaUser className="text-sm" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
          >
            {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>

        {/* Mobile Navigation - Slide-in Menu */}
        <div className={`lg:hidden fixed inset-y-0 right-0 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="h-full overflow-y-auto">
            {/* Mobile Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-2 rounded-xl">
                    <MdRealEstateAgent className="text-2xl text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-white">HomeNest</h2>
                    <p className="text-xs text-purple-100">MENU</p>
                  </div>
                </div>
                <button onClick={toggleMenu} className="text-white p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              {/* User Info Mobile */}
              {user && (
                <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <FaUser className="text-purple-600" />
                  </div>
                  <span className="text-white font-bold">{user?.name || 'User'}</span>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <div className="p-4 space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-4 rounded-xl font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.label}</span>
                </NavLink>
              ))}

              {user && (
                <>
                  <div className="pt-2 pb-2">
                    <div className="border-t border-gray-200"></div>
                  </div>
                  {privateLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-4 py-4 rounded-xl font-bold transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`
                      }
                    >
                      <span className="text-xl">{link.icon}</span>
                      <span>{link.label}</span>
                    </NavLink>
                  ))}
                </>
              )}
            </div>

            {/* Auth Buttons Mobile */}
            <div className="p-4 space-y-3 border-t border-gray-200">
              {user ? (
                <>
                  <div className="flex items-center space-x-3 bg-linear-to-r from-purple-50 to-pink-50 border-2 border-purple-200 px-4 py-3 rounded-xl mb-3">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || 'User'} 
                        className="w-10 h-10 rounded-full object-cover border-2 border-purple-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className="w-10 h-10 rounded-full bg-linear-to-r from-purple-600 to-pink-600 flex items-center justify-center"
                      style={{ display: user.photoURL ? 'none' : 'flex' }}
                    >
                      <FaUser className="text-white" />
                    </div>
                    <span className="text-gray-800 font-bold">{user.displayName || user.email?.split('@')[0] || 'User'}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 bg-gray-800 text-white px-4 py-4 rounded-xl font-bold hover:bg-gray-900 transition-all duration-300 shadow-lg"
                  >
                    <BiLogOut className="text-xl" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center space-x-2 border-2 border-purple-600 text-purple-600 px-4 py-4 rounded-xl font-bold hover:bg-purple-50 transition-all duration-300"
                  >
                    <BiLogIn className="text-xl" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center space-x-2 bg-linear-to-r from-purple-600 to-pink-600 text-white px-4 py-4 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
                  >
                    <FaUser />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm -z-10"
            onClick={toggleMenu}
          ></div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
