import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { clickId, referralCode, amazonUrl } = body
    
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
    
    // Insert conversion
    const { error: conversionError } = await supabase
      .from('conversions')
      .insert({
        click_id: clickId,
        referral_id: referralId,
        amazon_url: amazonUrl,
      } as any)
    
    if (conversionError) throw conversionError
    
    // Update click as converted if clickId provided
    if (clickId) {
      await supabase
        .from('clicks')
        .update({ converted: true } as any)
        .eq('id', clickId)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Conversion error:', error)
    return NextResponse.json({ success: false, error: 'Failed to track conversion' }, { status: 500 })
  }
}
