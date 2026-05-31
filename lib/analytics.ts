declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export type EventName =
  | 'cta_register_click'
  | 'nav_click'
  | 'mobile_menu_open'
  | 'more_dropdown_open'
  | 'prize_tab_click'
  | 'hotel_book_click'
  | 'hotel_phone_click'
  | 'email_click'
  | 'social_click'
  | 'sponsor_contact_click'
  | 'townscript_iframe_load'
  | 'section_view'

type EventParams = Record<string, string | number>

export function trackEvent(name: EventName, params?: EventParams) {
  if (typeof window === 'undefined') return
  if (window.location.hostname === 'localhost') return
  window.gtag?.('event', name, params)
}
