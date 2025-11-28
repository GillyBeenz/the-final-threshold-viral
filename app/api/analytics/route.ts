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

    // Fetch total conversions (all conversions)
    const { count: conversionsCount } = await supabaseServer
      .from('conversions')
      .select('*', { count: 'exact', head: true })

    // Fetch conversions from clicks (only those with click_id - referral conversions)
    const { count: referralConversionsCount } = await supabaseServer
      .from('conversions')
      .select('*', { count: 'exact', head: true })
      .not('click_id', 'is', null)

    // Fetch direct conversions (those without click_id)
    const { count: directConversionsCount } = await supabaseServer
      .from('conversions')
      .select('*', { count: 'exact', head: true })
      .is('click_id', null)

    // Fetch top referrers
    const { data: topReferrers } = await supabaseServer
      .from('top_referrers')
      .select('*')
      .limit(10)

    const totalClicks = clicksCount || 0
    const totalConversions = conversionsCount || 0
    const referralConversions = referralConversionsCount || 0
    const directConversions = directConversionsCount || 0

    return NextResponse.json({
      success: true,
      stats: {
        totalClicks,
        totalReferrals: referralsCount || 0,
        totalConversions,
        referralConversions,
        directConversions,
        conversionRate: totalClicks > 0 ? (referralConversions / totalClicks) * 100 : 0,
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
