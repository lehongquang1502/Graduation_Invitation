import { DisplaySettings } from './DisplaySettings'
import { usePreferences } from '../preferences'
import { motion } from 'framer-motion'
import { Home, Calendar, AlertCircle, Music, VolumeX } from 'lucide-react'
import { useScrollSpy } from '../hooks/useScrollSpy'

const SECTION_IDS = ['home', 'schedule', 'notices']

const navItems = [
  { id: 'home',     label: 'Thiệp mời',   labelShort: 'Thiệp mời', icon: Home },
  { id: 'schedule', label: 'Thời gian & địa điểm', labelShort: 'Thông tin',    icon: Calendar },
  { id: 'notices',  label: 'Lưu ý',     labelShort: 'Lưu ý',   icon: AlertCircle },
]

interface NavbarProps {
  isPlaying: boolean
  onAudioToggle: () => void
}

export function Navbar({ isPlaying, onAudioToggle }: NavbarProps) {
  const { t } = usePreferences()
  const activeId = useScrollSpy(SECTION_IDS)
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'})
  }

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <nav className="desktop-header glass-ivory fixed top-0 left-0 right-0 z-50 hidden lg:flex items-center justify-between px-8 h-16 shadow-sm">

        {/* Logo */}
        <div className="flex items-center gap-3 select-none">
          <span className="nav-monogram" aria-hidden="true">Q</span>
          <div>
            <div className="font-serif text-sm font-semibold tracking-normal" style={{ color: 'var(--color-jade-hero)'}}>
              LÊ HỒNG QUANG
            </div>
            <div className="font-body text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: 'var(--color-sage)'}}>
              {t("Tốt nghiệp 2026")}
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeId === item.id
            return (
              <button
                key={item.id}
                aria-current={isActive ? "location" : undefined}
                onClick={() => scrollTo(item.id)}
                className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-body)',
                  ...(isActive
                    ? { color: 'var(--color-jade-hero)', background: 'rgba(220,228,220,0.4)'}
                    : { color: 'rgba(10,29,22,0.65)'}),
                }}
              >
                {t(item.label)}
                {isActive && (
                  <motion.div
                    layoutId="nav-dot"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: 'var(--color-gold)'}}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
        <DisplaySettings />
        {/* Audio Toggle */}
        <button
          onClick={onAudioToggle}
          className="flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200"
          style={{ color: 'var(--color-sage)'}}
          title={isPlaying ? t("Tắt nhạc") : t("Bật nhạc")}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(220,228,220,0.3)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <div className="relative w-7 h-7 flex items-center justify-center">
            {isPlaying ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear'}}
                className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: 'var(--color-gold)', background: 'rgba(212,175,55,0.1)'}}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-gold)'}} />
              </motion.div>
            ) : (
              <VolumeX size={18} />
            )}
          </div>
          <span className="text-xs font-body">{isPlaying ? t("Nhạc") : t("Tắt")}</span>
        </button>
        </div>
      </nav>

      {/* ── Mobile Top Bar ── */}
      <div className="mobile-header glass-ivory fixed top-0 left-0 right-0 z-50 flex lg:hidden items-center justify-between px-4 h-14 shadow-sm">
        <div className="flex items-center gap-2 select-none">
          <span className="nav-monogram" aria-hidden="true">Q</span>
          <span className="font-serif text-xs sm:text-sm font-semibold tracking-normal" style={{ color: 'var(--color-jade-hero)'}}>
            LÊ HỒNG QUANG
          </span>
        </div>
        <div className="flex items-center gap-2">
          <DisplaySettings />
          <button
            onClick={onAudioToggle}
            aria-label={isPlaying ? t("Tắt nhạc") : t("Bật nhạc")}
            className="p-2 rounded-full"
            style={{ color: isPlaying ? 'var(--color-gold)': 'var(--color-sage)'}}
          >
            {isPlaying ? <Music size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Bottom Nav (iOS dock style) ── */}
      <nav className="mobile-nav fixed bottom-0 left-0 right-0 z-50 flex lg:hidden items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon   = item.icon
          const isAct  = activeId === item.id
          return (
            <button
              key={item.id}
              aria-current={isAct ? "location" : undefined}
              onClick={() => scrollTo(item.id)}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[52px]"
              style={{
                background: isAct
                  ? 'rgba(212,175,55,0.12)'
                  : 'transparent',
                color: isAct
                  ? 'var(--color-gold)'
                  : 'rgba(163,184,173,0.7)',
              }}
            >
              <Icon size={18} />
              <span className="text-[9px] font-body font-medium">{t(item.labelShort)}</span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
