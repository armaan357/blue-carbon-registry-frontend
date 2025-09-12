"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, CheckCircle, XCircle, MapPin, Calendar, Leaf, AlertTriangle } from "lucide-react"

interface PlantationRecord {
  id: string
  projectName: string
  organizer: string
  location: { lat: number; lng: number; name?: string }
  species: string
  countPlanted: number
  status: "pending" | "verified" | "minted"
  createdAt: string
  images: string[]
  description?: string
}

interface VerificationModalProps {
  plantation: PlantationRecord | null
  isOpen: boolean
  onClose: () => void
  onVerify: (id: string, carbonEstimate: number, notes: string) => void
  onReject: (id: string, reason: string) => void
}

export function VerificationModal({ plantation, isOpen, onClose, onVerify, onReject }: VerificationModalProps) {
  const [carbonEstimate, setCarbonEstimate] = useState("")
  const [notes, setNotes] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [showRejectForm, setShowRejectForm] = useState(false)

  if (!plantation) return null

  const handleVerify = async () => {
    if (!carbonEstimate || Number.parseFloat(carbonEstimate) <= 0) return

    setIsVerifying(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call
      onVerify(plantation.id, Number.parseFloat(carbonEstimate), notes)
      onClose()
      resetForm()
    } finally {
      setIsVerifying(false)
    }
  }

  const handleReject = async () => {
    if (!rejectionReason.trim()) return

    setIsRejecting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API call
      onReject(plantation.id, rejectionReason)
      onClose()
      resetForm()
    } finally {
      setIsRejecting(false)
    }
  }

  const resetForm = () => {
    setCarbonEstimate("")
    setNotes("")
    setRejectionReason("")
    setShowRejectForm(false)
  }

  const estimatedCarbonPerPlant = plantation.species === "mangrove" ? 5 : plantation.species === "seagrass" ? 4 : 3
  const suggestedCarbon = plantation.countPlanted * estimatedCarbonPerPlant

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
                  <CardTitle className="text-2xl text-foreground mb-2">Verify Plantation Record</CardTitle>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending Verification</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Project Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{plantation.projectName}</h3>
                      <p className="text-muted-foreground">{plantation.organizer}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {plantation.location.name ||
                            `${plantation.location.lat.toFixed(6)}, ${plantation.location.lng.toFixed(6)}`}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 text-sm">
                        <Leaf className="h-4 w-4 text-muted-foreground" />
                        <span className="capitalize">{plantation.species}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(plantation.createdAt).toLocaleDateString()}</span>
                      </div>

                      <div className="text-sm">
                        <span className="font-medium">Plants Count:</span> {plantation.countPlanted.toLocaleString()}
                      </div>
                    </div>

                    {plantation.description && (
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Description</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{plantation.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Images */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Project Images</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {plantation.images.slice(0, 4).map((image, index) => (
                        <div key={index} className="aspect-square bg-muted rounded-lg overflow-hidden">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Plantation ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {!showRejectForm ? (
                  /* Verification Form */
                  <div className="space-y-6 border-t pt-6">
                    <h3 className="text-lg font-semibold text-foreground">Verification Assessment</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="carbonEstimate">Carbon Sequestration Estimate (kg CO₂) *</Label>
                          <Input
                            id="carbonEstimate"
                            type="number"
                            placeholder={`Suggested: ${suggestedCarbon}`}
                            value={carbonEstimate}
                            onChange={(e) => setCarbonEstimate(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Suggested estimate: {suggestedCarbon}kg CO₂ ({estimatedCarbonPerPlant}kg per plant)
                          </p>
                        </div>

                        <div>
                          <Label htmlFor="notes">Verification Notes</Label>
                          <Textarea
                            id="notes"
                            placeholder="Add any observations, methodology used, or additional comments..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={4}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-muted/50 rounded-lg p-4">
                          <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            <span>Verification Checklist</span>
                          </h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>✓ GPS coordinates verified</li>
                            <li>✓ Species identification confirmed</li>
                            <li>✓ Plant count assessment</li>
                            <li>✓ Site condition evaluation</li>
                            <li>✓ Documentation review</li>
                          </ul>
                        </div>

                        <Button
                          onClick={() =>
                            window.open(
                              `https://maps.google.com/?q=${plantation.location.lat},${plantation.location.lng}`,
                              "_blank",
                            )
                          }
                          variant="outline"
                          className="w-full"
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          Verify Location on Map
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button
                        onClick={handleVerify}
                        disabled={!carbonEstimate || Number.parseFloat(carbonEstimate) <= 0 || isVerifying}
                        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                      >
                        {isVerifying ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                        <span>{isVerifying ? "Verifying..." : "Approve & Verify"}</span>
                      </Button>

                      <Button
                        onClick={() => setShowRejectForm(true)}
                        variant="destructive"
                        className="flex items-center space-x-2"
                      >
                        <XCircle className="h-4 w-4" />
                        <span>Reject</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Rejection Form */
                  <div className="space-y-6 border-t pt-6">
                    <h3 className="text-lg font-semibold text-foreground text-red-600">Reject Plantation Record</h3>

                    <div>
                      <Label htmlFor="rejectionReason">Reason for Rejection *</Label>
                      <Textarea
                        id="rejectionReason"
                        placeholder="Please provide a detailed reason for rejection..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={handleReject}
                        disabled={!rejectionReason.trim() || isRejecting}
                        variant="destructive"
                        className="flex items-center space-x-2"
                      >
                        {isRejecting ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <XCircle className="h-4 w-4" />
                        )}
                        <span>{isRejecting ? "Rejecting..." : "Confirm Rejection"}</span>
                      </Button>

                      <Button onClick={() => setShowRejectForm(false)} variant="outline">
                        Cancel
                      </Button>
                    </div>
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
