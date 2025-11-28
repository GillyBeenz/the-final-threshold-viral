import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function GET() {
  try {
    // Fetch total clicks
    const { count: clicksCount } = await supabaseServer
      .from('clicks')
      .select('*', { count: 'exact', head: true })

    // Fetch total referrals
    const { count: referralsCount } = await supabaseServer
      .from('referrals')
      .select('*', { count: 'exact', head: true })

    // Fetch total conversions
    const { count: conversionsCount } = await supabaseServer
      .from('conversions')
      .select('*', { count: 'exact', head: true })

    // Fetch top referrers
    const { data: topReferrers } = await supabaseServer
      .from('top_referrers')
      .select('*')
      .limit(10)

    const totalClicks = clicksCount || 0
    const totalConversions = conversionsCount || 0

    return NextResponse.json({
      success: true,
      stats: {
        totalClicks,
        totalReferrals: referralsCount || 0,
        totalConversions,
        conversionRate: totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0,
      },
      topReferrers: topReferrers || [],
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
