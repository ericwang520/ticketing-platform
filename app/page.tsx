import { TopNavigationBar } from "@/components/top-navigation-bar"
import { BottomNavigationBar } from "@/components/bottom-navigation-bar"
import { TicketCard } from "@/components/ticket-card"
import { HomeBanner } from "@/components/home-banner"

// Mock ticket data
const tickets = [
  {
    id: "1",
    title: "Paris Weekend Getaway",
    price: 299,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Tokyo Adventure Pass",
    price: 399,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "New York City Explorer",
    price: 249,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    title: "Bali Beach Retreat",
    price: 349,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "5",
    title: "London Cultural Tour",
    price: 279,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "6",
    title: "Rome Historical Pass",
    price: 229,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "7",
    title: "Sydney Harbor Cruise",
    price: 189,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "8",
    title: "Dubai Desert Safari",
    price: 319,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col pb-16">
      <TopNavigationBar />

      <HomeBanner />

      <div className="flex-1 px-4 py-6">
        <h2 className="mb-4 text-xl font-semibold">Popular Destinations</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {tickets.slice(0, 4).map((ticket) => (
            <TicketCard key={ticket.id} id={ticket.id} title={ticket.title} price={ticket.price} image={ticket.image} />
          ))}
        </div>

        <h2 className="mb-4 mt-8 text-xl font-semibold">Trending Destinations</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {tickets.slice(4, 8).map((ticket) => (
            <TicketCard key={ticket.id} id={ticket.id} title={ticket.title} price={ticket.price} image={ticket.image} />
          ))}
        </div>
      </div>

      <BottomNavigationBar activeTab="home" />
    
    </main>

  )
}

