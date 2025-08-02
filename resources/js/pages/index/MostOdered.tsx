"use client"

import { useState } from "react"
import { ArrowRight, Heart, ShoppingCart } from "lucide-react"
import CurrencyFormatter from "@/components/CurrencyFormatter"
import { Link } from "@inertiajs/react"
import { IFrontProduct } from "@/types/frontend"
import ProductCard from "@/components/product/ProductCard"


interface MostOrderedProps {
    mostOrderedProducts: IFrontProduct[]
}

export default function MostOrdered({ mostOrderedProducts }: MostOrderedProps) {

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
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Most Ordered Products
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Customers love these! Check out our top-selling items.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {mostOrderedProducts.map((item) => (
                        <div key={item.id} className="group relative">
                            <ProductCard key={item.id} product={item} />
                        </div>
                    ))}
                </div>

                {/* <div className="mt-5 text-center">
                    <Link
                        href="#"
                        className="bg-gray-900 text-white px-5 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
                    >
                        View more
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div> */}
            </div>
        </section>
    )
}
