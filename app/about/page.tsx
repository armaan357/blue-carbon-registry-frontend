"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { AnimatedCounter } from "@/components/animated-counter"
import { PartnerLogos } from "@/components/partner-logos"
import {
  Leaf,
  Globe,
  Shield,
  Users,
  Waves,
  TreePine,
  Fish,
  Award,
  Target,
  Zap,
  ExternalLink,
  ArrowRight,
} from "lucide-react"

export default function AboutPage() {
  const impactStats = [
    { value: 50000, suffix: "+", label: "Mangroves Planted", icon: <TreePine className="h-6 w-6" /> },
    { value: 250000, suffix: "kg", label: "CO₂ Sequestered", icon: <Leaf className="h-6 w-6" /> },
    { value: 15, suffix: "+", label: "Coastal States", icon: <Globe className="h-6 w-6" /> },
    { value: 200, suffix: "+", label: "Active Projects", icon: <Award className="h-6 w-6" /> },
  ]

  const blueEcosystems = [
    {
      name: "Mangroves",
      description: "Coastal forests that sequester carbon 3-10x faster than terrestrial forests",
      carbonRate: "5-10 tons CO₂/hectare/year",
      icon: <TreePine className="h-8 w-8 text-green-600" />,
    },
    {
      name: "Seagrass Meadows",
      description: "Underwater grasslands that store carbon in sediments for millennia",
      carbonRate: "2-8 tons CO₂/hectare/year",
      icon: <Waves className="h-8 w-8 text-blue-600" />,
    },
    {
      name: "Salt Marshes",
      description: "Tidal wetlands that provide coastal protection and carbon storage",
      carbonRate: "1-5 tons CO₂/hectare/year",
      icon: <Fish className="h-8 w-8 text-teal-600" />,
    },
  ]

  const features = [
    {
      title: "Blockchain Verification",
      description: "Immutable proof of restoration activities using distributed ledger technology",
      icon: <Shield className="h-6 w-6 text-primary" />,
    },
    {
      title: "Satellite Monitoring",
      description: "Real-time monitoring using ISRO satellite data and AI-powered analysis",
      icon: <Globe className="h-6 w-6 text-primary" />,
    },
    {
      title: "Community Engagement",
      description: "Empowering local communities and coastal panchayats in restoration efforts",
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      title: "Carbon Tokenization",
      description: "Converting verified carbon sequestration into tradeable digital assets",
      icon: <Zap className="h-6 w-6 text-primary" />,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Protecting Blue Carbon Ecosystems for <span className="text-primary">Climate Resilience</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty leading-relaxed">
              BlueCarbon Registry is India's first blockchain-powered platform for verifying and trading carbon credits
              from coastal ecosystem restoration projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6">
                <Leaf className="h-5 w-5 mr-2" />
                Join the Movement
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                <ExternalLink className="h-5 w-5 mr-2" />
                Read Whitepaper
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Impact So Far</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Measurable progress in coastal ecosystem restoration and climate action across India
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4 text-primary">{stat.icon}</div>
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blue Carbon Ecosystems */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Understanding Blue Carbon</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Blue carbon ecosystems are among the most effective natural climate solutions, sequestering carbon at
              rates far exceeding terrestrial forests
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {blueEcosystems.map((ecosystem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      {ecosystem.icon}
                      <CardTitle className="text-xl">{ecosystem.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{ecosystem.description}</p>
                    <div className="bg-primary/10 rounded-lg p-3">
                      <p className="text-sm font-medium text-primary">Carbon Sequestration Rate</p>
                      <p className="text-lg font-bold text-foreground">{ecosystem.carbonRate}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Technology & Innovation</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with environmental science to create a transparent,
              verifiable carbon credit system
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Climate Strategy */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Aligned with India's Climate Goals
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Target className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Net Zero by 2070</h3>
                    <p className="text-muted-foreground">
                      Supporting India's commitment to achieve net-zero emissions through nature-based solutions
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Globe className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">NDC Targets</h3>
                    <p className="text-muted-foreground">
                      Contributing to India's Nationally Determined Contributions under the Paris Agreement
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Waves className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Coastal Protection</h3>
                    <p className="text-muted-foreground">
                      Enhancing coastal resilience against climate change impacts and sea-level rise
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Key Achievements</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Coastal Area Restored</span>
                      <span className="font-semibold text-foreground">2,500 hectares</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Communities Engaged</span>
                      <span className="font-semibold text-foreground">150+ villages</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Carbon Credits Generated</span>
                      <span className="font-semibold text-foreground">50,000 BCT</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Funding Mobilized</span>
                      <span className="font-semibold text-foreground">₹25 Crores</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Partners</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Collaborating with leading institutions and organizations to scale blue carbon restoration
            </p>
          </motion.div>

          <PartnerLogos />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Join the Blue Carbon Revolution</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Be part of India's largest coastal restoration initiative. Register your project, verify impact, and earn
              carbon credits while protecting our blue planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6">
                <Leaf className="h-5 w-5 mr-2" />
                Start Your Project
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                <Users className="h-5 w-5 mr-2" />
                Partner With Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
