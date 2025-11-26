// Referral Code Generation and Management

import { nanoid } from 'nanoid'
import { supabase } from '@/lib/supabase/client'
import type { ShareChannelType } from '@/types'

/**
 * Generate a unique referral code
 * Format: 8 characters, alphanumeric, URL-safe
 */
export function generateReferralCode(): string {
  // Use nanoid for URL-safe, unique codes
  // Alphabet excludes ambiguous characters (0, O, I, l)
  const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZ'
  return nanoid(8).toUpperCase().split('').map(char => {
    const index = char.charCodeAt(0) % alphabet.length
    return alphabet[index]
  }).join('')
}

/**
 * Create a new referral in the database
 */
export async function createReferral(
  shareChannel: ShareChannelType,
  userAgent?: string
): Promise<{ code: string; error: Error | null }> {
  try {
    const code = generateReferralCode()
    
    const { error } = await supabase
      .from('referrals')
      .insert({
        referral_code: code,
        share_channel: shareChannel,
        user_agent: userAgent,
        source_page: 'landing',
      } as any)
    
    if (error) {
      // If code collision (unlikely), try again
      if (error.code === '23505') {
        return createReferral(shareChannel, userAgent)
      }
      throw error
    }
    
    return { code, error: null }
  } catch (err) {
    return { code: '', error: err as Error }
  }
}

/**
 * Build a referral URL with UTM parameters
 */
export function buildReferralUrl(
  referralCode: string,
  baseUrl: string,
  shareChannel: ShareChannelType
): string {
  const url = new URL(baseUrl)
  url.searchParams.set('ref', referralCode)
  url.searchParams.set('utm_source', shareChannel)
  url.searchParams.set('utm_medium', 'referral')
  url.searchParams.set('utm_campaign', 'book_launch')
  
  return url.toString()
}

/**
 * Build Amazon URL with tracking
 */
export function buildAmazonUrl(
  amazonBaseUrl: string,
  referralCode?: string
): string {
  const url = new URL(amazonBaseUrl)
  
  if (referralCode) {
    // Add custom tag for tracking (if you have Amazon Associates)
    // url.searchParams.set('tag', 'your-associate-tag')
    url.searchParams.set('ref_', `tft_${referralCode}`)
  }
  
  return url.toString()
}

/**
 * Get referral by code
 */
export async function getReferralByCode(code: string) {
  const { data, error } = await supabase
    .from('referrals')
    .select('*')
    .eq('referral_code', code)
    .single()
  
  return { data, error }
}

/**
 * Validate referral code format
 */
export function isValidReferralCode(code: string): boolean {
  return /^[A-Z0-9]{8}$/.test(code)
}
