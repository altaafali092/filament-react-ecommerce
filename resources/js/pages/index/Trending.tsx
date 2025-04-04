"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Link } from "@inertiajs/react"

const categories = [
    {
        id: 1,
        name: "Denim Drop",
        description: "Edgy & bold denim styles for trendsetters",
        image: "https://i.pinimg.com/736x/7c/08/d8/7c08d875240f52a2fb3f61182bc179e9.jpg",
        featured: true,
    },
    {
        id: 2,
        name: "Streetwear Vibes",
        description: "Hypebeast fits with an urban touch",
        image: "https://rmkv.com/cdn/shop/files/kaathadi_cotton_sarees_collection.webp?v=1740387108&width=700",
    },
    {
        id: 3,
        name: "Y2K Aesthetic",
        description: "Throwback fashion with a modern edge",
        image: "https://rmkv.com/cdn/shop/files/bridal_lehenga_0c71b460-21f4-4355-9a0f-363f1aad0ca7.webp?v=1740393890&width=700",
    },
    {
        id: 4,
        name: "Festival Fits",
        description: "Vibrant, expressive outfits to stand out",
        image: "https://rmkv.com/cdn/shop/files/holiday_hues_27301512-7b02-4c8d-a5bc-cbe66d0b94b1.webp?v=1740393927&width=700",
    },
    {
        id: 5,
        name: "Athleisure Goals",
        description: "Sleek, comfy, and always on-trend",
        image: "https://rmkv.com/cdn/shop/files/andrum_endrendrum_75af910a-60c0-4180-9f7e-a4e82fbc7c06.webp?v=1740393868&width=700",
    },
]

export default function Trending() {
    const [hoveredId, setHoveredId] = useState(null);


    return (
        <section className="py-12 px-4 md:px-8 bg-gradient-to-b from-pink-50 to-pink-100">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-500 to-purple-400 bg-clip-text text-transparent">
                        Trending Now
                    </h2>
                    <p className="text-gray-300 max-w-xl mx-auto">
                        Stay ahead of the fashion game with our hottest picks.
                    </p>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-500"
                            onMouseEnter={() => setHoveredId(category.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Image */}
                            <img
                                src={category.image || "/placeholder.svg"}
                                alt={category.name}
                                className={`w-full h-80 object-cover transition-all duration-700 ${hoveredId === category.id ? "scale-105" : "scale-100"
                                    }`}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                            {/* Content */}
                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-2xl text-gray-100 font-bold">{category.name}</h3>
                                <p className="text-gray-300 text-sm mb-4">{category.description}</p>
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
