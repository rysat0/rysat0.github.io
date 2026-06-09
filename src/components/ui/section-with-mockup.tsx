import { motion, useReducedMotion, type Variants } from "motion/react"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface SectionWithMockupProps {
  title: ReactNode
  description: ReactNode
  primaryImageSrc: string
  secondaryImageSrc: string
  /** Optional content rendered under the description (e.g. links). */
  children?: ReactNode
  /** Flip the text/image columns. */
  reverseLayout?: boolean
  className?: string
}

export function SectionWithMockup({
  title,
  description,
  primaryImageSrc,
  secondaryImageSrc,
  children,
  reverseLayout = false,
  className,
}: SectionWithMockupProps) {
  // Honour prefers-reduced-motion: render static content, no reveal or parallax.
  const reduced = useReducedMotion()

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : 0.2 } },
  }
  const itemVariants: Variants = reduced
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: "easeOut" },
        },
      }
  const secondaryY = reduced ? 0 : -22
  const primaryY = reduced ? 0 : 18

  const layoutClasses = reverseLayout
    ? "md:grid-cols-2 md:grid-flow-col-dense"
    : "md:grid-cols-2"
  const textOrderClass = reverseLayout ? "md:col-start-2" : ""
  const imageOrderClass = reverseLayout ? "md:col-start-1" : ""

  return (
    <section className={cn("relative overflow-hidden", className)}>
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <motion.div
          className={cn(
            "grid w-full grid-cols-1 items-center gap-16 md:gap-8",
            layoutClasses
          )}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Text content */}
          <motion.div
            className={cn(
              "mx-auto flex max-w-[546px] flex-col items-start gap-4 md:mx-0",
              textOrderClass
            )}
            variants={itemVariants}
          >
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-[40px] md:leading-[1.15]">
              {title}
            </h2>
            <div className="flex flex-col gap-3 text-sm leading-6 text-muted-foreground text-pretty md:text-[15px]">
              {description}
            </div>
            {children}
          </motion.div>

          {/* Image / mockup content */}
          <motion.div
            className={cn(
              "relative mx-auto w-full max-w-[300px] md:max-w-[380px]",
              imageOrderClass
            )}
            variants={itemVariants}
          >
            {/* Secondary image: peeks from behind on the OUTER side (away from
                the text column) so it never sits under the copy. */}
            <motion.div
              className="absolute top-[11%] z-0 h-[80%] w-[82%] rounded-[26px] border border-white/10 bg-cover bg-center"
              style={{
                [reverseLayout ? "left" : "right"]: "-18%",
                backgroundImage: `url(${secondaryImageSrc})`,
                filter: "blur(1.5px)",
              }}
              initial={{ y: 0 }}
              whileInView={{ y: secondaryY }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
            />

            {/* Primary mockup card */}
            <motion.div
              className="relative z-10 h-[340px] w-full overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.04] shadow-neon backdrop-blur-[15px] md:h-[420px]"
              initial={{ y: 0 }}
              whileInView={{ y: primaryY }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${primaryImageSrc})` }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative bottom hairline */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 z-0 h-px w-full"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)",
        }}
      />
    </section>
  )
}
