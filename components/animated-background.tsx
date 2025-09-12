"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function AnimatedBackground() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Floating particles */}
      {isClient &&
        [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}

      {/* Wave animation */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg className="w-full h-32 text-primary/10" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
            initial={{ d: "M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" }}
            animate={{ d: "M0,80 C300,20 900,100 1200,40 L1200,120 L0,120 Z" }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>
    </div>
  )
}
