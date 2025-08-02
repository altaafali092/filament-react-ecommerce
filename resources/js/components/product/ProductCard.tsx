"use client"

import { useState } from "react"
import { Heart, ShoppingCart } from "lucide-react"
import { Link } from "@inertiajs/react"
import CurrencyFormatter from "@/components/CurrencyFormatter"
import { IFrontProduct } from "@/types/frontend"

interface ProductCardProps {
  product: IFrontProduct
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const [liked, setLiked] = useState(false)

  return (
    <div
      className="group relative bg-gray-100 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-lg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <span className="px-2 py-0.5 bg-indigo-600 text-white text-xs font-semibold rounded-full">
            Popular
          </span>
        </div>

        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:bg-white hover:scale-110"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-300 ${
              liked ? "text-red-500 fill-red-500" : "text-gray-600"
            }`}
          />
        </button>

        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center transition-all duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex gap-2">
            <Link
              href={route("product-detail", { product: product.slug })}
              className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold text-xs hover:bg-gray-100 transition-all duration-300 flex items-center gap-1 shadow-md transform hover:scale-105"
            >
              <ShoppingCart className="w-3 h-3" />
              Buy Now
            </Link>
          </div>
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">
          {product.title}
        </h3>
        <p className="text-gray-500 text-xs line-clamp-1">
          {product.description.replace(/<[^>]*>?/gm, "")}
        </p>

        <div className="flex items-center justify-between mt-2">
          <div className="text-base font-bold text-gray-900">
            <CurrencyFormatter amount={product.price} />
          </div>
          <div className="flex items-center gap-1 text-yellow-400 text-xs">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-gray-500 ml-1">(4.8)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
