// Content the client has not supplied yet (brief §0 rule 3, §10).
// Never replace a placeholder with invented copy — wait for the client, then edit the content file.
// Every placeholder still open must be listed in DELIVERY-NOTES.md.

export type Placeholder = `[CLIENT TO SUPPLY: ${string}]`

export const placeholder = (what: string): Placeholder => `[CLIENT TO SUPPLY: ${what}]`

export const isPlaceholder = (value: unknown): value is Placeholder =>
  typeof value === "string" && value.startsWith("[CLIENT TO SUPPLY:")
