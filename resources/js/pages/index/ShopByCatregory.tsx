"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { IfrontCategory } from "@/types/frontend";

interface CategoryProps {
    categories: IfrontCategory[];
}

export default function FeaturedCategories() {
    const { props: { categories } } = usePage<{ props: CategoryProps }>();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    if (!categories || !Array.isArray(categories) || categories.length === 0) {
        return (
            <div className="text-center py-16 text-gray-500">
                No categories available.
            </div>
        );
    }

    const checkScrollButtons = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 220;
            const newScrollLeft = direction === 'left' 
                ? scrollRef.current.scrollLeft - scrollAmount
                : scrollRef.current.scrollLeft + scrollAmount;
            
            scrollRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
            
            setTimeout(checkScrollButtons, 150);
        }
    };

    useEffect(() => {
        checkScrollButtons();
    }, []);

    return (
        <section className="py-8 px-4 md:px-8 bg-gray-50">
            <div className="container mx-auto max-w-7xl">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Featured Categories
                    </h2>
                    
                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className={`p-2 rounded-full border transition-all duration-200 ${
                                canScrollLeft 
                                    ? 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700' 
                                    : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className={`p-2 rounded-full border transition-all duration-200 ${
                                canScrollRight 
                                    ? 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700' 
                                    : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Category Carousel */}
                <div className="relative">
                    <div 
                        ref={scrollRef}
                        onScroll={checkScrollButtons}
                        className="flex gap-1o overflow-x-auto scrollbar-hide pb-2"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={route('shopByCategory', { category: category.slug })}
                                className="flex-shrink-0 w-52"
                            >
                                <div className="flex flex-col items-center gap-3">
                                    <div className="group relative w-40 h-40 rounded-full overflow-hidden bg-gray-100">
                                        {/* Full Card Image */}
                                        <img
                                            src={category.image || "/placeholder.svg"}
                                            alt={category.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />

                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                                    </div>
                                    
                                    {/* Category Name Below Image */}
                                    <h3 className="text-lg font-semibold text-gray-800 text-center">
                                        {category.name}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
}