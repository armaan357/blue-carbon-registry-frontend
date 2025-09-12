"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { PlantationCard, PlantationRecord } from "@/components/plantation-card"
import { PlantationDetailsModal } from "@/components/plantation-details-modal"
import { Search, Filter, MapPin, BarChart3 } from "lucide-react"

// Mock data for demonstration
const mockPlantations = [
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
    blockchainTxHash: "0x1234567890abcdef1234567890abcdef12345678",
    description:
      "Large-scale mangrove restoration project in the Sundarbans delta region focusing on Rhizophora and Avicennia species.",
    images: ["/mangrove-seedlings.jpg", "/mangrove-plantation-site.jpg", "/coastal-restoration.jpg"],
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
    description:
      "Restoration of seagrass meadows along the Kerala coast to enhance marine biodiversity and carbon sequestration.",
    images: ["/seagrass-underwater.jpg", "/marine-restoration.jpg"],
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
    description: "Comprehensive salt marsh restoration project in the Rann of Kutch focusing on halophytic vegetation.",
    images: ["/salt-marsh-plants.jpg", "/coastal-wetland.jpg"],
  },
  {
    id: "4",
    projectName: "Mangrove Community Project - Tamil Nadu",
    organizer: "Coastal Communities Collective",
    location: { lat: 11.4916, lng: 79.7581, name: "Pichavaram, Tamil Nadu" },
    species: "mangrove",
    countPlanted: 1500,
    status: "minted" as const,
    carbonEstimateKg: 9000,
    tokensIssued: 90,
    createdAt: "2024-01-28",
    verificationDate: "2024-02-15",
    blockchainTxHash: "0xabcdef1234567890abcdef1234567890abcdef12",
    description: "Community-driven mangrove restoration involving local fishing communities in Pichavaram.",
    images: ["/mangrove-community-planting.jpg", "/fishing-community-restoration.jpg"],
  },
]

export default function RegistryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [speciesFilter, setSpeciesFilter] = useState<string>("all")
  const [selectedPlantation, setSelectedPlantation] = useState<PlantationRecord | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredPlantations = useMemo(() => {
    return mockPlantations.filter((plantation) => {
      const matchesSearch =
        plantation.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plantation.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plantation.location.name?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || plantation.status === statusFilter
      const matchesSpecies = speciesFilter === "all" || plantation.species === speciesFilter

      return matchesSearch && matchesStatus && matchesSpecies
    })
  }, [searchTerm, statusFilter, speciesFilter])

  const handleViewDetails = (plantation: PlantationRecord) => {
    setSelectedPlantation(plantation);
    setIsModalOpen(true);
  }

  const stats = {
    total: mockPlantations.length,
    verified: mockPlantations.filter((p) => p.status === "verified" || p.status === "minted").length,
    totalPlants: mockPlantations.reduce((sum, p) => sum + p.countPlanted, 0),
    totalCarbon: mockPlantations.reduce((sum, p) => sum + (p.carbonEstimateKg || 0), 0),
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">BlueCarbon Registry</h1>
          <p className="text-xl text-muted-foreground">
            Explore verified blue carbon restoration projects across India
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Projects", value: stats.total, icon: <BarChart3 className="h-5 w-5" /> },
            { label: "Verified Projects", value: stats.verified, icon: <MapPin className="h-5 w-5" /> },
            {
              label: "Plants Registered",
              value: stats.totalPlants.toLocaleString(),
              icon: <BarChart3 className="h-5 w-5" />,
            },
            {
              label: "CO₂ Sequestered",
              value: `${(stats.totalCarbon / 1000).toFixed(1)}t`,
              icon: <BarChart3 className="h-5 w-5" />,
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
                  <div className="flex justify-center mb-2 text-primary">{stat.icon}</div>
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

              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="minted">Minted</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={speciesFilter} onValueChange={setSpeciesFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Species" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Species</SelectItem>
                    <SelectItem value="mangrove">Mangrove</SelectItem>
                    <SelectItem value="seagrass">Seagrass</SelectItem>
                    <SelectItem value="salt-marsh">Salt Marsh</SelectItem>
                    <SelectItem value="coastal-wetland">Coastal Wetland</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            Showing {filteredPlantations.length} of {mockPlantations.length} projects
          </p>
        </div>

        {/* Plantation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlantations.map((plantation, index) => (
            <motion.div
              key={plantation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PlantationCard plantation={plantation} onViewDetails={handleViewDetails} />
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
            <Button
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
                setSpeciesFilter("all")
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>

      <PlantationDetailsModal
        plantation={selectedPlantation}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
