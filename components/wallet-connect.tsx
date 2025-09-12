"use client"
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<any>
    }
  }
}

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, ExternalLink, Copy, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface WalletConnectProps {
  onWalletChange: (address: string | null) => void
}

export function WalletConnect({ onWalletChange }: WalletConnectProps) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [copied, setCopied] = useState(false)
  const router = useRouter();

  useEffect(() => {
    // Check if wallet is already connected
    checkWalletConnection()
  }, [])

  const checkWalletConnection = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window?.ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
          onWalletChange(accounts[0])
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error)
      }
    }
  }

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window?.ethereum) {
      setIsConnecting(true)
      try {
        const accounts = await window?.ethereum.request({ method: "eth_requestAccounts" })
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
          onWalletChange(accounts[0])
        }
      } catch (error) {
        console.error("Error connecting wallet:", error)
      } finally {
        setIsConnecting(false)
      }
    } else {
      alert("Please install MetaMask to connect your wallet")
    }
  }

  const disconnectWallet = () => {
    setWalletAddress(null)
    onWalletChange(null)
  }

  const copyAddress = async () => {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (!walletAddress) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Connect Your Wallet</h3>
          <p className="text-muted-foreground mb-6">
            Connect your MetaMask wallet to view your carbon credit tokens and transaction history
          </p>
          <Button onClick={connectWallet} disabled={isConnecting} className="flex items-center space-x-2">
            {isConnecting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
            ) : (
              <Wallet className="h-4 w-4" />
            )}
            <span>{isConnecting ? "Connecting..." : "Connect MetaMask"}</span>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Wallet Connected</h3>
              <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={disconnectWallet}>
            Disconnect
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Wallet Address</p>
              <p className="font-mono text-sm text-foreground">{formatAddress(walletAddress)}</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={copyAddress}>
                {copied ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              </Button>
              <a 
                href={`https://etherscan.io/address/${walletAddress}`}
                target="_blank"
                rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="sm"
                  // onClick={() =>   window?.open(`https://etherscan.io/address/${walletAddress}`, "_blank")}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
              
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
