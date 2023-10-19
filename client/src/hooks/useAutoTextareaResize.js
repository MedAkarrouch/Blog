import { useEffect, useRef, useState } from 'react'
import { useWindowListener } from './useWindowListener'

export function useAutoTextareaResize() {
  const ref = useRef()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handler = (e) => {
      setWindowWidth(e.target.outerWidth)
    }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto'
      ref.current.style.height = ref.current.scrollHeight + 'px'
    }
    const handler = (e) => {
      if (e.target !== ref.current) return
      ref.current.style.height = 'auto'
      ref.current.style.height = e.target.scrollHeight + 'px'
    }
    document.addEventListener('input', handler)
    return () => document.removeEventListener('input', handler)
  }, [windowWidth])
  return ref
}
