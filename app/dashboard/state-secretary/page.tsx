"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, CreditCard, Calendar } from "lucide-react"

interface Profile {
  state: string | null
}

interface Stats {
  totalPlayers: number
  recentRegistrations: number
  totalRevenue: number
}

export default function StateSecretaryDashboard() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [stats, setStats] = useState<Stats>({
    totalPlayers: 0,
    recentRegistrations: 0,
    totalRevenue: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()

      // Get current user profile
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profileData } = await supabase
        .from("profiles")
        .select("state")
        .eq("id", user.id)
        .single()

      if (profileData) {
        setProfile(profileData)

        // Fetch stats for this state
        const { count: playersCount } = await supabase
          .from("players")
          .select("*", { count: "exact", head: true })
          .eq("state", profileData.state)

        // Recent registrations (last 7 days)
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
        const { count: recentCount } = await supabase
          .from("players")
          .select("*", { count: "exact", head: true })
          .eq("state", profileData.state)
          .gte("created_at", sevenDaysAgo.toISOString())

        // Total revenue
        const { data: revenueData } = await supabase
          .from("players")
          .select("payment_amount")
          .eq("state", profileData.state)
          .eq("payment_status", "completed")
        const totalRevenue = revenueData?.reduce(
          (sum, p) => sum + (p.payment_amount || 0),
          0
        ) || 0

        setStats({
          totalPlayers: playersCount || 0,
          recentRegistrations: recentCount || 0,
          totalRevenue,
        })
      }
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const statCards = [
    {
      title: "State Players",
      value: stats.totalPlayers,
      icon: Users,
      description: `Registered in ${profile?.state || "your state"}`,
    },
    {
      title: "Recent Registrations",
      value: stats.recentRegistrations,
      icon: TrendingUp,
      description: "Last 7 days",
    },
    {
      title: "State Revenue",
      value: `Rs. ${stats.totalRevenue.toLocaleString()}`,
      icon: CreditCard,
      description: "From registrations",
    },
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the State Secretary Dashboard
          {profile?.state && (
            <span className="text-primary font-medium"> - {profile.state}</span>
          )}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <Card key={index} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {isLoading ? "..." : stat.value}
              </div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/dashboard/state-secretary/players"
              className="block p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <div className="font-medium text-foreground">View State Players</div>
              <div className="text-sm text-muted-foreground">
                See all registered players from {profile?.state || "your state"}
              </div>
            </a>
            <a
              href="/auth/change-password"
              className="block p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <div className="font-medium text-foreground">Change Password</div>
              <div className="text-sm text-muted-foreground">
                Update your account password
              </div>
            </a>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Your Responsibilities</CardTitle>
            <CardDescription>As a State Secretary</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Calendar className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>Oversee player registrations in your state</span>
              </li>
              <li className="flex items-start gap-2">
                <Calendar className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>Coordinate with local cricket bodies</span>
              </li>
              <li className="flex items-start gap-2">
                <Calendar className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>Report to General Secretary on state activities</span>
              </li>
              <li className="flex items-start gap-2">
                <Calendar className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>Assist in organizing state-level tournaments</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
