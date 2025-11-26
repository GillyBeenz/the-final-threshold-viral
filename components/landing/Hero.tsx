'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-threshold-600 to-threshold-500 opacity-50" />
      
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Book Cover */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative w-full aspect-[2/3] max-w-md mx-auto">
            <Image
              src="/images/book-cover.jpg"
              alt="The Final Threshold Book Cover"
              fill
              className="object-contain rounded-lg shadow-2xl"
              priority
            />
            <div className="absolute inset-0 bg-accent-cyan/20 rounded-lg blur-3xl -z-10" />
          </div>
        </motion.div>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold text-balance">
            The Final
            <span className="block text-accent-cyan">Threshold</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-threshold-200 text-balance">
            A gripping, high-stakes thriller that challenges everything we know about ethics, power, and survival
          </p>
          
          <p className="text-lg text-threshold-300">
            For fans of Dan Brown, Margaret Atwood, and Kazuo Ishiguro. 
            A dystopian thriller that will leave you questioning the future of society.
          </p>

          <div className="flex gap-4 pt-4">
            <div className="flex items-center gap-2 text-threshold-300">
              <span className="text-2xl">⭐⭐⭐⭐⭐</span>
              <span className="text-sm">Dystopian Thriller</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
