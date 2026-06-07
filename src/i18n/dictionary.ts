import type { Localized } from "./types"

/** UI chrome strings (navigation, buttons, section headers, labels). */
export const ui = {
  nav: {
    about: { en: "About", ja: "自己紹介" },
    expertise: { en: "Expertise", ja: "専門領域" },
    projects: { en: "Projects", ja: "プロジェクト" },
    contact: { en: "Contact", ja: "お問い合わせ" },
  } satisfies Record<string, Localized>,

  hero: {
    cta: { en: "View My Work", ja: "今すぐ見る" },
    secondaryCta: { en: "Get in Touch", ja: "連絡する" },
    available: {
      en: "Available for New Projects",
      ja: "新規プロジェクト募集中",
    },
    scroll: { en: "Scroll", ja: "スクロール" },
  } satisfies Record<string, Localized>,

  sections: {
    about: { en: "About Me", ja: "自己紹介" },
    whats42: { en: "What's 42?", ja: "42とは？" },
    expertise: { en: "Expertise", ja: "専門領域" },
    projects: { en: "Projects & Achievements", ja: "プロジェクトと実績" },
    contact: { en: "Get in Touch", ja: "お問い合わせ" },
  } satisfies Record<string, Localized>,

  sectionLabels: {
    about: { en: "01 — Who I am", ja: "01 — 私について" },
    expertise: { en: "02 — What I do", ja: "02 — できること" },
    projects: { en: "03 — Selected work", ja: "03 — 主な仕事" },
    contact: { en: "04 — Say hello", ja: "04 — ご挨拶" },
  } satisfies Record<string, Localized>,

  projects: {
    viewSite: { en: "View Site", ja: "サイトを見る" },
    featured: { en: "Featured", ja: "注目" },
    viewOnGithub: { en: "View My Work on GitHub", ja: "GitHubでコードを見る" },
  } satisfies Record<string, Localized>,

  contact: {
    email: { en: "Email", ja: "メール" },
    intro: {
      en: "I'm always open to discussing new projects, technology, or potential collaborations.",
      ja: "新しいプロジェクトや技術、コラボレーションのご相談はいつでも歓迎します。",
    },
  } satisfies Record<string, Localized>,

  footer: {
    tagline: { en: "Built from the metal up.", ja: "鉄から、積み上げる。" },
  } satisfies Record<string, Localized>,

  a11y: {
    toggleLanguage: { en: "Switch to Japanese", ja: "Switch to English" },
    openMenu: { en: "Open menu", ja: "メニューを開く" },
    closeMenu: { en: "Close menu", ja: "メニューを閉じる" },
    skipToContent: { en: "Skip to content", ja: "本文へスキップ" },
  } satisfies Record<string, Localized>,
}
