import { useEffect, useRef } from 'react'

export function useAutoTextareaResize() {
  const ref = useRef()
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
  }, [])
  return ref
}
