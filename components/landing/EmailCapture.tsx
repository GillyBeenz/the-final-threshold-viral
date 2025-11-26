'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export function EmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/email-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setMessage('Thanks! Check your email for exclusive updates.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Failed to sign up. Please try again.')
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus('idle')
      setMessage('')
    }, 5000)
  }

  return (
    <section className="py-20 px-4 bg-threshold-600/50">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold">
          Get Exclusive Updates
        </h2>
        
        <p className="text-lg text-threshold-200">
          Join our community and be the first to know about new releases, exclusive content, and special offers.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 px-4 py-3 rounded-lg bg-threshold-700 border border-threshold-500 text-white placeholder-threshold-400 focus:outline-none focus:ring-2 focus:ring-accent-cyan disabled:opacity-50"
          />
          
          <Button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="bg-accent-cyan hover:bg-accent-cyan/90 text-threshold-900 font-bold whitespace-nowrap"
          >
            {status === 'loading' ? 'Signing up...' : status === 'success' ? '✓ Signed up!' : 'Sign Up'}
          </Button>
        </form>

        {message && (
          <p className={`text-sm ${status === 'success' ? 'text-accent-cyan' : 'text-red-400'}`}>
            {message}
          </p>
        )}

        <p className="text-xs text-threshold-400">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
