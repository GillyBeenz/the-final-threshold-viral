'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function TestTracking() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const testTracking = async () => {
      const referralCode = searchParams.get('ref')
      
      setStatus({
        referralCode,
        hasRef: !!referralCode,
        timestamp: new Date().toISOString(),
      })

      if (referralCode) {
        try {
          const response = await fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              referralCode,
              deviceType: 'desktop',
              landingPage: true,
            }),
          })

          const data = await response.json()
          
          setStatus((prev: any) => ({
            ...prev,
            apiResponse: data,
            responseStatus: response.status,
            clickId: data.clickId,
            sessionStorage: {
              clickId: sessionStorage.getItem('clickId'),
              referralCode: sessionStorage.getItem('referralCode'),
            }
          }))

          // Store in sessionStorage
          if (data.success && data.clickId) {
            sessionStorage.setItem('clickId', data.clickId)
            sessionStorage.setItem('referralCode', referralCode)
          }
        } catch (error: any) {
          setStatus((prev: any) => ({
            ...prev,
            error: error.message,
          }))
        }
      }
      
      setLoading(false)
    }

    testTracking()
  }, [searchParams])

  return (
    <div className="min-h-screen p-8 bg-threshold-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Tracking Test Page</h1>
        
        <div className="bg-threshold-800 rounded-lg p-6 border border-threshold-600">
          <h2 className="text-xl font-semibold mb-4">Status</h2>
          
          {loading ? (
            <p className="text-threshold-400">Testing tracking...</p>
          ) : (
            <pre className="bg-threshold-900 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(status, null, 2)}
            </pre>
          )}
        </div>

        <div className="mt-8 space-y-4">
          <div className="bg-threshold-800 rounded-lg p-6 border border-threshold-600">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <ol className="list-decimal list-inside space-y-2 text-threshold-300">
              <li>Generate a referral link from /share page</li>
              <li>Copy the referral code (e.g., ?ref=ABC123)</li>
              <li>Visit this page with the ref parameter: /test-tracking?ref=ABC123</li>
              <li>Check the status above</li>
              <li>Then check the admin dashboard to see if the click was recorded</li>
            </ol>
          </div>

          <div className="bg-threshold-800 rounded-lg p-6 border border-threshold-600">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <div className="space-y-2">
              <a href="/share" className="block text-accent-cyan hover:underline">
                → Generate Referral Link
              </a>
              <a href="/admin" className="block text-accent-cyan hover:underline">
                → View Admin Dashboard
              </a>
              <a href="/" className="block text-accent-cyan hover:underline">
                → Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
