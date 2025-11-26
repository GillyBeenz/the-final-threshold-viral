import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { clickId, referralCode, amazonUrl } = body
    
    // Get referral ID if code provided
    let referralId: string | null = null
    if (referralCode) {
      const { data } = await supabaseServer
        .from('referrals')
        .select('id')
        .eq('referral_code', referralCode)
        .single()
      
      referralId = (data as any)?.id || null
    }
    
    // Insert conversion
    const { error: conversionError } = await supabaseServer
      .from('conversions')
      .insert({
        click_id: clickId,
        referral_id: referralId,
        amazon_url: amazonUrl,
      } as any)
    
    if (conversionError) throw conversionError
    
    // Note: Conversions are tracked in the conversions table
    // The clicks table conversion flag is optional and can be updated later via admin dashboard
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Conversion error:', error)
    return NextResponse.json({ success: false, error: 'Failed to track conversion' }, { status: 500 })
  }
}
