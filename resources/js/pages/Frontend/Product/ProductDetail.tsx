import CurrencyFormatter from "@/components/CurrencyFormatter"

import AuthLayout from "@/pages/layout/AuthLayout"
import type { IFrontProduct, PageProps, VariationTypeOption } from "@/types/frontend"
import { Head, router, useForm, usePage } from "@inertiajs/react"
import {  Minus, Plus, ShieldCheck, Truck } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"

interface DetailProps {
    product: IFrontProduct
    variationOptions: Record<number, number>
}

const ProductDetail = () => {
    const { product, variationOptions } = usePage<DetailProps>().props


    const { flash } = usePage<PageProps>().props;


    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);


    const form = useForm<{
        option_ids: Record<string, number>
        quantity: number;
        price: number; // Add the price field here
    }>({
        option_ids: {},
        quantity: 1,
        price: product.price, // Initialize price with the product's default price
    });

    const { url } = usePage()

    const [selectedOptions, setSelectedOptions] = useState<Record<number, VariationTypeOption>>({})
    const [activeImage, setActiveImage] = useState(0)


    const arraysAreEqual = <T extends number | string>(a: T[], b: T[]): boolean => {
        return a.length === b.length && a.every((v, i) => v === b[i])
    }


    const computedProduct = useMemo(() => {
        const selectedOptionIds = Object.values(selectedOptions)
            .map((op) => op.id)
            .sort();

        // Ensure product.variations exists before calling find
        const matchedVariation = product.variations?.find(v =>
            arraysAreEqual(
                (v.variation_type_option_ids || []).sort(),
                selectedOptionIds,
            )
        );

        return matchedVariation ? {
            price: matchedVariation.price,
            quantity: matchedVariation.quantity ?? 0,
        } : {
            price: product.price,
            quantity: product.quantity,
        };
    }, [product, selectedOptions]);

    // In renderProductVariationTypes (stock check):
    const renderProductVariationTypes = () =>
        product.variationTypes.map((type) => (
            <div key={type.id} className="mb-10">
                <h3 className="text-xs uppercase tracking-widest mb-6">{type.name}</h3>
                {type.type === "image" && (
                    <div className="flex flex-wrap gap-6">
                        {type.options.map((option) => {
                            const optionIds = [
                                ...Object.values(selectedOptions)
                                    .map(op => op.id)
                                    .filter(id => id !== option.id),
                                option.id,
                            ].sort();
                            const variation = product.variations.find((v) =>
                                arraysAreEqual((v.variation_type_ids || []).sort(), optionIds),
                            )
                            const isAvailable = variation ? variation.quantity > 0 : true

                            return (
                                <div
                                    key={option.id}
                                    onClick={() => isAvailable && chooseOption(type.id, option)}
                                    className={`cursor-pointer relative ${!isAvailable ? "opacity-30 cursor-not-allowed" : ""}`}
                                >
                                    {option.images?.[0]?.thumb && (
                                        <div
                                            className={`
                      w-20 h-20 overflow-hidden transition-all duration-200
                      ${selectedOptions[type.id]?.id === option.id
                                                    ? "outline outline-1 outline-offset-4 outline-black dark:outline-white"
                                                    : "opacity-80 hover:opacity-100"
                                                }
                    `}
                                        >
                                            <img
                                                src={option.images[0].thumb || "/placeholder.svg"}
                                                alt={option.name || ""}
                                                className="w-full h-full object-cover"
                                            />
                                            {!isAvailable && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                                                    <span className="text-xs uppercase">Sold out</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
                {type.type === "radio" && (
                    <div className="flex flex-wrap gap-4">
                        {type.options.map((option) => {
                            const optionIds = [
                                ...Object.values(selectedOptions)
                                    .map((op) => op.id)
                                    .filter((id) => id !== option.id),
                                option.id,
                            ].sort()
                            const variation = product.variations.find((v) =>
                                arraysAreEqual((v.variation_type_ids || []).sort(), optionIds),
                            )
                            const isAvailable = variation ? variation.quantity > 0 : true

                            return (
                                <button
                                    key={option.id}
                                    onClick={() => isAvailable && chooseOption(type.id, option)}
                                    disabled={!isAvailable}
                                    className={`
                    px-6 py-3 text-sm transition-all duration-200
                    ${selectedOptions[type.id]?.id === option.id
                                            ? "bg-black text-white dark:bg-white dark:text-black"
                                            : "bg-transparent border border-black/20 text-black hover:border-black dark:border-white/20 dark:text-white dark:hover:border-white"
                                        }
                    ${!isAvailable ? "opacity-30 cursor-not-allowed" : ""}
                  `}
                                >
                                    {option.name}
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>
        ))

    useEffect(() => {
        for (const type of product.variationTypes) {
            const selectedOptionId = variationOptions[type.id]
            const foundOption = type.options.find((op) => op.id === selectedOptionId) || type.options[0]
            chooseOption(type.id, foundOption, false)
        }

        // Initialize price with the default computed price
        form.setData("price", product.price)
    }, [])

    useEffect(() => {
        const idsMap = Object.fromEntries(Object.entries(selectedOptions).map(([typeId, option]) => [typeId, option.id]))
        form.setData("option_ids", idsMap)
    }, [selectedOptions])

    useEffect(() => {
        // Update price and quantity when selected options change
        form.setData("price", computedProduct.price)

        // Reset quantity to 1 if it exceeds the new variation's quantity
        if (form.data.quantity > computedProduct.quantity) {
            form.setData("quantity", computedProduct.quantity > 0 ? 1 : 0)
        } else if (form.data.quantity === 0 && computedProduct.quantity > 0) {
            form.setData("quantity", 1)
        }
    }, [computedProduct, selectedOptions])

    const getOptionIdsMap = (newOptions: Record<number, VariationTypeOption>) => {
        return Object.fromEntries(Object.entries(newOptions).map(([k, v]) => [k, v.id]))
    }

    const chooseOption = (typeId: number, option: VariationTypeOption | null, updateRouter = true) => {
        if (!option) return

        setSelectedOptions((prev) => {
            const newOptions = {
                ...prev,
                [typeId]: option,
            }

            if (updateRouter) {
                router.get(
                    url,
                    {
                        options: getOptionIdsMap(newOptions),
                    },
                    {
                        preserveScroll: true,
                        preserveState: true,
                    },
                )
            }

            // Update form data with option IDs
            const optionIdsMap = getOptionIdsMap(newOptions)
            form.setData("option_ids", optionIdsMap)

            return newOptions
        })
    }

    const addToCart = () => {
        form.post(route("cart.store", product.id), {
            preserveScroll: true,
            preserveState: true,
        })
    }

    const incrementQuantity = () => {
        if (form.data.quantity < computedProduct.quantity) {
            form.setData("quantity", form.data.quantity + 1)
        }
    }

    const decrementQuantity = () => {
        if (form.data.quantity > 1) {
            form.setData("quantity", form.data.quantity - 1)
        }
    }

    const images = useMemo(() => {
        for (const typeId in selectedOptions) {
            const option = selectedOptions[typeId]
            if (option.images?.length > 0) return option.images
        }
        return product.images
    }, [product, selectedOptions])

    const isInStock = useMemo(() => computedProduct.quantity > 0, [computedProduct])





    return (
        <>
            <Head title={product.title} />
            <div className="relative bg-gradient-to-r from-gray-300 to-purple-300 dark:from-blue-700 dark:to-purple-700">
                <AuthLayout>
                    <div className="min-h-screen">
                        <div className="container mx-auto px-4 py-12 max-w-6xl">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-40">
                                {/* Image Gallery */}
                                <div className="space-y-6">
                                    <div className="aspect-square bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden border">
                                        <img
                                           src={images[activeImage]?.large || "/placeholder.svg"}
                                            alt={product.title}
                                            className="w-full h-full object-cover transition-opacity duration-300"
                                        />
                                        {!isInStock && (
                                            <div className="absolute inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-sm flex items-center justify-center">
                                                <div className="text-xl font-medium">Out of Stock</div>
                                            </div>
                                        )}
                                    </div>

                                    {images.length > 1 && (
                                        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                                            {images.map((img, index) => (
                                                <button
                                                    key={index}
                                                    className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border transition-colors ${activeImage === index
                                                        ? 'border-gray-900 dark:border-gray-100'
                                                        : 'border-transparent opacity-75'
                                                        }`}
                                                    onClick={() => setActiveImage(index)}
                                                >
                                                    <img
                                                        src={img?.thumb}
                                                        alt={`Thumbnail ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="space-y-8">
                                    {/* Header Section */}
                                    <div className="space-y-4 pb-2 border-b dark:border-gray-800">
                                        <div>
                                            <h1 className="text-3xl font-light text-gray-900 dark:text-white mb-1">
                                                {product.title}
                                            </h1>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {product.department.name}
                                            </div>
                                        </div>

                                        <div className="flex items-baseline justify-between">
                                            <div className="text-2xl font-medium text-gray-900 dark:text-white">

                                                <CurrencyFormatter amount={computedProduct.price} />
                                            </div>
                                            <div className={`flex items-center gap-2 text-sm ${isInStock ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {isInStock ? (
                                                    <>
                                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                        {computedProduct.quantity} in stock
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                        Out of stock
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Variations */}
                                    <div className="space-y-6">
                                        {renderProductVariationTypes()}
                                    </div>

                                    {/* Quantity & Cart */}
                                    <div className="space-y-6">
                                        {isInStock ? (
                                            <div className="space-y-6">
                                                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                                                    {/* Selected Options */}
                                                    {Object.keys(selectedOptions).length > 0 && (
                                                        <div className="flex-1">
                                                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 lg:mb-0">
                                                                Selected options
                                                            </div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {Object.entries(selectedOptions).map(([typeId, option]) => (
                                                                    <div
                                                                        key={typeId}
                                                                        className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 rounded-full"
                                                                    >
                                                                        {option.name}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Quantity Controls */}
                                                    <div className="w-full lg:w-auto flex items-center justify-between gap-4">
                                                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                                                            <button
                                                                onClick={decrementQuantity}
                                                                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                                                                disabled={form.data.quantity <= 1}
                                                            >
                                                                <Minus className="w-5 h-5" />
                                                            </button>
                                                            <span className="w-8 text-center">
                                                                {form.data.quantity}
                                                            </span>
                                                            <button
                                                                onClick={incrementQuantity}
                                                                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                                                                disabled={form.data.quantity >= computedProduct.quantity}
                                                            >
                                                                <Plus className="w-5 h-5" />
                                                            </button>
                                                        </div>

                                                        <button
                                                            onClick={addToCart}
                                                            className="py-3.5 px-6 text-sm font-medium bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 rounded-full transition-colors"
                                                        >
                                                            Add to Cart —
                                                            <CurrencyFormatter amount={Number((computedProduct.price * form.data.quantity).toFixed(2))} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
                                                <div className="text-gray-500 dark:text-gray-400">
                                                    Get notified when back in stock
                                                </div>
                                                <div className="mt-3 flex gap-2">
                                                    <input
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        className="flex-1 px-4 py-2 text-sm bg-white dark:bg-gray-900 rounded-full border"
                                                    />
                                                    <button className="px-4 py-2 text-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full">
                                                        Notify Me
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        <div className="pt-4 border-t dark:border-gray-800">
                                            <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-1.5">
                                                        <Truck className="w-4 h-4" />
                                                        <span>Free shipping</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <ShieldCheck className="w-4 h-4" />
                                                        <span>Secure checkout</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Description */}
                                    <div className="pt-6">
                                        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                                Product Details
                                            </h3>
                                            <div dangerouslySetInnerHTML={{ __html: product.description }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AuthLayout>
            </div>
        </>
    )
}

export default ProductDetail
