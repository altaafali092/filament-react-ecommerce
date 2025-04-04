"use client"

import { useState } from "react"

import { MoveRight, Clock, MessageCircle, Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "@inertiajs/react"

// Blog Data - Short and Snappy
const blogs = [
  {
    id: 1,
    title: "STREETWEAR APOCALYPSE",
    image: "https://i.pinimg.com/736x/95/e5/28/95e528b3878dbbc7375bec0fb9f6cf5d.jpg",
    excerpt: "Gen-Z’s tearing it up...",
    link: "/blog/streetwear-revolution",
    readTime: "4 min",
    comments: 24,
    isHot: true,
  },
  {
    id: 2,
    title: "INFLUENCER OVERLOAD",
    image: "https://i.pinimg.com/736x/c4/ae/b0/c4aeb019ec12a2f800a62ce5956bf8f6.jpg",
    excerpt: "5 creators dropping heat...",
    link: "/blog/fashion-influencers",

    readTime: "6 min",
    comments: 42,
    isHot: true,
  },
  {
    id: 3,
    title: "KICKS = CULTURE",
    image: "https://i.pinimg.com/736x/23/b4/d4/23b4d41804f558c1ee099e216199c999.jpg",
    excerpt: "Sneakers = mood...",
    link: "/blog/sneaker-culture",

    readTime: "5 min",
    comments: 18,
    isHot: false,
  },
]

export default function NewsAndBlogs() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section className="py-12 px-4 md:px-8 bg-black text-white relative overflow-hidden">
      {/* Chaotic Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[conic-gradient(at_center,#ff00ff,#00ffff,#ff00ff,#00ffff)] animate-spin-slow"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50 mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header: Still Loud */}
        <div className="text-center mb-8">
          <Badge className="mb-3 bg-red-500 text-white font-extrabold text-base px-3 py-1 animate-pulse uppercase tracking-wider">
            🔥 Hella Fresh
          </Badge>
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-[linear-gradient(90deg,#ff00ff,#00ffff)] opacity-50 blur-lg animate-pulse"></span>
              <span className="relative text-white animate-glitch-skew">DROPS</span>
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base font-mono uppercase">
            Raw updates for the real ones
          </p>
        </div>

        {/* Blog Grid: Small & Tight */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="group relative overflow-hidden rounded-none border-2 border-white/20w-full max-w-[300px] mx-auto transition-all duration-300 hover:border-[#ff00ff] hover:shadow-[0_0_20px_#ff00ff]"
              onMouseEnter={() => setHoveredId(blog.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Smaller Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}

                  className="object-cover transition-all duration-500 group-hover:scale-125 group-hover:brightness-75"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,#000_0%,transparent_50%)]"></div>


                {blog.isHot && (
                  <Badge className="absolute top-2 right-2 bg-[#ff00ff] text-white font-extrabold text-xs uppercase animate-bounce">
                    🔥
                  </Badge>
                )}
              </div>

              {/* Compact Content */}
              <div className="p-4">
                <div className="flex items-center text-xs text-gray-400 mb-2 space-x-3 font-mono uppercase">
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> {blog.readTime}
                  </span>
                  <span className="flex items-center">
                    <MessageCircle className="w-3 h-3 mr-1" /> {blog.comments}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold uppercase mb-2 text-white group-hover:text-[#ff00ff] group-hover:animate-glitch transition-all duration-300 line-clamp-1">
                  {blog.title}
                </h3>

                <p className="text-gray-300 text-xs font-mono uppercase mb-3 line-clamp-1">{blog.excerpt}</p>

                <div className="flex justify-between items-center">
                  <Button
                    asChild
                    className="text-[#ff00ff] border border-[#ff00ff] font-bold text-xs uppercase rounded-none px-3 py-1 hover:bg-[#ff00ff] hover:text-black transition-all duration-300"
                  >
                    <Link href={blog.link}>
                      Hit It
                      <MoveRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>

                  <div className="flex space-x-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-[#00ffff] hover:text-black hover:bg-[#00ffff] rounded-none w-6 h-6 transition-all"
                    >
                      <Share2 className="w-3 h-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-[#00ffff] hover:text-black hover:bg-[#00ffff] rounded-none w-6 h-6 transition-all"
                    >
                      <Bookmark className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Glitch Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(45deg,#ff00ff_0%,#00ffff_50%)] opacity-0 group-hover:opacity-20 transition-opacity duration-300 mix-blend-overlay pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Explore More: Still Neon */}
        <div className="flex justify-center mt-8">
          <Button
            asChild
            className="relative group bg-black text-[#00ffff] border-2 border-[#00ffff] font-extrabold text-sm uppercase rounded-none px-6 py-2 hover:bg-[#00ffff] hover:text-black hover:shadow-[0_0_25px_#00ffff] transition-all duration-300"
          >
            <Link href="/blog">
              More Heat
              <MoveRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              <span className="absolute inset-0 bg-[#00ffff] opacity-20 blur-xl animate-pulse"></span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}