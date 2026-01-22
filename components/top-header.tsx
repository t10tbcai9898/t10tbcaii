"use client"

import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export function TopHeader() {
  return (
    <div className="bg-secondary text-secondary-foreground py-2 px-4 text-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="mailto:t10tennisballcricket2023@gmail.com"
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">t10tennisballcricket2023@gmail.com</span>
          </a>
          <a
            href=""
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">+91 94157 01006, 79052 51534</span>
          </a>
          <div className="hidden md:flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Kashi Vidyapith Block, Near Panchayat Bhawan, Shivdaspur, Manduadih, Varanasi, Uttar Pradesh - 221103</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://facebook.com/ttbcai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href="https://instagram.com/ttbcai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="https://twitter.com/ttbcai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
