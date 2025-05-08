"use client"

import SliderMain from "@/components/slider-main"
import { IFrontSlider } from "@/types/frontend";

type SliderProps = {
    sliders: IFrontSlider[];
};
export default function Slider({sliders}: SliderProps) {
    const carouselItems = sliders.map((slider) => (
        <div key={slider.id} className="relative h-[300px] sm:h-[400px] lg:h-[700px] w-full group overflow-hidden">

        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent z-10"></div>

        <img
            src={slider.image}
            alt={slider.title}
            className="object-cover w-full h-full brightness-[0.85] group-hover:scale-105 transition-transform duration-[2s]"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* Content with animation */}
        <div className="absolute bottom-0 left-0 w-full text-white p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <div className="max-w-md">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">{slider.title}</h3>
                <div className="h-1 w-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mb-3"></div>
                <p className="text-sm sm:text-base text-white/90 max-w-md">
                    {slider.description}
                </p>
                <button
                    className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/40
                                  hover:bg-white hover:text-black transition-colors duration-300 text-sm font-medium"
                >
                    Shop Now
                </button>
            </div>
        </div>
    </div>
    ));
      

    return (
        <div className="w-full overflow-hidden">
            <SliderMain items={carouselItems} />
        </div>
    )
}

