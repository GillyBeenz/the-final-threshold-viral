// Social Sharing Utilities

import type { ShareChannel, ShareChannelType } from '@/types'

/**
 * Share channel configurations
 */
export const shareChannels: ShareChannel[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: 'MessageCircle',
    color: '#25D366',
    shareUrl: (url, message) => 
      `https://wa.me/?text=${encodeURIComponent(message + ' ' + url)}`,
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    icon: 'Twitter',
    color: '#000000',
    shareUrl: (url, message) => 
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`,
  },
  {
    id: 'messenger',
    name: 'Messenger',
    icon: 'MessageSquare',
    color: '#0084FF',
    shareUrl: (url, message) => 
      `fb-messenger://share?link=${encodeURIComponent(url)}`,
  },
  {
    id: 'email',
    name: 'Email',
    icon: 'Mail',
    color: '#EA4335',
    shareUrl: (url, message) => 
      `mailto:?subject=${encodeURIComponent('The Final Threshold')}&body=${encodeURIComponent(message + '\n\n' + url)}`,
  },
  {
    id: 'link',
    name: 'Copy Link',
    icon: 'Link',
    color: '#6366F1',
    shareUrl: (url) => url,
  },
]

/**
 * Get default share message
 */
export function getShareMessage(referralCode: string): string {
  return `I just discovered "The Final Threshold" - a gripping dystopian journey that challenges everything you think you know. Experience it yourself:`
}

/**
 * Get share URL for a specific channel
 */
export function getShareUrl(
  channel: ShareChannelType,
  referralUrl: string,
  message: string
): string {
  const channelConfig = shareChannels.find(c => c.id === channel)
  if (!channelConfig) return referralUrl
  
  return channelConfig.shareUrl(referralUrl, message)
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    document.body.appendChild(textArea)
    textArea.select()
    
    try {
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    } catch (e) {
      document.body.removeChild(textArea)
      return false
    }
  }
}

/**
 * Check if Web Share API is available
 */
export function canUseWebShare(): boolean {
  return typeof navigator !== 'undefined' && 'share' in navigator
}

/**
 * Use native Web Share API
 */
export async function nativeShare(
  title: string,
  text: string,
  url: string
): Promise<boolean> {
  if (!canUseWebShare()) return false
  
  try {
    await navigator.share({ title, text, url })
    return true
  } catch (err) {
    // User cancelled or error occurred
    return false
  }
}

/**
 * Generate meta tags for social sharing
 */
export function generateMetaTags(params: {
  title: string
  description: string
  image: string
  url: string
}) {
  return {
    title: params.title,
    description: params.description,
    openGraph: {
      title: params.title,
      description: params.description,
      url: params.url,
      siteName: 'The Final Threshold',
      images: [
        {
          url: params.image,
          width: 1200,
          height: 630,
          alt: params.title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: params.title,
      description: params.description,
      images: [params.image],
    },
  }
}
