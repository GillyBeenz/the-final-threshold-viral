'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { BarChart3, Users, TrendingUp, MousePointerClick, Lock } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Stats {
  totalClicks: number
  totalReferrals: number
  totalConversions: number
  conversionRate: number
}

interface TopReferrer {
  referral_code: string
  share_channel: string | null
  total_clicks: number
  conversions: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [stats, setStats] = useState<Stats>({
    totalClicks: 0,
    totalReferrals: 0,
    totalConversions: 0,
    conversionRate: 0,
  })
  const [topReferrers, setTopReferrers] = useState<TopReferrer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if already authenticated in session
    const auth = sessionStorage.getItem('admin_authenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
      fetchAnalytics()
    } else {
      setLoading(false)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple password check (stored in environment variable)
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'threshold2025'
    
    if (password === adminPassword) {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_authenticated', 'true')
      setError('')
      fetchAnalytics()
    } else {
      setError('Incorrect password')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_authenticated')
    setPassword('')
  }

  const fetchAnalytics = async () => {
    try {
      // Fetch total clicks
      const { count: clicksCount } = await supabase
        .from('clicks')
        .select('*', { count: 'exact', head: true })

      // Fetch total referrals
      const { count: referralsCount } = await supabase
        .from('referrals')
        .select('*', { count: 'exact', head: true })

      // Fetch total conversions
      const { count: conversionsCount } = await supabase
        .from('conversions')
        .select('*', { count: 'exact', head: true })

      // Fetch top referrers
      const { data: topData } = await supabase
        .from('top_referrers')
        .select('*')
        .limit(10)

      const totalClicks = clicksCount || 0
      const totalConversions = conversionsCount || 0

      setStats({
        totalClicks,
        totalReferrals: referralsCount || 0,
        totalConversions,
        conversionRate: totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0,
      })

      setTopReferrers(topData || [])
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-threshold-700 rounded-lg p-8 border border-threshold-600">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-accent-cyan/20 flex items-center justify-center">
                <Lock className="w-8 h-8 text-accent-cyan" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-center mb-2">Admin Access</h1>
            <p className="text-threshold-400 text-center mb-6">
              Enter password to view analytics dashboard
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full bg-threshold-800 text-threshold-100 px-4 py-3 rounded-lg border border-threshold-600 focus:outline-none focus:border-accent-cyan"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-accent-cyan hover:bg-accent-cyan/90 text-threshold-900"
              >
                Access Dashboard
              </Button>
            </form>

            <button
              onClick={() => router.push('/')}
              className="w-full mt-4 text-sm text-threshold-400 hover:text-threshold-200"
            >
              ← Back to landing page
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-threshold-300">Loading analytics...</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => router.push('/')}
              className="text-threshold-300 hover:text-threshold-100 inline-flex items-center gap-2"
            >
              ← Back to landing page
            </button>
            <button
              onClick={handleLogout}
              className="text-threshold-400 hover:text-red-400 text-sm"
            >
              Logout
            </button>
          </div>
          
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8 text-accent-cyan" />
            <h1 className="text-4xl md:text-5xl font-bold">Analytics Dashboard</h1>
          </div>
          <p className="text-threshold-300">The Final Threshold - Performance Metrics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Clicks */}
          <div className="bg-threshold-700 rounded-lg p-6 border border-threshold-600">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-threshold-400 text-sm font-semibold">Total Clicks</h3>
              <MousePointerClick className="w-5 h-5 text-accent-cyan" />
            </div>
            <p className="text-3xl font-bold text-threshold-100">{stats.totalClicks}</p>
          </div>

          {/* Total Referrals */}
          <div className="bg-threshold-700 rounded-lg p-6 border border-threshold-600">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-threshold-400 text-sm font-semibold">Referral Links</h3>
              <Users className="w-5 h-5 text-accent-cyan" />
            </div>
            <p className="text-3xl font-bold text-threshold-100">{stats.totalReferrals}</p>
          </div>

          {/* Total Conversions */}
          <div className="bg-threshold-700 rounded-lg p-6 border border-threshold-600">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-threshold-400 text-sm font-semibold">Conversions</h3>
              <TrendingUp className="w-5 h-5 text-accent-cyan" />
            </div>
            <p className="text-3xl font-bold text-threshold-100">{stats.totalConversions}</p>
          </div>

          {/* Conversion Rate */}
          <div className="bg-threshold-700 rounded-lg p-6 border border-threshold-600">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-threshold-400 text-sm font-semibold">Conversion Rate</h3>
              <BarChart3 className="w-5 h-5 text-accent-cyan" />
            </div>
            <p className="text-3xl font-bold text-threshold-100">
              {stats.conversionRate.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Top Referrers Table */}
        <div className="bg-threshold-700 rounded-lg border border-threshold-600 overflow-hidden">
          <div className="px-6 py-4 bg-threshold-800/50 border-b border-threshold-600">
            <h2 className="text-xl font-bold text-threshold-100">Top Referrers</h2>
          </div>

          {topReferrers.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-threshold-400">No referral data yet. Start sharing!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-threshold-800/30">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-threshold-400 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-threshold-400 uppercase tracking-wider">
                      Referral Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-threshold-400 uppercase tracking-wider">
                      Channel
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-threshold-400 uppercase tracking-wider">
                      Clicks
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-threshold-400 uppercase tracking-wider">
                      Conversions
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-threshold-400 uppercase tracking-wider">
                      Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-threshold-600">
                  {topReferrers.map((referrer, index) => {
                    const rate = referrer.total_clicks > 0
                      ? (referrer.conversions / referrer.total_clicks) * 100
                      : 0

                    return (
                      <tr key={referrer.referral_code} className="hover:bg-threshold-700/30">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-threshold-300 font-semibold">
                            #{index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <code className="text-accent-cyan font-mono">
                            {referrer.referral_code}
                          </code>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-threshold-300 capitalize">
                            {referrer.share_channel || 'direct'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className="text-threshold-100 font-semibold">
                            {referrer.total_clicks}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className="text-threshold-100 font-semibold">
                            {referrer.conversions}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className="text-accent-cyan font-semibold">
                            {rate.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
