"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, MapPin, Calendar, Leaf, Award, ExternalLink } from "lucide-react"

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
  description?: string
  verificationDate?: string
  blockchainTxHash?: string
}

interface PlantationDetailsModalProps {
  plantation: PlantationRecord | null
  isOpen: boolean
  onClose: () => void
}

export function PlantationDetailsModal({ plantation, isOpen, onClose }: PlantationDetailsModalProps) {
  if (!plantation) return null

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
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
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
                  <div className="flex items-start justify-between mb-4">
                    <CardTitle className="text-2xl text-foreground pr-4">{plantation.projectName}</CardTitle>
                    <Badge className={`${getStatusColor(plantation.status)} flex items-center space-x-1`}>
                      <span className="capitalize">{plantation.status}</span>
                    </Badge>
                  </div>

                  <p className="text-lg text-muted-foreground">{plantation.organizer}</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Project Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm font-medium">Location</span>
                    </div>
                    <p className="text-foreground">
                      {plantation.location.name ||
                        `${plantation.location.lat.toFixed(6)}, ${plantation.location.lng.toFixed(6)}`}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Leaf className="h-4 w-4" />
                      <span className="text-sm font-medium">Species</span>
                    </div>
                    <p className="text-foreground capitalize">{plantation.species}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Award className="h-4 w-4" />
                      <span className="text-sm font-medium">Plants Count</span>
                    </div>
                    <p className="text-foreground font-semibold">{plantation.countPlanted.toLocaleString()}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-medium">Registered</span>
                    </div>
                    <p className="text-foreground">{new Date(plantation.createdAt).toLocaleDateString()}</p>
                  </div>

                  {plantation.carbonEstimateKg && (
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-muted-foreground">Carbon Estimate</span>
                      <p className="text-foreground font-semibold text-primary">{plantation.carbonEstimateKg}kg CO₂</p>
                    </div>
                  )}

                  {plantation.tokensIssued && (
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-muted-foreground">Tokens Issued</span>
                      <p className="text-foreground font-semibold text-primary">{plantation.tokensIssued} BCT</p>
                    </div>
                  )}
                </div>

                {/* Description */}
                {plantation.description && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">Project Description</h3>
                    <p className="text-muted-foreground leading-relaxed">{plantation.description}</p>
                  </div>
                )}

                {/* Images Gallery */}
                {plantation.images.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Project Images</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {plantation.images.map((image, index) => (
                        <div
                          key={index}
                          className="aspect-square bg-muted rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Plantation image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Verification Info */}
                {plantation.status !== "pending" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Verification Details</h3>
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      {plantation.verificationDate && (
                        <p className="text-sm">
                          <span className="font-medium">Verified on:</span>{" "}
                          {new Date(plantation.verificationDate).toLocaleDateString()}
                        </p>
                      )}
                      {plantation.blockchainTxHash && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Blockchain TX:</span>
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 h-auto text-primary"
                            onClick={() =>
                              window.open(`https://etherscan.io/tx/${plantation.blockchainTxHash}`, "_blank")
                            }
                          >
                            <span className="font-mono text-xs">
                              {plantation.blockchainTxHash.slice(0, 10)}...{plantation.blockchainTxHash.slice(-8)}
                            </span>
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    onClick={() =>
                      window.open(
                        `https://maps.google.com/?q=${plantation.location.lat},${plantation.location.lng}`,
                        "_blank",
                      )
                    }
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>View on Map</span>
                    <ExternalLink className="h-4 w-4" />
                  </Button>

                  {plantation.blockchainTxHash && (
                    <Button
                      onClick={() => window.open(`https://etherscan.io/tx/${plantation.blockchainTxHash}`, "_blank")}
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <Award className="h-4 w-4" />
                      <span>View on Blockchain</span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
