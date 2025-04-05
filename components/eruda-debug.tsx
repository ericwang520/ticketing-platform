'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function ErudaDebug() {
  useEffect(() => {
    // Initialize Eruda after the component mounts
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.eruda?.init();
    }
  }, []);

  return (
    <>
      <Script 
        src="https://cdn.jsdelivr.net/npm/eruda" 
        strategy="afterInteractive"
      />
    </>
  )
} 