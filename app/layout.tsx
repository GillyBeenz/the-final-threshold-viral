import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
  title: 'The Final Threshold | A Gripping Dystopian Thriller by Gordon P. Carter',
  description: 'A gripping, high-stakes thriller that challenges everything we know about ethics, power, and survival. For fans of Dan Brown, Margaret Atwood, and Kazuo Ishiguro.',
  openGraph: {
    title: 'The Final Threshold - Dystopian Thriller',
    description: 'A gripping thriller that will leave you questioning the future of society. Get your copy today!',
    images: ['/images/book-cover.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
