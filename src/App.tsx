import { MotionConfig } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { JadeOpening } from './components/JadeOpening'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { EventDetails } from './components/EventDetails'
import { VisitorGuidelines } from './components/VisitorGuidelines'
import { FloatingContactWidget } from './components/FloatingContactWidget'
import { Footer } from './components/Footer'
import { useSoundCloudPlayer } from './hooks/useSoundCloudPlayer'
import { SoundCloudMusic } from './components/SoundCloudMusic'

export default function App() {
  const [opened, setOpened] = useState(false)
  const invitationRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (opened) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      invitationRef.current?.focus({ preventScroll: true })
    }
  }, [opened])
  const { iframeRef, isPlaying, toggle, error } = useSoundCloudPlayer(opened)

  return (
    <MotionConfig reducedMotion="user">
      {opened ? (
        <div className="relative min-h-screen">
          <Navbar isPlaying={isPlaying} onAudioToggle={toggle} />
          <main ref={invitationRef} tabIndex={-1} className="invitation-main">
            <HeroSection />
            <div className="ivory-content">
              <EventDetails />
              <VisitorGuidelines />
            </div>
            <SoundCloudMusic iframeRef={iframeRef} error={error} />
          </main>
          <Footer />
          <FloatingContactWidget />
        </div>
      ) : (
        <JadeOpening onOpen={() => setOpened(true)} />
      )}
    </MotionConfig>
  )
}
