"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Download, Filter } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

interface Player {
  id: string
  name: string
  father_name: string
  email: string
  mobile: string
  state: string
  district: string
  address: string
  payment_status: string
  created_at: string
}

interface State {
  id: string
  name: string
}

const Loading = () => null

export default function GeneralSecretaryPlayersPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [states, setStates] = useState<State[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState("all")
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()

      // Fetch states
      const { data: statesData } = await supabase
        .from("states")
        .select("*")
        .order("name")
      if (statesData) setStates(statesData)

      // Fetch players
      const { data: playersData } = await supabase
        .from("players")
        .select("*")
        .order("created_at", { ascending: false })
      if (playersData) setPlayers(playersData)

      setIsLoading(false)
    }

    fetchData()
  }, [])

  const filteredPlayers = players.filter((player) => {
    const matchesSearch =
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.mobile.includes(searchTerm)
    const matchesState = selectedState === "all" || player.state === selectedState
    return matchesSearch && matchesState
  })

  const exportToCSV = () => {
    const headers = ["Name", "Father's Name", "Email", "Mobile", "State", "District", "Address", "Payment Status", "Registration Date"]
    const rows = filteredPlayers.map((p) => [
      p.name,
      p.father_name,
      p.email,
      p.mobile,
      p.state,
      p.district,
      p.address,
      p.payment_status,
      new Date(p.created_at).toLocaleDateString(),
    ])

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `players-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">All Players</h1>
          <p className="text-muted-foreground">
            View and manage registered players from all states
          </p>
        </div>
        <Button onClick={exportToCSV} variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border mb-6">
        <CardHeader>
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or mobile..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input"
              />
            </div>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-full sm:w-48 bg-input">
                <SelectValue placeholder="Filter by state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {states.map((state) => (
                  <SelectItem key={state.id} value={state.name}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Players Table */}
      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <Suspense fallback={<Loading />}>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : filteredPlayers.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No players found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">Name</TableHead>
                      <TableHead className="text-muted-foreground">Father&apos;s Name</TableHead>
                      <TableHead className="text-muted-foreground">Contact</TableHead>
                      <TableHead className="text-muted-foreground">State</TableHead>
                      <TableHead className="text-muted-foreground">District</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                      <TableHead className="text-muted-foreground">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPlayers.map((player) => (
                      <TableRow key={player.id} className="border-border">
                        <TableCell className="font-medium text-foreground">
                          {player.name}
                        </TableCell>
                        <TableCell className="text-foreground">{player.father_name}</TableCell>
                        <TableCell>
                          <div className="text-sm text-foreground">{player.email}</div>
                          <div className="text-xs text-muted-foreground">{player.mobile}</div>
                        </TableCell>
                        <TableCell className="text-foreground">{player.state}</TableCell>
                        <TableCell className="text-foreground">{player.district}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              player.payment_status === "completed"
                                ? "bg-accent/20 text-accent"
                                : "bg-destructive/20 text-destructive"
                            }`}
                          >
                            {player.payment_status}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {new Date(player.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </Suspense>
        </CardContent>
      </Card>

      <div className="mt-4 text-sm text-muted-foreground">
        Showing {filteredPlayers.length} of {players.length} players
      </div>
    </div>
  )
}
