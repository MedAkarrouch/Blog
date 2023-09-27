import { useEffect, useRef } from "react"

export function useOutsideClick(handler, listenCapturing = false) {
  const ref = useRef()
  useEffect(() => {
    const handleClick = (e) => {
      console.log("Click")
      // console.log("Click ", e.target)
      // console.log(e.target, ref.current)
      if (ref.current && !ref.current.contains(e.target)) handler()
      // if (ref.current && e.target !== ref.current) handler()
    }
    document.addEventListener("click", handleClick, listenCapturing)
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing)
  }, [handler, listenCapturing])
  return ref
}
