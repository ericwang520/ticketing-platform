import Link from "next/link"
import { Search, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TopNavigationBar() {
  return (
    <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 shadow-md">
      <Link href="/" className="text-lg font-bold">
        TicketApp
      </Link>
      {/* <div className="flex items-center gap-2">
        <Link href="/search">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Search className="h-5 w-5" />
          </Button>
        </Link>
        <Link href="/cart" className="relative">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
              2
            </span>
          </Button>
        </Link>
      </div> */}
    </div>
  )
}

