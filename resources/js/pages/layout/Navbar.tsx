import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { Link } from '@inertiajs/react';
import CurrencyFormatter from '@/components/CurrencyFormatter';
import Banner from '@/components/Forontend/Banner';
import { IfrontBanner } from '@/types/frontend';

// Define CartItems type
interface CartItems {
  id: number;
  title: string;
  price: number;
  // Add other fields as needed
}



// Define Category type for the categories array
type Category = string | { name: string; dropdown: string[] };

// Define props for auth and user
interface Auth {
  user: {
    name: string;
    // Add other user fields as needed
  } | null;
}

// Define Navbar props
interface NavbarProps {
  auth: Auth;
  totalQuantity: number;
  totalPrice: number;
  miniCartItems: CartItems[];
}


const categories: Category[] = [
  'NEW DROPS',
  'TRENDING NOW',
  'SILK SAREES',
  {
    name: 'COTTON VIBES',
    dropdown: ['Banarasi Cotton', 'Chanderi Cotton', 'Embroidered Cotton', 'Kanchi Cotton'],
  },
  'COLLECTIONS',
  'FUSION FITS',
  'READY TO SLAY',
  'OUR STORY',
];

const Navbar = () => {
  const { props } = usePage<NavbarProps>();
  const {banners}=usePage<{banners:IfrontBanner[]}>().props;

  const { auth, totalQuantity = 0, totalPrice = 0, miniCartItems = [] } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (isCartOpen && !(event.target as Element).closest('.cart-dropdown')) {
        setIsCartOpen(false);
      }
      if (isOpen && !(event.target as Element).closest('.user-dropdown')) {
        setIsOpen(false);
      }
      if (isPopupOpen && !(event.target as Element).closest('.cart-popup')) {
        setIsPopupOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    let popupTimeout: NodeJS.Timeout;
    if (isPopupOpen) {
      popupTimeout = setTimeout(() => {
        setIsPopupOpen(false);
      }, 3000);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(popupTimeout);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen, isOpen, isPopupOpen]);


  const handleCartClick = () => {
    if (!auth.user && totalQuantity === 0) {
      // Redirect to login if guest cart is empty (or handle guest cart logic)
      window.location.href = '/login';
    } else {
      setIsCartOpen(!isCartOpen);
      setIsPopupOpen(true);
    }
  };

  // Handler for dropdown toggle
  const handleDropdownToggle = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <nav
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
    >
      {/* Announcement Banner with Gradient */}
      <Banner banners={banners} />

      {/* Main Navbar Container */}
      <div className="flex justify-between items-center px-4 md:px-8 py-3">
        {/* Logo */}
        <img
          src="https://rmkv.com/cdn/shop/files/rmkv-logo_600x.webp?v=1725338242"
          alt="RMKV Wedding Silks"
          className="h-10 md:h-12 w-[100px]"
        />

        {/* Mobile Icons and Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="relative overflow-hidden group">
            <Search
              className={`w-5 h-5 cursor-pointer ${scrolled ? 'text-gray-700' : 'text-white'} group-hover:text-pink-500 transition-colors`}
            />
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </button>

          {auth.user ? (
            <>
              <button>
                <User className={`w-5 h-5 ${scrolled ? 'text-gray-700' : 'text-white'}`} />
              </button>
              <button>
                <Heart className={`w-5 h-5 ${scrolled ? 'text-gray-700' : 'text-white'}`} />
              </button>
            </>
          ) : (
            <Link href="/login" className="text-sm text-white hover:text-pink-500">
              Log in
            </Link>
          )}

          {/* Cart Button for Mobile (Always Visible) */}
          <div className="relative">
            <button onClick={handleCartClick} className="relative overflow-hidden group">
              <ShoppingBag
                className={`w-5 h-5 cursor-pointer ${scrolled ? 'text-gray-700' : 'text-white'} group-hover:text-pink-500 transition-colors`}
              />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                  {totalQuantity}
                </span>
              )}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </button>
          </div>

          <button
            className="focus:outline-none relative overflow-hidden group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X
                className={`${scrolled ? 'text-gray-700' : 'text-white'} w-6 h-6 group-hover:text-pink-500 transition-colors`}
              />
            ) : (
              <Menu
                className={`${scrolled ? 'text-gray-700' : 'text-white'} w-6 h-6 group-hover:text-pink-500 transition-colors`}
              />
            )}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </button>
        </div>

        {/* Desktop Menu */}
        <ul
          className={`hidden md:flex md:space-x-6 font-medium ${scrolled ? 'text-gray-900' : 'text-white'} transition-colors duration-300`}
        >
          {categories.map((item, index) =>
            typeof item === 'string' ? (
              <li key={index} className="cursor-pointer relative overflow-hidden group">
                <span className="group-hover:text-pink-500 transition-colors">{item}</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </li>
            ) : (
              <li key={index} className="relative group cursor-pointer">
                <div className="relative overflow-hidden">
                  <span
                    className={`flex items-center group-hover:text-pink-500 transition-colors ${scrolled ? '' : 'text-white'}`}
                    onClick={() => handleDropdownToggle(item.name)}
                  >
                    {item.name} <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </div>
                <div className="absolute left-0 hidden group-hover:block bg-white/95 backdrop-blur-md shadow-lg rounded-xl p-3 mt-2 min-w-[250px] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-pink-100">
                  {item.dropdown.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href="#"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-pink-600 rounded-lg transition-all duration-200 relative overflow-hidden group/item"
                    >
                      <span>{subItem}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover/item:w-full transition-all duration-300"></span>
                    </a>
                  ))}
                </div>
              </li>
            ),
          )}
        </ul>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-5">
          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="relative overflow-hidden group">
            <Search
              className={`w-5 h-5 cursor-pointer ${scrolled ? 'text-gray-700' : 'text-white'} group-hover:text-pink-500 transition-colors`}
            />
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </button>

          {auth.user ? (
            <>
              <div className="relative">
                <button className="relative overflow-hidden flex items-center" onClick={() => setIsOpen(!isOpen)}>
                  <span className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-pink-500`}>
                    {auth.user?.name === 'Super Admin' ? 'SA' : auth.user?.name}
                  </span>
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-md shadow-lg rounded-xl p-2 mt-2 min-w-[150px] opacity-100 transition-all duration-300 border border-pink-100 user-dropdown">
                    <Link
                      href={route('dashboard')}
                      className="block px-4 py-2.5 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-pink-600 rounded-lg transition-all duration-200"
                    >
                      Profile
                    </Link>
                    <Link
                      href={route('logout')}
                      method="post"
                      as="button"
                      className="block w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-pink-600 rounded-lg transition-all duration-200"
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
              <button className="relative overflow-hidden group">
                <Heart
                  className={`w-5 h-5 cursor-pointer ${scrolled ? 'text-gray-700' : 'text-white'} group-hover:text-pink-500 transition-colors`}
                />
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-md text-white hover:text-pink-500">
                Log in
              </Link>
              <Link href="/register" className="text-md text-white hover:text-pink-500">
                Register
              </Link>
            </>
          )}

          {/* Cart Button for Desktop (Always Visible) */}
          <div className="relative">
            <button onClick={handleCartClick} className="relative overflow-hidden group">
              <ShoppingBag
                className={`w-5 h-5 cursor-pointer ${scrolled ? 'text-gray-700' : 'text-white'} group-hover:text-pink-500 transition-colors`}
              />
              {totalQuantity > 0 && (
                <span className="absolute -top-0 -right-1 bg-pink-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                  {totalQuantity}
                </span>
              )}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </button>
          </div>

          {/* Cart Dropdown */}
          {isCartOpen && (
            <div className="absolute top-full right-2 w-[300px] bg-white shadow-lg rounded-lg p-4 mt-2 cart-dropdown">
              <h3 className="font-medium text-lg mb-3">Cart</h3>
              {miniCartItems.length > 0 ? (
                <div>
                  <div className="flex justify-between font-semibold mt-2">
                    <span>Total Items:</span>
                    <span>{totalQuantity}</span>
                  </div>
                  <div className="flex justify-between font-semibold mt-2">
                    <span>Total:</span>
                    <span>
                      <CurrencyFormatter amount={totalPrice} />
                    </span>
                  </div>
                  <Link
                    href={route('cart.index')}
                    className="block mt-3 text-center bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
                  >
                    View More
                  </Link>
                </div>
              ) : (
                <p>Your cart is empty!</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Search Bar Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md p-4 animate-slideDown">
          <div className="relative max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full py-3 pl-4 pr-10 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              autoFocus
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <button
              className="absolute -top-1 -right-1 bg-gray-200 rounded-full p-1"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg animate-slideDown">
          <ul className="flex flex-col p-4 font-medium divide-y divide-gray-100">
            {categories.map((item, index) =>
              typeof item === 'string' ? (
                <li
                  key={index}
                  className="py-3 cursor-pointer hover:text-pink-500 transition-colors text-gray-900"
                >
                  {item}
                </li>
              ) : (
                <li key={index} className="py-3 cursor-pointer">
                  <div
                    className="flex justify-between items-center"
                    onClick={() => handleDropdownToggle(item.name)}
                  >
                    <span className="hover:text-pink-500 transition-colors text-gray-900">{item.name}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180 text-pink-500' : ''
                        }`}
                    />
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === item.name ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <ul className="space-y-2 pl-4 bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg">
                      {item.dropdown.map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          className="text-gray-700 hover:text-pink-600 transition-colors py-1.5"
                        >
                          {subItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ),
            )}
          </ul>
        </div>
      )}

      {/* Styles */}
      <style>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slideDown {
                    animation: slideDown 0.3s ease forwards;
                }
        @keyframes popup {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-popup {
          animation: popup 0.3s ease forwards;
                }
            `}</style>
    </nav>
  );
};

export default Navbar;
