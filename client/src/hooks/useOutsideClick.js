import { useEffect, useRef } from "react"

export function useOutsideClick(handler) {
  const ref = useRef()
  useEffect(() => {
    const handleClick = (e) => {
      // console.log(e.target, ref.current)
      if (ref.current && !ref.current.contains(e.target)) handler()
      // if (ref.current && e.target !== ref.current) handler()
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  })
  return ref
}
