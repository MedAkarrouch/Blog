import { useEffect, useRef } from 'react'

export function useIntersectorObserver(
  options,
  handler,
  listenToEle,
  ...dependencies
) {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(handler, options)
    if (listenToEle) observer.observe(listenToEle)
    else if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [...dependencies])
  return ref
}
