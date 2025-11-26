'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export function TrackingWrapper({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const trackVisit = async () => {
      const referralCode = searchParams.get('ref')
      const utmSource = searchParams.get('utm_source')
      const utmMedium = searchParams.get('utm_medium')
      const utmCampaign = searchParams.get('utm_campaign')

      // Only track if there's a referral code or UTM parameters
      if (referralCode || utmSource) {
        try {
          const response = await fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              referralCode,
              utmSource,
              utmMedium,
              utmCampaign,
              deviceType: /mobile/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
              landingPage: true,
            }),
          })

          const data = await response.json()
          
          // Store click ID for conversion tracking
          if (data.success && data.clickId) {
            sessionStorage.setItem('clickId', data.clickId)
          }
          
          // Store referral code for conversion tracking
          if (referralCode) {
            sessionStorage.setItem('referralCode', referralCode)
          }
        } catch (error) {
          console.error('Failed to track visit:', error)
        }
      }
    }

    trackVisit()
  }, [searchParams])

  return <>{children}</>
}
