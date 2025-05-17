"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { IfrontCategory } from "@/types/frontend";

interface CategoryProps {
    categories: IfrontCategory[];
}

export default function ShopByCategory() {
    const { categories } = usePage<CategoryProps>().props;
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    // Debugging (optional)
    // console.log("Categories:", categories);

    if (!categories || categories.length === 0) {
        return (
            <div className="text-center py-16 text-gray-500">
                No categories available.
            </div>
        );
    }

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
                            className={`group relative rounded-xl overflow-hidden shadow-md transition-all duration-500 ${
                                category.is_featured ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""
                            }`}
                            onMouseEnter={() => setHoveredId(category.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Image with Overlay */}
                            <div className="relative w-full h-full aspect-[4/3]">
                                <img
                                    src={category.image || "/placeholder.svg"}
                                    alt={category.name}
                                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                                        hoveredId === category.id ? "scale-110" : "scale-100"
                                    }`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform transition-transform duration-500">
                                <h3 className="text-xl md:text-2xl font-bold mb-2">{category.name}</h3>
                                <p
                                    className={`text-white/80 text-sm mb-4 transition-opacity duration-500 ${
                                        hoveredId === category.id ? "opacity-100" : "opacity-0 sm:opacity-100"
                                    }`}
                                >
                                    {category.description}
                                </p>
                                <Link
                                    href={`/category/${category.id}`}
                                    className={`inline-flex items-center text-sm font-medium bg-white/20 backdrop-blur-sm text-white py-2 px-4 rounded-full border border-white/30 hover:bg-white hover:text-pink-600 transition-all duration-300 ${
                                        hoveredId === category.id
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
    );
}