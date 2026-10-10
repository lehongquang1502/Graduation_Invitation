import { DisplaySettings } from './DisplaySettings'
import { usePreferences } from '../preferences'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Calendar, AlertCircle, Music, VolumeX, Menu, X } from 'lucide-react'
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
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!mobileOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMobileOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [mobileOpen])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'})
    setMobileOpen(false)
  }

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <nav className="glass-ivory fixed top-0 left-0 right-0 z-50 hidden lg:flex items-center justify-between px-8 h-16 shadow-sm">

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
      <div className="glass-ivory fixed top-0 left-0 right-0 z-50 flex lg:hidden items-center justify-between px-4 h-14 shadow-sm">
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
          <button
            onClick={() => setMobileOpen(true)} aria-label={t("Mở menu")} aria-expanded={mobileOpen}
            className="p-2 rounded-full"
            style={{ color: 'var(--color-jade-hero)'}}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[60]"
              style={{ background: 'rgba(20,46,35,0.28)'}}
            />
            <motion.div
              initial={{ x: '100%'}}
              animate={{ x: 0 }}
              exit={{ x: '100%'}}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-72 flex flex-col"
              style={{ background: '#e4efe6 url(/images/jade-marbling.webp) center / 1600px 1200px', borderLeft: '1px solid var(--color-border-strong)', boxShadow: '-8px 0 32px rgba(22,51,40,0.1)'}}
            >
              <div className="flex items-center justify-between p-6">
                <span className="font-serif text-sm tracking-widest" style={{ color: '#8a713c'}}>
                  MENU
                </span>
                <button onClick={() => setMobileOpen(false)} aria-label={t("Đóng menu")} style={{ color: 'var(--color-jade-deep)'}}>
                  <X size={20} />
                </button>
              </div>

              <div className="divider-gold mx-6"/>

              <nav className="flex flex-col gap-1 p-4 flex-1">
                {navItems.map((item, i) => {
                  const Icon   = item.icon
                  const isAct  = activeId === item.id
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => scrollTo(item.id)}
                      className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-200"
                      style={
                        {
                              color: isAct ? 'var(--color-jade-deep)' : 'var(--color-body)',
                              background: isAct ? 'var(--color-surface)' : 'transparent',
                              border: isAct ? '1px solid var(--color-border)' : '1px solid transparent',
                            }
                      }
                    >
                      <Icon size={18} />
                      <span className="font-body font-medium text-sm">{t(item.label)}</span>
                    </motion.button>
                  )
                })}
              </nav>

              <div className="p-6">
                <div className="divider-gold"/>
                <p className="text-center font-body text-xs mt-4" style={{ color: 'var(--color-sub)'}}>
                  17 · 10 · 2026
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
