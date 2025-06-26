import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ShoppingCartIcon,
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import CurrencyFormatter from '@/components/CurrencyFormatter';
import Banner from '@/components/Forontend/Banner';
import { CartItems, IfrontBanner, IFrontMenu } from '@/types/frontend';
import Logo from '@/components/Forontend/Menu/Logo';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/Forontend/Menu/SearchBar';


interface Auth {
  user:
  | {
    name: string;
  }
  | null;
}

// Define Navbar props
interface NavbarProps {
  auth: Auth;
  totalQuantity: number;
  totalPrice: number;
  miniCartItems: CartItems[];
}


const Navbar = () => {
  const { props } = usePage<NavbarProps>();
  const { banners } = usePage<{ banners: IfrontBanner[] }>().props;

  const { menus } = usePage<{ menus: IFrontMenu[] }>().props;
  const topLevelMenus = menus.filter((m) => m.menu_id === null)

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
      clearTimeout(popupTimeout);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen, isOpen, isPopupOpen]);

  const handleCartClick = () => {
    if (!auth.user && totalQuantity === 0) {
      window.location.href = '/login';
    } else {
      setIsCartOpen(!isCartOpen);
      setIsPopupOpen(true);
    }
  };

  const handleDropdownToggle = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <nav
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
    >
      {/* Announcement Banner */}
      <Banner banners={banners} />

      {/* Main Navbar Container */}
      <div className="flex justify-between items-center px-4 md:px-8 py-3">
        {/* Logo */}
        <Logo />
        {/* Mobile Icons and Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">

          {auth.user ? (
            <>
              <button>
                <User className={`w-5 h-5 ${scrolled ? 'text-gray-700' : 'text-white'}`} />
              </button>
            <button className="relative overflow-hidden group">
               <Link href={route('orderPage')}>
                <ShoppingCartIcon
                  className={`w-5 h-5 cursor-pointer ${scrolled ? 'text-gray-700' : 'text-white'} group-hover:text-pink-500 transition-colors`}
                />
               </Link>

              </button>
            </>
          ) : (
            <Link href="/login" className="text-sm text-white hover:text-pink-500">
              Log in
            </Link>
          )}

          {/* Cart Button for Mobile */}
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

            {/* Mobile Cart Dropdown */}
            {isCartOpen && (
              <div className="absolute top-full right-0 w-[280px] bg-white shadow-lg rounded-lg p-4 mt-2 cart-dropdown dark:bg-gray-700 animate-slideDown z-50">
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
            )}
          </div>

          {/* Hamburger Menu Toggle */}
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
        <ul className="hidden md:flex space-x-4 items-center">
          {topLevelMenus.map((item) => {
            const hasChildren = item.children?.data?.length > 0;

            // Determine link based on menu_type
            const getLink = () => {
              if (item.menu_type === 'static') {
                return route('front.static', { slug: item.slug });
              } else if (item.menu_type === 'category') {
                return `/shopByCategory/${item.slug}`;
              }
              return item.menu_url || '#';
            };

            return (
              <li key={item.id}>
                {hasChildren ? (
                  // Dropdown Menu
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`px-2 py-1 text-md font-semibold flex items-center gap-1 transition-colors duration-200 ${scrolled ? 'text-gray-900' : 'text-white'
                          } hover:text-pink-500`}
                      >
                        {item.title}
                        <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="bg-white shadow-xl rounded-lg p-2 mt-1 border border-pink-100 min-w-[180px]"
                      align="start"
                    >
                      {item.children.data.map((child) => (
                        <DropdownMenuItem key={child.id} asChild>
                          <Link
                            href={
                              child.menu_type === 'static'
                                ? route('front.static', { slug: child.slug })
                                : child.menu_type === 'category'
                                  ? `/shopByCategory/${child.slug}`
                                  : child.menu_url || '#'
                            }
                            className="block px-3 py-2 text-sm text-gray-800 rounded-md hover:bg-pink-50 hover:text-pink-600 transition-all"
                          >
                            {child.title}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  // Regular Link
                  <Link
                    href={getLink()}
                    className={`px-2 py-1 text-md font-semibold transition-colors duration-200 ${scrolled ? 'text-gray-900' : 'text-white'
                      } hover:text-pink-500`}
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            );
          })}
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
               <Link href={route('orderPage')}>
                <ShoppingCartIcon
                  className={`w-5 h-5 cursor-pointer ${scrolled ? 'text-gray-700' : 'text-white'} group-hover:text-pink-500 transition-colors`}
                />
               </Link>

              </button>
            </>
          ) : (
            <div className="flex items-center">
            <Link 
              href={route('login')} 
              className={`text-md font-medium px-4 py-2 rounded-lg  transition 
                ${scrolled ? 'text-gray-700 border-gray-300 hover:bg-gray-100' : 'text-white border-white hover:bg-white hover:text-pink-500'}`}>
              Login
            </Link>
            <Link 
              href="/register" 
              className={`text-md font-medium px-4 py-2 rounded-lg  transition 
                ${scrolled ? 'text-gray-700 border-gray-300 hover:bg-gray-100' : 'text-white border-white hover:bg-white hover:text-pink-500'}`}>
              Register
            </Link>
          </div>
          
          )}

          {/* Cart Button for Desktop */}
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

            {/* Cart Dropdown for Desktop */}
            {isCartOpen && (
              <div className="absolute top-full right-2 w-[300px] bg-white shadow-lg rounded-lg p-4 mt-2 cart-dropdown dark:bg-gray-700 hidden md:block animate-slideDown">
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
            )}
          </div>
        </div>
      </div>



      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg animate-slideDown z-50">
          <ul className="flex flex-col p-4 font-medium divide-y divide-gray-100">
            {topLevelMenus.map((item) => {
              const hasChildren = item.children?.data?.length > 0;

              return (
                <li key={item.id} className="py-3 cursor-pointer">
                  {hasChildren ? (
                    <>
                      <div
                        className="flex justify-between items-center"
                        onClick={() => handleDropdownToggle(item.title)}
                      >
                        <span className="hover:text-pink-500 transition-colors text-gray-900">
                          {item.title}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.title ? 'rotate-180 text-pink-500' : ''
                            }`}
                        />
                      </div>

                      {/* Submenu */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === item.title ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'
                          }`}
                      >
                        <ul className="space-y-2 pl-4 bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg">
                          {item.children.data.map((child) => (
                            <li
                              key={child.id}
                              className="text-gray-700 hover:text-pink-600 transition-colors py-1.5"
                            >
                              <Link href={
                                child.menu_type === 'static'
                                  ? route('front.static', { slug: child.slug })
                                  : child.menu_type === 'category'
                                    ? `/shopByCategory/${child.slug}`
                                    : child.menu_url || '#'
                              }>
                                {child.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={
                        item.menu_type === 'static'
                          ? route('front.static', { slug: item.slug })
                          : item.menu_type === 'category'
                            ? `/shopByCategory/${item.slug}`
                            : item.menu_url || '#'
                      }
                      className="block hover:text-pink-500 transition-colors"
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              );
            })}
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
};

export default Navbar;