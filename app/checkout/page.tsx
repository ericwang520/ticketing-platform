"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Check, CreditCard, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock event data
const eventData = {
  id: "1",
  title: "Summer Music Festival",
  ticketTiers: [
    { id: "general", name: "General Admission", price: 150 },
    { id: "vip", name: "VIP Access", price: 300 },
    { id: "premium", name: "Premium Package", price: 500 },
  ],
}

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const ticketsParam = searchParams.get("tickets")
  const eventId = searchParams.get("eventId")

  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>(
    ticketsParam ? JSON.parse(ticketsParam) : { general: 0, vip: 0, premium: 0 },
  )

  const [paymentMethod, setPaymentMethod] = useState("usdc")
  const [isConnecting, setIsConnecting] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })

  const totalAmount = eventData.ticketTiers.reduce((sum, tier) => sum + tier.price * (selectedTickets[tier.id] || 0), 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const connectWallet = () => {
    setIsConnecting(true)
    // Simulate wallet connection
    setTimeout(() => {
      setIsWalletConnected(true)
      setIsConnecting(false)
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      router.push("/confirmation")
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold">Checkout</h1>

        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-5 w-5" />
            </div>
            <Separator className="w-12" />
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-sm font-medium">2</span>
            </div>
            <Separator className="w-12" />
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-muted-foreground bg-background text-muted-foreground">
              <span className="text-sm font-medium">3</span>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span>Select Tickets</span>
            <span className="mx-8">Payment</span>
            <span>Confirmation</span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>Please enter your details</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose how you want to pay</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  defaultValue="usdc"
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="usdc" id="usdc" />
                    <Label htmlFor="usdc" className="flex flex-1 items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Pay with USDC
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="worldcoin" id="worldcoin" />
                    <Label htmlFor="worldcoin" className="flex flex-1 items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-gray-200" />
                      Pay with Worldcoin
                    </Label>
                  </div>
                </RadioGroup>

                <div className="mt-6">
                  <Tabs defaultValue="metamask" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="metamask">MetaMask</TabsTrigger>
                      <TabsTrigger value="walletconnect">WalletConnect</TabsTrigger>
                    </TabsList>
                    <TabsContent value="metamask" className="mt-4">
                      {isWalletConnected ? (
                        <div className="rounded-md border border-green-200 bg-green-50 p-4 text-green-800">
                          <div className="flex items-center gap-2">
                            <Check className="h-5 w-5" />
                            <span>Wallet connected: 0x1a2...3b4c</span>
                          </div>
                        </div>
                      ) : (
                        <Button onClick={connectWallet} className="w-full" disabled={isConnecting}>
                          {isConnecting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Connecting...
                            </>
                          ) : (
                            "Connect MetaMask"
                          )}
                        </Button>
                      )}
                    </TabsContent>
                    <TabsContent value="walletconnect" className="mt-4">
                      {isWalletConnected ? (
                        <div className="rounded-md border border-green-200 bg-green-50 p-4 text-green-800">
                          <div className="flex items-center gap-2">
                            <Check className="h-5 w-5" />
                            <span>Wallet connected: 0x1a2...3b4c</span>
                          </div>
                        </div>
                      ) : (
                        <Button onClick={connectWallet} className="w-full" disabled={isConnecting}>
                          {isConnecting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Connecting...
                            </>
                          ) : (
                            "Connect with WalletConnect"
                          )}
                        </Button>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">{eventData.title}</h3>
                  {eventData.ticketTiers.map((tier) => {
                    const quantity = selectedTickets[tier.id] || 0
                    if (quantity === 0) return null
                    return (
                      <div key={tier.id} className="mt-2 flex justify-between text-sm">
                        <span>
                          {tier.name} x {quantity}
                        </span>
                        <span>{tier.price * quantity} USDC</span>
                      </div>
                    )
                  })}
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{totalAmount} USDC</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={!isWalletConnected || !formData.name || !formData.email || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay ${totalAmount} USDC`
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

