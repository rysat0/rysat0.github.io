import { motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"

/**
 * Wrapper for inner (non-home) pages: adds an ambient neon glow behind the
 * content and a quick fade-in on navigation. Respects reduced motion.
 */
export function PageShell({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()

  const glow = (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[45vh] bg-[radial-gradient(55%_45%_at_50%_0%,var(--neon-soft),transparent)]"
    />
  )

  if (reduced) {
    return (
      <>
        {glow}
        {children}
      </>
    )
  }

  return (
    <>
      {glow}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  )
}
