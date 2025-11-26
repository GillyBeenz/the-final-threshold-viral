// Application Types

export interface ShareChannel {
  id: string
  name: string
  icon: string
  color: string
  shareUrl: (url: string, message: string) => string
}

export interface ReferralLink {
  code: string
  url: string
  qrCodeDataUrl?: string
}

export interface AnalyticsData {
  totalClicks: number
  uniqueVisitors: number
  conversions: number
  conversionRate: number
  topReferrers: TopReferrerData[]
  dailyStats: DailyStatsData[]
  deviceBreakdown: DeviceBreakdown
  shareChannelBreakdown: ShareChannelBreakdown[]
}

export interface TopReferrerData {
  referralCode: string
  shareChannel: string | null
  totalClicks: number
  conversions: number
  createdAt: string
}

export interface DailyStatsData {
  date: string
  totalClicks: number
  uniqueReferrals: number
  conversions: number
  mobileClicks: number
  desktopClicks: number
}

export interface DeviceBreakdown {
  mobile: number
  desktop: number
  tablet: number
}

export interface ShareChannelBreakdown {
  channel: string
  count: number
  percentage: number
}

export interface AmazonUrls {
  paperback: string
  kindle: string
}

export interface AppSettings {
  amazonUrls: AmazonUrls
  abTestEnabled: boolean
  ctaText: string
  shareMessage: string
  analyticsEnabled: boolean
}

export type ShareChannelType = 
  | 'whatsapp'
  | 'instagram'
  | 'x'
  | 'messenger'
  | 'email'
  | 'link'
  | 'qr'

export type DeviceType = 'mobile' | 'desktop' | 'tablet'

export interface TrackingParams {
  referralCode?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}

export interface ClickEvent {
  referralId?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  deviceType: DeviceType
  ipHash: string
  countryCode?: string
  landingPage: boolean
}

export interface ConversionEvent {
  clickId?: string
  referralId?: string
  amazonUrl: string
}
