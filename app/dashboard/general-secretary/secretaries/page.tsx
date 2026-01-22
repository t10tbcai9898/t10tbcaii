"use client"

import React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, Users, AlertCircle, CheckCircle } from "lucide-react"

interface Secretary {
  id: string
  email: string
  full_name: string
  state: string | null
  phone: string | null
  created_at: string
}

interface State {
  id: string
  name: string
}

export default function SecretariesPage() {
  const [secretaries, setSecretaries] = useState<Secretary[]>([])
  const [states, setStates] = useState<State[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    state: "",
    phone: "",
  })

  const fetchData = async () => {
    const supabase = createClient()

    // Fetch states
    const { data: statesData } = await supabase
      .from("states")
      .select("*")
      .order("name")
    if (statesData) setStates(statesData)

    // Fetch state secretaries
    const { data: secretariesData } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "state_secretary")
      .order("created_at", { ascending: false })
    if (secretariesData) setSecretaries(secretariesData)

    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStateChange = (value: string) => {
    setFormData((prev) => ({ ...prev, state: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch("/api/create-secretary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to create secretary")
      }

      setMessage({ type: "success", text: "State Secretary created successfully!" })
      setFormData({ email: "", password: "", fullName: "", state: "", phone: "" })
      fetchData()
      setTimeout(() => {
        setIsDialogOpen(false)
        setMessage(null)
      }, 2000)
    } catch (err: unknown) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "An error occurred",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get states that don't have a secretary yet
  const availableStates = states.filter(
    (state) => !secretaries.some((s) => s.state === state.name)
  )

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">State Secretaries</h1>
          <p className="text-muted-foreground">
            Manage state secretary accounts
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              <UserPlus className="h-4 w-4" />
              Add State Secretary
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Add State Secretary</DialogTitle>
              <DialogDescription>
                Create a new state secretary account with login credentials
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {message && (
                <div
                  className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
                    message.type === "success"
                      ? "bg-accent/20 text-accent"
                      : "bg-destructive/20 text-destructive"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  {message.text}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="bg-input"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="secretary@ttbcai.org"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-input"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={8}
                  className="bg-input"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Select value={formData.state} onValueChange={handleStateChange}>
                  <SelectTrigger className="bg-input">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStates.map((state) => (
                      <SelectItem key={state.id} value={state.name}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {availableStates.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    All states have secretaries assigned
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-input"
                  maxLength={10}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isSubmitting || availableStates.length === 0}
              >
                {isSubmitting ? "Creating..." : "Create Secretary"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Secretaries
            </CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{secretaries.length}</div>
            <p className="text-xs text-muted-foreground">Active state secretaries</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              States Covered
            </CardTitle>
            <UserPlus className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {secretaries.length} / {states.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {states.length - secretaries.length} states remaining
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Secretaries Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">State Secretary List</CardTitle>
          <CardDescription>All registered state secretaries</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : secretaries.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No state secretaries added yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-muted-foreground">Name</TableHead>
                    <TableHead className="text-muted-foreground">Email</TableHead>
                    <TableHead className="text-muted-foreground">State</TableHead>
                    <TableHead className="text-muted-foreground">Phone</TableHead>
                    <TableHead className="text-muted-foreground">Added On</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {secretaries.map((secretary) => (
                    <TableRow key={secretary.id} className="border-border">
                      <TableCell className="font-medium text-foreground">
                        {secretary.full_name}
                      </TableCell>
                      <TableCell className="text-foreground">{secretary.email}</TableCell>
                      <TableCell>
                        <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium">
                          {secretary.state}
                        </span>
                      </TableCell>
                      <TableCell className="text-foreground">
                        {secretary.phone || "-"}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(secretary.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
