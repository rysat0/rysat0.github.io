import createGlobe, { type COBEOptions } from "cobe"
import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"
import { prefersReducedMotion } from "@/lib/motion"

export function Globe({
  config,
  className,
}: {
  config: COBEOptions
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phiRef = useRef(0)
  const widthRef = useRef(0)
  const rRef = useRef(0)
  const pointerInteracting = useRef<number | null>(null)
  const pointerMovement = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = prefersReducedMotion()
    const onResize = () => {
      widthRef.current = canvas.offsetWidth
    }
    window.addEventListener("resize", onResize)
    onResize()

    // Pass CSS-pixel size; COBE multiplies by config.devicePixelRatio itself.
    const globe = createGlobe(canvas, {
      ...config,
      width: widthRef.current,
      height: widthRef.current,
    })

    let raf = 0
    const render = () => {
      // No rotation under reduced motion, but keep repainting so COBE's
      // asynchronously-loaded map texture still appears (static globe).
      if (pointerInteracting.current === null && !reduced) phiRef.current += 0.004
      globe.update({
        phi: phiRef.current + rRef.current,
        width: widthRef.current,
        height: widthRef.current,
      })
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    const reveal = window.setTimeout(() => {
      canvas.style.opacity = "1"
    })

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.clearTimeout(reveal)
      window.removeEventListener("resize", onResize)
      globe.destroy()
    }
  }, [config])

  const startDrag = (clientX: number) => {
    pointerInteracting.current = clientX - pointerMovement.current
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
  }
  const endDrag = () => {
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
  }
  const onMove = (clientX: number) => {
    if (pointerInteracting.current === null) return
    const delta = clientX - pointerInteracting.current
    pointerMovement.current = delta
    rRef.current = delta / 200
  }

  return (
    <div className={cn("aspect-square w-full", className)}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="size-full cursor-grab opacity-0 transition-opacity duration-700 [contain:layout_paint_size]"
        onPointerDown={(e) => startDrag(e.clientX)}
        onPointerUp={endDrag}
        onPointerOut={endDrag}
        onMouseMove={(e) => onMove(e.clientX)}
        onTouchMove={(e) => e.touches[0] && onMove(e.touches[0].clientX)}
      />
    </div>
  )
}
