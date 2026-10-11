import { useEffect, useRef, useState } from 'react'
import { usePreferences } from '../preferences'
import { DisplaySettings } from './DisplaySettings'

export function JadeOpening({ onOpen }: { onOpen: () => void }) {
  const { t } = usePreferences()
  const [polishing, setPolishing] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const open = () => {
    if (polishing) return
    setPolishing(true)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    timer.current = setTimeout(onOpen, reducedMotion ? 0 : 650)
  }

  return (
    <main className={`jade-opening ${polishing ? 'is-polishing' : ''}`}>
      <div className="opening-language"><DisplaySettings /></div>
      <div className="opening-content">
        <p className="opening-dedication">{t('Một hành trình, một viên ngọc')}</p>
        <h1 className="font-serif">{t('Ngọc có mài mới sáng')}</h1>
        <p className="opening-story">{t('Qua tháng năm rèn giũa, viên đá thô dần để lộ ánh ngọc bên trong.')}</p>

        <button type="button" className="jade-stone-button" onClick={open} disabled={polishing} aria-label={t('Chạm vào ngọc để mở thiệp')}>
          <img className="jade-stone" src="/images/jade-stone.png" width="1280" height="1280" alt="" decoding="async" />
          <span className="opening-action">{t('Chạm vào ngọc để mở thiệp')}</span>
        </button>
        <p className="opening-signature handwritten">Lê Hồng Quang</p>
      </div>
    </main>
  )
}
