"use client"

import { useState, useEffect } from "react"
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown, Sparkles } from "lucide-react"
import { Link, router } from "@inertiajs/react"

const messages = [
    "✨ Worldwide Shipping Available! ✨",
    "🔥 Limited Time: 10% Off on Silk Sarees! 🔥",
    "💯 Exclusive Collection Now Available! 💯",
]

const categories = [
    "NEW DROPS",
    "TRENDING NOW",
    "SILK SAREES",
    {
        name: "COTTON VIBES",
        dropdown: ["Banarasi Cotton", "Chanderi Cotton", "Embroidered Cotton", "Kanchi Cotton"],
    },
    "COLLECTIONS",
    "FUSION FITS",
    "READY TO SLAY",
    "OUR STORY",
]

interface NavbarProps {
    auth: any; // Replace 'any' with your Auth type from SharedData
}

const Navbar = ({ auth }: NavbarProps) => {

    const [currentMessage, setCurrentMessage] = useState(0)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState(null)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessage((prev) => (prev + 1) % messages.length)
        }, 3000)

        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            clearInterval(interval)
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <nav
            className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"}`}
        >
            {/* Announcement Banner with Gradient */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-center py-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-20"></div>
                <span className="text-white font-medium text-sm md:text-base transition-opacity duration-500 inline-flex items-center">
                    <Sparkles className="w-4 h-4 mr-1" />
                    {messages[currentMessage]}
                </span>
            </div>

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
                            className={`w-5 h-5 cursor-pointer ${scrolled ? "text-gray-700" : "text-white"} group-hover:text-pink-500 transition-colors`}
                        />
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </button>


                    {auth.user ? (
                        <>
                            <button><User className={`w-5 h-5 ${scrolled ? "text-gray-700" : "text-white"}`} /></button>
                            <button><Heart className={`w-5 h-5 ${scrolled ? "text-gray-700" : "text-white"}`} /></button>
                            <button><ShoppingBag className={`w-5 h-5 ${scrolled ? "text-gray-700" : "text-white"}`} /></button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm text-white hover:text-pink-500">Log in</Link>

                        </>
                    )}


                    <button
                        className="focus:outline-none relative overflow-hidden group"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X
                                className={`${scrolled ? "text-gray-700" : "text-white"} w-6 h-6 group-hover:text-pink-500 transition-colors`}
                            />
                        ) : (
                            <Menu
                                className={`${scrolled ? "text-gray-700" : "text-white"} w-6 h-6 group-hover:text-pink-500 transition-colors`}
                            />
                        )}
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </button>
                </div>

                {/* Desktop Menu */}
                <ul
                    className={`hidden md:flex md:space-x-6 font-medium ${scrolled ? "text-gray-900" : "text-white"} transition-colors duration-300`}
                >
                    {categories.map((item, index) =>
                        typeof item === "string" ? (
                            <li key={index} className="cursor-pointer relative overflow-hidden group">
                                <span className="group-hover:text-pink-500 transition-colors">{item}</span>
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                            </li>
                        ) : (
                            <li key={index} className="relative group cursor-pointer">
                                <div className="relative overflow-hidden">
                                    <span
                                        className={`flex items-center group-hover:text-pink-500 transition-colors ${scrolled ? "" : "text-white"}`}
                                    >
                                        {item.name} <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </div>

                                {/* Stylish Dropdown Menu */}
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
                            className={`w-5 h-5 cursor-pointer ${scrolled ? "text-gray-700" : "text-white"} group-hover:text-pink-500 transition-colors`}
                        />
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </button>


                    {auth.user ? (
                        <>
                            <div className="relative">
                                {/* Button to Toggle Dropdown */}
                                <button
                                    className="relative overflow-hidden flex items-center"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <span className={`${scrolled ? "text-gray-700" : "text-white"} hover:text-pink-500`}>
                                        {auth.user.name === "Super Admin" ? "SA" : auth.user.name}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {isOpen && (
                                    <div
                                        className="absolute left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-md shadow-lg rounded-xl p-2 mt-2 min-w-[150px] opacity-100 transition-all duration-300 border border-pink-100"
                                        onMouseLeave={() => setIsOpen(false)} // Close when the mouse leaves the menu
                                    >
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
                                    className={`w-5 h-5 cursor-pointer ${scrolled ? "text-gray-700" : "text-white"} group-hover:text-pink-500 transition-colors`}
                                />
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                            </button>
                            <button className="relative overflow-hidden group">
                                <ShoppingBag
                                    className={`w-5 h-5 cursor-pointer ${scrolled ? "text-gray-700" : "text-white"} group-hover:text-pink-500 transition-colors`}
                                />
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                            </button>

                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-md text-white hover:text-pink-500">Log in</Link>
                            <Link href="/register" className="text-md text-white hover:text-pink-500">Register</Link>
                        </>
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
                            typeof item === "string" ? (
                                <li key={index} className={`py-3 cursor-pointer hover:text-pink-500 transition-colors text-gray-900`}>
                                    {item}
                                </li>
                            ) : (
                                <li key={index} className="py-3 cursor-pointer">
                                    <div
                                        className="flex justify-between items-center"
                                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                                    >
                                        <span className={`hover:text-pink-500 transition-colors text-gray-900`}>{item.name}</span>
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.name ? "rotate-180 text-pink-500" : ""}`}
                                        />
                                    </div>

                                    {/* Animated Collapsible Dropdown */}
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === item.name ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        <ul className="space-y-2 pl-4 bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg">
                                            {item.dropdown.map((subItem, subIndex) => (
                                                <li key={subIndex} className="text-gray-700 hover:text-pink-600 transition-colors py-1.5">
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

            {/* Add some extra space at the bottom for the fixed navbar */}
            <style >{`
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
    )
}

export default Navbar

