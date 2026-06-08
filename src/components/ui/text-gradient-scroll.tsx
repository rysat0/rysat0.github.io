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
  useRef,
  type ReactNode,
} from "react"

import { cn } from "@/lib/utils"

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
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  // Monotonic for any block height (avoids reverse progress on short blocks).
  // Words stay mostly dim at the top and fill in as you scroll through.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  })

  // Reduced motion: plain, fully legible paragraphs, no scroll reveal.
  if (reduced) {
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

  const perParagraph = paragraphs.map((p) => p.split(" "))
  const counts = perParagraph.map((words) => words.length)
  const total = counts.reduce((n, c) => n + c, 0)
  // Global starting word index for each paragraph (computed without mutation).
  const paragraphStart = counts.map((_, i) =>
    counts.slice(0, i).reduce((n, c) => n + c, 0)
  )

  return (
    <TextGradientScrollContext.Provider value={textOpacity}>
      {/* Accessible, selectable copy exposed once; the animated layer is decorative. */}
      <span className="sr-only">{paragraphs.join("\n\n")}</span>
      <div ref={ref} aria-hidden="true" className={cn("flex flex-col", className)}>
        {perParagraph.map((words, pi) => (
          <p key={pi} className={cn("relative m-0", paragraphClassName)}>
            {words.map((word, wi) => {
              const index = paragraphStart[pi] + wi
              const start = index / total
              const end = (index + 1) / total
              const range = [start, end]
              return (
                <Fragment key={wi}>
                  {type === "word" ? (
                    <Word progress={scrollYProgress} range={range}>
                      {word}
                    </Word>
                  ) : (
                    <Letter progress={scrollYProgress} range={range}>
                      {word}
                    </Letter>
                  )}{" "}
                </Fragment>
              )
            })}
          </p>
        ))}
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
