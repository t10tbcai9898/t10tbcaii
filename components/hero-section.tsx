"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, Trophy, Users, MapPin } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-cricket.jpg"
          alt="T10 Tennis Ball Cricket Action"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in-up">
            <Trophy className="h-4 w-4" />
            Official National Cricket Association
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-fade-in-up stagger-1 text-balance">
            T10 Tennis Ball Cricket{" "}
            <span className="text-primary">Association of India</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-xl animate-fade-in-up stagger-2 text-pretty">
            Promoting tennis ball cricket across India. Join thousands of players 
            in the fastest growing cricket format. Register now for upcoming tournaments!
          </p>

          <div className="flex flex-wrap gap-4 mt-8 animate-fade-in-up stagger-3">
            <Link href="/register">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 group">
                Register Now
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-foreground/20 text-foreground hover:bg-foreground/10 bg-transparent">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 animate-fade-in-up stagger-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-primary mb-1">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">36+</div>
              <div className="text-xs md:text-sm text-muted-foreground">States & UTs</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-primary mb-1">
                <Users className="h-5 w-5" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">10,000+</div>
              <div className="text-xs md:text-sm text-muted-foreground">Registered Players</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-primary mb-1">
                <Trophy className="h-5 w-5" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">50+</div>
              <div className="text-xs md:text-sm text-muted-foreground">Tournaments</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
