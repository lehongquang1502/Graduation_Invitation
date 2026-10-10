import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import english from './translations/en.json'

type Language = 'vi' | 'en'
const translations: Record<string, string> = english
const PreferencesContext = createContext<{
  language: Language; setLanguage: (value: Language) => void
  t: (text: string) => string
} | null>(null)

function savedPreference(key: string) {
  try { return localStorage.getItem(key) } catch { return null }
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const requested = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('lang') : null
    if (requested === 'vi' || requested === 'en') return requested
    return savedPreference('invitation-language') === 'en' ? 'en' : 'vi'
  })
  useEffect(() => {
    document.documentElement.lang = language
    document.title = language === 'en'
      ? 'Graduation – Lê Hồng Quang | TDTU Class of 2026'
      : 'Lễ tốt nghiệp – Lê Hồng Quang | TDTU Class of 2026'
    try { localStorage.setItem('invitation-language', language) } catch { /* Storage may be disabled. */ }
  }, [language])
  const t = (text: string) => language === 'en' ? translations[text] ?? text : text
  return <PreferencesContext.Provider value={{ language, setLanguage, t }}>{children}</PreferencesContext.Provider>
}

export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (!context) throw new Error('PreferencesProvider is required')
  return context
}
