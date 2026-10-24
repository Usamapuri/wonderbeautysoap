// Meet the Team (brief §4.2). Client-supplied only (§10): photo, role (designation), one-line bio,
// plus each person's confirmation that they are happy to appear on the public site.
// No personal names on the site — people are shown by designation only (developer, 2026-10-25).
// Adding a member = adding one entry here. The section is hidden while this list is empty —
// never add placeholder people.
//
// Photos: brand-assets/source/team/<slug>.jpg -> public/brand-assets/team/<slug>.webp (square crop).

export type TeamMember = {
  /** Designation, e.g. "Founder". Never a person's name. */
  role: string
  bio: string
  photo: string
}

export const team: TeamMember[] = []
