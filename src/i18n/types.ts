export type Lang = "en" | "ja"

/** A single string available in every supported language. */
export type Localized = Record<Lang, string>

/** A list of strings (e.g. paragraphs) available in every supported language. */
export type LocalizedList = Record<Lang, string[]>
