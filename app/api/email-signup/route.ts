import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existing } = await supabaseServer
      .from('email_signups')
      .select('id')
      .eq('email', email.toLowerCase())
      .single()

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Get referral code from session/cookie if available
    const referralCode = request.cookies.get('ref')?.value

    let referralId: string | null = null
    if (referralCode) {
      const { data } = await supabaseServer
        .from('referrals')
        .select('id')
        .eq('referral_code', referralCode)
        .single()
      
      referralId = (data as any)?.id || null
    }

    // Insert email signup
    const { error } = await supabaseServer
      .from('email_signups')
      .insert({
        email: email.toLowerCase(),
        referral_id: referralId,
        source: 'landing_page',
      } as any)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email signup error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to sign up' },
      { status: 500 }
    )
  }
}
