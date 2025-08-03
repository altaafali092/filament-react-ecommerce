"use client"

import { useState } from "react"
import { IFrontProduct } from "@/types/frontend"
import { ArrowRight } from "lucide-react"
import { Link } from "@inertiajs/react"
import ProductCard from "@/components/product/ProductCard"

// Gender tabs (including "All" for no filter)
const GENDER_TABS = ["All", "Mens", "Womens", "Kids", "Unisex"] as const

const genderLabels: Record<string, string> = {
    All: "All",
    Mens: "Men",
    Womens: "Women",
    Kids: "Kids",
    Unisex: "Unisex",
}

interface MostOrderedProps {
    mostOrderedProducts: IFrontProduct[]
}

export default function MostOrdered({ mostOrderedProducts }: MostOrderedProps) {
    const [selectedGender, setSelectedGender] = useState<string>("All")

    const filteredMostOrdereds =
        selectedGender === "All"
            ? mostOrderedProducts
            : mostOrderedProducts.filter((item) => item.gender === selectedGender)

    return (
        <section className="py-16 px-4 md:px-6 bg-white">
            <div className="container mx-auto max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Most Ordered Products
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Customers love these! Check out our top-selling items.
                    </p>
                </div>

                {/* Gender Filter Tabs */}
                <div className="flex justify-center gap-3 mb-8 flex-wrap">
                    {GENDER_TABS.map((gender) => (
                        <button
                            key={gender}
                            onClick={() => setSelectedGender(gender)}
                            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${selectedGender === gender
                                ? "bg-gray-900 text-white"
                                : "bg-white text-gray-800 hover:bg-gray-100"
                                }`}
                        >
                            {genderLabels[gender]}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredMostOrdereds.length > 0 ? (
                        filteredMostOrdereds.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-600">
                            No products found for {genderLabels[selectedGender]}.
                        </div>
                    )}
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
