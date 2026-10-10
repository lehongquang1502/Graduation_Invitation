import type { RefObject } from 'react'
import { usePreferences } from '../preferences'

export const SOUNDCLOUD_TRACK = 'https://soundcloud.com/nccoo-nvn-lawvv-73255004/cho-con-bray-beat'
const PLAYER_URL = `https://w.soundcloud.com/player/?url=${encodeURIComponent(SOUNDCLOUD_TRACK)}&color=%23235c41&auto_play=false&show_artwork=false&show_comments=false&show_playcount=false&sharing=false&buying=false&download=false`

export function SoundCloudMusic({ iframeRef, error }: { iframeRef: RefObject<HTMLIFrameElement | null>; error: boolean }) {
  const { t } = usePreferences()
  return (
    <div className="soundcloud-background" aria-hidden="true">
      <iframe ref={iframeRef} src={PLAYER_URL} title="SoundCloud — Cho Con - Bray - Beat" width="1" height="1" allow="autoplay" tabIndex={-1} />
      {error && <span>{t('Chưa kết nối được trình phát. Bạn có thể nghe trực tiếp trên SoundCloud.')}</span>}
    </div>
  )
}
