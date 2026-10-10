import { usePreferences } from '../preferences'

export function DisplaySettings() {
  const { language, setLanguage } = usePreferences()
  const nextLanguage = language === 'vi'? 'en': 'vi'
  const label = language === 'vi'? 'Chuyển sang tiếng Anh': 'Switch to Vietnamese'
  return (
    <div className="display-settings">
      <button
        type="button"
        aria-label={label}
        title={label}
        onClick={() => setLanguage(nextLanguage)}
        className="language-toggle"
      >
        {language === 'en' ? 'EN' : 'VI'}
      </button>
    </div>
  )
}
