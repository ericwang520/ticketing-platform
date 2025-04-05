"use client"

import Link from "next/link"
import { BottomNavigationBar } from "@/components/bottom-navigation-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, Info, MapPin, AlertTriangle, Ticket, Plane, ChevronRight } from "lucide-react"
import handlePay from "@/lib/sendPayment"
import { useState } from "react"

const ticketsData = [
  {
    id: "1",
    title: "Taipei 101 Observatory",
    description:
      "Ascend to the 89th floor of Taipei 101 for a breathtaking 360° view of the city skyline. Explore features like the world's fastest elevator, the tuned mass damper, themed exhibits, and the Sky Garden on the 101st floor.",
    location: "Taipei, Taiwan",
    date: "Open Daily, 9:00 AM – 10:00 PM (Last admission 9:15 PM)",
    duration: "Recommended duration: 2–4 hours",
    image: "/1.png?height=400&width=800",
    ticketTypes: [
      { type: "Standard Admission (89F)", price: 18.22 },
      { type: "Fast Track + 89F Access", price: 34.59 },
      { type: "89F + Skyline Experience", price: 88.03 },
      { type: "89F + 101F Access", price: 28.26 }
    ],
    importantInfo: [
      "Last entry at 9:15 PM",
      "Skyline Experience has height and health restrictions",
      "Fast track & gift combo tickets require redemption at the counter",
      "Tickets for 101F access are limited and for non-Taiwan residents",
      "Dining packages and combo tours available"
    ],
    cancellationPolicy:
      "Many tickets offer anytime cancellation. Some promotional or combo packages may be non-refundable. Check individual ticket terms before booking.",
    includedItems: [
      "Access to the 89th floor indoor observatory",
      "Access to the tuned mass damper area",
      "Fast elevator ride (~37 seconds)",
      "Skyline or 101F access (ticket dependent)",
      "Optional gifts (e.g., EasyCard or vouchers)"
    ],
    additionalNotes:
      "Photography is allowed; tripods may be restricted. The Skyline experience is weather dependent. The 101st floor is occasionally closed for events."
  },
  {
    id: "2",
    title: "Taipei Palace Museum",
    description:
      "Explore over 600,000 artifacts of Chinese imperial history at the world-renowned Taipei Palace Museum. See iconic treasures like the Jadeite Cabbage and the Meat-Shaped Stone in a beautifully curated space.",
    location: "Taipei, Taiwan",
    date: "Open Daily, 9:00 AM – 5:00 PM (Last entry 4:30 PM)",
    duration: "Recommended duration: Half-day to full-day",
    image: "/2.png?height=400&width=800",
    ticketTypes: [
      { type: "Adult (Taiwan Residents)", price: 4.33 },
      { type: "Adult (Non-Taiwan Residents)", price: 9.50 },
      { type: "Admission + Audio Guide", price: 12.39 },
      { type: "Admission + Guided Tour", price: 41.23 }
    ],
    importantInfo: [
      "Free entry for travelers under 18 years old",
      "Audio guides and guided tours available in multiple languages",
      "Silks Palace restaurant may close early",
      "Some tickets include gifts or vouchers",
      "Valid ID required for residency-based tickets"
    ],
    cancellationPolicy:
      "Most tickets are eligible for anytime cancellation. Dining packages and some tours may be non-refundable.",
    includedItems: [
      "General admission to the museum",
      "Access to permanent and some special exhibitions",
      "Optional audio guide or guided tour (depending on ticket)",
      "Digital voucher—no need to redeem on-site"
    ],
    additionalNotes:
      "Visitors are encouraged to reserve enough time to explore. Photography is allowed in most areas but flash is prohibited. Nearby attractions include Shung Ye Museum and Chiang Kai-Shek Shilin Residence."
  },
  {
    id: "3",
    title: "Taipei Zoo Adventure",
    description: "Explore the largest zoo in Southeast Asia, home to over 400 species including giant pandas, koalas, and penguins. Enjoy a fun-filled day ideal for families and animal lovers.",
    location: "Taipei, Taiwan",
    date: "Valid within 365 days",
    duration: "2-3 hours recommended",
    image: "/3.png?height=400&width=800",
    ticketTypes: [
      { "type": "Adult (18-64)", "price": 2.85 },
      { "type": "Concession (6-11, students, volunteers)", "price": 1.52 },
      { "type": "Family (1 adult + 1 child)", "price": 4.38 },
      { "type": "Zoo + Gondola 1-Day Pass", "price": 11.51 },
      { "type": "Zoo + Sightseeing Bus + Taipei 101", "price": 27.47 }
    ],
    importantInfo: [
      "Immediate access - no ticket redemption required",
      "Valid for 365 days from booking",
      "Children under 6 may be eligible for free or discounted entry",
      "Stroller and wheelchair rental available",
      "Luggage storage and baby care room on site"
    ],
    cancellationPolicy: "Anytime cancellation available for most ticket types. Some combo tickets are non-refundable.",
    includedItems: [
      "Taipei Zoo admission",
      "Access to various animal exhibition areas",
      "On-site map and water fountains",
    ],
    additionalNotes: "Weekdays can still be crowded. Wear comfortable shoes for walking. Best to visit on cooler days. Bring an umbrella in case of rain."
  },
  {
    id: "4",
    title: "Taiwan Museum",
    description: "Discover Taiwan's rich natural and cultural heritage through a journey across multiple branches of the Taiwan Museum. Visit the Main Hall, Paleontology Museum, South Gate Museum, and the Ministry of Railways Park with one ticket.",
    location: "Taipei, Taiwan",
    date: "December 31, 2030",
    duration: "Recommended sightseeing time: 2–4 hours",
    image: "/4.png?height=400&width=800",
    ticketTypes: [
      { type: "Combo Ticket (All Branches)", price: 3.75 },
      { type: "Standard Adult (Valid 90 Days)", price: 3.99 },
      { type: "Standard Adult (Valid 365 Days)", price: 3.79 },
      { type: "Miniatures + Contemporary + Taiwan Museum Combo", price: 7.50 },
      { type: "Miniatures + Contemporary + Taiwan Museum Combo (Non-refundable)", price: 9.26 }
    ],
    importantInfo: [
      "Includes Main Museum, Paleontology Museum, South Gate Museum, and Railways Park",
      "Valid ID may be required for verification",
      "Tickets are digital and require no redemption on-site",
      "Children under 13 may have free or discounted admission",
      "Accessibility features available at most venues"
    ],
    cancellationPolicy: "Some tickets are eligible for anytime cancellation. Others, including discounted and promotional tickets, may be non-refundable.",
    includedItems: [
      "Admission to four museum branches",
      "Permanent and rotating exhibitions access",
      "Digital entry without ticket redemption",
      "Multilingual exhibit information available",
      "Access to historical architecture and themed displays"
    ],
    additionalNotes: "Main Hall features neoclassical architecture with stained-glass skylight. Combo tickets offer flexible use across days. Ideal for families and history enthusiasts."
  },
  {
    id: "5",
    title: "Taipei Children's Amusement Park",
    description: "Enjoy a fun-filled day with your family at Taipei Children's Amusement Park. With a wide variety of rides, interactive zones, and combo packages including museums and science centers, it's a perfect destination for children and parents alike.",
    location: "Taipei, Taiwan",
    date: "Valid within 365 days",
    duration: "Recommended sightseeing time: 3–4 hours",
    image: "/5.png?height=400&width=800",
    ticketTypes: [
      { type: "One-Day Fun Ticket (Individual)", price: 5.62 },
      { type: "One-Day Fun Ticket (2 Persons)", price: 11.23 },
      { type: "One-Day Fun Ticket (3 Persons)", price: 16.85 },
      { type: "Combo: Park + Astronomical Museum (Adult)", price: 6.38 },
      { type: "Combo: Park + Science Education Center (Adult)", price: 7.59 },
      { type: "XR Reality Park Package (MR/VR/AR)", price: 3.61 }
    ],
    importantInfo: [
      "Immediate access — some tickets require redemption on-site",
      "Valid for travelers aged 2 and up",
      "Combo tickets include access to nearby museums",
      "XR experiences have age restrictions (12+ for MR/VR, 3+ for AR)",
      "Smartphone required for AR games"
    ],
    cancellationPolicy: "Anytime cancellation available for most ticket types. Please verify refund policies for combo or special packages.",
    includedItems: [
      "Amusement park entry and access to rides",
      "Optional museum or XR combo add-ons",
      "Immediate ticket delivery",
      "Family-friendly amenities and stroller accessibility",
      "Interactive zones and themed entertainment"
    ],
    additionalNotes: "Great for weekend family trips. Some rides may have height or age restrictions. Nearby attractions include the Astronomical Museum and Science Education Center."
  },
  {
    id: "6",
    title: "Taipei Fine Arts Museum",
    description: "Explore Taiwan’s premier art museum featuring rotating exhibitions of modern and contemporary works from Taiwan and around the world. A must-visit for art lovers seeking inspiration in Taipei.",
    location: "Taipei, Taiwan",
    date: "Valid within 365 days",
    duration: "Recommended sightseeing time: 2–4 hours",
    image: "/6.png?height=400&width=800",
    ticketTypes: [
      { type: "Adult (12–64)", price: 0.87 },
      { type: "Concession (Students, Children 6–12, Volunteers)", price: 0.43 },
      { type: "Concession (Taipei Citizens)", price: 0.43 },
      { type: "Taipei Palace Museum Combo (Free TFAM Ticket)", price: 10.09 },
      { type: "Ju Ming Museum Combo (Free TFAM Ticket)", price: 8.50 }
    ],
    importantInfo: [
      "Immediate access — no ticket redemption required",
      "Free entry for Aboriginal elders aged 55–64 registered in Taipei City",
      "Concession tickets require valid ID or student/volunteer certification",
      "Combo tickets include entry to other museums (e.g., Palace or Ju Ming Museum)",
      "Exhibits rotate frequently — check online for current highlights"
    ],
    cancellationPolicy: "Anytime cancellation available. Discount or combo tickets may have specific terms.",
    includedItems: [
      "Admission to all current exhibitions",
      "Access to permanent and special exhibits",
      "Free use of lockers and public amenities",
      "Free entry included in certain combo tickets",
      "Panoramic views of nearby riverside park and arts district"
    ],
    additionalNotes: "Located in Taipei's Zhongshan District, near the Yuanshan MRT station. Ideal for a half-day art-focused itinerary. Exhibits change seasonally."
  },
  {
    id: "7",
    title: "Taipei Sightseeing Bus Hop On Hop Off",
    description: "Discover Taipei with ultimate flexibility aboard the Hop-On Hop-Off sightseeing bus. Enjoy panoramic views from the open-top deck and explore popular landmarks like Taipei 101, Palace Museum, and Chiang Kai-Shek Memorial Hall.",
    location: "Taipei, Taiwan",
    date: "Valid within 365 days",
    duration: "Recommended sightseeing time: 4–48 hours",
    image: "/7.png?height=400&width=800",
    ticketTypes: [
      { type: "Standard Ticket (Adult)", price: 8.80 },
      { type: "Bus + Palace Museum Combo (Adult, Non-TW Resident)", price: 14.39 },
      { type: "Bus + Palace Museum Combo (Premium, Non-Refundable)", price: 17.60 },
      { type: "Bus + Palace + Shilin Residence Combo", price: 19.76 }
    ],
    importantInfo: [
      "Immediate access — no ticket redemption required",
      "Valid for travelers aged 12–64 and 115 cm or taller",
      "Unlimited rides within ticket validity period",
      "Children and seniors must buy discounted tickets on-site",
      "Combo tickets include entry to top cultural attractions"
    ],
    cancellationPolicy: "Standard tickets allow conditional cancellation. Some combo tickets are non-refundable.",
    includedItems: [
      "Access to red and blue sightseeing bus lines",
      "Unlimited hop-on and hop-off rides",
      "Scenic open-top second floor seating",
      "Combo packages include Palace Museum and/or Shilin Residence tickets",
      "Multilingual audio guide onboard"
    ],
    additionalNotes: "Boarding starts at Taipei Main Station. Buses run every 30–60 minutes. Great for first-time visitors who want to explore Taipei at their own pace."
  },
  {
    id: "8",
    title: "Taipei Music Center",
    description: "Dive into Taiwan’s rich pop music culture at the Taipei Music Center. Explore interactive exhibitions, discover iconic artists and performances, and enjoy the modern architecture designed to celebrate music in all forms.",
    location: "Taipei, Taiwan",
    date: "Valid within 365 days",
    duration: "Recommended sightseeing time: 3–4 hours",
    image: "/8.png?height=400&width=800",
    ticketTypes: [
      { type: "Adult (7–64)", price: 10.09 },
      { type: "Senior (65+)", price: 5.05 },
      { type: "Concession (Student, Local Resident)", price: 9.23 },
      { type: "Exhibition Ticket + Drink Voucher", price: 11.50 }
    ],
    importantInfo: [
      "Immediate access — no ticket redemption required",
      "Valid ID required for concession and senior tickets",
      "Exhibitions include immersive multimedia and audio-visual experiences",
      "Drink voucher includes selection of 1 from 3 classic drinks",
      "Located near Nangang and Neihu districts"
    ],
    cancellationPolicy: "Anytime cancellation available. Full refund if cancelled before activation.",
    includedItems: [
      "Admission to 'Sing Our Song – Pop Music Stories' Exhibition",
      "Interactive exhibits and cultural displays",
      "Optional drink voucher (if selected)",
      "Use of on-site amenities",
      "Architectural highlights including forum-inspired design"
    ],
    additionalNotes: "A hotspot for pop culture lovers and music enthusiasts. Combine this with nearby Nangang software park or Taipei 101 for a full-day city tour."
  }
]

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  // Find the ticket data based on the ID
  const ticket = ticketsData.find((t) => t.id === params.id) || ticketsData[0]
  const [selectedTicketIndex, setSelectedTicketIndex] = useState(0)

  return (
    <main className="flex min-h-screen flex-col pb-safe">
      {/* <TopNavigationBar /> */}

      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={ticket.image || "/placeholder.svg"}
          alt={ticket.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-4 top-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="bg-white/80 backdrop-blur-sm">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main content with padding at the bottom for the fixed button */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-28">
        <h1 className="mb-2 text-2xl font-bold">{ticket.title}</h1>

        <div className="mb-4 flex flex-wrap gap-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{ticket.location}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{ticket.date}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{ticket.duration}</span>
          </div>
        </div>

        <p className="mb-6 text-muted-foreground">{ticket.description}</p>

        <h2 className="mb-4 text-xl font-semibold">Ticket Options</h2>

        <div className="mb-6 space-y-4">
          {ticket.ticketTypes.map((ticketType, index) => (
            <Card
              key={index}
              onClick={() => setSelectedTicketIndex(index)}
              className={selectedTicketIndex === index ? "border-blue-500 bg-blue-50" : "cursor-pointer"}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium break-words">{ticketType.type}</h3>
                  </div>
                  <p className="font-semibold whitespace-nowrap">{ticketType.price} USDC</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-8 border rounded-lg overflow-hidden bg-gray-50">
          {/* Important Information */}
          <div className="border-b">
            <button
              className="w-full flex items-center justify-between p-4 text-left font-medium"
              onClick={() => document.getElementById("important-info")?.classList.toggle("hidden")}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Important Information</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </button>
            <div id="important-info" className="hidden px-4 pb-4">
              <ul className="ml-6 list-disc space-y-1 text-sm text-muted-foreground">
                {ticket.importantInfo.map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* What's Included */}
          <div className="border-b">
            <button
              className="w-full flex items-center justify-between p-4 text-left font-medium"
              onClick={() => document.getElementById("whats-included")?.classList.toggle("hidden")}
            >
              <div className="flex items-center gap-2">
                <Ticket className="h-4 w-4" />
                <span>What's Included</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </button>
            <div id="whats-included" className="hidden px-4 pb-4">
              <ul className="ml-6 list-disc space-y-1 text-sm text-muted-foreground">
                {ticket.includedItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="border-b">
            <button
              className="w-full flex items-center justify-between p-4 text-left font-medium"
              onClick={() => document.getElementById("cancellation-policy")?.classList.toggle("hidden")}
            >
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span>Cancellation Policy</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </button>
            <div id="cancellation-policy" className="hidden px-4 pb-4">
              <p className="text-sm text-muted-foreground">{ticket.cancellationPolicy}</p>
            </div>
          </div>

          {/* Travel Notes */}
          <div>
            <button
              className="w-full flex items-center justify-between p-4 text-left font-medium"
              onClick={() => document.getElementById("travel-notes")?.classList.toggle("hidden")}
            >
              <div className="flex items-center gap-2">
                <Plane className="h-4 w-4" />
                <span>Travel Notes</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </button>
            <div id="travel-notes" className="hidden px-4 pb-4">
              <p className="text-sm text-muted-foreground">{ticket.additionalNotes}</p>
            </div>
          </div>
        </div>
     
       <Button
         className="w-full"
         size="lg"
         onClick={() => {
           const pricing = ticket.ticketTypes[selectedTicketIndex].price
           console.log("Selected pricing:", pricing)
           handlePay()
         }}
       >
         Buy Now
       </Button>
     

      </div>


      <BottomNavigationBar activeTab="home" />
    </main>
  )
}

