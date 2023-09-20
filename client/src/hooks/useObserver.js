import { useEffect, useRef } from "react"

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0
}

export function useObserver(handler) {
  const ref = useRef()
  useEffect(() => {
    const callBack = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) handler()
    }
    const observer = new IntersectionObserver(callBack, options)

    if (ref.current) observer.observe(ref.current)
    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [ref, handler])
  return ref
}
