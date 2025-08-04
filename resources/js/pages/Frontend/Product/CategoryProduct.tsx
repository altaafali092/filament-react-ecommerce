"use client"
import { useEffect, useState, useMemo } from "react"
import { Grid3X3, List } from "lucide-react"
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
import ProductCard from "@/components/product/ProductCard"
import ProductGrid from "@/components/product/ProductGrid"

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

const GENDER_TABS = ["All", "Mens", "Womens", "Kids"]

export default function CategoryProduct() {
    const { props } = usePage<{
        category: IFrontCategory
        products: PaginatedProducts
    }>()
    
    const { category, products } = props
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [sortOption, setSortOption] = useState("featured")
    const [selectedGender, setSelectedGender] = useState("All")
    const [sortedProducts, setSortedProducts] = useState<IFrontProduct[]>([])

    // ✅ Memoize filteredProducts to prevent unnecessary re-renders
    const filteredProducts = useMemo(() => {
        return selectedGender === "All"
            ? products.data
            : products.data.filter(product => product.gender === selectedGender)
    }, [selectedGender, products.data])

    // ✅ Effect runs only when sortOption or filteredProducts changes (stable reference now)
    useEffect(() => {
        const result = [...filteredProducts]
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
    }, [sortOption, filteredProducts])

    return (
        <AuthLayout>
            <Head title={category.name} />
            <div className="bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black">
                {/* Hero Section */}
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

                {/* Main Content */}
                <div className="container mx-auto max-w-7xl px-4 py-8">
                    {/* Controls */}
                    <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                        <div className="flex flex-wrap gap-2">
                            {GENDER_TABS.map((gender) => (
                                <Button
                                    key={gender}
                                    variant={selectedGender === gender ? "default" : "outline"}
                                    onClick={() => setSelectedGender(gender)}
                                >
                                    {gender}
                                </Button>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <Select value={sortOption} onValueChange={setSortOption}>
                                <SelectTrigger className="w-[180px] dark:bg-gray-800 dark:border-gray-700 dark:text-white">
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

                    {/* Product Count */}
                    <div className="mb-6">
                        <p className="text-sm text-gray-500">
                            Showing {sortedProducts.length} of {products.meta.total} products
                        </p>
                    </div>

                    {/* Product List */}
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
                                >
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {sortedProducts.map((product) => (
                               <ProductGrid products={[product]} />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
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