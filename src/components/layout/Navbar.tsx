import { useEffect, useState } from "react"

import { CloseIcon, MenuIcon } from "@/components/icons"
import { LanguageToggle } from "@/components/LanguageToggle"
import { profile } from "@/data/profile"
import { ui } from "@/i18n/dictionary"
import { useLanguage } from "@/i18n/language-context"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "#about", label: ui.nav.about },
  { href: "#expertise", label: ui.nav.expertise },
  { href: "#projects", label: ui.nav.projects },
  { href: "#contact", label: ui.nav.contact },
]

export function Navbar() {
  const { lang } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  // Close the mobile menu when the layout switches to desktop, so the body
  // scroll lock can't get stuck after a resize.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const onChange = () => {
      if (mq.matches) setMenuOpen(false)
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || menuOpen
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          className="font-mono-tight text-sm font-medium tracking-tight text-foreground transition-colors hover:text-neon"
        >
          <span className="text-neon">{">_"}</span> {profile.handle}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-mono-tight text-sm text-muted-foreground transition-colors hover:text-neon"
                >
                  {item.label[lang]}
                </a>
              </li>
            ))}
          </ul>
          <LanguageToggle />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? ui.a11y.closeMenu[lang] : ui.a11y.openMenu[lang]}
            aria-expanded={menuOpen}
            className="rounded-md p-1.5 text-foreground transition-colors hover:text-neon"
          >
            {menuOpen ? (
              <CloseIcon className="size-6" />
            ) : (
              <MenuIcon className="size-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        inert={!menuOpen}
        aria-hidden={!menuOpen}
        className={cn(
          "overflow-hidden border-t border-border bg-background/95 backdrop-blur-md md:hidden",
          menuOpen ? "max-h-80" : "max-h-0 border-t-0"
        )}
        style={{ transition: "max-height 300ms ease" }}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-md px-2 py-3 font-mono-tight text-base text-foreground transition-colors hover:text-neon"
              >
                {item.label[lang]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
