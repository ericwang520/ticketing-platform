import { TopNavigationBar } from "@/components/top-navigation-bar"
import { BottomNavigationBar } from "@/components/bottom-navigation-bar"
import { TicketCard } from "@/components/ticket-card"
import { HomeBanner } from "@/components/home-banner"

// Mock ticket data
const tickets = [
  {
    id: "1",
    title: "Taipei 101 Observatory",
    price: 17.1,
    image: "/1.png?height=200&width=300",
  },
  {
    id: "2",
    title: "Taipei Palace Museum",
    price: 4.33,
    image: "/2.png?height=200&width=300",
  },
  {
    id: "3",
    title: "Taipei Zoo",
    price: 2.85,
    image: "/3.png?height=200&width=300",
  },
  {
    id: "4",
    title: "Taiwan Museum",
    price: 3.75,
    image: "/4.png?height=200&width=300",
  },
  {
    id: "5",
    title: "Taipei Children's Amusement Park",
    price: 5.62,
    image: "/5.png?height=200&width=300",
  },
  {
    id: "6",
    title: "Taipei Fine Arts Museum",
    price: 0.87,
    image: "/6.png?height=200&width=300",
  },
  {
    id: "7",
    title: "Taipei Sightseeing Bus Hop On Hop Off",
    price: 8.8,
    image: "/7.png?height=200&width=300",
  },
  {
    id: "8",
    title: "Taipei Music Center",
    price: 10.09,
    image: "/8.png?height=200&width=300",
  },
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col pb-16">
      {/* <TopNavigationBar /> */}

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

