"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/navbar"
import { LocationPicker } from "@/components/location-picker"
import { FileUpload } from "@/components/file-upload"
import { Leaf, Send } from "lucide-react"

interface PlantationData {
  projectName: string
  organizer: string
  location: { lat: number; lng: number } | null
  species: string
  countPlanted: number
  description: string
  images: File[]
  droneEvidence: File[]
}

export default function UploadPage() {
  const [formData, setFormData] = useState<PlantationData>({
    projectName: "",
    organizer: "",
    location: null,
    species: "",
    countPlanted: 0,
    description: "",
    images: [],
    droneEvidence: [],
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitProgress, setSubmitProgress] = useState(0)

  const totalSteps = 4

  const handleLocationChange = (lat: number, lng: number) => {
    setFormData((prev) => ({ ...prev, location: { lat, lng } }))
  }

  const handleImagesChange = (files: File[]) => {
    setFormData((prev) => ({ ...prev, images: files }))
  }

  const handleDroneEvidenceChange = (files: File[]) => {
    setFormData((prev) => ({ ...prev, droneEvidence: files }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitProgress(0)

    // Simulate API submission with progress
    const progressInterval = setInterval(() => {
      setSubmitProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 20
      })
    }, 300)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Here you would make the actual API call
      // const response = await fetch('/api/plantations', {
      //   method: 'POST',
      //   body: formDataToSend
      // })

      alert("Plantation registered successfully! It will be reviewed by our verification team.")

      // Reset form
      setFormData({
        projectName: "",
        organizer: "",
        location: null,
        species: "",
        countPlanted: 0,
        description: "",
        images: [],
        droneEvidence: [],
      })
      setCurrentStep(1)
    } catch (error) {
      alert("Error submitting plantation data. Please try again.")
    } finally {
      setIsSubmitting(false)
      setSubmitProgress(0)
    }
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.projectName && formData.organizer && formData.species
      case 2:
        return formData.location && formData.countPlanted > 0
      case 3:
        return formData.images.length > 0
      case 4:
        return true
      default:
        return false
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  <span>Project Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="projectName">Project Name *</Label>
                  <Input
                    id="projectName"
                    placeholder="e.g., Mangrove Restoration - Sundarbans Phase 1"
                    value={formData.projectName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, projectName: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="organizer">Organizer/NGO Name *</Label>
                  <Input
                    id="organizer"
                    placeholder="e.g., Green Earth Foundation"
                    value={formData.organizer}
                    onChange={(e) => setFormData((prev) => ({ ...prev, organizer: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="species">Species Type *</Label>
                  <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, species: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select species type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mangrove">Mangrove</SelectItem>
                      <SelectItem value="seagrass">Seagrass</SelectItem>
                      <SelectItem value="salt-marsh">Salt Marsh</SelectItem>
                      <SelectItem value="coastal-wetland">Coastal Wetland</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your restoration project, goals, and methodology..."
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )

      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <LocationPicker
              onLocationChange={handleLocationChange}
              latitude={formData.location?.lat}
              longitude={formData.location?.lng}
            />

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Leaf className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Plantation Details</h3>
                </div>

                <div>
                  <Label htmlFor="countPlanted">Number of Plants/Seedlings *</Label>
                  <Input
                    id="countPlanted"
                    type="number"
                    min="1"
                    placeholder="e.g., 500"
                    value={formData.countPlanted || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, countPlanted: Number.parseInt(e.target.value) || 0 }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )

      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <FileUpload
              title="Plantation Images"
              description="Upload clear photos of your plantation site, seedlings, and restoration work"
              accept="image/*"
              maxFiles={5}
              onFilesChange={handleImagesChange}
            />

            <FileUpload
              title="Drone Evidence (Optional)"
              description="Upload aerial footage or drone images for additional verification"
              accept="image/*,video/*"
              maxFiles={3}
              onFilesChange={handleDroneEvidenceChange}
            />
          </motion.div>
        )

      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Review Your Submission</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Project Name</Label>
                    <p className="text-foreground">{formData.projectName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Organizer</Label>
                    <p className="text-foreground">{formData.organizer}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Species</Label>
                    <p className="text-foreground capitalize">{formData.species}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Count Planted</Label>
                    <p className="text-foreground">{formData.countPlanted} plants</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                    <p className="text-foreground">
                      {formData.location
                        ? `${formData.location.lat.toFixed(6)}, ${formData.location.lng.toFixed(6)}`
                        : "Not set"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Images</Label>
                    <p className="text-foreground">{formData.images.length} files uploaded</p>
                  </div>
                </div>

                {formData.description && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                    <p className="text-foreground text-sm">{formData.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Register New Plantation</h1>
            <p className="text-xl text-muted-foreground">
              Submit your blue carbon restoration project for blockchain verification
            </p>
          </motion.div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    step <= currentStep
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-muted-foreground text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <Progress value={(currentStep / totalSteps) * 100} className="mb-2" />
            <p className="text-sm text-muted-foreground text-center">
              Step {currentStep} of {totalSteps}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button type="button" onClick={() => setCurrentStep((prev) => prev + 1)} disabled={!canProceedToNext()}>
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting || !canProceedToNext()}
                  className="flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Submit for Verification</span>
                    </>
                  )}
                </Button>
              )}
            </div>

            {isSubmitting && (
              <div className="mt-4">
                <Progress value={submitProgress} />
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Uploading to IPFS and blockchain... {Math.round(submitProgress)}%
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
