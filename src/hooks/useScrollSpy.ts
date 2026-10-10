import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds: string[], offset = 80): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || '')

  useEffect(() => {
    let frame = 0
    const handleScroll = () => {
      frame = 0
      const scrollPos = window.scrollY + offset + 20

      let current = sectionIds[0]
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top + window.scrollY <= scrollPos) {
          current = id
        }
      }
      setActiveId(current)
    }

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(handleScroll)
    }
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    handleScroll()
    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      cancelAnimationFrame(frame)
    }
  }, [sectionIds, offset])

  return activeId
}
