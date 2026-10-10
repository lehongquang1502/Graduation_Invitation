import { usePreferences } from '../preferences'

export function Footer() {
  const { t } = usePreferences()
  return (
    <footer className="section-jade relative py-16 md:py-20 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)'}} />
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <div className="footer-flourish" aria-hidden="true" />
        <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-5" style={{ color: 'var(--color-heading)'}}>
          {t('Mong được gặp bạn')}
        </h2>
        <p className="font-body text-sm md:text-base leading-relaxed" style={{ color: 'var(--color-body)'}}>
          {t('Sự góp mặt của bạn có ý nghĩa rất lớn với tôi, làm cho ngày tốt nghiệp thêm trọn vẹn và trở thành một kỷ niệm đẹp.')}
        </p>
        <div className="divider-gold max-w-48 mx-auto my-7"/>
        <p className="handwritten text-3xl" style={{ color: 'var(--color-jade-deep)'}}>Lê Hồng Quang</p>
      </div>
    </footer>
  )
}
