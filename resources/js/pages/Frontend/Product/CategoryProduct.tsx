"use client"

import { useState, useEffect } from "react"
import { Grid3X3, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IfrontCategory, IFrontProduct } from "@/types/frontend"
import { Head, Link, usePage } from "@inertiajs/react"
import AuthLayout from "@/pages/layout/AuthLayout"
import { Badge } from "@/components/ui/badge"
import CurrencyFormatter from "@/components/CurrencyFormatter"

interface CategoryWithProducts {
    id: number
    name: string
    description: string
    image: string
    products: IFrontProduct[]
    
}

export default function CategoryProducts() {
    const { props: { category } } = usePage<{ category: CategoryWithProducts }>()
    console.log(category.products)
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [sortOption, setSortOption] = useState("featured")
    const [filteredProducts, setFilteredProducts] = useState<IFrontProduct[]>([])

    // Initialize filtered products on load
    useEffect(() => {
        setFilteredProducts(category.products)
    }, [])

    // Apply sorting
    useEffect(() => {
        let result = [...category.products]
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
        setFilteredProducts(result)
    }, [sortOption])

    return (
        <AuthLayout>
            <Head title={category.name} />
            <div className="bg-white">
                {/* Category Hero */}
                <div className="relative h-[450px] overflow-hidden">
                    <img
                        src={category.image}
                        alt={category.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{category.name}</h1>
                        <p className="text-white/80 max-w-2xl">{category.description}</p>
                    </div>
                </div>

                {/* Product Listing */}
                <div className="container mx-auto max-w-7xl px-4 py-8">
                    {/* Sorting & View Mode */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div className="w-full md:w-auto"></div>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <Select value={sortOption} onValueChange={setSortOption}>
                                <SelectTrigger className="w-full md:w-[180px]">
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

                    {/* Results Count */}
                    <div className="mb-6">
                        <p className="text-sm text-gray-500">
                            Showing {filteredProducts.length} of {category.products.length} products
                        </p>
                    </div>

                    {/* Product Grid/List */}
                    {filteredProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <p className="text-xl font-medium text-gray-700 mb-2">No products found</p>
                        </div>
                    ) : viewMode === "grid" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:border border-green-400"
                                >
                                    <Link href={route('product-detail', product.slug)}>
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-64 object-cover"
                                        />
                                    </Link>
                                    <div className="p-4">
                                        <h3 className="text-base font-semibold mb-2" dangerouslySetInnerHTML={{ __html: product.title.length>50 ? product.title.substring(0,40) + '...' : product.title}} />
                                       
                                        <div className="flex items-center justify-between">
                                          
                                            <span className="text-pink-600 font-bold">
                                                NPR {product.sale_price || product.price}
                                            </span>
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
                    ) : (
                        <div className="space-y-6">
                            {filteredProducts.map((product) => (
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
                                        <div className="text-gray-600 text-sm mb-4" 
                                            dangerouslySetInnerHTML={{
                                                __html: product.description.length > 150
                                                    ? product.description.substring(0, 150) + '...'
                                                    : product.description
                                            }}
                                        />
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {product.is_featured && <Badge variant="outline">Featured</Badge>}
                                            {product.is_new && <Badge variant="outline">New Arrival</Badge>}
                                            {product.is_sale && <Badge variant="outline">On Sale</Badge>}
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

                    {/* Pagination */}
                    <div className="mt-12 flex justify-center">
                        <div className="flex items-center gap-1">
                            <Button variant="outline" size="sm" disabled>
                                Previous
                            </Button>
                            <Button variant="outline" size="sm" className="bg-pink-50">
                                1
                            </Button>
                            <Button variant="outline" size="sm">
                                2
                            </Button>
                            <Button variant="outline" size="sm">
                                3
                            </Button>
                            <Button variant="outline" size="sm">
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}