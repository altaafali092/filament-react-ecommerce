"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRightCircle } from "lucide-react"
import type { IFrontProduct } from "@/types/frontend"
import { Link } from "@inertiajs/react"
import ProductCard from "@/components/product/ProductCard"

// Frontend tabs — include "All" explicitly
const GENDER_TABS = ["All", "Mens", "Womens", "Kids", "Unisex"] as const

const genderLabels: Record<string, string> = {
  All: "All",
  Mens: "Men",
  Womens: "Women",
  Kids: "Kids",
  Unisex: "Unisex",
}

interface IndexProps {
  products: IFrontProduct[] | undefined
}

export default function NewArrivals({ products }: IndexProps) {
  const [selectedGender, setSelectedGender] = useState<string>("All")

  const filteredProducts =
    selectedGender === "All"
      ? products
      : products?.filter((product) => product.gender === selectedGender)

  return (
    <section className="py-6 px-4 md:px-6 bg-pink-50 dark:bg-gray-800">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            New Arrivals
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our latest collection of premium fashion pieces
          </p>
        </div>

        {/* Gender Tabs */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {GENDER_TABS.map((gender) => (
            <button
              key={gender}
              onClick={() => setSelectedGender(gender)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                selectedGender === gender
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
          {filteredProducts?.length ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600">
              No products found for {genderLabels[selectedGender]}
            </div>
          )}
        </div>

        {/* View More */}
        <div className="mt-5 text-center">
          <Link
            href="#"
            className="bg-gray-900 text-white px-5 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
          >
            View more
            <ArrowRightCircle className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
