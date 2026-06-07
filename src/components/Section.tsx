import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface SectionProps {
  id?: string
  className?: string
  children: ReactNode
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-24 md:py-32",
        className
      )}
    >
      {children}
    </section>
  )
}

interface SectionHeadingProps {
  label?: string
  title: string
  className?: string
}

export function SectionHeading({ label, title, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {label ? (
        <span className="font-mono-tight text-xs uppercase tracking-[0.22em] text-neon">
          {label}
        </span>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tighter text-balance md:text-5xl">
        {title}
      </h2>
    </div>
  )
}
