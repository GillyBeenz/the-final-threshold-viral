'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { nanoid } from 'nanoid'
import { QRCodeSVG } from 'qrcode.react'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase/client'
import { Copy, Check, Facebook, Twitter, Mail, MessageCircle } from 'lucide-react'

export default function SharePage() {
  const router = useRouter()
  const [referralCode, setReferralCode] = useState<string>('')
  const [referralUrl, setReferralUrl] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateReferralLink = async () => {
    setIsGenerating(true)
    
    try {
      // Generate unique referral code
      const code = nanoid(8)
      
      // Insert into database
      const { data, error } = await supabase
        .from('referrals')
        .insert({
          referral_code: code,
          share_channel: 'link',
        } as any)
        .select()
        .single()
      
      if (error) throw error
      
      // Create referral URL
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin
      const url = `${baseUrl}?ref=${code}`
      
      setReferralCode(code)
      setReferralUrl(url)
    } catch (error) {
      console.error('Error generating referral:', error)
      alert('Failed to generate referral link. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const shareToSocial = (platform: string) => {
    const message = encodeURIComponent('Check out The Final Threshold - a gripping dystopian thriller!')
    const url = encodeURIComponent(referralUrl)
    
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${message}&url=${url}`,
      whatsapp: `https://wa.me/?text=${message}%20${url}`,
      email: `mailto:?subject=Check out The Final Threshold&body=${message}%0A%0A${url}`,
    }
    
    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400')
    }
  }

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => router.push('/')}
            className="text-threshold-300 hover:text-threshold-100 mb-6 inline-flex items-center gap-2"
          >
            ← Back to book
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Share <span className="text-accent-cyan">The Final Threshold</span>
          </h1>
          <p className="text-lg text-threshold-300">
            Generate your unique referral link and share this thriller with the world
          </p>
        </div>

        {/* Generate Button */}
        {!referralUrl && (
          <div className="text-center">
            <Button
              onClick={generateReferralLink}
              disabled={isGenerating}
              className="px-8 py-4 text-lg bg-accent-cyan hover:bg-accent-cyan/90 text-threshold-900"
            >
              {isGenerating ? 'Generating...' : 'Generate My Referral Link'}
            </Button>
          </div>
        )}

        {/* Referral Link Display */}
        {referralUrl && (
          <div className="space-y-8">
            {/* URL Copy Section */}
            <div className="bg-threshold-700 rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold text-threshold-100">Your Referral Link</h2>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={referralUrl}
                  readOnly
                  className="flex-1 bg-threshold-800 text-threshold-100 px-4 py-3 rounded-lg border border-threshold-600 focus:outline-none focus:border-accent-cyan"
                />
                <Button
                  onClick={copyToClipboard}
                  variant="secondary"
                  className="px-6"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </Button>
              </div>
              
              {copied && (
                <p className="text-sm text-accent-cyan">✓ Copied to clipboard!</p>
              )}
            </div>

            {/* QR Code */}
            <div className="bg-threshold-700 rounded-lg p-6 text-center space-y-4">
              <h2 className="text-xl font-semibold text-threshold-100">QR Code</h2>
              <div className="bg-white p-6 rounded-lg inline-block">
                <QRCodeSVG value={referralUrl} size={200} />
              </div>
              <p className="text-sm text-threshold-400">
                Scan to visit your referral link
              </p>
            </div>

            {/* Social Share Buttons */}
            <div className="bg-threshold-700 rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold text-threshold-100">Share On</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => shareToSocial('facebook')}
                  className="flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                  <span>Facebook</span>
                </button>
                
                <button
                  onClick={() => shareToSocial('twitter')}
                  className="flex items-center justify-center gap-2 bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  <span>Twitter</span>
                </button>
                
                <button
                  onClick={() => shareToSocial('whatsapp')}
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#25D366]/90 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </button>
                
                <button
                  onClick={() => shareToSocial('email')}
                  className="flex items-center justify-center gap-2 bg-threshold-600 hover:bg-threshold-500 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </button>
              </div>
            </div>

            {/* Badge Achievement System */}
            <div className="bg-gradient-to-br from-threshold-700 to-threshold-800 rounded-lg p-6 space-y-4 border border-accent-cyan/20">
              <h2 className="text-xl font-semibold text-threshold-100">Earn Recognition</h2>
              <p className="text-threshold-300 text-sm">
                Share your link and climb the ranks. Earn badges and get featured on the leaderboard!
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-threshold-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <span className="text-xl">🌟</span>
                    </div>
                    <div>
                      <p className="font-semibold text-cyan-400">Threshold Spreader</p>
                      <p className="text-xs text-threshold-400">10+ clicks</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-threshold-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-xl">💫</span>
                    </div>
                    <div>
                      <p className="font-semibold text-purple-400">Reality Breaker</p>
                      <p className="text-xs text-threshold-400">50+ clicks</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-threshold-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <span className="text-xl">⭐</span>
                    </div>
                    <div>
                      <p className="font-semibold text-yellow-400">Truth Seeker</p>
                      <p className="text-xs text-threshold-400">100+ clicks</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-threshold-400 text-center pt-2">
                Top sharers get featured on the landing page leaderboard
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-threshold-700 rounded-lg p-6 space-y-3">
              <h2 className="text-xl font-semibold text-threshold-100">How It Works</h2>
              <ul className="space-y-2 text-threshold-300">
                <li className="flex items-start gap-2">
                  <span className="text-accent-cyan">1.</span>
                  <span>Share your unique link with friends, family, or on social media</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-cyan">2.</span>
                  <span>When someone clicks your link and visits the book page, it gets tracked</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-cyan">3.</span>
                  <span>Climb the leaderboard and earn badges as more people click your link!</span>
                </li>
              </ul>
            </div>

            {/* Generate New Link */}
            <div className="text-center">
              <button
                onClick={() => {
                  setReferralUrl('')
                  setReferralCode('')
                }}
                className="text-threshold-400 hover:text-threshold-200 text-sm"
              >
                Generate a new link
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
