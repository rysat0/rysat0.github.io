import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react"
import {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"

import { cn } from "@/lib/utils"

const DESKTOP_QUERY = "(min-width: 768px)"

/** True on md+ screens. The pinned scroll-reveal is a desktop-only flourish. */
function useIsDesktop() {
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

type TextOpacityEnum = "none" | "soft" | "medium"
type ViewTypeEnum = "word" | "letter"

interface TextGradientScrollType {
  /** One entry per paragraph. Words light up sequentially as you scroll. */
  paragraphs: string[]
  type?: ViewTypeEnum
  className?: string
  paragraphClassName?: string
  textOpacity?: TextOpacityEnum
}

interface SegmentProps {
  children: ReactNode
  progress: MotionValue<number>
  range: number[]
}

const TextGradientScrollContext = createContext<TextOpacityEnum>("soft")

export function TextGradientScroll({
  paragraphs,
  className,
  paragraphClassName,
  type = "word",
  textOpacity = "medium",
}: TextGradientScrollType) {
  const reduced = useReducedMotion()
  const isDesktop = useIsDesktop()

  // Reduced motion or mobile: plain, fully legible paragraphs, no scroll reveal.
  // On phones the block is taller than the screen, so a pinned reveal would
  // light lower paragraphs up off-screen; plain text reads cleanly instead.
  // The reveal lives in its own component so useScroll's target ref is only ever
  // created when that branch actually mounts (an unmounted target warns in dev).
  if (reduced || !isDesktop) {
    return (
      <div className={cn("flex flex-col", className)}>
        {paragraphs.map((p, i) => (
          <p key={i} className={cn("m-0", paragraphClassName)}>
            {p}
          </p>
        ))}
      </div>
    )
  }

  return (
    <ScrollReveal
      paragraphs={paragraphs}
      className={className}
      paragraphClassName={paragraphClassName}
      type={type}
      textOpacity={textOpacity}
    />
  )
}

function ScrollReveal({
  paragraphs,
  className,
  paragraphClassName,
  type,
  textOpacity,
}: Required<Pick<TextGradientScrollType, "paragraphs">> &
  Pick<
    TextGradientScrollType,
    "className" | "paragraphClassName" | "type" | "textOpacity"
  >) {
  const ref = useRef<HTMLDivElement>(null)
  // The track (text + spacer) is the scroll target. Progress is 0 until the
  // track's top reaches the viewport top, so every word is dim at load on ANY
  // viewport height. It then fills in as the pinned text is scrolled past, and
  // always finishes because there is content below the track. start/end stays
  // monotonic because the spacer makes the track taller than the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const perParagraph = paragraphs.map((p) => p.split(" "))
  const counts = perParagraph.map((words) => words.length)
  const total = counts.reduce((n, c) => n + c, 0)
  // Global starting word index for each paragraph (computed without mutation).
  const paragraphStart = counts.map((_, i) =>
    counts.slice(0, i).reduce((n, c) => n + c, 0)
  )

  return (
    <TextGradientScrollContext.Provider value={textOpacity ?? "medium"}>
      {/* Accessible, selectable copy exposed once; the animated layer is decorative. */}
      <span className="sr-only">{paragraphs.join("\n\n")}</span>
      <div ref={ref} aria-hidden="true" className="relative">
        {/* Pins the (viewport-fitting) block and reveals it in place while the
            spacer below is scrolled through. */}
        <div className="sticky top-24">
          <div className={cn("flex flex-col", className)}>
            {perParagraph.map((words, pi) => (
              <p key={pi} className={cn("relative m-0", paragraphClassName)}>
                {words.map((word, wi) => {
                  const index = paragraphStart[pi] + wi
                  const start = index / total
                  const end = (index + 1) / total
                  const range = [start, end]
                  return (
                    <Fragment key={wi}>
                      {type === "letter" ? (
                        <Letter progress={scrollYProgress} range={range}>
                          {word}
                        </Letter>
                      ) : (
                        <Word progress={scrollYProgress} range={range}>
                          {word}
                        </Word>
                      )}{" "}
                    </Fragment>
                  )
                })}
              </p>
            ))}
          </div>
        </div>
        {/* Scroll track: room for the pinned text to reveal in place. */}
        <div aria-hidden="true" className="h-[80vh]" />
      </div>
    </TextGradientScrollContext.Provider>
  )
}

function baseOpacityClass(textOpacity: TextOpacityEnum) {
  return cn({
    "opacity-0": textOpacity === "none",
    "opacity-10": textOpacity === "soft",
    "opacity-30": textOpacity === "medium",
  })
}

function Word({ children, progress, range }: SegmentProps) {
  const opacity = useTransform(progress, range, [0, 1])
  const textOpacity = useContext(TextGradientScrollContext)

  return (
    <span className="relative inline-block">
      <span className={cn("absolute", baseOpacityClass(textOpacity))}>
        {children}
      </span>
      <motion.span style={{ transition: "all .5s", opacity }}>
        {children}
      </motion.span>
    </span>
  )
}

function Letter({ children, progress, range }: SegmentProps) {
  if (typeof children !== "string") return null

  const amount = range[1] - range[0]
  const step = amount / children.length

  return (
    <span className="relative inline-block">
      {children.split("").map((char, i) => {
        const start = range[0] + i * step
        const end = range[0] + (i + 1) * step
        return (
          <Char key={`c_${i}`} progress={progress} range={[start, end]}>
            {char}
          </Char>
        )
      })}
    </span>
  )
}

function Char({ children, progress, range }: SegmentProps) {
  const opacity = useTransform(progress, range, [0, 1])
  const textOpacity = useContext(TextGradientScrollContext)

  return (
    <span>
      <span className={cn("absolute", baseOpacityClass(textOpacity))}>
        {children}
      </span>
      <motion.span style={{ transition: "all .5s", opacity }}>
        {children}
      </motion.span>
    </span>
  )
}
