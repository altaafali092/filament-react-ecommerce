"use client"

import type React from "react"

import { useState } from "react"
import { ShoppingCart, Heart, Flame, TrendingUp, Sparkles, FlameIcon } from "lucide-react"
import type { IFrontProduct } from "@/types/frontend"
import CurrencyFormatter from "@/components/CurrencyFormatter"
import { Link } from "@inertiajs/react"

interface IndexProps {
    products: IFrontProduct[] | undefined
}

export default function NewArrivals({ products }: IndexProps) {
    const [hoveredId, setHoveredId] = useState<number | null>(null)
    const [likedProducts, setLikedProducts] = useState<number[]>([])



    // const addToCart = () => {
    //     form.post(route("cart.store", product.id), {
    //         preserveScroll: true,
    //         preserveState: true,
    //         onError: (err) => console.log(err),
    //     })
    // }

    return (
        <section className="py-12 px-4 md:px-6 bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="text-center mb-8 relative">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-3xl">✨</div>
                    <h2 className="text-4xl font-black bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-1">
                        DROP ALERT!
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto text-base">fresh fits just landed. cop before they're gone.</p>

                    <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-medium">
                            <TrendingUp className="w-3 h-3 mr-1" /> trending
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-medium">
                            <Flame className="w-3 h-3 mr-1" /> hot rn
                        </span>
                    </div>
                </div>

                {/* Product Grid - Now 4 columns on large screens */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products?.map((product) => (
                        <div
                            key={product.id}
                            className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white border border-gray-100"
                            onMouseEnter={() => setHoveredId(product.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Product Image - Reduced height */}
                            <div className="relative overflow-hidden h-48">
                                <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.title}
                                    className={`w-full h-full object-cover transition-all duration-500 ${hoveredId === product.id ? "scale-110" : "scale-100"
                                        }`}
                                />

                            </div>

                            {/* Content - More compact */}
                            <div className="p-3">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-sm font-bold line-clamp-1">{product.title}</h3>
                                    <div className="text-sm font-black bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                                        <CurrencyFormatter amount={product.price} />
                                    </div>
                                </div>

                                {/* Description - Shorter */}
                                <p className="text-gray-500 text-xs mb-2 line-clamp-1">
                                    {product.description.replace(/<[^>]*>?/gm, "")}
                                </p>

                                {/* Buttons - Simplified */}
                                <div className="flex gap-1">
                                    {/* <button onClick={addToCa} className="flex-1 inline-flex items-center justify-center text-xs font-bold bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white py-1.5 px-2 rounded-lg hover:opacity-90 transition-all">
                                        <ShoppingCart className="mr-1 h-3 w-3" />
                                        Add to Cart
                                    </button> */}

                                    <Link
                                        href={route('product-detail', { product: product.slug })}
                                        className=" inline-flex items-center justify-center text-xs font-bold border border-green-300 bg-gray-50 text-gray-700 hover:text-pink-700 py-1.5 px-2 rounded-lg hover:bg-green-500 transition-all"
                                    >
                                        <Sparkles className="mr-1 h-3 w-3" />
                                        Buy Now
                                    </Link>




                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-8 text-center">
                    <button className="inline-flex items-center justify-center text-sm font-bold bg-gray-800 text-white py-2 px-6 rounded-full hover:bg-gray-700 transition-all group">
                        see all the drip
                        <Flame className="ml-1.5 h-4 w-4 group-hover:rotate-12 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    )
}

