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
    
    // Get referral code from URL if present
    const params = new URLSearchParams(window.location.search)
    const referralCode = params.get('ref')
    
    // Track conversion
    await trackConversion({
      referralCode: referralCode || undefined,
      amazonUrl: process.env.NEXT_PUBLIC_AMAZON_PAPERBACK_URL!,
    })
    
    // Redirect to Amazon
    window.location.href = process.env.NEXT_PUBLIC_AMAZON_PAPERBACK_URL!
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Button
        onClick={handleClick}
        disabled={isLoading}
        className="w-full text-lg py-6 bg-accent-cyan hover:bg-accent-cyan/90 text-threshold-900 font-bold"
      >
        {isLoading ? 'Entering...' : 'Enter the Threshold'}
      </Button>
      
      <button
        onClick={() => router.push('/share')}
        className="w-full text-sm text-threshold-300 hover:text-threshold-100 transition-colors"
      >
        Share this journey →
      </button>
    </div>
  )
}
