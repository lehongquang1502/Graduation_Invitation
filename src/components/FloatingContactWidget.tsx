import { usePreferences } from '../preferences'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Phone, Facebook, X } from 'lucide-react'

interface ContactLink {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  color: string
  bg: string
}

const CONTACT_LINKS: ContactLink[] = [
  {
    id: 'phone',
    label: 'Gọi điện',
    icon: <Phone size={18} />,
    href: 'tel:+84862030929',
    color: 'var(--color-pearl)',
    bg: '#2d7a54',
  },
  {
    id: 'zalo',
    label: 'Zalo',
    icon: (
      <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
        <circle cx="24"cy="24" r="24" fill="white"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0068FF">Z</text>
      </svg>
    ),
    href: 'https://zalo.me/0862030929',
    color: 'var(--color-pearl)',
    bg: '#0068FF',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    icon: <Facebook size={18} />,
    href: 'https://www.facebook.com/lehongquang15.02.04',
    color: 'var(--color-pearl)',
    bg: '#1877F2',
  },
]

export function FloatingContactWidget() {
  const { t } = usePreferences()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed contact-widget right-4 lg:right-6 z-80 flex flex-col items-end gap-3">
      {/* Contact Links */}
      <AnimatePresence>
        {open && (
          <>
            {CONTACT_LINKS.map((link, i) => (
              <motion.a
                key={link.id}
                href={link.href}
                target={link.id !== 'phone'? '_blank': undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.85 }}
                transition={{ delay: (CONTACT_LINKS.length - 1 - i) * 0.06, duration: 0.2, ease: 'easeOut'}}
                className="flex items-center gap-3 px-4 py-2.5 rounded-full shadow-lg transition-transform duration-150 hover:scale-105"
                style={{
                  background: link.bg,
                  color: link.color,
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: `0 4px 16px ${link.bg}60`,
                  textDecoration: 'none',
                }}
              >
                <span className="font-body text-xs font-medium">{t(link.label)}</span>
                {link.icon}
              </motion.a>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={() => setOpen((p) => !p)}
        whileTap={{ scale: 0.9 }}
        className="relative flex flex-col items-center justify-center w-14 h-14 rounded-full shadow-xl"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border-strong)',
          boxShadow: '0 6px 20px rgba(22,51,40,0.12)',
        }}
        aria-label={t("Liên hệ")} aria-expanded={open}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} style={{ color: 'var(--color-jade-mid)'}} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={22} style={{ color: 'var(--color-jade-mid)'}} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* "Liên hệ"label badge */}
      {!open && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-16 bottom-3 px-2.5 py-1 rounded-full text-[10px] font-body font-semibold whitespace-nowrap shadow-md"
          style={{
            background: 'var(--color-surface)',
            color: 'var(--color-jade-deep)',
            border: '1px solid var(--color-border-strong)',
          }}
        >
          {t("Liên hệ")}
        </motion.div>
      )}
    </div>
  )
}
