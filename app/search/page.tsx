"use client"

import { useState, useEffect } from "react"
import { TopNavigationBar } from "@/components/top-navigation-bar"
import { BottomNavigationBar } from "@/components/bottom-navigation-bar"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, X } from "lucide-react"
import Link from "next/link"

// Mock search results
const searchResults = [
  {
    id: "1",
    title: "Paris Weekend Getaway",
    price: 299,
    image: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "2",
    title: "Tokyo Adventure Pass",
    price: 399,
    image: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "3",
    title: "New York City Explorer",
    price: 249,
    image: "/placeholder.svg?height=80&width=120",
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<typeof searchResults>([])

  // Debounce search function
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setResults([])
      return
    }

    const timer = setTimeout(() => {
      setIsSearching(true)
      // Simulate search delay
      setTimeout(() => {
        setResults(searchResults.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase())))
        setIsSearching(false)
      }, 300)
    }, 500) // 500ms debounce delay

    return () => clearTimeout(timer)
  }, [searchQuery])

  const clearSearch = () => {
    setSearchQuery("")
    setResults([])
  }

  return (
    <main className="flex min-h-screen flex-col pb-safe">
      <TopNavigationBar />

      <div className="flex-1 px-4 py-6 pb-20">
        <h1 className="mb-6 text-2xl font-bold">Search</h1>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search destinations, events..."
              className="pl-10 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {isSearching && <div className="mt-4 text-center text-sm text-muted-foreground">Searching...</div>}
        </div>

        {results.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Search Results</h2>
            {results.map((result) => (
              <Link href={`/tickets/${result.id}`} key={result.id}>
                <Card className="overflow-hidden transition-shadow hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                        <img
                          src={result.image || "/placeholder.svg"}
                          alt={result.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <h3 className="font-medium">{result.title}</h3>
                        <p className="mt-1 text-sm font-semibold">{result.price} USDC</p>
                        <p className="mt-auto text-sm text-muted-foreground">Tap to view details</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : searchQuery && !isSearching ? (
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
          </div>
        ) : (
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">Try searching for destinations, events, or activities</p>
          </div>
        )}
      </div>

      <BottomNavigationBar activeTab="home" />
    </main>
  )
}

