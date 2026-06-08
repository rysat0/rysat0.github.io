export interface Project {
  id: string
  name: string
  org?: string
  description: string
  tags: string[]
  /** Optional external link (e.g. live site, legal page, company HP). */
  url?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: "reco",
    name: "Reco",
    org: "StepAI",
    featured: true,
    description:
      "Our flagship AI outbound/inbound call system, architected and built from scratch — an STT → LLM (RAG) → TTS pipeline running on AWS infrastructure.",
    tags: ["AWS", "STT", "LLM", "RAG", "TTS"],
    url: "https://www.stepai.co.jp",
  },
  {
    id: "androx",
    name: "Androx",
    featured: true,
    description:
      "A hormone-tracking iOS app. I reviewed peer-reviewed research, synthesized findings from multiple perspectives, and built behavior-change features for men using biometric data from Apple Watch and iPhone.",
    tags: ["iOS", "Swift", "HealthKit", "Research"],
    url: "https://rysat0.github.io/androx-legal/",
  },
  {
    id: "chatbot-azure",
    name: "AI LINE–Chatwork Chatbot",
    description:
      "An RAG-powered LLM chat system on Microsoft Azure, focused on optimized performance and response quality.",
    tags: ["Azure", "LLM", "RAG"],
  },
  {
    id: "shell",
    name: "Shell",
    description:
      "A Unix shell (bash) built from scratch in C: custom lexer/parser, process creation via fork/execve, pipes & I/O redirection (incl. heredocs), env-var expansion, signal handling, and builtins — all with manual memory management and zero leaks.",
    tags: ["C", "Unix", "Parser", "Processes"],
  },
  {
    id: "low-level-c",
    name: "Low-Level C Implementations",
    description:
      "Re-implemented foundational C libraries and core Unix tooling to gain deep mastery of system internals.",
    tags: ["C", "libc", "Systems"],
  },
  {
    id: "graphics",
    name: "Graphics Rendering System",
    description:
      "A graphics rendering engine in C, focused on memory optimization and high-speed performance for an optimal user experience.",
    tags: ["C", "Graphics", "Rendering", "Optimization"],
  },
  {
    id: "concurrent",
    name: "Concurrent Systems",
    description:
      "A system designed for high-throughput computation, built on ACID principles through parallel and concurrent processing.",
    tags: ["C", "Concurrency", "Parallelism", "ACID"],
  },
  {
    id: "conversational-automation",
    name: "Conversational Automation",
    description:
      "An all-in-one chatbot for LINE & Instagram that fully automated customer interactions: appointment booking, instant Q&A, broadcast messaging, and guided sales funnels.",
    tags: ["LINE", "Instagram", "Automation", "Chatbot"],
  },
]
