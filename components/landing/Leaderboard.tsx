'use client'

import { useEffect, useState } from 'react'
import { Trophy, TrendingUp } from 'lucide-react'

interface LeaderboardEntry {
  rank: number
  referralCode: string
  totalClicks: number
  conversions: number
  badge: string
  shareChannel: string | null
}

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/leaderboard')
      const data = await response.json()
      if (data.success) {
        setLeaderboard(data.leaderboard)
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Truth Seeker':
        return 'text-yellow-400'
      case 'Reality Breaker':
        return 'text-purple-400'
      case 'Threshold Spreader':
        return 'text-cyan-400'
      default:
        return 'text-threshold-400'
    }
  }

  if (loading) {
    return (
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-threshold-400">Loading leaderboard...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-accent-cyan" />
            <h2 className="text-3xl md:text-4xl font-bold text-threshold-100">
              Top Spreaders
            </h2>
          </div>
          <p className="text-lg text-threshold-300">
            Join the movement. Share the threshold.
          </p>
        </div>

        {leaderboard.length === 0 ? (
          <div className="bg-threshold-700/50 rounded-lg p-12 text-center border border-threshold-600">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-accent-cyan/10 flex items-center justify-center">
                <Trophy className="w-10 h-10 text-accent-cyan" />
              </div>
              <h3 className="text-2xl font-bold text-threshold-100">Be the First!</h3>
              <p className="text-threshold-300">
                The leaderboard is waiting for its first spreader. Share your referral link and claim the top spot!
              </p>
              <div className="pt-4">
                <a
                  href="/share"
                  className="inline-block px-6 py-3 bg-accent-cyan hover:bg-accent-cyan/90 text-threshold-900 font-semibold rounded-lg transition-colors"
                >
                  Get Your Referral Link
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-threshold-700/50 rounded-lg overflow-hidden border border-threshold-600">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-threshold-800/50 text-threshold-400 text-sm font-semibold">
            <div className="col-span-1">Rank</div>
            <div className="col-span-3">Code</div>
            <div className="col-span-4">Badge</div>
            <div className="col-span-2 text-center">Shares</div>
            <div className="col-span-2 text-center">Clicks</div>
          </div>

          {/* Leaderboard Entries */}
          <div className="divide-y divide-threshold-600">
            {leaderboard.map((entry) => (
              <div
                key={entry.rank}
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-threshold-700/30 transition-colors"
              >
                {/* Rank */}
                <div className="col-span-1 flex items-center">
                  {entry.rank <= 3 ? (
                    <span className="text-2xl">
                      {entry.rank === 1 && '🥇'}
                      {entry.rank === 2 && '🥈'}
                      {entry.rank === 3 && '🥉'}
                    </span>
                  ) : (
                    <span className="text-threshold-300 font-semibold">
                      #{entry.rank}
                    </span>
                  )}
                </div>

                {/* Code */}
                <div className="col-span-3 flex items-center">
                  <code className="text-accent-cyan font-mono text-sm">
                    {entry.referralCode}
                  </code>
                </div>

                {/* Badge */}
                <div className="col-span-4 flex items-center">
                  {entry.badge && (
                    <span className={`text-sm font-semibold ${getBadgeColor(entry.badge)}`}>
                      {entry.badge}
                    </span>
                  )}
                </div>

                {/* Conversions */}
                <div className="col-span-2 flex items-center justify-center">
                  <span className="text-threshold-200 font-semibold">
                    {entry.conversions}
                  </span>
                </div>

                {/* Total Clicks */}
                <div className="col-span-2 flex items-center justify-center">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-accent-cyan" />
                    <span className="text-threshold-100 font-bold">
                      {entry.totalClicks}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Badge Legend - only show if there's data */}
        {leaderboard.length > 0 && (
          <div className="mt-8 text-center space-y-2">
            <p className="text-sm text-threshold-400">Badge Levels:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="text-cyan-400">Threshold Spreader (10+ clicks)</span>
              <span className="text-purple-400">Reality Breaker (50+ clicks)</span>
              <span className="text-yellow-400">Truth Seeker (100+ clicks)</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
