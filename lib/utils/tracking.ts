// Click Tracking and Analytics Utilities

import { supabase } from '@/lib/supabase/client'
import UAParser from 'ua-parser-js'
import type { DeviceType, ClickEvent, ConversionEvent } from '@/types'

/**
 * Get device type from user agent
 */
export function getDeviceType(userAgent: string): DeviceType {
  const parser = new UAParser(userAgent)
  const deviceType = parser.getDevice().type
  
  if (deviceType === 'mobile') return 'mobile'
  if (deviceType === 'tablet') return 'tablet'
  return 'desktop'
}

/**
 * Hash IP address for privacy (client-side hashing)
 */
export async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(ip + 'salt_secret_key')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Track a click event
 */
export async function trackClick(params: {
  referralCode?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  userAgent: string
  ipAddress?: string
  landingPage?: boolean
}): Promise<{ clickId: string | null; error: Error | null }> {
  try {
    const deviceType = getDeviceType(params.userAgent)
    const ipHash = params.ipAddress ? await hashIP(params.ipAddress) : null
    
    // Get referral ID if code provided
    let referralId: string | null = null
    if (params.referralCode) {
      const { data } = await supabase
        .from('referrals')
        .select('id')
        .eq('referral_code', params.referralCode)
        .single()
      
      referralId = data?.id || null
    }
    
    const { data, error } = await supabase
      .from('clicks')
      .insert({
        referral_id: referralId,
        utm_source: params.utmSource,
        utm_medium: params.utmMedium,
        utm_campaign: params.utmCampaign,
        device_type: deviceType,
        ip_hash: ipHash,
        landing_page: params.landingPage ?? true,
        converted: false,
      })
      .select('id')
      .single()
    
    if (error) throw error
    
    return { clickId: data?.id || null, error: null }
  } catch (err) {
    console.error('Error tracking click:', err)
    return { clickId: null, error: err as Error }
  }
}

/**
 * Track a conversion (Amazon CTA click)
 */
export async function trackConversion(params: {
  clickId?: string
  referralCode?: string
  amazonUrl: string
}): Promise<{ success: boolean; error: Error | null }> {
  try {
    // Get referral ID if code provided
    let referralId: string | null = null
    if (params.referralCode) {
      const { data } = await supabase
        .from('referrals')
        .select('id')
        .eq('referral_code', params.referralCode)
        .single()
      
      referralId = data?.id || null
    }
    
    // Insert conversion
    const { error: conversionError } = await supabase
      .from('conversions')
      .insert({
        click_id: params.clickId,
        referral_id: referralId,
        amazon_url: params.amazonUrl,
      })
    
    if (conversionError) throw conversionError
    
    // Update click as converted if clickId provided
    if (params.clickId) {
      await supabase
        .from('clicks')
        .update({ converted: true })
        .eq('id', params.clickId)
    }
    
    return { success: true, error: null }
  } catch (err) {
    console.error('Error tracking conversion:', err)
    return { success: false, error: err as Error }
  }
}

/**
 * Get client IP address (server-side only)
 */
export function getClientIP(request: Request): string | null {
  // Try various headers (Vercel, Cloudflare, etc.)
  const headers = request.headers
  
  return (
    headers.get('x-real-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0] ||
    headers.get('cf-connecting-ip') ||
    null
  )
}

/**
 * Extract tracking parameters from URL
 */
export function extractTrackingParams(url: string) {
  const urlObj = new URL(url)
  const params = urlObj.searchParams
  
  return {
    referralCode: params.get('ref') || undefined,
    utmSource: params.get('utm_source') || undefined,
    utmMedium: params.get('utm_medium') || undefined,
    utmCampaign: params.get('utm_campaign') || undefined,
  }
}
