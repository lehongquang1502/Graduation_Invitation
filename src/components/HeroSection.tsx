import { guests } from '../guests'
import { usePreferences } from '../preferences'
import { useSearchParams } from 'react-router-dom'
import { MapPin } from 'lucide-react'

export function HeroSection() {
  const { t } = usePreferences()
  const [searchParams] = useSearchParams()
  const guestName = (searchParams.get('to') || searchParams.get('guest') || '').replace(/[+_]/g, ' ').trim()
  const inviteId = searchParams.get('invite') || ''
  const displayName = guests[inviteId] || guestName || t('Bạn')

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }

  return (
    <section id="home" className="section-jade invitation-hero letter-hero relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="invitation-letter relative z-10 mx-auto text-center">

        <div className="letter-recipient">
          <p className="font-serif letter-salutation">{t('Thân gửi')}</p>
          <p className="handwritten guest-name">{displayName}</p>
        </div>

        <p className="letter-message font-body">
          {t('Trân trọng mời bạn đến chung vui cùng tôi và gia đình trong ngày tốt nghiệp.')}
        </p>
        <div className="divider-gold letter-divider" aria-hidden="true" />

        <h1 className="section-title letter-title" style={{ color: '#8a713c' }}>{t('Lễ tốt nghiệp của')}</h1>
        <p className="handwritten letter-graduate">Lê Hồng Quang</p>
        <p className="font-body letter-degree">{t('Cử nhân Khoa học máy tính')}</p>
        <p className="font-body letter-faculty">{t('Khoa Công nghệ Thông tin · Trường Đại học Tôn Đức Thắng')}</p>

        <p className="letter-date font-body">{t('17 tháng 10 năm 2026 · 10:00–12:00')}</p>
        <button onClick={() => scrollTo('location')} className="btn-jade inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm">
          <MapPin size={16} aria-hidden="true" />
          {t('Xem đường đi')}
        </button>
      </div>
    </section>
  )
}
