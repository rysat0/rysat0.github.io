import { ArrowRight, ExternalLink, Link, Zap } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prefersReducedMotion } from "@/lib/motion"

export interface TimelineItem {
  id: number
  title: string
  date: string
  content: string
  category: string
  icon: React.ElementType
  relatedIds: number[]
  status: "completed" | "in-progress" | "pending"
  energy: number
  /** Optional external link shown inside the expanded card. */
  url?: string
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[]
  className?: string
}

export function RadialOrbitalTimeline({
  timelineData,
  className,
}: RadialOrbitalTimelineProps) {
  const reduced = useMemo(() => prefersReducedMotion(), [])
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({})
  const [rotationAngle, setRotationAngle] = useState<number>(0)
  const [autoRotate, setAutoRotate] = useState<boolean>(!reduced)
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({})
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null)
  const [radius, setRadius] = useState<number>(180)
  const containerRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({})
      setActiveNodeId(null)
      setPulseEffect({})
      setAutoRotate(!reduced)
    }
  }

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev }
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) newState[parseInt(key)] = false
      })
      newState[id] = !prev[id]

      if (!prev[id]) {
        setActiveNodeId(id)
        setAutoRotate(false)
        const newPulseEffect: Record<number, boolean> = {}
        getRelatedItems(id).forEach((relId) => (newPulseEffect[relId] = true))
        setPulseEffect(newPulseEffect)
        centerViewOnNode(id)
      } else {
        setActiveNodeId(null)
        setAutoRotate(!reduced)
        setPulseEffect({})
      }
      return newState
    })
  }

  // Auto-rotate the orbit (disabled under reduced motion or while a node is open).
  useEffect(() => {
    if (!autoRotate || reduced) return
    const timer: ReturnType<typeof setInterval> = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)))
    }, 50)
    return () => clearInterval(timer)
  }, [autoRotate, reduced])

  // Scale the orbit radius to the container so it fits on any screen.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const measure = () => {
      const r = Math.max(
        120,
        Math.min(210, (Math.min(el.offsetWidth, el.offsetHeight) - 150) / 2)
      )
      setRadius(r)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId)
    const targetAngle = (nodeIndex / timelineData.length) * 360
    setRotationAngle(270 - targetAngle)
  }

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360
    const radian = (angle * Math.PI) / 180
    const x = radius * Math.cos(radian)
    const y = radius * Math.sin(radian)
    const zIndex = Math.round(100 + 50 * Math.cos(radian))
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    )
    return { x, y, zIndex, opacity }
  }

  const getRelatedItems = (itemId: number): number[] =>
    timelineData.find((item) => item.id === itemId)?.relatedIds ?? []

  const isRelatedToActive = (itemId: number): boolean =>
    activeNodeId !== null && getRelatedItems(activeNodeId).includes(itemId)

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-neon bg-neon-soft border-neon/40"
      case "in-progress":
        return "text-background bg-neon border-neon"
      default:
        return "text-muted-foreground bg-secondary border-border"
    }
  }

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className={`relative mx-auto flex h-[680px] w-full max-w-3xl items-center justify-center overflow-hidden md:h-[740px] ${className ?? ""}`}
    >
      <div
        ref={orbitRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        {/* Core */}
        <div className="absolute z-10 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-neon via-emerald-400 to-teal-400 motion-safe:animate-pulse">
          <div className="absolute size-20 rounded-full border border-neon/30 opacity-70 motion-safe:animate-ping" />
          <div
            className="absolute size-24 rounded-full border border-neon/15 opacity-50 motion-safe:animate-ping"
            style={{ animationDelay: "0.5s" }}
          />
          <div className="size-8 rounded-full bg-background/85 backdrop-blur-md" />
        </div>

        {/* Orbit ring */}
        <div
          className="absolute rounded-full border border-neon/15"
          style={{ width: radius * 2, height: radius * 2 }}
        />

        {timelineData.map((item, index) => {
          const position = calculateNodePosition(index, timelineData.length)
          const isExpanded = expandedItems[item.id]
          const isRelated = isRelatedToActive(item.id)
          const isPulsing = pulseEffect[item.id]
          const Icon = item.icon

          return (
            <div
              key={item.id}
              ref={(el) => {
                nodeRefs.current[item.id] = el
              }}
              className={`absolute ${reduced ? "" : "transition-all duration-700"}`}
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isExpanded ? 200 : position.zIndex,
                opacity: isExpanded ? 1 : position.opacity,
              }}
            >
              {/* Energy halo (decorative) */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute rounded-full -inset-1 ${isPulsing ? "motion-safe:animate-pulse" : ""}`}
                style={{
                  background:
                    "radial-gradient(circle, rgba(74,222,128,0.22) 0%, rgba(74,222,128,0) 70%)",
                  width: `${item.energy * 0.5 + 40}px`,
                  height: `${item.energy * 0.5 + 40}px`,
                  left: `-${(item.energy * 0.5) / 2}px`,
                  top: `-${(item.energy * 0.5) / 2}px`,
                }}
              />

              {/* Trigger: a real button (native Enter/Space, no nested controls) */}
              <button
                type="button"
                aria-expanded={!!isExpanded}
                aria-label={`${item.title} — project details`}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleItem(item.id)
                }}
                className={`flex size-10 cursor-pointer items-center justify-center rounded-full border-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  isExpanded
                    ? "scale-150 border-neon bg-neon text-background shadow-neon"
                    : isRelated
                      ? "border-neon bg-neon/60 text-background motion-safe:animate-pulse"
                      : "border-border bg-card text-foreground"
                }`}
              >
                <Icon size={16} />
              </button>

              {/* Label (decorative; the trigger carries the aria-label) */}
              <div
                aria-hidden="true"
                className={`absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300 ${
                  isExpanded ? "scale-110 text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.title}
              </div>

              {isExpanded && (
                <Card
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-20 left-1/2 w-64 -translate-x-1/2 overflow-visible border-neon/30 bg-card/95 shadow-neon backdrop-blur-lg"
                >
                  <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-neon/50" />
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <Badge
                        className={`border px-2 text-[10px] ${getStatusStyles(item.status)}`}
                      >
                        {item.status === "completed"
                          ? "COMPLETE"
                          : item.status === "in-progress"
                            ? "IN PROGRESS"
                            : "PENDING"}
                      </Badge>
                      <span className="font-mono-tight text-xs text-muted-foreground">
                        {item.date}
                      </span>
                    </div>
                    <CardTitle className="mt-2 text-sm text-foreground">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-xs text-muted-foreground">
                    <p className="leading-relaxed">{item.content}</p>

                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 inline-flex items-center gap-1 font-mono-tight text-xs text-neon transition-opacity hover:opacity-80"
                      >
                        Visit
                        <ExternalLink size={11} />
                      </a>
                    )}

                    <div className="mt-4 border-t border-border pt-3">
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="flex items-center text-muted-foreground">
                          <Zap size={10} className="mr-1" />
                          Energy
                        </span>
                        <span className="font-mono-tight text-foreground">
                          {item.energy}%
                        </span>
                      </div>
                      <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full bg-gradient-to-r from-neon to-emerald-400"
                          style={{ width: `${item.energy}%` }}
                        />
                      </div>
                    </div>

                    {item.relatedIds.length > 0 && (
                      <div className="mt-4 border-t border-border pt-3">
                        <div className="mb-2 flex items-center">
                          <Link size={10} className="mr-1 text-muted-foreground" />
                          <h4 className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                            Related
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.relatedIds.map((relatedId) => {
                            const relatedItem = timelineData.find(
                              (i) => i.id === relatedId
                            )
                            return (
                              <Button
                                key={relatedId}
                                variant="outline"
                                size="sm"
                                className="flex h-6 items-center border-border bg-transparent px-2 py-0 text-xs text-muted-foreground transition-all hover:border-neon hover:bg-neon-soft hover:text-neon"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleItem(relatedId)
                                }}
                              >
                                {relatedItem?.title}
                                <ArrowRight size={8} className="ml-1" />
                              </Button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
