"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CarouselProps {
  items: React.ReactNode[]
  autoPlay?: boolean
  interval?: number
  showIndicators?: boolean
  showControls?: boolean
  className?: string
}

export default function SliderMain({
  items,
  autoPlay = true,
  interval = 4000,
  showIndicators = true,
  showControls = true,
  className,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [startX, setStartX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const progressRef = useRef<NodeJS.Timeout | null>(null)
  const [progress, setProgress] = useState(0)

  const next = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    setProgress(0)
  }, [items.length])

  const prev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
    setProgress(0)
  }, [items.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setProgress(0)
  }

  // Handle touch/mouse events for swipe
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    setStartX(clientX)
    setIsDragging(true)
  }

  const handleTouchMove = (_: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return
    // Implementation would go here for drag effect
  }

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return
    const clientX = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX
    const diff = startX - clientX

    if (Math.abs(diff) > 50) {
      // Threshold for swipe
      if (diff > 0) {
        next()
      } else {
        prev()
      }
    }

    setIsDragging(false)
  }

  // Progress bar effect similar to Instagram stories
  useEffect(() => {
    if (autoPlay && !isHovering) {
      setProgress(0)

      const incrementProgress = () => {
        setProgress((prev) => {
          if (prev >= 100) {
            next()
            return 0
          }
          return prev + 100 / (interval / 100)
        })
      }

      progressRef.current = setInterval(incrementProgress, 100)

      return () => {
        if (progressRef.current) clearInterval(progressRef.current)
      }
    } else if (progressRef.current) {
      clearInterval(progressRef.current)
    }
  }, [autoPlay, currentIndex, interval, isHovering, next])

  if (!items.length) return null

  return (
    <div
      className={cn("relative w-full overflow-hidden group", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
    >
      {/* Progress bars at top like stories */}
      <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-2">
        {items.map((_, idx) => (
          <div key={idx} className="h-1 flex-1 rounded-full bg-white/30 overflow-hidden" onClick={() => goToSlide(idx)}>
            {idx === currentIndex && (
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            )}
            {idx < currentIndex && <div className="h-full bg-white w-full" />}
          </div>
        ))}
      </div>

      {/* Main slider */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0 overflow-hidden">
            {item}
          </div>
        ))}
      </div>

      {/* Stylish controls */}
      {showControls && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/20 backdrop-blur-md p-2
                      text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity
                      hover:bg-black/40 hover:scale-110"
            onClick={prev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/20 backdrop-blur-md p-2
                      text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity
                      hover:bg-black/40 hover:scale-110"
            onClick={next}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Modern dot indicators */}
      {showIndicators && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 space-x-2 z-10">
          {items.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                currentIndex === index
                  ? "bg-white w-8 shadow-lg shadow-white/20"
                  : "bg-white/40 w-2.5 hover:bg-white/60",
              )}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

