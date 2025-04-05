"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Mock ticket data
const ticketData = {
  id: "TIX-12345-6789",
  eventName: "Summer Music Festival",
  date: "July 15-17, 2025",
  location: "Central Park, New York",
  ticketType: "VIP Access",
  attendeeName: "John Doe",
}

export default function ConfirmationPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Simple QR code simulation (just a placeholder pattern)
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, 200, 200)

        const cellSize = 10
        const gridSize = 20

        ctx.fillStyle = "black"

        // Create a simple pattern (not a real QR code)
        for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridSize; j++) {
            // Create a deterministic but random-looking pattern based on ticket ID
            const shouldFill = (i * j + i + j * 3) % 3 === 0 || (i === 0 && j < 7) || (j === 0 && i < 7)
            if (shouldFill) {
              ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
            }
          }
        }

        // Add position detection patterns (the three squares in corners)
        // Top-left
        ctx.fillRect(0, 0, 7 * cellSize, 7 * cellSize)
        ctx.fillStyle = "white"
        ctx.fillRect(cellSize, cellSize, 5 * cellSize, 5 * cellSize)
        ctx.fillStyle = "black"
        ctx.fillRect(2 * cellSize, 2 * cellSize, 3 * cellSize, 3 * cellSize)

        // Top-right
        ctx.fillStyle = "black"
        ctx.fillRect(13 * cellSize, 0, 7 * cellSize, 7 * cellSize)
        ctx.fillStyle = "white"
        ctx.fillRect(14 * cellSize, cellSize, 5 * cellSize, 5 * cellSize)
        ctx.fillStyle = "black"
        ctx.fillRect(15 * cellSize, 2 * cellSize, 3 * cellSize, 3 * cellSize)

        // Bottom-left
        ctx.fillStyle = "black"
        ctx.fillRect(0, 13 * cellSize, 7 * cellSize, 7 * cellSize)
        ctx.fillStyle = "white"
        ctx.fillRect(cellSize, 14 * cellSize, 5 * cellSize, 5 * cellSize)
        ctx.fillStyle = "black"
        ctx.fillRect(2 * cellSize, 15 * cellSize, 3 * cellSize, 3 * cellSize)
      }
    }
  }, [])

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <Check className="h-10 w-10 text-green-600" />
      </div>

      <h1 className="mb-2 text-center text-3xl font-bold">Thank You for Your Purchase!</h1>
      <p className="mb-8 text-center text-muted-foreground">Your tickets have been confirmed and sent to your email.</p>

      <Card className="mx-auto max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Your Ticket</CardTitle>
          <CardDescription>Present this QR code at the event entrance</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="mb-6 rounded-lg border p-4">
            <canvas ref={canvasRef} width={200} height={200} className="mx-auto" />
          </div>

          <div className="w-full space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Ticket ID</p>
              <p className="font-medium">{ticketData.id}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Event</p>
              <p className="font-medium">{ticketData.eventName}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">{ticketData.date}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{ticketData.location}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Ticket Type</p>
              <p className="font-medium">{ticketData.ticketType}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Attendee</p>
              <p className="font-medium">{ticketData.attendeeName}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" variant="outline">
            Download Ticket
          </Button>
          <Link href="/" className="w-full">
            <Button className="w-full">Back to Events</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

