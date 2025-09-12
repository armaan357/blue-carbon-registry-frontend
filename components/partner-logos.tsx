"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const partners = [
  { name: "NCCR", description: "National Centre for Coastal Research" },
  { name: "ISRO", description: "Indian Space Research Organisation" },
  { name: "MoEFCC", description: "Ministry of Environment, Forest and Climate Change" },
  { name: "ICMAM", description: "Integrated Coastal and Marine Area Management" },
  { name: "WWF India", description: "World Wildlife Fund India" },
  { name: "WCS India", description: "Wildlife Conservation Society India" },
]

export function PartnerLogos() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {partners.map((partner, index) => (
        <motion.div
          key={partner.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="h-full hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold text-sm">{partner.name}</span>
              </div>
              <h3 className="font-medium text-foreground text-sm mb-1">{partner.name}</h3>
              <p className="text-xs text-muted-foreground leading-tight">{partner.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
