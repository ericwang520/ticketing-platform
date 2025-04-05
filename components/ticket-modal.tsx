"use client"

import type React from "react"

import { useState, useRef } from "react"
import { AppleIcon, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

interface TicketModalProps {
  ticket: {
    id: string
    title: string
    date: string
    ticketType: string
    quantity: number
    voucherNumber: string
    orderNumber: string
    purchaseDate?: string
    name?: string
    price?: number
  }
  onClose: () => void
}

export function TicketModal({ ticket, onClose }: TicketModalProps) {
  const [open, setOpen] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [translateY, setTranslateY] = useState(0)
  const startY = useRef(0)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const currentY = e.touches[0].clientY
    const diff = currentY - startY.current

    // Only allow dragging downward
    if (diff > 0) {
      setTranslateY(diff)
    }
  }

  const handleTouchEnd = () => {
    if (!isDragging) return

    const modalHeight = contentRef.current?.getBoundingClientRect().height || 0

    // Close if dragged down more than 1/3 of the modal height
    if (translateY > modalHeight / 3) {
      handleClose()
    } else {
      // Reset position
      setTranslateY(0)
    }

    setIsDragging(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="bottom"
        className="h-[90vh] overflow-hidden rounded-t-xl px-4 py-6"
        onInteractOutside={handleClose}
        ref={contentRef}
        style={{
          transform: `translateY(${translateY}px)`,
          transition: isDragging ? "none" : "transform 0.3s ease",
        }}
        // onTouchStart={handleTouchStart}
        // onTouchMove={handleTouchMove}
        // onTouchEnd={handleTouchEnd}
      >
        {/* <div className="absolute left-0 right-0 top-0 flex justify-center cursor-grab active:cursor-grabbing">
          <div className="h-1.5 w-16 rounded-full bg-muted-foreground/20 my-2"></div>
        </div> */}

        {/* X button in top right corner */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="absolute right-4 top-4 h-8 w-8 rounded-full bg-gray-100"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="h-full overflow-y-auto pb-6 pt-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">{ticket.title}</h3>
              <p className="text-sm text-muted-foreground">{ticket.date}</p>
            </div>

            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium">
                {ticket.ticketType} × {ticket.quantity}
              </div>

              <div className="my-6 flex justify-center">
                <div className="h-56 w-56 bg-muted flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">QR Code</div>
                    <div className="mt-2 h-40 w-40 border-2 border-dashed border-muted-foreground mx-auto"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="font-medium">Voucher Number:</div>
                <div className="rounded-md bg-muted p-2 text-xs break-all font-mono">{ticket.voucherNumber}</div>
              </div>

              <Button className="mt-4 w-full" variant="outline">
                <AppleIcon className="mr-2 h-4 w-4" />
                Add to Apple Wallet
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden bg-gray-50">
              <div className="p-4">
                <h4 className="font-medium">Voucher Type</h4>
                <Separator className="my-2" />
                <p className="text-sm">Show digital ticket with ID</p>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden bg-gray-50">
              <div className="p-4">
                <h4 className="font-medium">How to Redeem</h4>
                <Separator className="my-2" />
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <Check className="mr-2 h-4 w-4 text-gray-700 mt-0.5 flex-shrink-0" />
                    <span>Present this digital ticket at the entrance</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-4 w-4 text-gray-700 mt-0.5 flex-shrink-0" />
                    <span>Show your ID that matches the ticket name</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-4 w-4 text-gray-700 mt-0.5 flex-shrink-0" />
                    <span>Arrive at least 30 minutes before your scheduled time</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-4 w-4 text-gray-700 mt-0.5 flex-shrink-0" />
                    <span>Follow the signs to the designated entrance area</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-4 w-4 text-gray-700 mt-0.5 flex-shrink-0" />
                    <span>Keep your ticket accessible on your phone throughout your visit</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Full Details Section */}
            <div className="border rounded-lg overflow-hidden bg-gray-50">
              <div className="p-4">
                <h3 className="text-lg font-medium mb-4">Full Details</h3>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Order Information</h4>
                  <Separator className="my-2" />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm">Order Number:</div>
                    <div className="text-sm font-medium">{ticket.orderNumber}</div>

                    <div className="text-sm">Purchase Date:</div>
                    <div className="text-sm font-medium">{ticket.purchaseDate || "Apr 2, 2025"}</div>

                    <div className="text-sm">Name:</div>
                    <div className="text-sm font-medium">{ticket.name || "John Doe"}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Ticket Information</h4>
                  <Separator className="my-2" />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm">Ticket Type:</div>
                    <div className="text-sm font-medium">{ticket.ticketType}</div>

                    <div className="text-sm">Quantity:</div>
                    <div className="text-sm font-medium">{ticket.quantity}</div>

                    <div className="text-sm">Travel Date:</div>
                    <div className="text-sm font-medium">{ticket.date}</div>

                    <div className="text-sm">Voucher Number:</div>
                    <div className="text-sm font-medium break-all">{ticket.voucherNumber}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Payment Information</h4>
                  <Separator className="my-2" />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm">Price per Ticket:</div>
                    <div className="text-sm font-medium">{ticket.price || 299} USDC</div>

                    <div className="text-sm">Total Price:</div>
                    <div className="text-sm font-medium">{(ticket.price || 299) * ticket.quantity} USDC</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

