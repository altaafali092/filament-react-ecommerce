import { Star } from "lucide-react"// Define the Review type
interface Review {
  id: number
  name: string
  avatar: string
  rating: number
  comment: string
}

// Professional testimonial data
const reviews: Review[] = [
  {
    id: 1,
    name: "Mark Zuckerberg",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    comment: "Working with Manu was a game-changer for our startup. His technical expertise and problem-solving skills are unmatched.",
  },
  {
    id: 2,
    name: "Sundar Pichai",
    avatar: "https://i.pravatar.cc/150?img=2",
    rating: 5,
    comment: "Manu delivered our project ahead of schedule and exceeded all expectations. His attention to detail is remarkable.",
  },
  {
    id: 3,
    name: "Jeff Bezos",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    comment: "The quality of Manu's code is exceptional. He built a scalable solution that has been critical to our business growth.",
  },
  {
    id: 4,
    name: "Elon Musk",
    avatar: "https://i.pravatar.cc/150?img=4",
    rating: 5,
    comment: "Outstanding developer with incredible innovation mindset. Manu consistently delivers beyond expectations with creative solutions.",
  },
  {
    id: 5,
    name: "Tim Cook",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    comment: "Professional, reliable, and exceptionally skilled. Manu's work has significantly improved our development workflow and efficiency.",
  },
  {
    id: 6,
    name: "Satya Nadella",
    avatar: "https://i.pravatar.cc/150?img=6",
    rating: 5,
    comment: "Manu brings deep technical knowledge and strategic thinking to every project. His collaborative approach is refreshing.",
  },
]

export default function CustomerReviews() {
  // Duplicate reviews for seamless loop
  const duplicatedReviews = [...reviews, ...reviews]

  return (
    <section className="py-16 px-4 bg-gray-50 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-center text-black dark:text-white px-4 py-2 text-2xl font-bold relative group">
            <span className="relative">
              Customer Reviews
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-current origin-left transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </span>
            
          </div>
        </div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrolling reviews */}
          <div 
            className="flex gap-6 animate-marquee"
            style={{
              animation: 'marquee 120s linear infinite',
              width: 'max-content'
            }}
          >
            {duplicatedReviews.map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 transition-all hover:shadow-md hover:-translate-y-1 w-80 flex-shrink-0 hover-pause-trigger"
                onMouseEnter={(e) => {
                  const marquee = e.currentTarget.closest('.animate-marquee') as HTMLElement;
                  if (marquee) marquee.style.animationPlayState = 'paused';
                }}
                onMouseLeave={(e) => {
                  const marquee = e.currentTarget.closest('.animate-marquee') as HTMLElement;
                  if (marquee) marquee.style.animationPlayState = 'running';
                }}
              >
                {/* Comment */}
                <p className="text-gray-700 text-base leading-relaxed mb-6 font-normal">
                  {review.comment}
                </p>

                {/* Author info */}
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 font-medium text-base mb-1">
                      {review.name}
                    </h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
        
        /* Show exactly 3 cards on desktop */
        @media (min-width: 1024px) {
          .container {
            max-width: 1200px; /* Perfect for 3 cards with gaps */
          }
        }
        
        /* Responsive card sizing */
        @media (max-width: 768px) {
          .hover-pause-trigger {
            width: 280px;
          }
        }
      `}</style>
    </section>
  )
}