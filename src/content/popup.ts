// Email sign-up pop-up copy (brief §5.1, client change request #3).
// Headline/copy need client approval (§10). No incentive unless the client approves one —
// set `incentive` to the approved line; null = not shown. Never invent a discount.

export const popup = {
  eyebrow: "Wonder Beauty Soap",
  heading: "Join the Wonder list",
  body: "Brand updates, new launches and offers — straight to your inbox.",
  incentive: null as string | null,
  emailLabel: "Email address",
  emailPlaceholder: "you@example.com",
  submit: "Subscribe",
  submitting: "Subscribing…",
  decline: "No thanks",
  success: "You're on the list — welcome to the Wonder world.",
  close: "Close",
  errors: {
    invalid: "Please enter a valid email address.",
    failed: "We couldn't add you just now. Please try again in a moment.",
  },
} as const
