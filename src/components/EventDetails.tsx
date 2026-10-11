import { usePreferences } from '../preferences'
import { Calendar, Download, ExternalLink } from 'lucide-react'
import { VenueCampus } from './VenueCampus'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'


const EVENT_INFO = {
  title: 'Lễ tốt nghiệp - Lê Hồng Quang | TDTU',
  description: 'Lễ tốt nghiệp của Lê Hồng Quang - Trường Đại học Tôn Đức Thắng. Trân trọng kính mời Quý khách đến tham dự.',
  location: 'Trường Đại học Tôn Đức Thắng, 19 Nguyễn Hữu Thọ, Tân Phong, Quận 7, TP.HCM',
  startDate: '20261017T100000',
  endDate: '20261017T120000',
}

function generateGoogleCalendarUrl(info: typeof EVENT_INFO): string {
  const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
  return `${base}&text=${encodeURIComponent(info.title)}&dates=${info.startDate}/${info.endDate}&details=${encodeURIComponent(info.description)}&location=${encodeURIComponent(info.location)}`
}

function generateICSContent(info: typeof EVENT_INFO): string {
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Le Hong Quang Graduation//VI',
    'BEGIN:VEVENT',
    `DTSTART:${info.startDate}`, `DTEND:${info.endDate}`,
    `SUMMARY:${info.title}`, `DESCRIPTION:${info.description}`,
    `LOCATION:${info.location}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n')
}

function downloadICS(info: typeof EVENT_INFO) {
  const blob = new Blob([generateICSContent(info)], { type: 'text/calendar;charset=utf-8'})
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'le-tot-nghiep-le-hong-quang.ics'
  a.click()
  URL.revokeObjectURL(url)
}

function generateOutlookUrl(info: typeof EVENT_INFO): string {
  const base = 'https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent'
  return `${base}&subject=${encodeURIComponent(info.title)}&startdt=2026-10-17T10:00:00&enddt=2026-10-17T12:00:00&body=${encodeURIComponent(info.description)}&location=${encodeURIComponent(info.location)}`
}

export function EventDetails() {
  const { t } = usePreferences()
  const todayParts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: 'numeric', day: 'numeric',
  }).formatToParts(new Date())
  const todayPart = (type: string) => Number(todayParts.find(part => part.type === type)?.value)
  const todayDay = todayPart('year') === 2026 && todayPart('month') === 10 ? todayPart('day') : null
  const eventInfo = { ...EVENT_INFO, title: t(EVENT_INFO.title), description: t(EVENT_INFO.description), location: t(EVENT_INFO.location) }

  return (
    <section id="schedule" className="section-ivory relative py-24 overflow-hidden">
      {/* Gold hairline top */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)'}} />

      <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">

        <div className="event-date-layout">
          <div className="invitation-calendar">
            <div className="calendar-binding" aria-hidden="true"><span /><span /></div>
            <p className="calendar-month font-serif">{t('Tháng 10')} <span>2026</span></p>
            <table className="calendar-grid" aria-label={t('Lịch tháng 10 năm 2026, đánh dấu ngày 17')}>
              <thead><tr>{['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(day => <th key={day} scope="col">{t(day)}</th>)}</tr></thead>
              <tbody>{Array.from({ length: 5 }, (_, week) => (
                <tr key={week}>{Array.from({ length: 7 }, (_, column) => {
                  const day = week * 7 + column - 2
                  return <td key={column}>{day > 0 && day <= 31 ? <span className={[day === 17 ? 'calendar-selected' : '', day === todayDay ? 'calendar-today' : ''].filter(Boolean).join(' ')} aria-current={day === todayDay ? 'date' : undefined} title={day === todayDay ? t('Hôm nay') : undefined}>{day}</span> : null}</td>
                })}</tr>
              ))}</tbody>
            </table>
            <div className="calendar-legend">
              <span><i className="legend-today" aria-hidden="true" />{t('Hôm nay')}</span>
              <span><i className="legend-meeting" aria-hidden="true" />{t('Ngày gặp nhau')}</span>
            </div>
            <p className="calendar-caption handwritten">{t('Hẹn gặp bạn ngày 17')}</p>
          </div>
          <div className="event-date-copy">
            <h2 className="section-heading text-2xl md:text-3xl mb-4">{t('Thời gian & địa điểm')}</h2>
            <p className="font-serif text-xl md:text-2xl text-heading">{t('Ngày 17 tháng 10 năm 2026')}</p>
            <p className="event-meeting-time font-serif">{t('Thứ Bảy')} <span>10:00–12:00</span></p>
            <p className="font-body text-sm mb-6">{t('Sảnh chính tòa A')}</p>

        {/* Add to Calendar */}
        <div
        >
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm">
                <Calendar size={16} />
                {t("Thêm vào lịch")}
                <ExternalLink size={14} className="opacity-70"/>
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="z-[100] min-w-[210px] rounded-xl py-2 shadow-xl"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  boxShadow: '0 12px 32px rgba(22,51,40,0.12)',
                }}
                sideOffset={8}
              >
                {[
                  { label: 'Google Calendar',    action: () => window.open(generateGoogleCalendarUrl(eventInfo), '_blank') },
                  { label: 'Apple Calendar (.ics)', action: () => downloadICS(eventInfo) },
                  { label: 'Outlook Calendar',   action: () => window.open(generateOutlookUrl(eventInfo), '_blank') },
                ].map((item) => (
                  <DropdownMenu.Item
                    key={t(item.label)}
                    onSelect={item.action}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer text-sm font-body transition-colors"
                    style={{ color: 'var(--color-heading)', outline: 'none'}}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.08)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    
                    {t(item.label)}
                    <Download size={12} className="ml-auto opacity-40"/>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
          </div>
        </div>
        <div className="divider-gold mt-12 mb-10"/>
        <VenueCampus />
      </div>
    </section>
  )
}
