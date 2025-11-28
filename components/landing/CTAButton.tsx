'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { trackConversion } from '@/lib/utils/tracking'

export function CTAButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    
    try {
      // Get stored tracking data
      const clickId = sessionStorage.getItem('clickId')
      const referralCode = sessionStorage.getItem('referralCode')
      
      // Track conversion
      await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clickId: clickId || undefined,
          referralCode: referralCode || undefined,
          amazonUrl: process.env.NEXT_PUBLIC_AMAZON_PAPERBACK_URL!,
        }),
      })
    } catch (error) {
      console.error('Failed to track conversion:', error)
    }
    
    // Redirect to Amazon
    window.location.href = process.env.NEXT_PUBLIC_AMAZON_PAPERBACK_URL!
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="text-center mb-3">
        <p className="text-accent-cyan font-semibold text-sm mb-1">
          📖 FREE First Chapter Preview
        </p>
        <p className="text-threshold-400 text-xs">
          No signup required • Instant access • Available now on Amazon
        </p>
      </div>
      
      <Button
        onClick={handleClick}
        disabled={isLoading}
        className="w-full text-lg py-6 bg-accent-cyan hover:bg-accent-cyan/90 text-threshold-900 font-bold shadow-lg shadow-accent-cyan/20"
      >
        {isLoading ? 'Redirecting...' : '📚 Read FREE Preview on Amazon'}
      </Button>
      
      <p className="text-center text-threshold-500 text-xs">
        ⭐⭐⭐⭐⭐ Rated 4.8/5 by early readers
      </p>
      
      <button
        onClick={() => router.push('/share')}
        className="w-full text-sm text-threshold-300 hover:text-threshold-100 transition-colors"
      >
        Share this journey →
      </button>
    </div>
  )
}
