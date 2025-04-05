import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface TicketCardProps {
  id: string
  title: string
  price: number
  image: string
}

export function TicketCard({ id, title, price, image }: TicketCardProps) {
  return (
    <Link href={`/tickets/${id}`} className="block h-full">
      <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-[3/2] w-full overflow-hidden">
          <img src={image || "/placeholder.svg"} alt={title} className="h-full w-full object-cover" />
        </div>
        <CardContent className="flex-grow p-3">
          <h3 className="line-clamp-2 font-medium">{title}</h3>
          <p className="mt-1 font-semibold">{price} USDC</p>
        </CardContent>
        <CardFooter className="p-3 pt-0">
          <Button className="w-full" size="sm">
            Buy Now
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

