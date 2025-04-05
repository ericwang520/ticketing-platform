"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

interface WalletConnectButtonProps {
  provider: "metamask" | "walletconnect" | "worldcoin"
  onConnect: (address: string) => void
}

export function WalletConnectButton({ provider, onConnect }: WalletConnectButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = () => {
    setIsConnecting(true)

    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false)
      // Mock wallet address
      onConnect("0x1a2b3c4d5e6f7g8h9i0j")
    }, 1500)
  }

  const getButtonText = () => {
    if (isConnecting) return "Connecting..."

    switch (provider) {
      case "metamask":
        return "Connect MetaMask"
      case "walletconnect":
        return "Connect with WalletConnect"
      case "worldcoin":
        return "Connect World App"
      default:
        return "Connect Wallet"
    }
  }

  return (
    <Button onClick={handleConnect} disabled={isConnecting} className="w-full">
      {isConnecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {getButtonText()}
    </Button>
  )
}

