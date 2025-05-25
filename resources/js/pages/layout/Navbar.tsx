import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import CurrencyFormatter from '@/components/CurrencyFormatter';
import Banner from '@/components/Forontend/Banner';
import { IfrontBanner, IFrontOfficeSetting } from '@/types/frontend';

// Define Types
interface CartItems {
  id: number;
  title: string;
  price: number;
}

type Category = string | { name: string; dropdown: string[] };

interface Auth {
  user: { name: string } | null;
}

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

export default function Navbar() {
  const { props } = usePage<NavbarProps>();
  const { banners } = usePage<{ banners: IfrontBanner[] }>().props;
  const { officeSettings } = usePage<{ officeSettings: IFrontOfficeSetting | null }>().props;
  const { auth, totalQuantity = 0, totalPrice = 0, miniCartItems = [] } = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Handle scroll and click outside
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    const handleClickOutside = (event: MouseEvent) => {
      if (isCartOpen && !(event.target as Element).closest('.cart-dropdown')) setIsCartOpen(false);
      if (isOpen && !(event.target as Element).closest('.user-dropdown')) setIsOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen, isOpen]);

  const handleCartClick = () => {
    if (!auth.user && totalQuantity === 0) {
      window.location.href = '/login';
    } else {
      setIsCartOpen(!isCartOpen);
    }
  };

  const handleDropdownToggle = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  // Reusable Cart Dropdown Component
  const CartDropdown = () => (
    <div className="absolute top-full right-0 w-[280px] bg-white shadow-lg rounded-lg p-4 mt-2 z-50 cart-dropdown dark:bg-gray-700 animate-slideDown">
      <h3 className="font-medium text-lg mb-3">Cart</h3>
      {miniCartItems.length > 0 ? (
        <div>
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {miniCartItems.map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span>{item.title}</span>
                <CurrencyFormatter amount={item.price} />
              </li>
            ))}
          </ul>
          <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
            <span>Total Items:</span>
            <span>{totalQuantity}</span>
          </div>
          <div className="flex justify-between font-semibold mt-1">
            <span>Total:</span>
            <span>
              <CurrencyFormatter amount={totalPrice} />
            </span>
          </div>
          {auth.user ? (
            <Link
              href={route('cart.index')}
              className="block mt-3 text-center bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
            >
              View Cart
            </Link>
          ) : (
            <Link
              href={route('login')}
              className="block mt-3 text-center bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
            >
              Login to View Cart
            </Link>
          )}
        </div>
      ) : (
        <p>Your cart is empty!</p>
      )}
    </div>
  );

  return (
    <nav
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      {/* Announcement Banner */}
      <Banner banners={banners} />

      {/* Main Navbar */}
      <div className="flex justify-between items-center px-4 md:px-8 py-3">
        {/* Logo */}
        <Link href={route('home')}>
          <img
            src={officeSettings?.office_logo ?? ''}
            alt="RMKV Wedding Silks"
            className="h-10 md:h-12 w-[100px]"
          />
        </Link>

        {/* Mobile Icons + Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Search Button */}
          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="relative overflow-hidden group">
            <Search
              className={`w-5 h-5 cursor-pointer ${scrolled ? 'text-gray-700' : 'text-white'} group-hover:text-pink-500`}
            />
          </button>

          {/* User / Login */}
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

          {/* Cart Button */}
          <div className="relative">
            <button onClick={handleCartClick} className="relative overflow-hidden group">
              <ShoppingBag
                className={`w-5 h-5 cursor-pointer ${scrolled ? 'text-gray-700' : 'text-white'} group-hover:text-pink-500`}
              />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                  {totalQuantity}
                </span>
              )}
            </button>
            {isCartOpen && <CartDropdown />}
          </div>

          {/* Hamburger Menu */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className={`${scrolled ? 'text-gray-700' : 'text-white'} w-6 h-6`} />
            ) : (
              <Menu className={`${scrolled ? 'text-gray-700' : 'text-white'} w-6 h-6`} />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className={`hidden md:flex md:space-x-6 font-medium ${scrolled ? 'text-gray-900' : 'text-white'}`}>
          {categories.map((item, index) =>
            typeof item === 'string' ? (
              <li key={index}>{item}</li>
            ) : (
              <li key={index}>
                <span onClick={() => handleDropdownToggle(item.name)}>{item.name}</span>
                {activeDropdown === item.name && (
                  <div className="absolute left-0 bg-white shadow-lg rounded mt-2 min-w-[200px] z-50">
                    {item.dropdown.map((subItem, i) => (
                      <a key={i} href="#" className="block px-4 py-2 hover:bg-pink-100">
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ),
          )}
        </ul>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-5">
          <button onClick={() => setIsSearchOpen(!isSearchOpen)}>Search</button>

          {auth.user ? (
            <>
              <div className="relative">
                <button onClick={() => setIsOpen(!isOpen)}>{auth.user.name}</button>
                {isOpen && (
                  <div className="absolute right-0 bg-white shadow-lg rounded z-50 user-dropdown">
                    <Link href={route('dashboard')} className="block px-4 py-2 hover:bg-pink-100">
                      Profile
                    </Link>
                    <Link
                      href={route('logout')}
                      method="post"
                      as="button"
                      className="block w-full text-left px-4 py-2 hover:bg-pink-100"
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
              <button>Heart</button>
            </>
          ) : (
            <>
              <Link href="/login">Log in</Link>
              <Link href="/register">Register</Link>
            </>
          )}

          {/* Cart Button (Desktop) */}
          <div className="relative">
            <button onClick={handleCartClick}>Cart ({totalQuantity})</button>
            {isCartOpen && <CartDropdown />}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-40">
          <ul className="flex flex-col p-4">
            {categories.map((item, index) =>
              typeof item === 'string' ? (
                <li key={index}>{item}</li>
              ) : (
                <li key={index}>
                  <div onClick={() => handleDropdownToggle(item.name)}>{item.name}</div>
                  {activeDropdown === item.name && (
                    <ul className="pl-4">
                      {item.dropdown.map((subItem, i) => (
                        <li key={i}>{subItem}</li>
                      ))}
                    </ul>
                  )}
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
      `}</style>
    </nav>
  );
}