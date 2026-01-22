import { TopHeader } from "@/components/top-header"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { PhotoCarousel } from "@/components/photo-carousel"
import { MembersCarousel } from "@/components/members-carousel"
import { Footer } from "@/components/footer"
import { EventPopup } from "@/components/event-popup"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <TopHeader />
      <Navbar />
      <HeroSection />
      <PhotoCarousel />
      <MembersCarousel />
      
      {/* Call to Action Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Ready to Join the Cricket Revolution?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
            Register now and become part of India&apos;s fastest-growing cricket community. 
            Compete in state and national level tournaments.
          </p>
          <a
            href="/register"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Register as Player
          </a>
        </div>
      </section>

      <Footer />
      <EventPopup />
    </main>
  )
}
