"use client"

import SliderMain from "@/components/slider-main"

export default function Slider() {
    // Responsive carousel items with consistent height and enhanced styling
    const carouselItems = [
        <div key="1" className="relative h-[300px] sm:h-[400px] lg:h-[700px] w-full group overflow-hidden">
            {/* Add gradient overlay at the top for navbar text visibility */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent z-10"></div>

            <img
                src="https://rmkv.com/cdn/shop/files/andrum_endrendrum_75af910a-60c0-4180-9f7e-a4e82fbc7c06.webp?v=1740393868&width=2000"
                alt="Slide 1"
                className="object-cover w-full h-full brightness-[0.85] group-hover:scale-105 transition-transform duration-[2s]"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Content with animation */}
            <div className="absolute bottom-0 left-0 w-full text-white p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="max-w-md">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">Tradition Reimagined</h3>
                    <div className="h-1 w-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mb-3"></div>
                    <p className="text-sm sm:text-base text-white/90 max-w-md">
                        Classic designs with a modern twist for the new generation
                    </p>
                    <button
                        className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/40
                                      hover:bg-white hover:text-black transition-colors duration-300 text-sm font-medium"
                    >
                        Shop Now
                    </button>
                </div>
            </div>
        </div>,
        <div key="2" className="relative h-[300px] sm:h-[400px] lg:h-[700px] w-full group overflow-hidden">
            {/* Add gradient overlay at the top for navbar text visibility */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent z-10"></div>

            <img
                src="https://rmkv.com/cdn/shop/files/bridal_lehenga_0c71b460-21f4-4355-9a0f-363f1aad0ca7.webp?v=1740393890&width=2000"
                alt="Slide 2"
                className="object-cover w-full h-full brightness-[0.85] group-hover:scale-105 transition-transform duration-[2s]"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Content with animation */}
            <div className="absolute bottom-0 left-0 w-full text-white p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="max-w-md">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">Bridal Collection</h3>
                    <div className="h-1 w-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mb-3"></div>
                    <p className="text-sm sm:text-base text-white/90 max-w-md">Statement pieces that define your special day</p>
                    <button
                        className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/40
                                      hover:bg-white hover:text-black transition-colors duration-300 text-sm font-medium"
                    >
                        Explore Collection
                    </button>
                </div>
            </div>
        </div>,
        <div key="3" className="relative h-[300px] sm:h-[400px] lg:h-[700px] w-full group overflow-hidden">
            {/* Add gradient overlay at the top for navbar text visibility */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent z-10"></div>

            <img
                src="https://rmkv.com/cdn/shop/files/holiday_hues_27301512-7b02-4c8d-a5bc-cbe66d0b94b1.webp?v=1740393927&width=2000"
                alt="Slide 3"
                className="object-cover w-full h-full brightness-[0.85] group-hover:scale-105 transition-transform duration-[2s]"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Content with animation */}
            <div className="absolute bottom-0 left-0 w-full text-white p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="max-w-md">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">Holiday Vibes</h3>
                    <div className="h-1 w-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mb-3"></div>
                    <p className="text-sm sm:text-base text-white/90 max-w-md">Vibrant colors that match your festival mood</p>
                    <button
                        className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/40
                                      hover:bg-white hover:text-black transition-colors duration-300 text-sm font-medium"
                    >
                        View Collection
                    </button>
                </div>
            </div>
        </div>,
        <div key="4" className="relative h-[300px] sm:h-[400px] lg:h-[700px] w-full group overflow-hidden">
            {/* Add gradient overlay at the top for navbar text visibility */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent z-10"></div>

            <img
                src="https://rmkv.com/cdn/shop/files/kaathadi_cotton_sarees_collection.webp?v=1740387108&width=2000"
                alt="Slide 4"
                className="object-cover w-full h-full brightness-[0.85] group-hover:scale-105 transition-transform duration-[2s]"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Content with animation */}
            <div className="absolute bottom-0 left-0 w-full text-white p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="max-w-md">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">Cotton Comfort</h3>
                    <div className="h-1 w-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mb-3"></div>
                    <p className="text-sm sm:text-base text-white/90 max-w-md">
                        Sustainable fashion that feels as good as it looks
                    </p>
                    <button
                        className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/40
                                      hover:bg-white hover:text-black transition-colors duration-300 text-sm font-medium"
                    >
                        Shop Sustainable
                    </button>
                </div>
            </div>
        </div>,
    ]

    return (
        <div className="w-full overflow-hidden">
            <SliderMain items={carouselItems} />
        </div>
    )
}

