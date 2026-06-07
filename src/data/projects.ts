import type { Localized } from "@/i18n/types"

export interface Project {
  id: string
  name: string
  org?: string
  description: Localized
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
    description: {
      en: "Our flagship AI outbound/inbound call system, architected and built from scratch — an STT → LLM (RAG) → TTS pipeline running on AWS infrastructure.",
      ja: "StepAIのフラッグシップAI発着信通話システムをゼロから設計・構築。AWS基盤上でSTT→LLM（RAG）→TTSのパイプラインを実現しました。",
    },
    tags: ["AWS", "STT", "LLM", "RAG", "TTS"],
    url: "https://www.stepai.co.jp",
  },
  {
    id: "androx",
    name: "Androx",
    featured: true,
    description: {
      en: "A hormone-tracking iOS app. I reviewed peer-reviewed research, synthesized findings from multiple perspectives, and built behavior-change features for men using biometric data from Apple Watch and iPhone.",
      ja: "ホルモン追跡iOSアプリ。査読論文をレビューし複数の視点から知見を統合、Apple Watch／iPhoneの生体データを用いて男性向けの行動変容機能を開発しました。",
    },
    tags: ["iOS", "Swift", "HealthKit", "Research"],
    url: "https://rysat0.github.io/androx-legal/",
  },
  {
    id: "chatbot-azure",
    name: "AI LINE–Chatwork Chatbot",
    description: {
      en: "An RAG-powered LLM chat system on Microsoft Azure, focused on optimized performance and response quality.",
      ja: "Microsoft Azure上のRAG×LLMチャットシステム。性能と応答品質の最適化に注力しました。",
    },
    tags: ["Azure", "LLM", "RAG"],
  },
  {
    id: "shell",
    name: "Shell",
    description: {
      en: "A Unix shell (bash) built from scratch in C: custom lexer/parser, process creation via fork/execve, pipes & I/O redirection (incl. heredocs), env-var expansion, signal handling, and builtins — all with manual memory management and zero leaks.",
      ja: "C言語でゼロから作ったUnixシェル(bash)。独自レキサ/パーサ、fork/execveによるプロセス生成、パイプとI/Oリダイレクト（ヒアドキュメント含む）、環境変数展開、シグナル処理、ビルトイン——すべて手動メモリ管理・リークゼロで実装。",
    },
    tags: ["C", "Unix", "Parser", "Processes"],
  },
  {
    id: "low-level-c",
    name: "Low-Level C Implementations",
    description: {
      en: "Re-implemented foundational C libraries and core Unix tooling to gain deep mastery of system internals.",
      ja: "標準Cライブラリや中核的なUnixツールを再実装し、システム内部構造への深い理解を獲得しました。",
    },
    tags: ["C", "libc", "Systems"],
  },
  {
    id: "graphics",
    name: "Graphics Rendering System",
    description: {
      en: "A graphics rendering engine in C, focused on memory optimization and high-speed performance for an optimal user experience.",
      ja: "メモリ最適化と高速描画にこだわった、C言語によるグラフィックス描画エンジン。最適なユーザー体験を追求しました。",
    },
    tags: ["C", "Graphics", "Rendering", "Optimization"],
  },
  {
    id: "concurrent",
    name: "Concurrent Systems",
    description: {
      en: "A system designed for high-throughput computation, built on ACID principles through parallel and concurrent processing.",
      ja: "並列・並行処理によりACID原則を満たす、高スループット計算向けに設計したシステム。",
    },
    tags: ["C", "Concurrency", "Parallelism", "ACID"],
  },
  {
    id: "conversational-automation",
    name: "Conversational Automation",
    description: {
      en: "An all-in-one chatbot for LINE & Instagram that fully automated customer interactions: appointment booking, instant Q&A, broadcast messaging, and guided sales funnels.",
      ja: "LINE・Instagram向けのオールインワン・チャットボット。予約受付、即時Q&A、一斉配信、セールスファネルまで顧客対応を完全自動化しました。",
    },
    tags: ["LINE", "Instagram", "Automation", "Chatbot"],
  },
]
