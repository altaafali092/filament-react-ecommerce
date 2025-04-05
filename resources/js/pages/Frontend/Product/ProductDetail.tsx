"use client"

import { Button } from "@/components/ui/button"
import AuthLayout from "@/pages/layout/AuthLayout"
import type { IFrontProduct, VariationTypeOption } from "@/types/frontend"
import { Head, router, useForm, usePage } from "@inertiajs/react"
import { Heart, Minus, Plus } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

interface Props {
  product: IFrontProduct
  variationOptions: Record<number, number>
}

const ProductDetail = () => {
  const { product, variationOptions } = usePage<Props>().props

  const form = useForm<{
    option_ids: Record<string, number>
    quantity: number
    price: number | null
  }>({
    option_ids: {},
    quantity: 1,
    price: null,
  })

  const url = usePage().url
  const route = window.route

  const [selectedOptions, setSelectedOptions] = useState<Record<number, VariationTypeOption>>({})
  const [activeImage, setActiveImage] = useState(0)
  const [liked, setLiked] = useState(false)

  const arraysAreEqual = (a: any[], b: any[]) => {
    return a.length === b.length && a.every((v, i) => v === b[i])
  }

  const computedProduct = useMemo(() => {
    const selectedOptionIds = Object.values(selectedOptions)
      .map((op) => op.id)
      .sort()

    for (const variation of product.variations) {
      const optionIds = (variation.variation_type_ids ?? []).sort()
      if (arraysAreEqual(selectedOptionIds, optionIds)) {
        return {
          price: variation.price,
          quantity: variation.quantity ?? 0,
        }
      }
    }

    return {
      price: product.price,
      quantity: product.quantity,
    }
  }, [product, selectedOptions])

  const isInStock = useMemo(() => computedProduct.quantity > 0, [computedProduct])

  const images = useMemo(() => {
    for (const typeId in selectedOptions) {
      const option = selectedOptions[typeId]
      if (option.images?.length > 0) return option.images
    }
    return product.images
  }, [product, selectedOptions])

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

      // Reset quantity to 1 if it exceeds the new variation's quantity
      const newSelectedOptionIds = Object.values(newOptions)
        .map((op) => op.id)
        .sort()

      for (const variation of product.variations) {
        const optionIds = (variation.variation_type_ids ?? []).sort()
        if (arraysAreEqual(newSelectedOptionIds, optionIds)) {
          const maxQuantity = variation.quantity || 0
          if (form.data.quantity > maxQuantity) {
            form.setData("quantity", maxQuantity > 0 ? 1 : 0)
          }
          form.setData("price", variation.price)
          break
        }
      }

      return newOptions
    })
  }

  const addToCart = () => {
    form.post(route("cart.store", product.id), {
      preserveScroll: true,
      preserveState: true,
      onError: (err) => console.log(err),
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

  const renderProductVariationTypes = () =>
    product.variationTypes.map((type) => (
      <div key={type.id} className="mb-10">
        <h3 className="text-xs uppercase tracking-widest mb-6">{type.name}</h3>
        {type.type === "image" && (
          <div className="flex flex-wrap gap-6">
            {type.options.map((option) => {
              // Find variation with this option to check stock
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
                <div
                  key={option.id}
                  onClick={() => isAvailable && chooseOption(type.id, option)}
                  className={`cursor-pointer relative ${!isAvailable ? "opacity-30 cursor-not-allowed" : ""}`}
                >
                  {option.images?.[0]?.thumb && (
                    <div
                      className={`
                      w-20 h-20 overflow-hidden transition-all duration-200
                      ${
                        selectedOptions[type.id]?.id === option.id
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
              // Find variation with this option to check stock
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
                    ${
                      selectedOptions[type.id]?.id === option.id
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
  }, [])

  useEffect(() => {
    const idsMap = Object.fromEntries(Object.entries(selectedOptions).map(([typeId, option]) => [typeId, option.id]))
    form.setData("option_ids", idsMap)
  }, [selectedOptions])

  return (
    <>
      <Head title={product.title} />
      <div className="relative">
        <AuthLayout>
          <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
            <div className="container mx-auto px-4 py-16 max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                {/* Product Gallery - Left Side */}
                <div>
                  {/* Main image */}
                  <div className="relative mb-8">
                    <img
                      src={images[activeImage]?.large || "/placeholder.svg?height=600&width=500"}
                      alt={product.title}
                      className="w-full aspect-[3/3] object-cover"
                    />

                    {!isInStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm">
                        <div className="text-lg uppercase tracking-widest">Out of Stock</div>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail gallery */}
                  {images.length > 1 && (
                    <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                      {images.map((img, index) => (
                        <button
                          key={index}
                          className={`
                            min-w-[80px] w-[80px] aspect-square transition-all duration-200
                            ${
                              activeImage === index
                                ? "outline outline-1 outline-offset-2 outline-black dark:outline-white"
                                : "opacity-40 hover:opacity-100"
                            }
                          `}
                          onClick={() => setActiveImage(index)}
                        >
                          <img
                            src={img?.thumb || "/placeholder.svg?height=100&width=100"}
                            alt={`Product view ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Info - Right Side */}
                <div className="space-y-10 pt-8">
                  {/* Product title and category */}
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                      {product.category || "Product"}
                    </div>

                    <h1 className="text-4xl font-light mb-4 tracking-tight">{product.title}</h1>

                    <div>
                        <p className="mb-2"> Descritpion : </p>
                    <div
                      className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-light">${computedProduct.price}</span>
                    {computedProduct.price < product.price && (
                      <span className="text-gray-500 line-through">${product.price}</span>
                    )}
                  </div>

                  {/* Variation Types */}
                  {renderProductVariationTypes()}

                  {/* Stock information */}
                  <div className="text-sm">
                    {isInStock ? (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>In stock: {computedProduct.quantity} available</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span>Out of stock</span>
                      </div>
                    )}
                  </div>

                  {/* Quantity */}
                  {isInStock && (
                    <div>
                      <h3 className="text-xs uppercase tracking-widest mb-4">Quantity</h3>
                      <div className="flex border border-black/20 dark:border-white/20 w-32">
                        <button
                          onClick={decrementQuantity}
                          disabled={form.data.quantity <= 1}
                          className="w-10 h-10 flex items-center justify-center disabled:opacity-50"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <div className="flex-1 h-10 flex items-center justify-center">{form.data.quantity}</div>
                        <button
                          onClick={incrementQuantity}
                          disabled={form.data.quantity >= computedProduct.quantity}
                          className="w-10 h-10 flex items-center justify-center disabled:opacity-50"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Add to Cart */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      className="flex-1 bg-black hover:bg-black/80 text-white dark:bg-white dark:hover:bg-white/80 dark:text-black py-7 rounded-none"
                      onClick={addToCart}
                      disabled={
                        !isInStock || Object.keys(selectedOptions).length < (product.variationTypes?.length || 0)
                      }
                    >
                      {isInStock ? "Add to Cart" : "Out of Stock"}
                    </Button>

                    <Button
                      variant="outline"
                      className="w-14 h-14 border-black/20 text-black hover:bg-transparent hover:border-black dark:border-white/20 dark:text-white dark:hover:border-white rounded-none p-0"
                      onClick={() => setLiked(!liked)}
                    >
                      <Heart className={`h-5 w-5 ${liked ? "fill-black dark:fill-white" : ""}`} />
                    </Button>
                  </div>

                  {/* Shipping info */}
                  <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 pt-4">
                    Free shipping on orders over $50
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

