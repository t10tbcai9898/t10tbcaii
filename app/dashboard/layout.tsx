"use client"

import React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  Trophy,
  Users,
  UserPlus,
  Settings,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Key,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Profile {
  id: string
  email: string
  full_name: string
  role: "general_secretary" | "state_secretary"
  state: string | null
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push("/auth/login")
        return
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (profileData) {
        setProfile(profileData)
      }
      setIsLoading(false)
    }

    fetchProfile()
  }, [router])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  const isGeneralSecretary = profile?.role === "general_secretary"

  const navItems = [
    {
      href: isGeneralSecretary ? "/dashboard/general-secretary" : "/dashboard/state-secretary",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: isGeneralSecretary ? "/dashboard/general-secretary/players" : "/dashboard/state-secretary/players",
      label: "Players",
      icon: Users,
    },
    ...(isGeneralSecretary
      ? [
          {
            href: "/dashboard/general-secretary/secretaries",
            label: "State Secretaries",
            icon: UserPlus,
          },
        ]
      : []),
    {
      href: "/auth/change-password",
      label: "Change Password",
      icon: Key,
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden bg-card border-b border-border p-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary rounded-full p-2">
            <Trophy className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground">TTBCAI</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-foreground"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-card border-r border-border transition-transform lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b border-border hidden lg:block">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-primary rounded-full p-2">
                  <Trophy className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <span className="font-bold text-foreground">TTBCAI</span>
                  <p className="text-xs text-muted-foreground">
                    {isGeneralSecretary ? "General Secretary" : "State Secretary"}
                  </p>
                </div>
              </Link>
            </div>

            {/* Profile */}
            <div className="p-4 border-b border-border">
              <div className="bg-secondary rounded-lg p-3">
                <p className="font-semibold text-foreground text-sm truncate">
                  {profile?.full_name || "Secretary"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {profile?.email}
                </p>
                {profile?.state && (
                  <p className="text-xs text-primary mt-1">{profile.state}</p>
                )}
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-border">
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-secondary"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-background/80 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">{children}</main>
      </div>
    </div>
  )
}
