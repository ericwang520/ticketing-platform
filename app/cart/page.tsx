import { TopNavigationBar } from "@/components/top-navigation-bar"
import { BottomNavigationBar } from "@/components/bottom-navigation-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2 } from "lucide-react"

// Mock cart data
const cartItems = [
  {
    id: "1",
    title: "Disneyland 1-Day Pass",
    price: 149,
    quantity: 2,
    image: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "3",
    title: "Six Flags Season Pass",
    price: 129,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=120",
  },
]

export default function CartPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  return (
    <main className="flex min-h-screen flex-col pb-16">
      <TopNavigationBar />

      <div className="flex-1 px-4 py-6">
        <h1 className="mb-6 text-2xl font-bold">Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.price} USDC</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="h-7 w-7">
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center">{item.quantity}</span>
                            <Button variant="outline" size="icon" className="h-7 w-7">
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 rounded-lg bg-white p-4 shadow-sm">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} USDC</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Tax</span>
                <span>{tax.toFixed(2)} USDC</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between py-2 font-medium">
                <span>Total</span>
                <span>{total.toFixed(2)} USDC</span>
              </div>
              <Button className="mt-4 w-full">Proceed to Checkout</Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-8 text-center">
            <div className="mb-4 rounded-full bg-muted-foreground/20 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-muted-foreground"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-sm text-muted-foreground">Looks like you haven't added any tickets yet.</p>
            <Button className="mt-4">Browse Tickets</Button>
          </div>
        )}
      </div>

      <BottomNavigationBar activeTab="home" />
    </main>
  )
}

