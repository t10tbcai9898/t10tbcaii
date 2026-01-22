import Image from "next/image"
import { TopHeader } from "@/components/top-header"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Association Members | TTBCAI - T10 Tennis Ball Cricket Association of India",
  description: "Meet the leadership team and state secretaries of T10 Tennis Ball Cricket Association of India.",
}

const nationalLeaders = [
  {
    name: "Shri Gurvinder Singh",
    designation: "President",
    photo: "/images/president.jpg",
    description: "Leading TTBCAI with a vision to make tennis ball cricket accessible to every Indian.",
  },
  {
    name: "Abhishek Kumar Singh",
    designation: "General Secretary",
    photo: "/images/general-secretary.jpg",
    description: "Managing day-to-day operations and coordinating with all state associations.",
  },
  {
    name: "Nitesh Shinde",
    designation: "Treasurer",
    photo: "/images/treasurer.jpg",
    description: "Overseeing financial operations and ensuring transparent fund management.",
  },
]

export const stateSecretaries = [
{ name: "Uttar Pradesh", state: "T10TBCAI OF Uttar Pradesh", image: "/1.jpg", phone: "+91 9415701006" },
  { name: "Telangana", state: "T10TBCAI OF Telangana", image: "2.jpg", phone: "+91 9415701006" },
  { name: "Jharkhand", state: "T10TBCAI OF Jharkhand", image: "3.jpg", phone: "+91 9415701006" },
  { name: "Chhattisgarh", state: "T10TBCAI OF Chhattisgarh", image: "4.jpg", phone: "+91 9415701006" },
  { name: "Goa", state: "T10TBCAI OF Goa", image: "/5.jpg", phone: "+91 9415701006" },
  { name: "West Bengal", state: "T10TBCAI OF West Bengal", image: "/6.jpg", phone: "++91 9415701006" },
  { name: "Bihar", state: "T10TBCAI OF Bihar", image: "/7.jpg", phone: "++91 9415701006" },
  { name: "Uttarakhand", state: "T10TBCAI OF Uttarakhand", image: "/8.jpg", phone: "+91 9415701006" },
  { name: "Himanchal Pradesh", state: "T10TBCAI OF Himanchal Pradesh", image: "/9.jpg", phone: "+91 9415701006" },
  { name: "Assam", state: "T10TBCAI OF Assam", image: "/10.jpg", phone: "+91 9415701006" },
    { name: "Haryana", state: "T10TBCAI OF Haryana", image: "/11.jpg", phone: "+91 9415701006" },
]

export default function AssociationMembersPage() {
  return (
    <main className="min-h-screen bg-background">
      <TopHeader />
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Association <span className="text-primary">Members</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg text-pretty">
            Meet the dedicated leaders who are driving the growth of tennis ball cricket across India.
          </p>
        </div>
      </section>

      {/* National Leadership */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            National <span className="text-primary">Leadership</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {nationalLeaders.map((leader, index) => (
              <Card
                key={index}
                className="bg-card border-border overflow-hidden group hover:border-primary transition-all duration-300"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={leader.photo || "/placeholder.svg"}
                    alt={leader.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                </div>
                <CardContent className="p-6 text-center relative -mt-20">
                  <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3">
                    {leader.designation}
                  </div>
                  <h3 className="font-bold text-xl text-foreground">{leader.name}</h3>
                  <p className="text-muted-foreground text-sm mt-2 text-pretty">
                    {leader.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* State Secretaries */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-4">
            State <span className="text-primary">Secretaries</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Our dedicated state secretaries ensure smooth operations and tournament organization across all states.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {stateSecretaries.map((secretary, index) => (
              <Card
                key={index}
                className="bg-card border-border overflow-hidden group hover:border-primary transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={secretary.photo || "/placeholder.svg"}
                    alt={secretary.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-bold text-foreground">{secretary.name}</h3>
                  <p className="text-primary text-sm font-medium">State Secretary</p>
                  <p className="text-muted-foreground text-xs mt-1">{secretary.state}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Interested in Becoming a State Secretary?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
            If you are passionate about cricket and want to lead the development of tennis ball cricket in your state, 
            contact us to learn about the process.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
