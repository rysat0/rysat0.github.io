import type { Localized, LocalizedList } from "@/i18n/types"

export interface LinkItem {
  label: string
  href: string
}

export interface SkillCategory {
  name: Localized
  items: string[]
}

export interface Whats42 {
  body: LocalizedList
  links: LinkItem[]
}

export interface Contact {
  email: string
  x: LinkItem
  github: LinkItem
  linkedin: LinkItem
  company: LinkItem
  note: Localized
}

export interface Profile {
  name: Localized
  nickname: string
  handle: string
  role: Localized
  roleChips: Localized
  location: Localized
  heroHeadlinePrefix: Localized
  heroTagline: Localized
  about: LocalizedList
  whats42: Whats42
  expertiseIntro: Localized
  skills: SkillCategory[]
  contact: Contact
}

export const profile: Profile = {
  name: { en: "Ryuu Leonardo Sato", ja: "佐藤 リュウ レオナルド" },
  nickname: "Leonardo",
  handle: "rysato",
  role: {
    en: "Software Engineer & CTO of StepAI, Inc.",
    ja: "ソフトウェアエンジニア / StepAI株式会社 CTO",
  },
  roleChips: {
    en: "Software Engineer · CTO @ StepAI · Tokyo",
    ja: "Software Engineer · CTO @ StepAI · 東京",
  },
  location: { en: "Tokyo, Japan", ja: "東京" },
  heroHeadlinePrefix: { en: "Hi, I'm", ja: "こんにちは、" },
  heroTagline: {
    en: "Brazilian-Japanese software engineer building from the metal up — low-level systems in C, AI voice & RAG pipelines, and the cloud they run on.",
    ja: "ブラジル系日本人のソフトウェアエンジニア。C言語による低レイヤシステムから、AI音声・RAGパイプライン、それを動かすクラウドまで——“鉄から”作り上げます。",
  },
  about: {
    en: [
      "I'm Ryuu Leonardo Sato, a 22-year-old Brazilian-Japanese software engineer and the CTO of StepAI, Inc., based in Tokyo, Japan.",
      "My journey into tech began with Electrical Engineering in high school in Nagoya. During those years I earned an Electrician's license, a Hazardous Materials Engineer's license, and a Mechanical Drawing & CAD certificate — ultimately graduating as the valedictorian of my class.",
      "I went on to study Computer Science at the Aichi Institute of Technology, then took a leave of absence to launch my own marketing consultancy, managing social media strategies (LINE, Instagram, X) for clients ranging from educational institutions and clinics to restaurants.",
      "That entrepreneurial experience was valuable, but my true passion is building technology from the ground up. Driven to master the fundamentals of coding, I moved to Tokyo and earned a place at 42Tokyo (April 2025 cohort) after completing the intensive 4-week “Piscine” with honors.",
      "At 42, I was recruited by a peer to join StepAI in its foundational stage. As CTO my role is comprehensive: I lead our AI-driven contract development, manage engineer hiring and team leadership, and even contribute to sales — all while architecting and building our core products.",
    ],
    ja: [
      "東京を拠点に活動する、22歳のブラジル系日本人ソフトウェアエンジニア、佐藤リュウレオナルドです。StepAI株式会社のCTOを務めています。",
      "テクノロジーへの道は、名古屋の高校で学んだ電気工学から始まりました。在学中に電気工事士・危険物取扱者・機械製図／CAD技能の資格を取得し、最終的に首席で卒業しました。",
      "その後、愛知工業大学でコンピュータサイエンスを専攻。しかし休学して自身のマーケティングコンサル会社を立ち上げ、教育機関・クリニックから飲食店まで、多様なクライアントのSNS戦略（LINE・Instagram・X）を運用しました。",
      "起業の経験は貴重でしたが、私の真の情熱はテクノロジーをゼロから作り上げることにあります。コーディングの基礎を極めるべく東京へ移り、4週間の選抜プログラム「Piscine」を優秀な成績で突破して、42Tokyo（2025年4月期）への入学を勝ち取りました。",
      "42で仲間に誘われ、創業期のStepAIに参画。CTOとして、AI受託開発のリード、エンジニア採用とチームマネジメント、さらには営業まで幅広く担いながら、コアプロダクトの設計・開発を行っています。",
    ],
  },
  whats42: {
    body: {
      en: [
        "42Tokyo is the exclusive Tokyo campus of “42” from Paris — a groundbreaking, tuition-free coding institution founded in France.",
        "It bypasses traditional classes and teachers entirely, fostering elite software engineers through a highly selective, 100% project-based, peer-to-peer learning environment.",
      ],
      ja: [
        "42Tokyoは、フランス発の革新的な学費無料エンジニア養成機関「42」（パリ）の東京校です。",
        "従来の授業や教師を一切排し、徹底した選抜・100%プロジェクトベース・ピアラーニングの環境で、トップレベルのソフトウェアエンジニアを育成します。",
      ],
    },
    links: [
      { label: "42tokyo.jp", href: "https://42tokyo.jp" },
      { label: "42.fr", href: "https://42.fr/en/homepage/" },
    ],
  },
  expertiseIntro: {
    en: "My foundational expertise is in C, specializing in low-level systems programming — system calls, kernel interactions, and memory-aware optimization. I'm actively expanding my stack across Python, C++, TypeScript, and Go, with hands-on experience in cloud infrastructure and full-cycle Linux server management.",
    ja: "専門の中核はC言語で、システムコール・カーネル連携・メモリを意識した最適化など、低レイヤのシステムプログラミングを得意とします。Python・C++・TypeScript・Goへとスタックを拡張中。クラウドインフラや、構築からプロセス管理・WebデプロイまでのフルサイクルなLinuxサーバ運用の実務経験があります。",
  },
  skills: [
    {
      name: { en: "Languages", ja: "言語" },
      items: ["C", "C++", "Python", "TypeScript", "Go"],
    },
    {
      name: { en: "Systems", ja: "システム" },
      items: [
        "System calls",
        "Kernel interaction",
        "Memory optimization",
        "fork / execve",
        "Signals",
        "Concurrency (ACID)",
      ],
    },
    {
      name: { en: "AI / Backend", ja: "AI・バックエンド" },
      items: ["LLM + RAG", "STT / TTS", "Voice pipelines"],
    },
    {
      name: { en: "Cloud & Infra", ja: "クラウド・インフラ" },
      items: [
        "AWS",
        "Azure",
        "Linux server ops",
        "Security hardening",
        "Web deployment",
      ],
    },
  ],
  contact: {
    email: "leonardo@stepai.co.jp",
    x: { label: "@xx_leo_6", href: "https://x.com/xx_leo_6" },
    github: { label: "@rysat0", href: "https://github.com/rysat0" },
    linkedin: {
      label: "Ryuu Leonardo Sato",
      href: "https://www.linkedin.com/in/ryuu-leonardo-sato-813190380/",
    },
    company: { label: "stepai.co.jp", href: "https://www.stepai.co.jp" },
    note: {
      en: "For security and NDA reasons, some projects are hidden.",
      ja: "セキュリティおよびNDAの都合により、一部のプロジェクトは非公開です。",
    },
  },
}
