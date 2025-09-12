"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { TutorialModal } from "@/components/tutorial-modal"
import { AnimatedBackground } from "@/components/animated-background"
import { Leaf, Shield, Globe, Users, ArrowRight, Play } from "lucide-react"

export default function HomePage() {
  const [showTutorial, setShowTutorial] = useState(false)

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("bluecarbon-tutorial-completed")
    if (!hasSeenTutorial) {
      const timer = setTimeout(() => {
        setShowTutorial(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Blockchain Verified",
      description: "Immutable proof of plantation data stored on blockchain with IPFS integration",
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Global Impact",
      description: "Contributing to climate change mitigation through blue carbon ecosystem restoration",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Community Driven",
      description: "Empowering NGOs, panchayats, and local communities to participate in carbon markets",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackground />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
                Transparent Carbon Credit Registry for <span className="text-primary">Blue Ecosystems</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty leading-relaxed">
                Empowering coastal communities to combat climate change through blockchain-verified mangrove and
                seagrass restoration with tradeable carbon credits.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link href="/upload" className="flex items-center space-x-2">
                    <Leaf className="h-5 w-5" />
                    <span>Register Plantation</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>

                <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6 bg-transparent">
                  <Link href="/registry" className="flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span>View Registry</span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => setShowTutorial(true)}
                  className="text-lg px-8 py-6 flex items-center space-x-2"
                >
                  <Play className="h-5 w-5" />
                  <span>How It Works</span>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose BlueCarbon Registry?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge blockchain technology with environmental science to create a
              transparent, verifiable carbon credit system.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="flex justify-center mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "5,000+", label: "Mangroves Planted" },
              { number: "20,000kg", label: "CO₂ Absorbed" },
              { number: "50+", label: "Active Projects" },
              { number: "₹2.5L", label: "Credits Traded" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TutorialModal isOpen={showTutorial} onClose={() => setShowTutorial(false)} />
    </div>
  )
}
