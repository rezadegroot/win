'use client'

import { useRef } from 'react'
import Script from 'next/script'

const schedulingUrl = 'https://calendly.com/rezadegroot/25min?hide_event_type_details=1&hide_gdpr_banner=1'

type CalendlyWindow = Window & {
  Calendly?: {
    initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void
  }
}

export function CalendlyInlineWidget() {
  const container = useRef<HTMLDivElement>(null)

  function showCalendar() {
    if (!container.current || container.current.querySelector('iframe')) return
    ;(window as CalendlyWindow).Calendly?.initInlineWidget({
      url: schedulingUrl,
      parentElement: container.current,
    })
  }

  return (
    <>
      <div
        ref={container}
        className="calendly-inline-widget h-[700px] w-full min-w-[320px]"
        data-auto-load="false"
        data-url={schedulingUrl}
        aria-label="Plan een kennismaking van 25 minuten met Reza"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onReady={showCalendar}
      />
    </>
  )
}
