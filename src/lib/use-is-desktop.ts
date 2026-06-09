import { useEffect, useState } from "react"

const DESKTOP_QUERY = "(min-width: 768px)"

/**
 * True on md+ screens. Lets a component mount a desktop-only experience (e.g. a
 * pinned reveal or an orbital layout) while rendering a simpler variant on
 * phones, instead of just CSS-hiding the heavy one.
 */
export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== "undefined" && window.matchMedia(DESKTOP_QUERY).matches
  )
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY)
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return isDesktop
}
