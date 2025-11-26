import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { referralCode, utmSource, utmMedium, utmCampaign } = body
    
    const userAgent = request.headers.get('user-agent') || ''
    
    // Determine device type
    let deviceType = 'desktop'
    if (userAgent.toLowerCase().includes('mobile') || userAgent.toLowerCase().includes('android') || userAgent.toLowerCase().includes('iphone')) {
      deviceType = 'mobile'
    } else if (userAgent.toLowerCase().includes('tablet') || userAgent.toLowerCase().includes('ipad')) {
      deviceType = 'tablet'
    }
    
    // Get referral ID if code provided
    let referralId: string | null = null
    if (referralCode) {
      const { data } = await supabase
        .from('referrals')
        .select('id')
        .eq('referral_code', referralCode)
        .single()
      
      referralId = (data as any)?.id || null
    }
    
    // Insert click
    const { data, error } = await supabase
      .from('clicks')
      .insert({
        referral_id: referralId,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        device_type: deviceType,
        landing_page: true,
        converted: false,
      } as any)
      .select('id')
      .single()
    
    if (error) throw error
    
    return NextResponse.json({ success: true, clickId: (data as any)?.id })
  } catch (error) {
    console.error('Track error:', error)
    return NextResponse.json({ success: false, error: 'Failed to track' }, { status: 500 })
  }
}
