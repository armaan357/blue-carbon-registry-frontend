"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Coins, ExternalLink } from "lucide-react"

interface PlantationRecord {
  id: string
  projectName: string
  organizer: string
  carbonEstimateKg: number
  status: "verified" | "minted"
}

interface MintTokensModalProps {
  plantation: PlantationRecord | null
  isOpen: boolean
  onClose: () => void
  onMint: (id: string, walletAddress: string, tokenAmount: number) => void
}

export function MintTokensModal({ plantation, isOpen, onClose, onMint }: MintTokensModalProps) {
  const [walletAddress, setWalletAddress] = useState("")
  const [tokenAmount, setTokenAmount] = useState("")
  const [isMinting, setIsMinting] = useState(false)

  if (!plantation) return null

  const suggestedTokens = Math.floor(plantation.carbonEstimateKg / 100) // 1 token per 100kg CO2
  const maxTokens = Math.floor(plantation.carbonEstimateKg / 50) // Max 1 token per 50kg CO2

  const handleMint = async () => {
    if (!walletAddress || !tokenAmount || Number.parseInt(tokenAmount) <= 0) return

    setIsMinting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000)) // Simulate blockchain transaction
      onMint(plantation.id, walletAddress, Number.parseInt(tokenAmount))
      onClose()
      resetForm()
    } finally {
      setIsMinting(false)
    }
  }

  const resetForm = () => {
    setWalletAddress("")
    setTokenAmount("")
  }

  const isValidAddress = walletAddress.length === 42 && walletAddress.startsWith("0x")

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Card>
              <CardHeader className="relative">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="pr-8">
                  <CardTitle className="text-2xl text-foreground mb-2 flex items-center space-x-2">
                    <Coins className="h-6 w-6 text-primary" />
                    <span>Mint Carbon Credit Tokens</span>
                  </CardTitle>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">Verified Project</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Project Summary */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">{plantation.projectName}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{plantation.organizer}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Carbon Sequestered:</span>
                      <p className="font-medium text-primary">{plantation.carbonEstimateKg}kg CO₂</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Suggested Tokens:</span>
                      <p className="font-medium text-primary">{suggestedTokens} BCT</p>
                    </div>
                  </div>
                </div>

                {/* Minting Form */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="walletAddress">Recipient Wallet Address *</Label>
                    <Input
                      id="walletAddress"
                      placeholder="0x..."
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      className={!isValidAddress && walletAddress ? "border-red-300" : ""}
                    />
                    {!isValidAddress && walletAddress && (
                      <p className="text-xs text-red-600 mt-1">Please enter a valid Ethereum address</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="tokenAmount">Number of Tokens to Mint *</Label>
                    <Input
                      id="tokenAmount"
                      type="number"
                      min="1"
                      max={maxTokens}
                      placeholder={`Suggested: ${suggestedTokens}`}
                      value={tokenAmount}
                      onChange={(e) => setTokenAmount(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Recommended: {suggestedTokens} tokens (Max: {maxTokens} tokens)
                    </p>
                  </div>
                </div>

                {/* Token Economics Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">BlueCarbon Token (BCT) Details</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 1 BCT = 100kg CO₂ equivalent sequestered</li>
                    <li>• Tokens are ERC-20 compatible</li>
                    <li>• Immutable proof of carbon sequestration</li>
                    <li>• Tradeable on decentralized exchanges</li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    onClick={handleMint}
                    disabled={
                      !isValidAddress ||
                      !tokenAmount ||
                      Number.parseInt(tokenAmount) <= 0 ||
                      Number.parseInt(tokenAmount) > maxTokens ||
                      isMinting
                    }
                    className="flex items-center space-x-2"
                  >
                    {isMinting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                        <span>Minting on Blockchain...</span>
                      </>
                    ) : (
                      <>
                        <Coins className="h-4 w-4" />
                        <span>Mint {tokenAmount || suggestedTokens} BCT Tokens</span>
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => window.open("https://etherscan.io", "_blank")}
                    className="flex items-center space-x-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>View on Etherscan</span>
                  </Button>
                </div>

                {isMinting && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Transaction in progress...</strong> This may take a few minutes to complete on the
                      blockchain.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
