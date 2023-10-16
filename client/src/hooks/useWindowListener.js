import { useEffect } from 'react'

export function useWindowListener(handler) {
  useEffect(() => {
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
}
