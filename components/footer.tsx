import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.jpg"
                alt="T10TBCAI Logo"
                width={48}
                height={48}
                className="w-12 h-12 object-contain bg-background rounded-lg p-1"
              />
              <div>
                <h3 className="font-bold text-lg">T10 Tennis Ball Cricket</h3>
                <p className="text-background/70 text-xs">Association of India</p>
              </div>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              Promoting cricket excellence across India through organized tournaments, player development programs, and
              fostering sportsmanship.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.facebook.com/share/1SU8A8zn5u/"
                className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/abhsingh1134?utm_source=qr&igsh=Yng1YWM2YTlyNW0w"
                className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/@T-10TennisBallCricketAssociati"
                className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-background/80 hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-background/80 hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/academy" className="text-background/80 hover:text-primary transition-colors text-sm">
                  Our Associate Academy
                </Link>
              </li>
              <li>
                <Link href="/school" className="text-background/80 hover:text-primary transition-colors text-sm">
                  Our Associate School
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-background/80 hover:text-primary transition-colors text-sm">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-background/80 hover:text-primary transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-background/80 hover:text-primary transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-background/80 hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-background/80 hover:text-primary transition-colors text-sm">
                  Refund & Return Policy
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-background/80 hover:text-primary transition-colors text-sm">
                  Player Registration
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-background/80 hover:text-primary transition-colors text-sm">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-background/80 text-sm">
                  Kashi Vidyapith Block, Near Panchayat Bhawan, Shivdaspur, Manduadih, Varanasi, Uttar Pradesh - 221103
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+919876543210" className="text-background/80 hover:text-primary transition-colors text-sm">
                  +91 94157 01006, 79052 51534
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:t10tennisballcricket2023@gmail.com"
                  className="text-background/80 hover:text-primary transition-colors text-sm"
                >
                  t10tennisballcricket2023@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-background/60">
            <p>&copy; {new Date().getFullYear()} T10 Tennis Ball Cricket Association of India. All rights reserved.</p>
            <p>Designed with passion for cricket</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
