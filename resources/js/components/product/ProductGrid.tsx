"use client"

import { IFrontProduct } from "@/types/frontend"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"

interface ProductGridProps {
  products: IFrontProduct[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="space-y-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col md:flex-row gap-6 border rounded-lg p-4 group relative hover:border hover:border-amber-500"
        >
          <Link href={route("product-detail", product.slug)}>
            <img
              src={product.image}
              alt={product.title}
              className="w-full md:w-48 h-48 object-cover rounded-lg"
            />
          </Link>
          <div className="flex-1">
            <h3 className="text-lg font-medium">{product.title}</h3>
            <div className="flex items-center mt-1 mb-3">
              {product.sale_price ? (
                <>
                  <span className="text-pink-600 font-bold text-lg">
                    NPR {product.sale_price}
                  </span>
                  <span className="ml-2 text-gray-500 line-through">
                    NPR {product.price}
                  </span>
                </>
              ) : (
                <span className="font-medium text-lg">NPR {product.price}</span>
              )}
            </div>
            <div
              className="text-gray-600 text-sm mb-4"
              dangerouslySetInnerHTML={{
                __html:
                  product.description.length > 150
                    ? product.description.substring(0, 150) + "..."
                    : product.description,
              }}
            />
            <div className="flex flex-wrap gap-2 mb-4">
              {product.is_featured && (
                <Badge variant="outline">Featured</Badge>
              )}
            </div>
            <Button asChild variant="outline" size="sm" className="mt-2">
              <Link href={route("product-detail", product.slug)}>Buy Now</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
