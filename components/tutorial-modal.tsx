"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, ChevronRight, ChevronLeft, Upload, CheckCircle, Coins, TrendingUp } from "lucide-react"

interface TutorialStep {
  id: number
  title: string
  description: string
  icon: React.ReactNode
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Register Your Plantation",
    description:
      "Upload your plantation data with GPS coordinates, species information, and photographic evidence to our secure blockchain registry.",
    icon: <Upload className="h-8 w-8 text-primary" />,
  },
  {
    id: 2,
    title: "Wait for Verification",
    description:
      "Our expert team at NCCR reviews your submission using satellite data and field verification to ensure authenticity.",
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
  },
  {
    id: 3,
    title: "Get Tokenized Credits",
    description:
      "Once verified, your carbon sequestration is calculated and converted into tradeable blockchain tokens representing real environmental impact.",
    icon: <Coins className="h-8 w-8 text-primary" />,
  },
  {
    id: 4,
    title: "Trade & Fund Sustainability",
    description:
      "Trade your carbon credits on our marketplace to fund further restoration projects and create a sustainable ecosystem economy.",
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
  },
]

interface TutorialModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TutorialModal({ isOpen, onClose }: TutorialModalProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    localStorage.setItem("bluecarbon-tutorial-completed", "true")
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-2xl"
          >
            <Card className="relative">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground z-10"
              >
                <X className="h-6 w-6" />
              </button>

              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to BlueCarbon Registry</h2>
                  <p className="text-muted-foreground">
                    Learn how our blockchain-powered system works in 4 simple steps
                  </p>
                </div>

                <div className="flex justify-center mb-8">
                  <div className="flex space-x-2">
                    {tutorialSteps.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 w-8 rounded-full transition-colors ${
                          index <= currentStep ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <motion.div
                  key={currentStep}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="text-center mb-8"
                >
                  <div className="flex justify-center mb-4">{tutorialSteps[currentStep].icon}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{tutorialSteps[currentStep].title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{tutorialSteps[currentStep].description}</p>
                </motion.div>

                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="flex items-center space-x-2 bg-transparent"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </Button>

                  <span className="text-sm text-muted-foreground">
                    {currentStep + 1} of {tutorialSteps.length}
                  </span>

                  {currentStep === tutorialSteps.length - 1 ? (
                    <Button onClick={handleComplete} className="flex items-center space-x-2">
                      <span>Get Started</span>
                    </Button>
                  ) : (
                    <Button onClick={nextStep} className="flex items-center space-x-2">
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
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
