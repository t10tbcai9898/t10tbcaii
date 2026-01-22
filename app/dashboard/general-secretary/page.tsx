"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MapPin, CreditCard, TrendingUp } from "lucide-react"

interface Stats {
  totalPlayers: number
  totalStates: number
  totalRevenue: number
  recentRegistrations: number
}

export default function GeneralSecretaryDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalPlayers: 0,
    totalStates: 0,
    totalRevenue: 0,
    recentRegistrations: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient()

      // Fetch total players
      const { count: playersCount } = await supabase
        .from("players")
        .select("*", { count: "exact", head: true })

      // Fetch unique states with players
      const { data: statesData } = await supabase
        .from("players")
        .select("state")
      const uniqueStates = new Set(statesData?.map((p) => p.state)).size

      // Fetch total revenue
      const { data: revenueData } = await supabase
        .from("players")
        .select("payment_amount")
        .eq("payment_status", "completed")
      const totalRevenue = revenueData?.reduce(
        (sum, p) => sum + (p.payment_amount || 0),
        0
      ) || 0

      // Recent registrations (last 7 days)
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      const { count: recentCount } = await supabase
        .from("players")
        .select("*", { count: "exact", head: true })
        .gte("created_at", sevenDaysAgo.toISOString())

      setStats({
        totalPlayers: playersCount || 0,
        totalStates: uniqueStates,
        totalRevenue,
        recentRegistrations: recentCount || 0,
      })
      setIsLoading(false)
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Total Players",
      value: stats.totalPlayers,
      icon: Users,
      description: "Registered players",
    },
    {
      title: "Active States",
      value: stats.totalStates,
      icon: MapPin,
      description: "States with registrations",
    },
    {
      title: "Total Revenue",
      value: `Rs. ${stats.totalRevenue.toLocaleString()}`,
      icon: CreditCard,
      description: "From registrations",
    },
    {
      title: "Recent Registrations",
      value: stats.recentRegistrations,
      icon: TrendingUp,
      description: "Last 7 days",
    },
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the General Secretary Dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              href="/dashboard/general-secretary/players"
              className="block p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <div className="font-medium text-foreground">View All Players</div>
              <div className="text-sm text-muted-foreground">
                See all registered players across India
              </div>
            </a>
            <a
              href="/dashboard/general-secretary/secretaries"
              className="block p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <div className="font-medium text-foreground">Manage State Secretaries</div>
              <div className="text-sm text-muted-foreground">
                Add or manage state secretary accounts
              </div>
            </a>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">System Status</CardTitle>
            <CardDescription>Platform health and information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Database</span>
                <span className="text-accent font-medium">Connected</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Payment Gateway</span>
                <span className="text-accent font-medium">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="text-foreground">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
