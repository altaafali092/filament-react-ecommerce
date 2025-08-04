"use client"
import { IFrontProduct } from "@/types/frontend"
import ProductCard from "@/components/product/ProductCard"


interface MensWearProps {
    menWears: IFrontProduct[]
}

export default function MensWear({ menWears }: MensWearProps) {
   
    return (
        <section className="py-16 px-4 md:px-6 bg-pink-50 dark:bg-gray-700">
            <div className="container mx-auto max-w-7xl">


                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Men's Wear
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                          Explore our latest collection of stylish and comfortable men's fashion.
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {menWears.length > 0 ? (
                        menWears.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-600">
                            No products found
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
