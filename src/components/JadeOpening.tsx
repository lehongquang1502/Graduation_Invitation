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
          <svg className="jade-stone" viewBox="0 0 400 350" aria-hidden="true">
            <defs>
              <linearGradient id="rough-stone" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#a8ab93" /><stop offset=".45" stopColor="#697b69" /><stop offset="1" stopColor="#374f43" />
              </linearGradient>
              <linearGradient id="inner-jade" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#e5f4d8" /><stop offset=".35" stopColor="#9dc8a8" /><stop offset=".7" stopColor="#4d956e" /><stop offset="1" stopColor="#23543e" />
              </linearGradient>
              <clipPath id="stone-shape"><path d="M78 112 135 57 241 43 312 103 336 198 283 279 173 300 83 253 55 178Z" /></clipPath>
            </defs>
            <g clipPath="url(#stone-shape)">
              <path d="M45 35H350V315H45Z" fill="url(#inner-jade)" />
              <image href="/images/jade-marbling.webp" x="45" y="35" width="310" height="280" opacity=".3" />
              <path d="M136 76Q207 135 277 125M96 201Q184 158 293 228" fill="none" stroke="#f3f5d3" strokeWidth="2" opacity=".5" />
              <g className="stone-shell">
                <path d="M78 112 135 57 241 43 312 103 336 198 283 279 173 300 83 253 55 178Z" fill="url(#rough-stone)" />
                <path d="M78 112 135 57 173 126 55 178Z" fill="#c2bf9e" opacity=".65" />
                <path d="M135 57 241 43 224 118 173 126Z" fill="#8d9b80" />
                <path d="M241 43 312 103 267 150 224 118Z" fill="#566c58" />
                <path d="M55 178 173 126 140 217 83 253Z" fill="#71836c" />
                <path d="M83 253 140 217 206 246 173 300Z" fill="#969c7f" />
                <path d="M267 150 312 103 336 198 283 279 206 246Z" fill="#304c3f" opacity=".6" />
                <path d="M173 126 224 118 267 150 242 217 206 246 140 217Z" fill="url(#inner-jade)" />
                <path d="M177 140 212 133 243 154 218 206 161 215" fill="none" stroke="#cfdfbb" strokeWidth="1.5" opacity=".5" />
                <g fill="none" stroke="#ded9bc" opacity=".3">
                  <path d="m83 114 43 24-17 30m129-113-18 31 14 17M87 244l32-18 12 12m169-120-9 27 14 22M180 282l19-17 40 4" />
                </g>
              </g>
            </g>
            <path d="M78 112 135 57 241 43 312 103 336 198 283 279 173 300 83 253 55 178Z" fill="none" stroke="#c5b575" strokeOpacity=".45" />
          </svg>
          <span className="opening-action">{t('Chạm vào ngọc để mở thiệp')}</span>
        </button>
        <p className="opening-signature handwritten">Lê Hồng Quang</p>
      </div>
    </main>
  )
}
