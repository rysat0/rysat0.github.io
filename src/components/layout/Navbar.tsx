import { useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"

import { CloseIcon, MenuIcon } from "@/components/icons"
import { profile } from "@/data/profile"
import { ui } from "@/data/ui"
import { cn } from "@/lib/utils"
import { prefersReducedMotion } from "@/lib/motion"

const navItems = [
  { to: "/about", label: ui.nav.about },
  { to: "/expertise", label: ui.nav.expertise },
  { to: "/projects", label: ui.nav.projects },
  { to: "/contact", label: ui.nav.contact },
]

export function Navbar() {
  const location = useLocation()
  const isHome = location.pathname === "/"
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

  // Solid (blurred) over content on inner pages and once scrolled; transparent
  // at the top of the home hero.
  const solid = scrolled || menuOpen || !isHome

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "font-mono-tight text-sm transition-colors hover:text-neon",
      isActive ? "text-neon" : "text-muted-foreground"
    )

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "block rounded-md px-2 py-3 font-mono-tight text-base transition-colors hover:text-neon",
      isActive ? "text-neon" : "text-foreground"
    )

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link
          to="/"
          onClick={() => {
            setMenuOpen(false)
            // Already home: Link won't navigate, so scroll back to the hero.
            if (isHome) {
              window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion() ? "auto" : "smooth",
              })
            }
          }}
          className="font-mono-tight text-sm font-medium tracking-tight text-foreground transition-colors hover:text-neon"
        >
          <span className="text-neon">{">_"}</span> {profile.handle}
        </Link>

        <div className="hidden items-center md:flex">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={linkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? ui.a11y.closeMenu : ui.a11y.openMenu}
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
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={mobileLinkClass}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
