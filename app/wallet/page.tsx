"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { WalletConnect } from "@/components/wallet-connect"
import { TokenBalance } from "@/components/token-balance"
import { TransactionHistory } from "@/components/transaction-history"

export default function WalletPage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Your Carbon Wallet</h1>
          <p className="text-xl text-muted-foreground">
            Manage your BlueCarbon tokens and track your environmental impact
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Wallet Connection */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <WalletConnect onWalletChange={setWalletAddress} />
          </motion.div>

          {/* Token Balance */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <TokenBalance walletAddress={walletAddress} />
          </motion.div>

          {/* Transaction History */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <TransactionHistory walletAddress={walletAddress} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
