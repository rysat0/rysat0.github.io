import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export interface DisplayCardProps {
  className?: string
  icon?: ReactNode
  title?: string
  description?: string
  meta?: string
  href?: string
  external?: boolean
  ariaLabel?: string
  iconClassName?: string
  titleClassName?: string
}

function DisplayCard({
  className,
  icon,
  title = "Featured",
  description = "Discover amazing content",
  meta = "Just now",
  href,
  external,
  ariaLabel,
  iconClassName,
  titleClassName,
}: DisplayCardProps) {
  const cardClassName = cn(
    "relative flex h-36 w-[22rem] max-w-[86vw] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 border-border bg-card/90 px-4 py-3 shadow-xl shadow-black/30 backdrop-blur-sm transition-all duration-700 hover:border-neon/50 hover:bg-card [&>*]:flex [&>*]:items-center [&>*]:gap-2",
    className
  )

  const content = (
    <>
      <div>
        <span
          className={cn(
            "relative inline-flex size-7 items-center justify-center rounded-full bg-neon-soft text-neon [&>svg]:size-4",
            iconClassName
          )}
        >
          {icon}
        </span>
        <p className={cn("text-lg font-medium text-foreground", titleClassName)}>
          {title}
        </p>
      </div>
      <p className="truncate text-base text-muted-foreground">{description}</p>
      <p className="font-mono-tight text-xs text-muted-foreground">{meta}</p>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cardClassName}
      >
        {content}
      </a>
    )
  }

  return <div className={cardClassName}>{content}</div>
}

export interface DisplayCardsProps {
  cards: DisplayCardProps[]
  className?: string
}

export default function DisplayCards({ cards, className }: DisplayCardsProps) {
  return (
    <div
      className={cn(
        "grid [grid-template-areas:'stack'] place-items-center opacity-100 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-700",
        className
      )}
    >
      {cards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  )
}
