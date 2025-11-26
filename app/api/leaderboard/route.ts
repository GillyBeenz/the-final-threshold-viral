import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

export async function GET() {
  try {
    // Get top referrers with their stats
    const { data, error } = await supabase
      .from('top_referrers')
      .select('*')
      .limit(10)
    
    if (error) throw error
    
    // Add badges based on performance
    const leaderboard = (data as any[]).map((referrer: any, index: number) => {
      let badge = ''
      const clicks = referrer.total_clicks
      
      if (clicks >= 100) {
        badge = 'Truth Seeker'
      } else if (clicks >= 50) {
        badge = 'Reality Breaker'
      } else if (clicks >= 10) {
        badge = 'Threshold Spreader'
      }
      
      return {
        rank: index + 1,
        referralCode: referrer.referral_code.substring(0, 4) + '***', // Partially hide code
        totalClicks: referrer.total_clicks,
        conversions: referrer.conversions,
        badge,
        shareChannel: referrer.share_channel,
      }
    })
    
    return NextResponse.json({ success: true, leaderboard })
  } catch (error) {
    console.error('Leaderboard error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch leaderboard' }, { status: 500 })
  }
}
