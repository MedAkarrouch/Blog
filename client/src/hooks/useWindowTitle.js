import { useEffect } from 'react'

export function useWindowTitle(pageTitle) {
  useEffect(() => {
    document.title = pageTitle
    return () => (document.title = 'LOOR | Home')
  }, [pageTitle])
}
