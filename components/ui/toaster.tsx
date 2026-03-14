'use client'

import * as React from 'react'

export function Toaster() {
  return (
    <div
      role="region"
      aria-label="Notifications (F8)"
      tabIndex={-1}
      style={{ pointerEvents: 'none' }}
    >
      <ol
        tabIndex={-1}
        className="fixed bottom-0 right-0 top-auto z-[100] flex max-h-screen w-full flex-col p-4 md:max-w-[420px]"
      />
    </div>
  )
}
