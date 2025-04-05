'use client'

import { useEffect } from 'react'
import Eruda from "eruda"

export default function ErudaDebug() {
  useEffect(() => {
    // Initialize Eruda after the component mounts
    if (typeof window !== 'undefined') {
      // @ts-ignore
      Eruda.init()
    }
  }, []);

  return (
    <>

    </>
  )
} 