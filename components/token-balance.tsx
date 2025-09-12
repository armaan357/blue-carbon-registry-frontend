"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Coins, TrendingUp, Leaf, ExternalLink } from "lucide-react"

interface TokenBalanceProps {
  walletAddress: string | null
}

export function TokenBalance({ walletAddress }: TokenBalanceProps) {
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(true)
  const [carbonImpact, setCarbonImpact] = useState(0)

  useEffect(() => {
    if (walletAddress) {
      fetchTokenBalance()
    } else {
      setBalance(0)
      setCarbonImpact(0)
      setLoading(false)
    }
  }, [walletAddress])

  const fetchTokenBalance = async () => {
    setLoading(true)
    try {
      // Simulate API call to fetch token balance
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock balance data
      const mockBalance = 245 // BCT tokens
      setBalance(mockBalance)
      setCarbonImpact(mockBalance * 100) // 100kg CO2 per token
    } catch (error) {
      console.error("Error fetching token balance:", error)
    } finally {
      setLoading(false)
    }
  }

  const tokenValueUSD = balance * 15 // Assuming $15 per BCT token
  const nextMilestone = 500
  const progressToMilestone = (balance / nextMilestone) * 100

  if (!walletAddress) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Coins className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Connect your wallet to view token balance</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Balance Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Coins className="h-5 w-5 text-primary" />
            <span>BlueCarbon Token Balance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading balance...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{balance.toLocaleString()} BCT</div>
                <div className="text-lg text-muted-foreground">≈ ${tokenValueUSD.toLocaleString()} USD</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Leaf className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-semibold text-foreground">{carbonImpact.toLocaleString()}kg</div>
                  <div className="text-sm text-muted-foreground">CO₂ Sequestered</div>
                </div>

                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-semibold text-foreground">{(carbonImpact / 1000).toFixed(1)}t</div>
                  <div className="text-sm text-muted-foreground">Carbon Tons</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress to {nextMilestone} BCT</span>
                  <span className="text-foreground">
                    {balance}/{nextMilestone}
                  </span>
                </div>
                <Progress value={progressToMilestone} className="h-2" />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 bg-transparent"
                  onClick={() => window.open("https://uniswap.org", "_blank")}
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Trade on DEX</span>
                  <ExternalLink className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center space-x-2 bg-transparent"
                  onClick={() => window.open(`https://etherscan.io/token/0x...?a=${walletAddress}`, "_blank")}
                >
                  <Coins className="h-4 w-4" />
                  <span>View on Etherscan</span>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Impact Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Leaf className="h-5 w-5 text-green-600" />
            <span>Environmental Impact</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{Math.floor(carbonImpact / 22)}</div>
              <div className="text-xs text-muted-foreground">Cars off road (1 year)</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{Math.floor(carbonImpact / 15)}</div>
              <div className="text-xs text-muted-foreground">Trees planted equivalent</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{Math.floor(carbonImpact / 400)}</div>
              <div className="text-xs text-muted-foreground">Flights offset (domestic)</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{Math.floor(carbonImpact / 2.3)}</div>
              <div className="text-xs text-muted-foreground">Gallons of gas saved</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
