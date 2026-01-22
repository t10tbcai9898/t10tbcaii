"use client"

import React from "react"

import { useState, useEffect } from "react"
import { TopHeader } from "@/components/top-header"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { CheckCircle, CreditCard, User, MapPin } from "lucide-react"

const REGISTRATION_FEE = 500 // INR

interface State {
  id: string
  name: string
  code: string
}

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [states, setStates] = useState<State[]>([])
  const [isSuccess, setIsSuccess] = useState(false)
  const [playerId, setPlayerId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    email: "",
    mobile: "",
    state: "",
    district: "",
    address: "",
  })

  useEffect(() => {
    const fetchStates = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("states").select("*").order("name")
      if (data) setStates(data)
    }
    fetchStates()
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStateChange = (value: string) => {
    setFormData((prev) => ({ ...prev, state: value }))
  }

  const validateStep1 = () => {
    if (!formData.name || !formData.fatherName || !formData.email || !formData.mobile) {
      setError("Please fill all required fields")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address")
      return false
    }
    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      setError("Please enter a valid 10-digit mobile number")
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (!formData.state || !formData.district || !formData.address) {
      setError("Please fill all required fields")
      return false
    }
    return true
  }

  const handleNext = () => {
    setError(null)
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    }
  }

  const handleBack = () => {
    setError(null)
    setStep((prev) => prev - 1)
  }

  const loadRazorpay = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && (window as typeof window & { Razorpay: unknown }).Razorpay) {
        resolve(true)
        return
      }
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const loaded = await loadRazorpay()
      if (!loaded) {
        throw new Error("Failed to load payment gateway")
      }

      // Get Razorpay key from server
      const configResponse = await fetch("/api/payment-config")
      const { key: razorpayKey } = await configResponse.json()

      // Create order via API
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: REGISTRATION_FEE,
          playerData: formData,
        }),
      })

      const orderData = await response.json()

      if (!response.ok) {
        throw new Error(orderData.error || "Failed to create order")
      }

      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: "INR",
        name: "TTBCAI",
        description: "Player Registration Fee",
        order_id: orderData.orderId,
        handler: async (response: {
          razorpay_payment_id: string
          razorpay_order_id: string
          razorpay_signature: string
        }) => {
          // Verify payment and save player
          const verifyResponse = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              playerData: formData,
            }),
          })

          const result = await verifyResponse.json()

          if (verifyResponse.ok) {
            setPlayerId(result.playerId)
            setIsSuccess(true)
          } else {
            throw new Error(result.error || "Payment verification failed")
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: {
          color: "#d4a574",
        },
      }

      const razorpay = new (window as typeof window & { Razorpay: new (options: typeof options) => { open: () => void } }).Razorpay(options)
      razorpay.open()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-background">
        <TopHeader />
        <Navbar />
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card className="max-w-lg mx-auto bg-card border-border">
              <CardContent className="pt-8 text-center">
                <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Registration Successful!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for registering with TTBCAI. Your registration is confirmed.
                </p>
                {playerId && (
                  <div className="bg-secondary rounded-lg p-4 mb-6">
                    <p className="text-sm text-muted-foreground">Your Registration ID</p>
                    <p className="text-xl font-mono font-bold text-primary">{playerId}</p>
                  </div>
                )}
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to {formData.email}
                </p>
                <Button className="mt-6" onClick={() => window.location.href = "/"}>
                  Back to Home
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <TopHeader />
      <Navbar />

      {/* Hero Section */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Player <span className="text-primary">Registration</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Register now to participate in TTBCAI tournaments across India.
            Registration fee: Rs. {REGISTRATION_FEE}/-
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-2 max-w-md mx-auto">
            {[
              { num: 1, label: "Personal", icon: User },
              { num: 2, label: "Address", icon: MapPin },
              { num: 3, label: "Payment", icon: CreditCard },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    step >= s.num
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  <s.icon className="h-5 w-5" />
                </div>
                <span
                  className={`ml-2 text-sm hidden sm:inline ${
                    step >= s.num ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
                {i < 2 && (
                  <div
                    className={`w-12 h-0.5 mx-2 ${
                      step > s.num ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-8 pb-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">
                {step === 1 && "Personal Details"}
                {step === 2 && "Address Details"}
                {step === 3 && "Payment"}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {step === 1 && "Enter your personal information"}
                {step === 2 && "Enter your address details"}
                {step === 3 && "Complete your registration payment"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="bg-destructive/10 text-destructive p-3 rounded-lg mb-6 text-sm">
                  {error}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-input"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fatherName">Father&apos;s Name *</Label>
                    <Input
                      id="fatherName"
                      name="fatherName"
                      placeholder="Enter your father's name"
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      className="bg-input"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-input"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mobile">Mobile Number *</Label>
                    <Input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="bg-input"
                      maxLength={10}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="state">State *</Label>
                    <Select value={formData.state} onValueChange={handleStateChange}>
                      <SelectTrigger className="bg-input">
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state.id} value={state.name}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="district">District *</Label>
                    <Input
                      id="district"
                      name="district"
                      placeholder="Enter your district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="bg-input"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Full Address *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      placeholder="Enter your complete address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="bg-input resize-none"
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="bg-secondary rounded-lg p-6">
                    <h3 className="font-semibold text-foreground mb-4">Registration Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="text-foreground">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Father&apos;s Name:</span>
                        <span className="text-foreground">{formData.fatherName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="text-foreground">{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mobile:</span>
                        <span className="text-foreground">{formData.mobile}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">State:</span>
                        <span className="text-foreground">{formData.state}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">District:</span>
                        <span className="text-foreground">{formData.district}</span>
                      </div>
                    </div>
                    <div className="border-t border-border mt-4 pt-4">
                      <div className="flex justify-between font-semibold">
                        <span className="text-foreground">Registration Fee:</span>
                        <span className="text-primary">Rs. {REGISTRATION_FEE}/-</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground text-center">
                      Secure payment powered by{" "}
                      <span className="font-semibold text-foreground">Razorpay</span>
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1 bg-transparent"
                    disabled={isLoading}
                  >
                    Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    onClick={handleNext}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handlePayment}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : `Pay Rs. ${REGISTRATION_FEE}`}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
