"use client"

import { useState } from "react"

import { Star, ChevronLeft, ChevronRight } from "lucide-react"

// Define the Review type
interface Review {
  id: number
  name: string
  avatar: string
  rating: number
  comment: string
}

// Sample Customer Review Data - Gen-Z Style
const reviews: Review[] = [
  {
    id: 1,
    name: "Zoe_X",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    comment: "These fits are straight fire—obsessed AF!",
  },
  {
    id: 2,
    name: "KaiVibe",
    avatar: "https://i.pravatar.cc/150?img=2",
    rating: 5,
    comment: "Dope kicks, shipping was clutch.",
  },
  {
    id: 3,
    name: "RynGlitch",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    comment: "10/10 drip—no cap!",
  },
]

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  // Handle navigation
  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? reviews.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= reviews.length - 1 ? 0 : prev + 1
    )
  }

  // Display 1 review on mobile, 2 on larger screens
  const visibleReviews = reviews.slice(
    currentIndex,
    currentIndex + (window.innerWidth < 640 ? 1 : 2)
  )

  return (
    <section className="py-8 px-4 md:py-12 md:px-8 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Review Squads
          </h2>
          <p className="text-gray-800 max-w-xl mx-auto text-xs md:text-base">
            Real ones dropping their takes on the latest fits. 🔥
          </p>
        </div>

        {/* Review Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <div className="flex sm:hidden justify-between mb-4">
            <button
              onClick={handlePrev}
              className="bg-black/80 text-white p-2 rounded-full hover:bg-black transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="bg-black/80 text-white p-2 rounded-full hover:bg-black transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={handlePrev}
            className="hidden sm:block absolute left-[-2rem] md:left-[-4rem] top-1/2 -translate-y-1/2 bg-black/80 text-white p-2 rounded-full hover:bg-black transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="hidden sm:block absolute right-[-2rem] md:right-[-4rem] top-1/2 -translate-y-1/2 bg-black/80 text-white p-2 rounded-full hover:bg-black transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Review Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visibleReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-md transition-all hover:shadow-lg"
              >
                {/* Avatar & Name */}
                <div className="flex items-center mb-3 md:mb-4">
                  <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden">
                    <img
                      src={review.avatar}
                      alt={review.name}

                      className="object-cover"
                    />
                  </div>
                  <div className="ml-3 md:ml-4">
                    <h3 className="text-base md:text-lg font-bold text-gray-900">
                      {review.name}
                    </h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 md:w-5 md:h-5 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Comment */}
                <p className="text-gray-800 text-sm md:text-base font-medium line-clamp-3">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-4 md:mt-6 space-x-2">
          {Array.from({ length: Math.ceil(reviews.length / (window.innerWidth < 640 ? 1 : 2)) }).map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                i === Math.floor(currentIndex / (window.innerWidth < 640 ? 1 : 2))
                  ? "bg-gray-800"
                  : "bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(i * (window.innerWidth < 640 ? 1 : 2))}
            />
          ))}
        </div>
      </div>
    </section>
  )
}