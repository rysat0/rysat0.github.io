import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import { LanguageContext } from "./language-context"
import type { Lang } from "./types"

const STORAGE_KEY = "rysato-lang"

function isLang(value: string | null): value is Lang {
  return value === "en" || value === "ja"
}

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "en"
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isLang(stored)) return stored
  } catch {
    // localStorage can throw when access is denied (sandboxed iframe,
    // strict privacy settings). Fall through to language detection.
  }
  return navigator.language.toLowerCase().startsWith("ja") ? "ja" : "en"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Ignore storage failures (private mode, quota, etc.).
    }
  }, [lang])

  const toggle = useCallback(
    () => setLangState((prev) => (prev === "en" ? "ja" : "en")),
    []
  )

  const value = useMemo(() => ({ lang, toggle }), [lang, toggle])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
