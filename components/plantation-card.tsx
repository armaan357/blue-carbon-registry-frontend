"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Leaf, Eye, Award, Clock } from "lucide-react"

interface PlantationRecord {
  id: string
  projectName: string
  organizer: string
  location: { lat: number; lng: number; name?: string }
  species: string
  countPlanted: number
  status: "pending" | "verified" | "minted"
  carbonEstimateKg?: number
  tokensIssued?: number
  createdAt: string
  images: string[]
}

interface PlantationCardProps {
  plantation: PlantationRecord
  onViewDetails: (plantation: PlantationRecord) => void
}

export function PlantationCard({ plantation, onViewDetails }: PlantationCardProps) {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-3 w-3" />
      case "verified":
        return <Award className="h-3 w-3" />
      case "minted":
        return <Leaf className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {plantation.projectName}
            </h3>
            <Badge className={`${getStatusColor(plantation.status)} flex items-center space-x-1`}>
              {getStatusIcon(plantation.status)}
              <span className="capitalize">{plantation.status}</span>
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground">{plantation.organizer}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Location */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>
              {plantation.location.name ||
                `${plantation.location.lat.toFixed(4)}, ${plantation.location.lng.toFixed(4)}`}
            </span>
          </div>

          {/* Species and Count */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Species:</span>
              <p className="font-medium capitalize">{plantation.species}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Planted:</span>
              <p className="font-medium">{plantation.countPlanted.toLocaleString()}</p>
            </div>
          </div>

          {/* Carbon Estimate and Tokens */}
          {plantation.status !== "pending" && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Carbon Est.:</span>
                <p className="font-medium text-primary">
                  {plantation.carbonEstimateKg ? `${plantation.carbonEstimateKg}kg CO₂` : "Calculating..."}
                </p>
              </div>
              {plantation.tokensIssued && (
                <div>
                  <span className="text-muted-foreground">Tokens:</span>
                  <p className="font-medium text-primary">{plantation.tokensIssued}</p>
                </div>
              )}
            </div>
          )}

          {/* Date */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date(plantation.createdAt).toLocaleDateString()}</span>
          </div>

          {/* Images Preview */}
          {plantation.images.length > 0 && (
            <div className="flex space-x-2">
              {plantation.images.slice(0, 3).map((image, index) => (
                <div key={index} className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Plantation ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {plantation.images.length > 3 && (
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground">
                  +{plantation.images.length - 3}
                </div>
              )}
            </div>
          )}

          <Button
            onClick={() => onViewDetails(plantation)}
            variant="outline"
            className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
