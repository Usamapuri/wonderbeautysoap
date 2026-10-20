# Features (brief §5)

## 5.1 Email list pop-up → Mailchimp

**Provider:** Mailchimp, with the account owned by the client (`hello@royalbasketgroup.com`). The custom on-brand UI posts to the audience's **embedded-form endpoint**. No API key, no server, no secrets. Store nothing locally except the frequency-cap flags.

**Implemented** in `src/components/email-popup.tsx` + `src/lib/subscribe.ts`. Config: `NEXT_PUBLIC_MAILCHIMP_ACTION` (read in `integrations` in `site.ts`).

**Wiring:** from Mailchimp → Audience → Signup forms → Embedded form, take the `action` URL (`https://<dc>.list-manage.com/subscribe/post?u=<u>&id=<id>&f_id=<f>`). Put `u`, `id`, `dc` in `src/content/site.ts` (or `NEXT_PUBLIC_*` env vars). Submit from the browser to the **`/subscribe/post-json` variant with a JSONP `c=<callback>` parameter**, since the plain endpoint has no CORS. Include Mailchimp's bot honeypot field `b_<u>_<id>` (empty). Map the JSONP `result: "success" | "error"` to the UI states. Keep this logic in one helper, `src/lib/subscribe.ts`. Single opt-in by default; double opt-in only if the client asks.

**UI:** a client component `src/components/email-popup.tsx`, mounted once in `layout.tsx`.
- Desktop: shadcn `Dialog`. Mobile (<560px): a bottom-sheet card. Either shadcn `Drawer` (`npx shadcn add drawer`) or `Sheet side="bottom"`, at most 70svh tall, with `pb-[env(safe-area-inset-bottom)]`, not covering the header.
- Content: paper card, gold rule, serif headline (e.g. "Join the Wonder list"), one line (updates, launches, offers), labelled email `Input`, *Subscribe* `Button variant="wonder"`, and a plain **"No thanks"** decline. No confirm-shaming. Add an incentive line only if the client approves one.
- Contrast: ink text on paper. Never light gold text on cream.

**Trigger & frequency** (store under `localStorage` key `wonder-popup` as JSON `{ shown: number, dismissedAt?: number, subscribed?: true }`, inside try/catch):
- First visit only: open after **≥12s on site AND ≥50% scroll depth**, whichever comes later, and never within the first 3s.
- Never on `/contact` once the user has interacted with the form.
- Dismissed → don't show for **30 days**. Subscribed → never again. Hard cap: **2 impressions ever** without subscribing.
- Dismiss paths: ✕ button (≥40×40px), ESC, backdrop click. Radix Dialog/Sheet provide ESC/backdrop and focus trap/return. Lock page scroll only while open.

**States:** idle → submitting (button disabled + spinner) → success ("You're on the list — welcome to the Wonder world." + close) / error (inline message, email kept).

**Acceptance:** appears per the rules on a fresh profile · not on a second visit within 30 days · all 3 dismiss paths work · never again after subscribing (clear cache but not localStorage) · a test sign-up lands in the Mailchimp audience · mobile bottom sheet with no layout shift · keyboard-only: tab → submit → ESC.

## 5.2 Contact form → Formspree

**Implemented** in `src/components/contact/contact-form.tsx` (zod validation, shadcn Field/Input/Select/Checkbox) + `src/lib/enquiry.ts`. Config: `NEXT_PUBLIC_FORMSPREE_ID`. While unset, `submitEnquiry()` opens a pre-filled `mailto:` draft instead. The bulk CTA (`bulk-cta.tsx`) sets `?type=bulk` and fires a `wonder:enquiry-type` event so the form re-applies Bulk.

**Provider:** Formspree for launch. Delivery to `hello@royalbasketgroup.com`; the client is added to the account. Swappable later for a Next.js route handler (`src/app/api/enquiry/route.ts`) + Resend, so **all submit logic lives in one `submitEnquiry()` in `src/lib/enquiry.ts`** and the page doesn't change.

**UI:** `src/components/contact/contact-form.tsx` (client). shadcn primitives: `npx shadcn add field input textarea select checkbox label`. Validate with `zod` (+ `react-hook-form` if useful). Inline errors go under each field in brand styling (`text-destructive`, 10px).

Fields and rules:
| Field | Rule |
|---|---|
| name | required |
| email | required, valid email |
| enquiryType | required: `general` · `bulk` · `stockist` · `press` (labels: General question · Bulk order · Stock the range · Press / other) |
| product | optional: the 5 slugs + `none` ("Not product-specific") |
| message | required, ≥ 10 chars |
| consent | required checkbox: "You may contact me about my enquiry" |
| `_gotcha` | hidden honeypot, must stay empty |

**Payload:** POST JSON to `https://formspree.io/f/<formId>` with `Accept: application/json`. Include `enquiryType`, `product` and `_subject: "[Website] <Enquiry type label> — <Name>"` so bulk orders can be triaged at a glance. `_replyto` = email.

**Pre-fill:** `/contact?product=lemon` and `/contact?type=bulk` are parsed on load (`useSearchParams` inside `<Suspense>`). Invalid values are ignored. The bulk panel CTA sets `enquiryType=bulk` and scrolls to the form.

**States:** submitting (disabled button) → success panel replacing the form ("Thank you — we'll reply by email.") / error panel with *Try again* and "Or email us directly at hello@royalbasketgroup.com" (mailto).

**Acceptance:** each enquiry type arrives with the correct subject · invalid email, short message or unchecked consent are blocked inline · both deep links pre-fill · success and failure are reachable and on-brand (simulate failure by blocking the endpoint in DevTools).
