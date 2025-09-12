"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/navbar"
import { VerificationModal } from "@/components/verification-modal"
import { MintTokensModal } from "@/components/mint-tokens-modal"
import { Search, Filter, CheckCircle, Clock, Coins, BarChart3, MapPin, Calendar, Leaf, Eye, Award } from "lucide-react"

// Mock admin data
const mockAdminPlantations = [
  {
    id: "1",
    projectName: "Mangrove Restoration - Sundarbans Phase 1",
    organizer: "Green Earth Foundation",
    location: { lat: 21.9497, lng: 88.9468, name: "Sundarbans, West Bengal" },
    species: "mangrove",
    countPlanted: 2500,
    status: "minted" as const,
    carbonEstimateKg: 12500,
    tokensIssued: 125,
    createdAt: "2024-01-15",
    verificationDate: "2024-02-01",
    images: ["/mangrove-seedlings.jpg", "/mangrove-plantation-site.jpg"],
    description: "Large-scale mangrove restoration project in the Sundarbans delta region.",
  },
  {
    id: "2",
    projectName: "Seagrass Meadow Conservation - Kerala Coast",
    organizer: "Ocean Blue NGO",
    location: { lat: 9.9312, lng: 76.2673, name: "Kochi, Kerala" },
    species: "seagrass",
    countPlanted: 1800,
    status: "verified" as const,
    carbonEstimateKg: 7200,
    createdAt: "2024-02-10",
    verificationDate: "2024-02-25",
    images: ["/seagrass-underwater.jpg"],
    description: "Restoration of seagrass meadows along the Kerala coast.",
  },
  {
    id: "3",
    projectName: "Salt Marsh Restoration - Gujarat",
    organizer: "Coastal Care Initiative",
    location: { lat: 22.2587, lng: 70.7729, name: "Kutch, Gujarat" },
    species: "salt-marsh",
    countPlanted: 3200,
    status: "pending" as const,
    createdAt: "2024-03-05",
    images: ["/salt-marsh-plants.jpg"],
    description: "Comprehensive salt marsh restoration project in the Rann of Kutch.",
  },
  {
    id: "4",
    projectName: "Coastal Wetland Project - Odisha",
    organizer: "Marine Conservation Society",
    location: { lat: 19.8135, lng: 85.8312, name: "Chilika Lake, Odisha" },
    species: "coastal-wetland",
    countPlanted: 1200,
    status: "pending" as const,
    createdAt: "2024-03-12",
    images: ["/coastal-wetland.jpg"],
    description: "Wetland restoration around Chilika Lake ecosystem.",
  },
  {
    id: "5",
    projectName: "Mangrove Community Initiative - Andhra Pradesh",
    organizer: "Coastal Communities Collective",
    location: { lat: 16.5062, lng: 80.648, name: "Krishna Delta, AP" },
    species: "mangrove",
    countPlanted: 2800,
    status: "pending" as const,
    createdAt: "2024-03-18",
    images: ["/mangrove-community-planting.jpg"],
    description: "Community-driven mangrove restoration in Krishna Delta.",
  },
]

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedPlantation, setSelectedPlantation] = useState<(typeof mockAdminPlantations)[0] | null>(null)
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false)
  const [isMintModalOpen, setIsMintModalOpen] = useState(false)
  const [plantations, setPlantations] = useState(mockAdminPlantations)

  const filteredPlantations = useMemo(() => {
    return plantations.filter((plantation) => {
      const matchesSearch =
        plantation.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plantation.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plantation.location.name?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || plantation.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [plantations, searchTerm, statusFilter])

  const handleVerify = (id: string, carbonEstimate: number, notes: string) => {
    setPlantations((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: "verified" as const,
              carbonEstimateKg: carbonEstimate,
              verificationDate: new Date().toISOString(),
            }
          : p,
      ),
    )
  }

  const handleReject = (id: string, reason: string) => {
    // In a real app, you'd update the status to rejected and store the reason
    console.log(`Rejected plantation ${id}: ${reason}`)
    // For demo, we'll just remove it from the list
    setPlantations((prev) => prev.filter((p) => p.id !== id))
  }

  const handleMint = (id: string, walletAddress: string, tokenAmount: number) => {
    setPlantations((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: "minted" as const,
              tokensIssued: tokenAmount,
            }
          : p,
      ),
    )
  }

  const openVerificationModal = (plantation: (typeof mockAdminPlantations)[0]) => {
    setSelectedPlantation(plantation)
    setIsVerificationModalOpen(true)
  }

  const openMintModal = (plantation: (typeof mockAdminPlantations)[0]) => {
    setSelectedPlantation(plantation)
    setIsMintModalOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "verified":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "minted":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const stats = {
    total: plantations.length,
    pending: plantations.filter((p) => p.status === "pending").length,
    verified: plantations.filter((p) => p.status === "verified").length,
    minted: plantations.filter((p) => p.status === "minted").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Admin Dashboard</h1>
          <p className="text-xl text-muted-foreground">NCCR Verification & Token Management System</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Projects",
              value: stats.total,
              icon: <BarChart3 className="h-5 w-5" />,
              color: "text-blue-600",
            },
            {
              label: "Pending Review",
              value: stats.pending,
              icon: <Clock className="h-5 w-5" />,
              color: "text-yellow-600",
            },
            {
              label: "Verified",
              value: stats.verified,
              icon: <CheckCircle className="h-5 w-5" />,
              color: "text-blue-600",
            },
            {
              label: "Tokens Minted",
              value: stats.minted,
              icon: <Coins className="h-5 w-5" />,
              color: "text-green-600",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-4 text-center">
                  <div className={`flex justify-center mb-2 ${stat.color}`}>{stat.icon}</div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search projects, organizations, or locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="minted">Tokens Minted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            Showing {filteredPlantations.length} of {plantations.length} projects
          </p>
        </div>

        {/* Plantation List */}
        <div className="space-y-4">
          {filteredPlantations.map((plantation, index) => (
            <motion.div
              key={plantation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-1">{plantation.projectName}</h3>
                          <p className="text-muted-foreground">{plantation.organizer}</p>
                        </div>
                        <Badge className={getStatusColor(plantation.status)}>
                          <span className="capitalize">{plantation.status}</span>
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{plantation.location.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Leaf className="h-4 w-4 text-muted-foreground" />
                          <span className="capitalize">{plantation.species}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          <span>{plantation.countPlanted.toLocaleString()} plants</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(plantation.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {plantation.carbonEstimateKg && (
                        <div className="mt-3 text-sm">
                          <span className="text-muted-foreground">Carbon Estimate: </span>
                          <span className="font-medium text-primary">{plantation.carbonEstimateKg}kg CO₂</span>
                          {plantation.tokensIssued && (
                            <>
                              <span className="text-muted-foreground ml-4">Tokens Issued: </span>
                              <span className="font-medium text-primary">{plantation.tokensIssued} BCT</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 lg:flex-col lg:w-48">
                      {plantation.status === "pending" && (
                        <Button
                          onClick={() => openVerificationModal(plantation)}
                          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Verify</span>
                        </Button>
                      )}

                      {plantation.status === "verified" && (
                        <Button
                          onClick={() => openMintModal(plantation)}
                          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                        >
                          <Coins className="h-4 w-4" />
                          <span>Mint Tokens</span>
                        </Button>
                      )}

                      <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                        <Eye className="h-4 w-4" />
                        <span>View Details</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredPlantations.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Filter className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg">No projects found matching your criteria</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          </motion.div>
        )}
      </div>

      <VerificationModal
        plantation={selectedPlantation}
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        onVerify={handleVerify}
        onReject={handleReject}
      />

      <MintTokensModal
        plantation={selectedPlantation}
        isOpen={isMintModalOpen}
        onClose={() => setIsMintModalOpen(false)}
        onMint={handleMint}
      />
    </div>
  )
}
