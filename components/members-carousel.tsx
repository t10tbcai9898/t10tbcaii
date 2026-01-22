"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const members = [
  {
    name: "Shri Gurvinder Singh", designation: "President", photo: "/images/president.jpg",state: "T10TBCAI",},
  {name: "Abhishek Kumar Singh",designation: "General Secretary", photo: "/images/general-secretary.jpg", state: "T10TBCAI",},
  {name: "Nitesh Shinde", designation: "Treasurer", photo: "/images/treasurer.jpg", state: "T10TBCAI",},
  {name: "Ball Provided By Khanna Ball", designation: " ",photo: "13.jpeg",state: "",},
  {name: "Uttar Pradesh", designation: "T10TBCAI of Uttar Pradesh ",photo: "/1.jpg",state: "",},
  {name: "Telangana", designation: "T10TBCAI of Telangana",photo: "/2.jpg",state: "",},
  {name: "Jharkhand", designation: "T10TBCAI of Jharkhand",photo: "/3.jpg",state: "",},
  {name: "Chhattisgarh", designation: "T10TBCAI of Chhattisgarh ",photo: "/4.jpg",state: "",},
  {name: "Goa", designation: "T10TBCAI of Goa ",photo: "/5.jpg",state: "",},
  {name: "West Bengal", designation: "T10TBCAI of West Bengal",photo: "/6.jpg",state: "",},
  {name: "Bihar", designation: "T10TBCAI of Bihar",photo: "/7.jpg",state: "",},
  {name: "Uttarakhand", designation: "T10TBCAI of Uttarakhand ",photo: "/8.jpg",state: "",},
  {name: "Himanchal Pradesh", designation: "T10TBCAI of Himanchal Pradesh",photo: "/9.jpg",state: "",},
  {name: "Assam", designation: "T10TBCAI of Assam ",photo: "/10.jpg",state: "",},
  {name: "Haryana", designation: "T10TBCAI of Haryana",photo: "/11.jpg",state: "",},
 
]

export function MembersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    const ref = scrollRef.current
    if (ref) {
      ref.addEventListener("scroll", checkScroll)
      return () => ref.removeEventListener("scroll", checkScroll)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Our <span className="text-primary">Leadership</span>
          </h2>
          <p className="text-muted-foreground mt-2">
            Meet the team driving cricket excellence across India
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          {canScrollLeft && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background shadow-lg text-foreground"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}
          {canScrollRight && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background shadow-lg text-foreground"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-8 py-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {members.map((member, index) => (
              <Card
                key={index}
                className="flex-shrink-0 w-64 bg-card border-border overflow-hidden group hover:border-primary transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.photo || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-bold text-lg text-foreground">{member.name}</h3>
                  <p className="text-primary text-sm font-medium">{member.designation}</p>
                  <p className="text-muted-foreground text-xs mt-1">{member.state}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
