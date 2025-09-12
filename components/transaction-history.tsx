"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ExternalLink, ArrowUpRight, ArrowDownLeft, Coins, RefreshCw } from "lucide-react"

interface Transaction {
  id: string
  type: "mint" | "transfer" | "trade"
  amount: number
  from?: string
  to?: string
  txHash: string
  timestamp: string
  status: "confirmed" | "pending" | "failed"
  projectName?: string
}

interface TransactionHistoryProps {
  walletAddress: string | null
}

export function TransactionHistory({ walletAddress }: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (walletAddress) {
      fetchTransactions()
    } else {
      setTransactions([])
      setLoading(false)
    }
  }, [walletAddress])

  const fetchTransactions = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock transaction data
      const mockTransactions: Transaction[] = [
        {
          id: "1",
          type: "mint",
          amount: 125,
          to: walletAddress!,
          txHash: "0x1234567890abcdef1234567890abcdef12345678",
          timestamp: "2024-03-15T10:30:00Z",
          status: "confirmed",
          projectName: "Mangrove Restoration - Sundarbans Phase 1",
        },
        {
          id: "2",
          type: "mint",
          amount: 90,
          to: walletAddress!,
          txHash: "0xabcdef1234567890abcdef1234567890abcdef12",
          timestamp: "2024-03-10T14:20:00Z",
          status: "confirmed",
          projectName: "Mangrove Community Project - Tamil Nadu",
        },
        {
          id: "3",
          type: "transfer",
          amount: 50,
          from: walletAddress!,
          to: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
          txHash: "0x567890abcdef1234567890abcdef1234567890ab",
          timestamp: "2024-03-08T09:15:00Z",
          status: "confirmed",
        },
        {
          id: "4",
          type: "trade",
          amount: 30,
          from: walletAddress!,
          to: "0x8D4C0532925a3b8D4C0532925a3b8D4C053292",
          txHash: "0xcdef1234567890abcdef1234567890abcdef1234",
          timestamp: "2024-03-05T16:45:00Z",
          status: "confirmed",
        },
      ]

      setTransactions(mockTransactions)
    } catch (error) {
      console.error("Error fetching transactions:", error)
    } finally {
      setLoading(false)
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "mint":
        return <Coins className="h-4 w-4 text-green-600" />
      case "transfer":
        return <ArrowUpRight className="h-4 w-4 text-blue-600" />
      case "trade":
        return <ArrowDownLeft className="h-4 w-4 text-purple-600" />
      default:
        return <Coins className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (!walletAddress) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Connect your wallet to view transaction history</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Transaction History</span>
          </CardTitle>
          <Button variant="outline" size="sm" onClick={fetchTransactions} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading transactions...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">{getTransactionIcon(tx.type)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm font-medium text-foreground capitalize">{tx.type}</p>
                      <Badge className={getStatusColor(tx.status)}>{tx.status}</Badge>
                    </div>

                    {tx.projectName && <p className="text-xs text-muted-foreground mb-1 truncate">{tx.projectName}</p>}

                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{new Date(tx.timestamp).toLocaleDateString()}</span>
                      {tx.from && tx.to && (
                        <span>
                          {formatAddress(tx.from)} → {formatAddress(tx.to)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {tx.type === "mint" || (tx.type === "transfer" && tx.to === walletAddress) ? "+" : "-"}
                      {tx.amount} BCT
                    </p>
                    <p className="text-xs text-muted-foreground">≈ ${(tx.amount * 15).toLocaleString()} USD</p>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(`https://etherscan.io/tx/${tx.txHash}`, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
