"use client"

import { useState } from "react"

import { ArrowRight } from "lucide-react"
import { Link } from "@inertiajs/react"

// Category data
const categories = [
    {
        id: 1,
        name: "Demin Jeans",
        description: "Luxurious silk sarees for special occasions",
        image: "https://i.pinimg.com/736x/7c/08/d8/7c08d875240f52a2fb3f61182bc179e9.jpg",
        featured: true,
    },
    {
        id: 2,
        name: "Cotton Collection",
        description: "Breathable cotton sarees for everyday elegance",
        image: "https://rmkv.com/cdn/shop/files/kaathadi_cotton_sarees_collection.webp?v=1740387108&width=700",
    },
    {
        id: 3,
        name: "Bridal Lehengas",
        description: "Statement pieces for your special day",
        image:
            "https://rmkv.com/cdn/shop/files/bridal_lehenga_0c71b460-21f4-4355-9a0f-363f1aad0ca7.webp?v=1740393890&width=700",
    },
    {
        id: 4,
        name: "Festival Collection",
        description: "Vibrant colors for celebration season",
        image:
            "https://rmkv.com/cdn/shop/files/holiday_hues_27301512-7b02-4c8d-a5bc-cbe66d0b94b1.webp?v=1740393927&width=700",
    },
    {
        id: 5,
        name: "Ready to Wear",
        description: "Contemporary styles for the modern woman",
        image:
            "https://rmkv.com/cdn/shop/files/andrum_endrendrum_75af910a-60c0-4180-9f7e-a4e82fbc7c06.webp?v=1740393868&width=700",
    },
    {
        id: 6,
        name: "Fusion Wear",
        description: "Where tradition meets contemporary style",
        image: "https://i.pinimg.com/736x/54/19/57/541957dd90c0caeba898b6fc21318daa.jpg",
    },
]

export default function ShopByCategory() {
    const [hoveredId, setHoveredId] = useState<number | null>(null)

    return (
        <section className="py-12 px-4 md:px-8 bg-gradient-to-b from-white to-pink-50">
            <div className="container mx-auto max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                        Shop by Category
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our curated collections and find your perfect style statement
                    </p>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className={`group relative rounded-xl overflow-hidden shadow-md transition-all duration-500 ${category.featured ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""
                                }`}
                            onMouseEnter={() => setHoveredId(category.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Category Image with Overlay */}
                            <div className="relative w-full h-full aspect-[4/3]">
                                <img
                                    src={category.image || "/placeholder.svg"}
                                    alt={category.name}
                                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${hoveredId === category.id ? "scale-110" : "scale-100"
                                        }`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                            </div>

                            {/* Category Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform transition-transform duration-500">
                                <h3 className="text-xl md:text-2xl font-bold mb-2">{category.name}</h3>
                                <p
                                    className={`text-white/80 text-sm mb-4 transition-opacity duration-500 ${hoveredId === category.id ? "opacity-100" : "opacity-0 sm:opacity-100"
                                        }`}
                                >
                                    {category.description}
                                </p>
                                <Link
                                    href={`/category/${category.id}`}
                                    className={`inline-flex items-center text-sm font-medium bg-white/20 backdrop-blur-sm text-white py-2 px-4 rounded-full border border-white/30 hover:bg-white hover:text-pink-600 transition-all duration-300 ${hoveredId === category.id
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-4 sm:opacity-100 sm:translate-y-0"
                                        }`}
                                >
                                    Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

