"use client"

import { useEffect, useState } from "react"
import { Grid3X3, List, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Head, Link, usePage } from "@inertiajs/react"
import AuthLayout from "@/pages/layout/AuthLayout"
import { Badge } from "@/components/ui/badge"
import { IFrontProduct } from "@/types/frontend"
import Pagination from "@/components/ui/Pagination"
import CurrencyFormatter from "@/components/CurrencyFormatter"

interface IFrontCategory {
    id: number
    name: string
    description: string
    image: string
    slug: string
}

interface PaginatedProducts {
    data: IFrontProduct[]
    meta: {
        current_page: number
        last_page: number
        next_page_url: string | null
        prev_page_url: string | null
        total: number
    }
}

export default function CategoryProduct() {
    const { props } = usePage<{
        category: IFrontCategory
        products: PaginatedProducts
    }>()

    const { category, products } = props

    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [sortOption, setSortOption] = useState("featured")
    const [sortedProducts, setSortedProducts] = useState<IFrontProduct[]>([])
    const [hoveredId, setHoveredId] = useState<number | null>(null)

    useEffect(() => {
        const result = [...products.data]
        result.sort((a, b) => {
            const priceA = a.sale_price || a.price
            const priceB = b.sale_price || b.price

            switch (sortOption) {
                case "price-low":
                    return priceA - priceB
                case "price-high":
                    return priceB - priceA
                case "newest":
                    return b.id - a.id
                case "featured":
                default:
                    return b.is_featured ? 1 : -1
            }
        })
        setSortedProducts(result)
    }, [sortOption, products.data])

    return (
        <AuthLayout>
            <Head title={category.name} />

            <div className="bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black">
                <div className="relative h-[450px] overflow-hidden">
                    <img
                        src={category.image}
                        alt={category.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            {category.name}
                        </h1>
                        <p className="text-white/80 max-w-2xl">
                            {category.description}
                        </p>
                    </div>
                </div>

                <div className="container mx-auto max-w-7xl px-4 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div className="w-full md:w-auto"></div>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <Select value={sortOption} onValueChange={setSortOption}>
                                <SelectTrigger className="w-full md:w-[180px] dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="featured">Featured</SelectItem>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="hidden md:flex border rounded-md">
                                <Button
                                    variant={viewMode === "grid" ? "default" : "ghost"}
                                    size="icon"
                                    className="rounded-none rounded-l-md"
                                    onClick={() => setViewMode("grid")}
                                >
                                    <Grid3X3 className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={viewMode === "list" ? "default" : "ghost"}
                                    size="icon"
                                    className="rounded-none rounded-r-md"
                                    onClick={() => setViewMode("list")}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <p className="text-sm text-gray-500">
                            Showing {sortedProducts.length} of {products.meta.total} products
                        </p>
                    </div>

                    {sortedProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <p className="text-xl font-medium text-gray-700 mb-2">No products found</p>
                        </div>
                    ) : viewMode === "grid" ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {sortedProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="group relative bg-gray-100 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-lg"
                                    onMouseEnter={() => setHoveredId(product.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                                        <img
                                            src={product.image || "/placeholder.svg"}
                                            alt={product.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                                            <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-semibold rounded-full">
                                                New
                                            </span>
                                        </div>
                                        <div className={`absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center transition-all duration-300 ${hoveredId === product.id ? 'opacity-100' : 'opacity-0'}`}>
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
                                        <div className={`absolute bottom-2 left-2 right-2 transition-all duration-500 ${hoveredId === product.id ? 'transform translate-y-0 opacity-100' : 'transform translate-y-2 opacity-0'}`}>
                                        </div>
                                    </div>

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
                    ) : (
                        <div className="space-y-6">
                            {sortedProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex flex-col md:flex-row gap-6 border rounded-lg p-4 group relative hover:border border-amber-500"
                                >
                                    <Link href={route('product-detail', product.slug)}>
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
                                                <span className="font-medium text-lg">
                                                    NPR {product.price}
                                                </span>
                                            )}
                                        </div>
                                        <div
                                            className="text-gray-600 text-sm mb-4"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    product.description.length > 150
                                                        ? product.description.substring(0, 150) + '...'
                                                        : product.description,
                                            }}
                                        />
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {product.is_featured && <Badge variant="outline">Featured</Badge>}
                                        </div>
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm"
                                            className="mt-2"
                                        >
                                            <Link href={route('product-detail', product.slug)}>
                                                Buy Now
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <Pagination
                        currentPage={products.meta.current_page}
                        lastPage={products.meta.last_page}
                        prevPageUrl={products.meta.prev_page_url}
                        nextPageUrl={products.meta.next_page_url}
                    />
                </div>
            </div>
        </AuthLayout>
    )
}
