import { useEffect, useState } from "react"

export function useTextExpander(string = "", totalWords = 50) {
  const [isHidden, setIsHidden] = useState(
    string.split(" ").length > totalWords
  )
  const show = () => setIsHidden(false)
  const text = isHidden
    ? string.split(" ").slice(0, totalWords).join(" ") + "..."
    : string
  useEffect(() => {
    setIsHidden(string.split(" ").length > totalWords)
  }, [string, totalWords])
  return { isHidden, show, text }
}
