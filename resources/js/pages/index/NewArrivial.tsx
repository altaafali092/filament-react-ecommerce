"use client"

import type React from "react"
import { useState } from "react"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import type { IFrontProduct } from "@/types/frontend"
import CurrencyFormatter from "@/components/CurrencyFormatter"
import { Link } from "@inertiajs/react"

interface IndexProps {
    products: IFrontProduct[] | undefined
}

export default function NewArrivals({ products }: IndexProps) {
    const [hoveredId, setHoveredId] = useState<number | null>(null)
    const [likedProducts, setLikedProducts] = useState<number[]>([])

    const toggleLike = (productId: number) => {
        setLikedProducts(prev => 
            prev.includes(productId) 
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        )
    }

    return (
        <section className="py-16 px-4 md:px-6 bg-white">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        New Arrivals
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Discover our latest collection of premium fashion pieces
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {products?.map((product) => (
                        <div
                            key={product.id}
                            className="group relative bg-gray-100  rounded-xl overflow-hidden transition-all duration-500 hover:shadow-lg"
                            onMouseEnter={() => setHoveredId(product.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Product Image Container */}
                            <div className="relative aspect-square overflow-hidden bg-gray-50">
                                <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                
                                {/* Status Badges */}
                                <div className="absolute top-2 left-2 flex flex-col gap-1">
                                    <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-semibold rounded-full">
                                        New
                                    </span>
                                </div>

                                {/* Heart Icon */}
                                <button
                                    onClick={() => toggleLike(product.id)}
                                    className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:bg-white hover:scale-110"
                                >
                                    <Heart 
                                        className={`w-4 h-4 transition-colors duration-300 ${
                                            likedProducts.includes(product.id) 
                                                ? "text-red-500 fill-red-500" 
                                                : "text-gray-600"
                                        }`} 
                                    />
                                </button>

                                {/* Hover Overlay with Buy Now Button */}
                                <div className={`absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center transition-all duration-300 ${
                                    hoveredId === product.id ? 'opacity-100' : 'opacity-0'
                                }`}>
                                    <div className="flex gap-2">
                                        <Link
                                            href={route('product-detail', { product: product.slug })}
                                            className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold text-xs hover:bg-gray-100 transition-all duration-300 flex items-center gap-1 shadow-md transform hover:scale-105"
                                        >
                                            <ShoppingCart className="w-3 h-3" />
                                            Buy Now
                                        </Link>
                                       
                                    </div>
                                </div>

                                {/* Quick Actions Bar (appears on hover) */}
                                <div className={`absolute bottom-2 left-2 right-2 transition-all duration-500 ${
                                    hoveredId === product.id 
                                        ? 'transform translate-y-0 opacity-100' 
                                        : 'transform translate-y-2 opacity-0'
                                }`}>
                                   
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-3">
                                <div className="mb-2">
                                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">
                                        {product.title}
                                    </h3>
                                    <p className="text-gray-500 text-xs line-clamp-1">
                                        {product.description.replace(/<[^>]*>?/gm, "")}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="text-base font-bold text-gray-900">
                                        <CurrencyFormatter amount={product.price} />
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-500">(4.8)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-16 text-center">
                    <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        View All Products
                    </button>
                </div>
            </div>
        </section>
    )
}