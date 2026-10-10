import { useRef, useState } from 'react'
import { Navigation, ExternalLink, X } from 'lucide-react'
import { usePreferences } from '../preferences'

const TDTU_NAV_LINK = 'https://www.google.com/maps/dir/?api=1&destination=Ton+Duc+Thang+University%2C+19+Nguyen+Huu+Tho%2C+Ho+Chi+Minh+City&dir_action=navigate'
const TDTU_TOUR_LINK = 'https://360.tdtu.edu.vn/main/#node63,-88,-23.55,59.63,4'

export function VenueCampus() {
  const { t } = usePreferences()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [preview, setPreview] = useState({ src: '', title: '' })
  const openImage = (src: string, title: string) => {
    setPreview({ src, title })
    dialogRef.current?.showModal()
  }
  return (
    <div id="location" className="relative text-left">
      <div className="text-center mb-8">
        <div className="section-label mb-3">{t('Địa điểm tổ chức')}</div>
        <h3 className="section-title text-2xl md:text-3xl mb-3">{t('Trường Đại học Tôn Đức Thắng')}</h3>
        <p className="font-body text-sm" style={{ color: 'var(--color-sub)'}}>
          {t('19 Nguyễn Hữu Thọ, Tân Phong, Quận 7, TP. Hồ Chí Minh')}
        </p>
        <a href={TDTU_NAV_LINK} className="btn-gold inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm mt-5">
          <Navigation size={16} aria-hidden="true"/>
          {t('Chỉ đường bằng Google Maps')}
          <ExternalLink size={14} aria-hidden="true"/>
        </a>
      </div>

      <div className="campus-photos grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        <figure className="m-0 overflow-hidden rounded-2xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)'}}>
          <button type="button" onClick={() => openImage('/images/tdtu-campus-directions.png', t('Sơ đồ khuôn viên'))} className="block w-full campus-reference-image" aria-label={t('Mở ảnh sơ đồ khuôn viên')}>
            <img src="/images/tdtu-campus-directions.png"alt={t('Bản đồ TDTU đánh dấu tòa A, các cổng và đường đến bãi xe')} width="1641" height="878" loading="lazy" decoding="async" className="w-full h-full object-contain"/>
          </button>
          <figcaption className="px-5 py-4">
            <h4 className="font-serif text-lg font-semibold" style={{ color: 'var(--color-heading)'}}>{t('Sơ đồ khuôn viên')}</h4>
            <p className="font-body text-sm mt-1" style={{ color: 'var(--color-sub)' }}>{t('Nhấn ảnh để xem đường đi rõ hơn')}</p>
          </figcaption>
        </figure>
        <figure className="m-0 overflow-hidden rounded-2xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)'}}>
          <button type="button" onClick={() => openImage('/images/tdtu-hall-a-front.webp', t('Tòa A'))} className="block w-full campus-reference-image" aria-label={t('Mở ảnh Tòa A')}>
            <img src="/images/tdtu-hall-a-front.webp" alt={t('Mặt ngoài Nhà A tại Đại học Tôn Đức Thắng')} width="1000" height="667" loading="lazy" decoding="async" className="w-full h-full object-cover"/>
          </button>
          <figcaption className="px-5 py-4">
            <h4 className="font-serif text-lg font-semibold" style={{ color: 'var(--color-heading)'}}>{t('Tòa A')}</h4>
            <p className="font-body text-sm mt-1" style={{ color: 'var(--color-sub)'}}>{t('Nơi chúng ta sẽ gặp nhau')}</p>
          </figcaption>
        </figure>
      </div>
      <div className="tour-guidance">
        <h4 className="font-serif font-semibold text-xl md:text-2xl">{t('Tìm đường đến tòa A')}</h4>
        <p className="font-body text-sm mt-1">{t('Dạo một vòng qua tour 360° để nhận diện tòa A trước khi đến.')}</p>
      </div>
      <div className="campus-tour">
        <iframe
          src={TDTU_TOUR_LINK}
          title={t('Khám phá khuôn viên TDTU 360°')}
          width="100%"
          height="560"
          loading="lazy"
          allow="fullscreen; gyroscope; accelerometer"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className="text-center mt-3">
        <a href={TDTU_TOUR_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-body text-sm underline underline-offset-4" style={{ color: 'var(--color-jade-deep)'}}>
          {t('Mở tour 360° trong tab mới')}
          <ExternalLink size={14} aria-hidden="true"/>
        </a>
      </div>
      <dialog ref={dialogRef} className="campus-image-popup" aria-labelledby="campus-preview-title" onClick={event => {
        if (event.target === event.currentTarget) dialogRef.current?.close()
      }}>
        <div className="campus-popup-content">
          <div className="campus-popup-header">
            <h3 id="campus-preview-title" className="font-serif font-semibold">{preview.title}</h3>
            <button type="button" onClick={() => dialogRef.current?.close()} aria-label={t('Đóng ảnh')}><X size={22} /></button>
          </div>
          {preview.src && <img src={preview.src} alt={preview.title} />}
        </div>
      </dialog>
    </div>
  )
}
