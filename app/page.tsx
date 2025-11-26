import { Suspense } from 'react'
import { Hero } from '@/components/landing/Hero'
import { BookDescription } from '@/components/landing/BookDescription'
import { Leaderboard } from '@/components/landing/Leaderboard'
import { CTAButton } from '@/components/landing/CTAButton'
import { TrackingWrapper } from '@/components/landing/TrackingWrapper'

export default function Home() {
  return (
    <Suspense fallback={null}>
      <TrackingWrapper>
        <main className="min-h-screen pb-32">
          <Hero />
          <BookDescription />
          <Leaderboard />
          <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-threshold-500 to-transparent z-50">
            <CTAButton />
          </div>
        </main>
      </TrackingWrapper>
    </Suspense>
  )
}
