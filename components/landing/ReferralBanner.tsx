'use client'

import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'

export function ReferralBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [referrerCount, setReferrerCount] = useState(0)

  useEffect(() => {
    // Check if user came from a referral link
    const urlParams = new URLSearchParams(window.location.search)
    const hasReferral = urlParams.has('ref')
    
    if (hasReferral) {
      setShowBanner(true)
      
      // Fetch total referral count for social proof
      fetch('/api/leaderboard')
        .then(res => res.json())
        .then(data => {
          if (data.leaderboard) {
            setReferrerCount(data.leaderboard.length)
          }
        })
        .catch(() => {})
    }
  }, [])

  if (!showBanner) return null

  return (
    <div className="bg-gradient-to-r from-accent-cyan/20 to-purple-500/20 border-b border-accent-cyan/30">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-2 text-sm">
          <Sparkles className="w-4 h-4 text-accent-cyan" />
          <p className="text-threshold-100">
            <span className="font-semibold text-accent-cyan">Recommended by a friend!</span>
            {referrerCount > 0 && (
              <span className="text-threshold-300 ml-2">
                Join {referrerCount}+ readers who discovered this thriller
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
