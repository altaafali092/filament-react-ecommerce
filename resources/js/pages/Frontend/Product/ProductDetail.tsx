"use client"

import { useState } from "react"
import { ArrowLeft, Heart, Share2, ShoppingBag, Star, Truck, RefreshCw, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Head, Link } from "@inertiajs/react"
import AuthLayout from "@/pages/layout/AuthLayout"

export default function ProductDetail({ params }: { params: { id: string } }) {
    // Dummy product data
    const product = {
        id: 1,
        title: "Neon Dreams Oversized Hoodie",
        description:
            "Ultra-comfy oversized hoodie with neon accents. Made from 70% recycled materials. Perfect for your TikTok OOTD videos.",
        price: 59.99,
        discountPrice: 49.99,
        colors: ["#FF3366", "#33CCFF", "#FFCC00", "#000000"],
        sizes: ["XS", "S", "M", "L", "XL"],
        rating: 4.8,
        reviewCount: 423,
        tags: ["Sustainable", "Trending", "Limited Edition"],
    }

    // Dummy product images
    const productImages = [
        "https://i.pinimg.com/736x/53/2a/85/532a85bbf7b22fcbc18b5fb967dbb1be.jpg",
        "https://i.pinimg.com/736x/50/34/f7/5034f78faeb149739bf0337bbca9482d.jpg",
        "https://i.pinimg.com/736x/50/34/f7/5034f78faeb149739bf0337bbca9482d.jpg",
        "https://i.pinimg.com/736x/a1/da/83/a1da834a824be38b4ee524f31e5b8b1a.jpg",
    ]

    // Dummy related products
    const relatedProducts = [
        {
            id: 101,
            title: "Cyber Punk Crop Top",
            price: 34.99,
            image: "/placeholder.svg?height=300&width=300",
        },
        {
            id: 102,
            title: "Digital Wave Joggers",
            price: 45.99,
            image: "/placeholder.svg?height=300&width=300",
        },
        {
            id: 103,
            title: "Retro Pixel Beanie",
            price: 24.99,
            image: "/placeholder.svg?height=300&width=300",
        },
        {
            id: 104,
            title: "Vaporwave Bucket Hat",
            price: 29.99,
            image: "/placeholder.svg?height=300&width=300",
        },
    ]

    // Dummy recently viewed products
    const recentlyViewed = [
        {
            id: 201,
            title: "Y2K Graphic Tee",
            price: 32.99,
            image: "/placeholder.svg?height=300&width=300",
        },
        {
            id: 202,
            title: "Aesthetic Crossbody Bag",
            price: 38.99,
            image: "/placeholder.svg?height=300&width=300",
        },
        {
            id: 203,
            title: "Glitch Effect Sneakers",
            price: 79.99,
            image: "/placeholder.svg?height=300&width=300",
        },
        {
            id: 204,
            title: "Lo-Fi Wireless Earbuds",
            price: 59.99,
            image: "/placeholder.svg?height=300&width=300",
        },
    ]

    // Dummy reviews
    const reviews = [
        {
            id: 1,
            author: "Jamie D.",
            initials: "JD",
            gradientFrom: "pink-500",
            gradientTo: "purple-500",
            rating: 5,
            title: "Perfect for my aesthetic!",
            content:
                "This hoodie is everything! The oversized fit is perfect and the neon accents pop in my IG stories. I've gotten so many DMs asking where I got it. Definitely worth the price!",
            date: "3 days ago",
            helpful: 24,
            hasImages: true,
        },
        {
            id: 2,
            author: "Tyler K.",
            initials: "TK",
            gradientFrom: "blue-500",
            gradientTo: "green-500",
            rating: 4,
            title: "Great quality but runs large",
            content:
                "Love the vibe of this hoodie and the hidden phone pocket is genius! Just a heads up that it runs pretty big. I'm usually a medium but should have gone with a small. Still keeping it though because the oversized look is in.",
            date: "1 week ago",
            helpful: 17,
            hasImages: false,
        },
        {
            id: 3,
            author: "Alex M.",
            initials: "AM",
            gradientFrom: "yellow-500",
            gradientTo: "orange-500",
            rating: 5,
            title: "Obsessed with this hoodie!",
            content:
                "The quality is insane for the price. Super soft inside and the thumb holes are such a vibe. Already ordered another color because I'm literally living in this hoodie.",
            date: "2 weeks ago",
            helpful: 32,
            hasImages: true,
        },
    ]

    const [selectedColor, setSelectedColor] = useState<string | null>(null)
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [activeImage, setActiveImage] = useState(0)
    const [liked, setLiked] = useState(false)

    return (
        <>
            <Head title="Product Detail">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="relative">
                <AuthLayout>
                    <div className="min-h-screen text-white bg-zinc-300 dark:bg-black">
                        <div className="container mx-auto max-w-7xl py-8 px-4 mt-10">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-25">
                                {/* Product Images */}
                                <div className="space-y-4">
                                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-900">
                                        <img
                                            src={productImages[activeImage] || "/placeholder.svg"}
                                            alt={product.title}

                                            className="object-cover transition-all duration-500 hover:scale-105"
                                        />
                                        <Badge className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-purple-400 border-0">
                                            New Drop
                                        </Badge>
                                        <button
                                            onClick={() => setLiked(!liked)}
                                            className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm p-2 rounded-full"
                                        >
                                            <Heart className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : "text-white"}`} />
                                        </button>
                                    </div>

                                    {/* Thumbnail gallery */}
                                    <div className="grid grid-cols-4 gap-2">
                                        {productImages.map((img, index) => (
                                            <button
                                                key={index}
                                                className={`aspect-square rounded-lg overflow-hidden border-2 ${activeImage === index ? "border-purple-400" : "border-transparent"}`}
                                                onClick={() => setActiveImage(index)}
                                            >
                                                <img
                                                    src={img || "/placeholder.svg"}
                                                    alt={`Product view ${index + 1}`}
                                                    width={100}
                                                    height={100}
                                                    className="object-cover w-full h-full"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="space-y-6">
                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {product.tags?.map((tag) => (
                                            <Badge key={tag} variant="outline" className="border-purple-400 text-purple-400">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Title and price */}
                                    <div>
                                        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-500 to-purple-400 bg-clip-text text-transparent">
                                            {product.title}
                                        </h1>
                                        <div className="flex items-center mt-2 space-x-4">
                                            <div className="flex items-center">
                                                {Array(5)
                                                    .fill(0)
                                                    .map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`}
                                                        />
                                                    ))}
                                                <span className="ml-2 text-sm text-white">
                                                    {product.rating} ({product.reviewCount} reviews)
                                                </span>
                                            </div>
                                            {/* <button className="text-sm text-gray-300 hover:text-white flex items-center">
                                                <Share2 className="h-4 w-4 mr-1" /> Share
                                            </button> */}
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center space-x-3">
                                        {product.discountPrice ? (
                                            <>
                                                <span className="text-3xl font-bold">${product.discountPrice}</span>
                                                <span className="text-xl text-gray-500 line-through">${product.price}</span>
                                                <Badge className="bg-green-500 text-white border-0">
                                                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                                                </Badge>
                                            </>
                                        ) : (
                                            <span className="text-3xl font-bold">${product.price}</span>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-50">{product.description}</p>

                                    {/* Color selection */}
                                    <div>
                                        <h3 className="text-sm font-medium mb-3">Color</h3>
                                        <div className="flex space-x-3">
                                            {product.colors?.map((color) => (
                                                <button
                                                    key={color}
                                                    className={`w-8 h-8 rounded-full transition-all ${selectedColor === color ? "ring-2 ring-offset-2 ring-offset-black ring-white" : ""}`}
                                                    style={{ backgroundColor: color }}
                                                    onClick={() => setSelectedColor(color)}
                                                    aria-label={`Select color ${color}`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Size selection */}
                                    <div>
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="text-sm font-medium">Size</h3>

                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {product.sizes?.map((size) => (
                                                <button
                                                    key={size}
                                                    className={`px-4 py-2 rounded-full border ${selectedSize === size
                                                        ? "bg-white text-black border-white"
                                                        : "border-gray-900 text-white hover:border-gray-400"
                                                        }`}
                                                    onClick={() => setSelectedSize(size)}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Quantity */}
                                    <div>
                                        <h3 className="text-sm font-medium mb-3">Quantity</h3>
                                        <div className="flex items-center space-x-3">
                                            <button
                                                className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center"
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            >
                                                -
                                            </button>
                                            <span>{quantity}</span>
                                            <button
                                                className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center"
                                                onClick={() => setQuantity(quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Add to cart */}
                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                        <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-400 hover:from-cyan-600 hover:to-purple-500 text-white rounded-full py-6">
                                            <ShoppingBag className="mr-2 h-5 w-5" /> Add to Bag
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="flex-1 border-white/30 text-green-400 hover:bg-pink-200 rounded-full py-6"
                                        >
                                            Buy Now
                                        </Button>
                                    </div>

                                    {/* Shipping info */}
                                    <div className="flex items-center text-sm text-gray-300 pt-4">
                                        <Truck className="h-4 w-4 mr-2" />
                                        <span>Free shipping on orders over $50</span>
                                    </div>

                                    {/* Social proof */}
                                    <div className="bg-gray-900/50 rounded-xl p-4 mt-6">
                                        <p className="text-sm italic text-gray-300">
                                            "Just got mine today and already posted on TikTok. The quality is fire! 🔥"
                                        </p>
                                        <div className="flex items-center mt-2">
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-orange-400"></div>
                                            <span className="text-xs ml-2">@fashionista_z • 2 hours ago</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Product details tabs */}
                            <div className="mt-16">
                                <Tabs defaultValue="details">
                                    <TabsList className="w-full justify-start border-b border-gray-800 bg-transparent">
                                        <TabsTrigger
                                            value="details"
                                            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-400 rounded-none"
                                        >
                                            Details
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="sustainability"
                                            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-400 rounded-none"
                                        >
                                            Sustainability
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="reviews"
                                            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-400 rounded-none"
                                        >
                                            Reviews
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="details" className="pt-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <h3 className="text-xl font-bold mb-4">Product Features</h3>
                                                <ul className="space-y-2 text-gray-600">
                                                    <li>• Oversized fit for maximum comfort and style</li>
                                                    <li>• Heavyweight 400 GSM cotton-poly blend</li>
                                                    <li>• Neon accents that pop in UV light</li>
                                                    <li>• Hidden phone pocket with earbud routing</li>
                                                    <li>• Thumb holes for extra coziness</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-4">Care Instructions</h3>
                                                <ul className="space-y-2 text-gray-600">
                                                    <li>• Machine wash cold with similar colors</li>
                                                    <li>• Do not bleach</li>
                                                    <li>• Tumble dry low</li>
                                                    <li>• Cool iron if needed</li>
                                                    <li>• Do not dry clean</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="sustainability" className="pt-6">
                                        <div className="bg-gradient-to-br from-green-900/20 to-transparent p-6 rounded-xl">
                                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                                <Badge className="mr-2 bg-green-500 text-white border-0">Planet Friendly</Badge>
                                                Our Sustainability Commitment
                                            </h3>
                                            <p className="mb-4 text-gray-500">
                                                This product is part of our commitment to reduce environmental impact:
                                            </p>
                                            <ul className="space-y-3 text-gray-600">
                                                <li className="flex items-start">
                                                    <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                                                        <RefreshCw className="h-3 w-3 text-black" />
                                                    </div>
                                                    <span>Made with 70% recycled polyester from post-consumer plastic bottles</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                                                        <RefreshCw className="h-3 w-3 text-black" />
                                                    </div>
                                                    <span>Water-saving dyeing process reduces water usage by 60%</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                                                        <RefreshCw className="h-3 w-3 text-black" />
                                                    </div>
                                                    <span>Carbon-neutral shipping on all orders</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                                                        <RefreshCw className="h-3 w-3 text-black" />
                                                    </div>
                                                    <span>Packaging made from 100% recycled materials</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="reviews" className="pt-6">
                                        <div className="space-y-8">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-xl font-bold">Customer Reviews</h3>
                                                    <div className="flex items-center mt-1">
                                                        <div className="flex">
                                                            {Array(5)
                                                                .fill(0)
                                                                .map((_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`}
                                                                    />
                                                                ))}
                                                        </div>
                                                        <span className="ml-2 text-gray-300">Based on {product.reviewCount} reviews</span>
                                                    </div>
                                                </div>
                                                {/* <Button className="rounded-full bg-white/10 hover:bg-white/20 text-white">
                                                    <MessageCircle className="mr-2 h-4 w-4" /> Write a Review
                                                </Button> */}
                                            </div>



                                            {/* Sample reviews */}
                                            <div className="space-y-6">
                                                {reviews.map((review) => (
                                                    <div key={review.id} className="border-b border-gray-800 pb-6">
                                                        <div className="flex justify-between items-start">
                                                            <div className="flex items-center">
                                                                <div
                                                                    className={`w-10 h-10 rounded-full bg-gradient-to-r from-${review.gradientFrom} to-${review.gradientTo} flex items-center justify-center text-white font-bold`}
                                                                >
                                                                    {review.initials}
                                                                </div>
                                                                <div className="ml-3">
                                                                    <h4 className="font-semibold">{review.author}</h4>
                                                                    <p className="text-xs text-gray-500">Posted {review.date}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex">
                                                                {Array(5)
                                                                    .fill(0)
                                                                    .map((_, i) => (
                                                                        <Star
                                                                            key={i}
                                                                            className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`}
                                                                        />
                                                                    ))}
                                                            </div>
                                                        </div>
                                                        <h5 className="font-medium mt-3">{review.title}</h5>
                                                        <p className="text-gray-300 mt-2">{review.content}</p>

                                                        {review.hasImages && (
                                                            <div className="flex mt-4 space-x-2">
                                                                <div className="w-16 h-16 rounded-md bg-gray-800"></div>
                                                                <div className="w-16 h-16 rounded-md bg-gray-800"></div>
                                                            </div>
                                                        )}


                                                    </div>
                                                ))}


                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>

                            {/* You may also like */}
                            <div className="mt-20">
                                <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {relatedProducts.map((item) => (
                                        <div key={item.id} className="group relative rounded-xl overflow-hidden">
                                            <Link href={`/product/${item.id}`} className="absolute inset-0 z-10">
                                                <span className="sr-only">View product</span>
                                            </Link>
                                            <div className="aspect-square bg-gray-900 relative overflow-hidden">
                                                <img
                                                    src={item.image || "/placeholder.svg"}
                                                    alt={item.title}

                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="p-3">
                                                <h3 className="font-medium text-sm truncate">{item.title}</h3>
                                                <p className="text-gray-400 text-sm">${item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recently viewed */}
                            <div className="mt-16 mb-12">
                                <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {recentlyViewed.map((item) => (
                                        <div key={item.id} className="group relative rounded-xl overflow-hidden">
                                            <Link href={`/product/${item.id}`} className="absolute inset-0 z-10">
                                                <span className="sr-only">View product</span>
                                            </Link>
                                            <div className="aspect-square bg-gray-900 relative overflow-hidden">
                                                <img
                                                    src={item.image || "/placeholder.svg"}
                                                    alt={item.title}

                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="p-3">
                                                <h3 className="font-medium text-sm truncate">{item.title}</h3>
                                                <p className="text-gray-400 text-sm">${item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sticky add to cart for mobile */}
                        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md p-4 border-t border-gray-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-300">{product.title}</p>
                                    <p className="font-bold">${product.discountPrice || product.price}</p>
                                </div>
                                <Button className="bg-gradient-to-r from-cyan-500 to-purple-400 hover:from-cyan-600 hover:to-purple-500 text-white rounded-full">
                                    Add to Bag
                                </Button>
                            </div>
                        </div>
                    </div>
                </AuthLayout>
            </div>
        </>
    )
}

