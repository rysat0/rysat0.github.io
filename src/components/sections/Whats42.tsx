import parisImg from "@/assets/42-paris-cluster.jpg"
import tokyoImg from "@/assets/42-tokyo.jpg"
import { ArrowUpRightIcon } from "@/components/icons"
import { SectionWithMockup } from "@/components/ui/section-with-mockup"
import { profile } from "@/data/profile"
import { ui } from "@/data/ui"

export function Whats42() {
  return (
    <SectionWithMockup
      className="py-20 md:py-28"
      primaryImageSrc={tokyoImg}
      secondaryImageSrc={parisImg}
      title={
        <>
          <span className="mb-3 block font-mono-tight text-xs uppercase tracking-[0.22em] text-neon">
            {ui.sections.whats42}
          </span>
          42 <span className="text-neon">/</span> 42Tokyo
        </>
      }
      description={profile.whats42.body.map((text, i) => (
        <p key={i} className="m-0">
          {text}
        </p>
      ))}
    >
      <div className="mt-3 flex flex-wrap gap-3">
        {profile.whats42.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3.5 py-1.5 font-mono-tight text-sm text-foreground transition-colors hover:border-neon hover:text-neon"
          >
            {link.label}
            <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ))}
      </div>
    </SectionWithMockup>
  )
}
