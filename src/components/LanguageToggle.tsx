import { ui } from "@/i18n/dictionary"
import { useLanguage } from "@/i18n/language-context"
import { cn } from "@/lib/utils"

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, toggle } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={ui.a11y.toggleLanguage[lang]}
      className={cn(
        "rounded-full border border-border bg-card/50 px-3 py-1 font-mono-tight text-xs text-foreground backdrop-blur transition-colors hover:border-neon hover:text-neon",
        className
      )}
    >
      {lang === "en" ? "日本語" : "EN"}
    </button>
  )
}
