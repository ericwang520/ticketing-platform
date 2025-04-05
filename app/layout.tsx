import type { Metadata } from 'next'
import type { Viewport } from 'next'
import './globals.css'
 
export function generateViewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
  }
}

export const metadata: Metadata = {
  title: 'Ticketo',
  description: 'Ticketo is a platform for buying and selling tickets.',
  generator: 'Ticketo',
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
