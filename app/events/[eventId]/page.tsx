"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarDays, Clock, MapPin, Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock event data
const eventData = {
  id: "1",
  title: "Summer Music Festival",
  date: "July 15-17, 2025",
  time: "12:00 PM - 11:00 PM",
  location: "Central Park, New York",
  image: "/placeholder.svg?height=400&width=800",
  description:
    "Join us for three days of amazing music across five stages featuring over 100 artists. Experience the best in indie, electronic, hip-hop, and rock music in the heart of New York City.",
  ticketTiers: [
    {
      id: "general",
      name: "General Admission",
      price: 150,
      description: "Access to all general areas and performances",
    },
    {
      id: "vip",
      name: "VIP Access",
      price: 300,
      description: "Premium viewing areas, exclusive lounges, and complimentary refreshments",
    },
    {
      id: "premium",
      name: "Premium Package",
      price: 500,
      description: "All VIP benefits plus backstage tours and artist meet & greets",
    },
  ],
}

export default function EventPage({ params }: { params: { eventId: string } }) {
  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({
    general: 0,
    vip: 0,
    premium: 0,
  })

  const incrementTicket = (tierId: string) => {
    setSelectedTickets((prev) => ({
      ...prev,
      [tierId]: prev[tierId] + 1,
    }))
  }

  const decrementTicket = (tierId: string) => {
    if (selectedTickets[tierId] > 0) {
      setSelectedTickets((prev) => ({
        ...prev,
        [tierId]: prev[tierId] - 1,
      }))
    }
  }

  const totalTickets = Object.values(selectedTickets).reduce((sum, count) => sum + count, 0)
  const totalAmount = eventData.ticketTiers.reduce((sum, tier) => sum + tier.price * (selectedTickets[tier.id] || 0), 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="mb-6 inline-block text-sm hover:underline">
        ← Back to events
      </Link>

      <div className="mb-8 overflow-hidden rounded-lg">
        <img src={eventData.image || "/placeholder.svg"} alt={eventData.title} className="w-full object-cover" />
      </div>

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">{eventData.title}</h1>
        <div className="mb-4 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>{eventData.date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{eventData.time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{eventData.location}</span>
          </div>
        </div>
        <p className="text-muted-foreground">{eventData.description}</p>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Select Tickets</h2>
        <div className="space-y-4">
          {eventData.ticketTiers.map((tier) => (
            <Card key={tier.id}>
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">{tier.description}</p>
                  <p className="font-semibold">{tier.price} USDC</p>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => decrementTicket(tier.id)}
                    disabled={selectedTickets[tier.id] === 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span>{selectedTickets[tier.id]}</span>
                  <Button variant="outline" size="icon" onClick={() => incrementTicket(tier.id)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 border-t bg-background p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              {totalTickets} {totalTickets === 1 ? "ticket" : "tickets"}
            </p>
            <p className="text-xl font-bold">{totalAmount} USDC</p>
          </div>
          <Link
            href={`/checkout?tickets=${encodeURIComponent(JSON.stringify(selectedTickets))}&eventId=${params.eventId}`}
          >
            <Button size="lg" disabled={totalTickets === 0}>
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

