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

      console.log('[Tracking] URL params:', { referralCode, utmSource, utmMedium, utmCampaign })

      // Only track if there's a referral code or UTM parameters
      if (referralCode || utmSource) {
        try {
          console.log('[Tracking] Sending track request...')
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
          console.log('[Tracking] API response:', data)
          
          // Store click ID for conversion tracking
          if (data.success && data.clickId) {
            sessionStorage.setItem('clickId', data.clickId)
            console.log('[Tracking] Stored clickId:', data.clickId)
          }
          
          // Store referral code for conversion tracking
          if (referralCode) {
            sessionStorage.setItem('referralCode', referralCode)
            console.log('[Tracking] Stored referralCode:', referralCode)
          }
        } catch (error) {
          console.error('[Tracking] Failed to track visit:', error)
        }
      } else {
        console.log('[Tracking] No referral code or UTM params, skipping tracking')
      }
    }

    trackVisit()
  }, [searchParams])

  return <>{children}</>
}
