import { useCallback, useEffect, useRef, useState } from 'react'

interface SoundCloudWidget {
  bind: (event: string, callback: () => void) => void
  unbind: (event: string) => void
  play: () => void
  toggle: () => void
  pause: () => void
  setVolume: (volume: number) => void
}

interface SoundCloudAPI {
  Widget: ((iframe: HTMLIFrameElement) => SoundCloudWidget) & {
    Events: Record<'READY' | 'PLAY' | 'PAUSE' | 'FINISH' | 'ERROR', string>
  }
}

declare global {
  interface Window { SC?: SoundCloudAPI }
}

let apiPromise: Promise<SoundCloudAPI> | undefined

function loadWidgetAPI() {
  if (window.SC) return Promise.resolve(window.SC)
  if (!apiPromise) {
    apiPromise = new Promise<SoundCloudAPI>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://w.soundcloud.com/player/api.js'
      script.async = true
      script.onload = () => window.SC ? resolve(window.SC) : reject(new Error('Widget API unavailable'))
      script.onerror = () => { script.remove(); apiPromise = undefined; reject(new Error('Widget API failed to load')) }
      document.head.appendChild(script)
    })
  }
  return apiPromise
}

export function useSoundCloudPlayer(enabled: boolean) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const widgetRef = useRef<SoundCloudWidget | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!enabled) return
    let cancelled = false
    let widget: SoundCloudWidget | undefined
    let events: string[] = []
    loadWidgetAPI().then(api => {
      if (cancelled || !iframeRef.current) return
      widget = api.Widget(iframeRef.current)
      widgetRef.current = widget
      const event = api.Widget.Events
      events = Object.values(event)
      widget.bind(event.READY, () => { widget?.setVolume(35); setReady(true); widget?.play() })
      widget.bind(event.PLAY, () => setIsPlaying(true))
      widget.bind(event.PAUSE, () => setIsPlaying(false))
      widget.bind(event.FINISH, () => setIsPlaying(false))
      widget.bind(event.ERROR, () => { setError(true); setReady(false); setIsPlaying(false) })
    }).catch(() => { if (!cancelled) setError(true) })
    return () => {
      cancelled = true
      events.forEach(event => widget?.unbind(event))
      widget?.pause()
      widgetRef.current = null
    }
  }, [enabled])

  const toggle = useCallback(() => {
    if (ready && !error) widgetRef.current?.toggle()
    else {
      return
    }
  }, [ready, error])

  return { iframeRef, isPlaying, toggle, error }
}
