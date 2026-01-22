import { TopHeader } from "@/components/top-header"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Trophy, Target, Users, Award, CheckCircle } from "lucide-react"

export const metadata = {
  title: "About Us | TTBCAI - T10 Tennis Ball Cricket Association of India",
  description: "Learn about the T10 Tennis Ball Cricket Association of India, our mission, vision, and commitment to promoting tennis ball cricket across India.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <TopHeader />
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About <span className="text-primary">TTBCAI</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg text-pretty">
            The official governing body for T10 Tennis Ball Cricket in India, 
            dedicated to promoting and developing the sport across all states.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-muted-foreground text-pretty">
                To promote, develop, and govern T10 Tennis Ball Cricket across India, 
                providing opportunities for players of all skill levels to participate 
                in organized tournaments. We aim to make tennis ball cricket a recognized 
                sport that reaches every corner of the nation.
              </p>
            </div>

            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
              </div>
              <p className="text-muted-foreground text-pretty">
                To become the premier tennis ball cricket organization in India, 
                fostering talent, promoting sportsmanship, and creating a professional 
                ecosystem that supports players, coaches, and cricket enthusiasts 
                across all 36 states and union territories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            What We <span className="text-primary">Do</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Trophy,
                title: "Organize Tournaments",
                description: "National and state-level T10 tennis ball cricket tournaments throughout the year",
              },
              {
                icon: Users,
                title: "Player Development",
                description: "Training programs and workshops to develop cricket talent at grassroots level",
              },
              {
                icon: Award,
                title: "State Associations",
                description: "Coordinating with state secretaries to ensure uniform standards across India",
              },
              {
                icon: CheckCircle,
                title: "Player Registration",
                description: "Official player registration system for participating in recognized tournaments",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 border border-border hover:border-primary transition-colors group"
              >
                <div className="bg-primary/20 p-3 rounded-full w-fit mb-4 group-hover:bg-primary/30 transition-colors">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm text-pretty">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our <span className="text-primary">History</span>
            </h2>
            <p className="text-muted-foreground mb-6 text-pretty">
              T10 Tennis Ball Cricket Association of India was established with the vision 
              of bringing organized tennis ball cricket to the masses. What started as a 
              small initiative has now grown into a nationwide movement, connecting players 
              and cricket enthusiasts from every state of India.
            </p>
            <p className="text-muted-foreground text-pretty">
              Our association has successfully conducted numerous state and national level 
              tournaments, registered thousands of players, and established state secretaries 
              across all major states. We continue to work towards making T10 tennis ball 
              cricket one of the most popular formats in amateur cricket.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "36+", label: "States & UTs" },
              { value: "10,000+", label: "Registered Players" },
              { value: "50+", label: "Tournaments" },
              { value: "100+", label: "State Officials" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
