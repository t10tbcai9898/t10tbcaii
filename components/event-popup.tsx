"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function EventPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Close popup"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Single Cricket Poster - Clickable to Registration */}
        <Link href="/register" className="block">
          <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl cursor-pointer hover:scale-[1.02] transition-transform duration-300">
            <Image src="/poster1.jpg" alt="Cricket Tournament Poster" fill className="object-contain" priority />
          </div>
        </Link>
      </div>
    </div>
  )
}
