"use client"

import { useState } from "react"
import { ImageIcon, Video, X } from "lucide-react"
import { TopHeader } from "@/components/top-header"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"


const galleryItems = [
{ type: "image", src: "/55.jpeg", title: "Championship Match 2025", category: "matches" },
{ type: "image", src: "/56.jpeg", title: "Championship Match 2025", category: "matches" },
{ type: "image", src: "/57.jpeg", title: "Championship Match 2025", category: "matches" },
{ type: "image", src: "/58.jpeg", title: "Championship Match 2025", category: "matches" },
{ type: "image", src: "/59.jpeg", title: "Championship Match 2025", category: "matches" },
{ type: "image", src: "/60.jpeg", title: "Championship Match 2025", category: "matches" },
{ type: "image", src: "/61.jpeg", title: "Championship Match 2025", category: "matches" },
{ type: "image", src: "/62.jpeg", title: "Championship Match 2025", category: "matches" },
{ type: "image", src: "/63.jpeg", title: "Championship Match 2025", category: "matches" },
{ type: "image", src: "/64.jpeg", title: "Championship Match 2025", category: "matches" },
{ type: "image", src: "/65.jpeg", title: "Championship Match 2025", category: "matches" },
{ type: "image", src: "/66.jpeg", title: "Championship Match 2025", category: "matches" },
{ type: "image", src: "/67.jpeg", title: "Championship Match 2025", category: "matches" },
{ type: "image", src: "/68.jpeg", title: "Championship Match 2025", category: "matches" },
{ type: "image", src: "/69.jpeg", title: "Championship Match 2025", category: "matches" },
{ type: "image", src: "/70.jpeg", title: "Championship Match 2025", category: "matches" },
{ type: "image", src: "/71.jpeg", title: "Championship Match 2025", category: "matches" },
{ type: "image", src: "/73.jpeg", title: "Championship Match 2025", category: "matches" },

{ type: "image", src: "/101.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/102.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/103.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/104.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/105.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/106.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/107.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/108.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/109.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/110.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/111.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/112.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/113.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/114.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/115.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/116.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/117.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/118.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/119.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/120.jpeg", title: "Victory Celebration", category: "celebrations" },

{ type: "image", src: "/101.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/102.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/103.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/104.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/105.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/106.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/107.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/108.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/109.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/110.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/111.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/112.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/113.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/114.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/115.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/116.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/117.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/118.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/119.jpeg", title: "Victory Celebration", category: "celebrations" },
{ type: "image", src: "/120.jpeg", title: "Victory Celebration", category: "celebrations" },

{ type: "image", src: "/121.jpeg", title: "Bowling Action", category: "matches" },
{ type: "image", src: "/122.jpeg", title: "Bowling Action", category: "matches" },
{ type: "image", src: "/123.jpeg", title: "Bowling Action", category: "matches" },
{ type: "image", src: "/124.jpeg", title: "Bowling Action", category: "matches" },
{ type: "image", src: "/125.jpeg", title: "Bowling Action", category: "matches" },
{ type: "image", src: "/126.jpeg", title: "Bowling Action", category: "matches" },
{ type: "image", src: "/127.jpeg", title: "Bowling Action", category: "matches" },
{ type: "image", src: "/128.jpeg", title: "Bowling Action", category: "matches" },
{ type: "image", src: "/129.jpeg", title: "Bowling Action", category: "matches" },
{ type: "image", src: "/130.jpeg", title: "Bowling Action", category: "matches" },
{ type: "image", src: "/131.jpeg", title: "Bowling Action", category: "matches" },
{ type: "image", src: "/132.jpeg", title: "Bowling Action", category: "matches" },
{ type: "image", src: "/133.jpeg", title: "Bowling Action", category: "matches" },
{ type: "image", src: "/134.jpeg", title: "Bowling Action", category: "matches" },
{ type: "image", src: "/135.jpeg", title: "Bowling Action", category: "matches" },
{ type: "image", src: "/136.jpeg", title: "Bowling Action", category: "matches" },
{ type: "image", src: "/137.jpeg", title: "Bowling Action", category: "matches" },
{ type: "image", src: "/138.jpeg", title: "Bowling Action", category: "matches" },
{ type: "image", src: "/139.jpeg", title: "Bowling Action", category: "matches" },
{ type: "image", src: "/140.jpeg", title: "Bowling Action", category: "matches" },


{ type: "image", src: "/141.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/142.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/143.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/144.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/145.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/146.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/147.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/148.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/149.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/150.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/151.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/152.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/153.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/154.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/155.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/156.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/157.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/158.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/159.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/160.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/161.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/162.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/163.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/164.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/165.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/166.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/167.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/168.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/169.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/170.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/171.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/172.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/173.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/174.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/175.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/176.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/177.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/178.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/179.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/180.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/181.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/182.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/183.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/184.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/185.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/186.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/187.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/188.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/189.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/190.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/191.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/192.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/193.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/194.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/195.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/196.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/197.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/198.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/199.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/200.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/201.jpeg", title: "Award Ceremony", category: "ceremonies" },
{ type: "image", src: "/202.jpeg", title: "Award Ceremony", category: "ceremonies" },

{type: "video",src: "https://www.youtube.com/embed/CBvGlOvHa_c",thumbnail: "/103.jpeg",title: "Tournament Highlights 2025",category: "videos",},

{type: "video",src: "https://www.youtube.com/embed/ETNlrmPOdmU",thumbnail: "/106.jpeg",title: "Tournament Highlights 2025",category: "videos",},
 
{type: "video",src: "https://www.youtube.com/embed/lc78khgFNho",thumbnail: "/108.jpeg",title: "Tournament Highlights 2025",category: "videos",},

{type: "video",src: "https://www.youtube.com/embed/qUIbcTJSbOg",thumbnail: "/118.jpeg",title: "Tournament Highlights 2025",category: "videos",},

{type: "video",src: "https://www.youtube.com/embed/I641AcX-aGw",thumbnail: "/145.jpeg",title: "Tournament Highlights 2025",category: "videos",},
 
{type: "video",src: "https://www.youtube.com/embed/ySOCvcPmXso",thumbnail: "/153.jpeg",title: "Tournament Highlights 2025",category: "videos",},

{type: "video",src: "https://www.youtube.com/embed/CBvGlOvHa_c",thumbnail: "/164.jpeg",title: "Tournament Highlights 2025",category: "videos",},

 {type: "video",src: "https://www.youtube.com/embed/00m3QBH1rRY",thumbnail: "/175.jpeg",title: "Tournament Highlights 2025",category: "videos",},
 
 {type: "video",src: "https://www.youtube.com/embed/vJ_jVG6tnmY",thumbnail: "/178.jpeg",title: "Tournament Highlights 2025",category: "videos",},

  {type: "video",src: "https://www.youtube.com/embed/eOPs3AWCaW0",thumbnail: "/120.jpeg",title: "Tournament Highlights 2025",category: "videos",},

{type: "video",src: "https://www.youtube.com/embed/kdZXj9XupwE",thumbnail: "/110.jpeg",title: "Tournament Highlights 2025",category: "videos",},

{type: "video",src: "https://www.youtube.com/embed/tspPe1mCW4E",thumbnail: "/199.jpeg",title: "Tournament Highlights 2025",category: "videos",},


]

const categories = [
  { id: "all", label: "All" },
  { id: "matches", label: "Matches" },
  { id: "celebrations", label: "Celebrations" },
  { id: "ceremonies", label: "Ceremonies" },
  { id: "videos", label: "Videos" },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [lightboxItem, setLightboxItem] = useState<(typeof galleryItems)[0] | null>(null)

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory)

  return (
    <main className="min-h-screen bg-background">
      <TopHeader />
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Photo & Video <span className="text-primary">Gallery</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg text-pretty">
            Relive the best moments from our tournaments, ceremonies, and celebrations.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 border-b border-border sticky top-16 bg-background z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:bg-secondary"
                )}
              >
                {category.id === "videos" && <Video className="h-4 w-4 mr-1" />}
                {category.id !== "videos" && category.id !== "all" && (
                  <ImageIcon className="h-4 w-4 mr-1" />
                )}
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer bg-card"
                onClick={() => setLightboxItem(item)}
              >
<Image
  src={item.type === "video" ? item.thumbnail || item.src : item.src}
  alt={item.title}
  fill
  className="object-cover transition-transform duration-500 group-hover:scale-110"
/>

                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-primary/80 rounded-full p-4 group-hover:scale-110 transition-transform">
                      <Video className="h-8 w-8 text-primary-foreground fill-current" />
                    </div>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                  <h3 className="text-foreground font-semibold text-sm">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No items found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[100] bg-background/95 flex items-center justify-center p-4"
          onClick={() => setLightboxItem(null)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-foreground hover:bg-secondary"
            onClick={() => setLightboxItem(null)}
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </Button>

          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxItem.type === "image" ? (
              <div className="relative aspect-video">
<Image
  src={lightboxItem.src || "/placeholder.svg"}
  alt={lightboxItem.title}
  fill
  className="object-contain rounded-lg"
/>

              </div>
            ) : (
              <div className="relative aspect-video">
                <iframe
                  src={lightboxItem.src}
                  title={lightboxItem.title}
                  className="absolute inset-0 w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
            )}
            <h3 className="text-foreground font-semibold text-center mt-4">
              {lightboxItem.title}
            </h3>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
