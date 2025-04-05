import Link from "next/link"
import { TopNavigationBar } from "@/components/top-navigation-bar"
import { BottomNavigationBar } from "@/components/bottom-navigation-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft } from "lucide-react"

// Mock ticket data
const ticketData = {
  id: "T12345",
  title: "Paris Weekend Getaway",
  date: "May 15-17, 2025",
  ticketType: "Adult",
  quantity: 2,
  status: "active",
  voucherNumber: "PRSW-2025-05-15-ABC123XYZ",
  orderNumber: "ORD-98765",
  purchaseDate: "Apr 2, 2025",
  name: "John Doe",
  price: 299,
}

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="flex min-h-screen flex-col pb-16">
      <TopNavigationBar />

      <div className="flex-1 px-4 py-6">
        <div className="mb-6 flex items-center">
          <Link href="/order" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Ticket Details</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{ticketData.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Order Information</h3>
              <Separator className="my-2" />
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm">Order Number:</div>
                <div className="text-sm font-medium">{ticketData.orderNumber}</div>

                <div className="text-sm">Purchase Date:</div>
                <div className="text-sm font-medium">{ticketData.purchaseDate}</div>

                <div className="text-sm">Name:</div>
                <div className="text-sm font-medium">{ticketData.name}</div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Ticket Information</h3>
              <Separator className="my-2" />
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm">Ticket Type:</div>
                <div className="text-sm font-medium">{ticketData.ticketType}</div>

                <div className="text-sm">Quantity:</div>
                <div className="text-sm font-medium">{ticketData.quantity}</div>

                <div className="text-sm">Travel Date:</div>
                <div className="text-sm font-medium">{ticketData.date}</div>

                <div className="text-sm">Voucher Number:</div>
                <div className="text-sm font-medium break-all">{ticketData.voucherNumber}</div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Payment Information</h3>
              <Separator className="my-2" />
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm">Price per Ticket:</div>
                <div className="text-sm font-medium">{ticketData.price} USDC</div>

                <div className="text-sm">Total Price:</div>
                <div className="text-sm font-medium">{ticketData.price * ticketData.quantity} USDC</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigationBar activeTab="order" />
    </main>
  )
}

