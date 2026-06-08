export interface LinkItem {
  label: string
  href: string
}

export interface SkillCategory {
  name: string
  items: string[]
}

export interface Whats42 {
  body: string[]
  links: LinkItem[]
}

export interface Contact {
  email: string
  x: LinkItem
  github: LinkItem
  linkedin: LinkItem
  company: LinkItem
  note: string
}

export interface Profile {
  name: string
  nickname: string
  handle: string
  role: string
  location: string
  heroHeadlinePrefix: string
  about: string[]
  whats42: Whats42
  expertiseIntro: string
  skills: SkillCategory[]
  contact: Contact
}

export const profile: Profile = {
  name: "Ryuu Leonardo Sato",
  nickname: "Leonardo",
  handle: "rysato",
  role: "Software Engineer & CTO of StepAI, Inc.",
  location: "Tokyo, Japan",
  heroHeadlinePrefix: "Hi, I'm",
  about: [
    "I'm Ryuu Leonardo Sato, a 22-year-old Brazilian-Japanese software engineer and the CTO of StepAI, Inc., based in Tokyo, Japan.",
    "My journey into tech began with Electrical Engineering in high school in Nagoya. During those years I earned an Electrician's license, a Hazardous Materials Engineer's license, and a Mechanical Drawing & CAD certificate — ultimately graduating as the valedictorian of my class.",
    "I went on to study Computer Science at the Aichi Institute of Technology, then took a leave of absence to launch my own marketing consultancy, managing social media strategies (LINE, Instagram, X) for clients ranging from educational institutions and clinics to restaurants.",
    "That entrepreneurial experience was valuable, but my true passion is building technology from the ground up. Driven to master the fundamentals of coding, I moved to Tokyo and earned a place at 42Tokyo (April 2025 cohort) after completing the intensive 4-week “Piscine” with honors.",
    "At 42, I was recruited by a peer to join StepAI in its foundational stage. As CTO my role is comprehensive: I lead our AI-driven contract development, manage engineer hiring and team leadership, and even contribute to sales — all while architecting and building our core products.",
  ],
  whats42: {
    body: [
      "42Tokyo is the exclusive Tokyo campus of “42” from Paris — a groundbreaking, tuition-free coding institution founded in France.",
      "It bypasses traditional classes and teachers entirely, fostering elite software engineers through a highly selective, 100% project-based, peer-to-peer learning environment.",
    ],
    links: [
      { label: "42tokyo.jp", href: "https://42tokyo.jp" },
      { label: "42.fr", href: "https://42.fr/en/homepage/" },
    ],
  },
  expertiseIntro:
    "My foundational expertise is in C, specializing in low-level systems programming — system calls, kernel interactions, and memory-aware optimization. I'm actively expanding my stack across Python, C++, TypeScript, and Go, with hands-on experience in cloud infrastructure and full-cycle Linux server management.",
  skills: [
    {
      name: "Languages",
      items: ["C", "C++", "Python", "TypeScript", "Go"],
    },
    {
      name: "Systems",
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
      name: "AI / Backend",
      items: ["LLM + RAG", "STT / TTS", "Voice pipelines"],
    },
    {
      name: "Cloud & Infra",
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
    note: "For security and NDA reasons, some projects are hidden.",
  },
}
