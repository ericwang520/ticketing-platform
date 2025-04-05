export function HomeBanner() {
  return (
    <div className="relative h-64 w-full overflow-hidden">
      <img
        src="/home_banner.jpg?height=400&width=800"
        alt="Travel Banner"
        className="h-full w-full object-cover "
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-black/20 p-6 flex flex-col justify-end">
        <h1 className="text-2xl font-bold text-white md:text-3xl">Start your journey today.</h1>
        <p className="text-white/90 mt-2 max-w-md">Explore the world with just one ticket.</p>
      </div>
    </div>
  )
}

