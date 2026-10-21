# Deployment, editing workflow, QA (brief §7–§9, §12)

## Repo & branching

- Code repo: https://github.com/Usamapuri/wonderbeautysoap (the developer needs collaborator write access). `main` = production. Use feature branch → PR → Vercel preview → merge. After launch, no direct pushes to `main` except trivial copy fixes.
- Verify before changing anything: `npm install && npm run build`.

## Vercel (§7.2, adapted to Next.js)

1. The project lives under a Vercel team **the client owns** (signed up with `hello@royalbasketgroup.com`), with the developer added as a member.
2. Import the GitHub repo. Framework preset **Next.js** (auto-detected), build `next build`, default output. **No `vercel.json` rewrite is needed**: routes are real pages, so deep links and refreshes work.
3. Current review deploy (until the client team + Git link exist): `https://wonder-beauty-soap.vercel.app`, CLI-linked (`.vercel/`, gitignored). Redeploy with `vercel deploy --prod` from a clean `main`. `next.config.ts` sends `X-Robots-Tag: noindex` on `*.vercel.app` hosts; `.vercelignore` excludes `brand-assets/`, `scripts/`, `.claude/`. Git-linking needs Vercel's GitHub app on the `Usamapuri` account (owner-only), then `vercel git connect`.
4. Production branch is `main`, with previews for every branch/PR. No secrets at launch. Set the two public env vars `NEXT_PUBLIC_FORMSPREE_ID` and `NEXT_PUBLIC_MAILCHIMP_ACTION` for Production and Preview. They are inlined at build time, so redeploy after changing them.

## Custom domain + Spaceship DNS (§7.3). Read step 3 twice.

1. Vercel → Settings → Domains: add `royalbasketgroup.com` and `www.royalbasketgroup.com`. **www is primary**, and the apex redirects to it (confirm canonical choice with the client).
2. Expected records (use whatever Vercel shows if different): `A @ → 76.76.21.21`, `CNAME www → cname.vercel-dns.com`.
3. In Spaceship → domain → DNS: **screenshot the entire record list first.** Delete only old `A`/`AAAA`/`CNAME` for `@` and `www`. **Never touch MX records or the SPF/DKIM/DMARC TXT records.** They run `hello@royalbasketgroup.com`. Keep the nameservers on Spaceship.
4. Add the two records. Wait for propagation; Vercel issues SSL automatically.
5. Verify: https://www.royalbasketgroup.com has a padlock · the apex redirects · `/collection` loads directly.
6. **Email round-trip:** send from an external account to hello@, and reply from it. If either fails, diff DNS against the screenshot and restore.

Access (§9): the client asks Spaceship support for **Multi-User Access** and adds the developer as a team member/domain manager. The developer never needs the client's password. Check access read-only until go-live.

## Editing after launch (§8)

All wording lives in `src/content/*.ts`, so a change is a one-file edit. Push or merge, and Vercel redeploys in about a minute, with preview URLs for review and instant rollback in the dashboard. Launch with option A (the developer edits). Offer Sanity (option B) only if the client edits often. Don't build a CMS speculatively.

## Local visual check (agent recipe)

`npm run build && npx next start -p 3123`. **Restart the server after every rebuild**: a stale server returns 500 for the new CSS chunks, and pages render unstyled. Screenshots work best with `playwright-core` driving `~/.cache/ms-playwright/chromium_headless_shell-*/chrome-headless-shell` (`waitUntil: "networkidle"`, scroll through the page to load lazy images, then `fullPage: true`). Install playwright-core in the scratchpad, not the project. Scroll the whole page before screenshots or assertions, because below-the-fold sections stay at opacity 0 until revealed. For reveal checks, count only visible elements (`el.checkVisibility()`), since Next keeps visited routes in the DOM, hidden. Check 360 / 390 / 768 / 1440 px and assert `document.documentElement.scrollWidth - innerWidth === 0`. Chrome `--headless --virtual-time-budget` can hang here, so avoid it. Never `pkill -f` a pattern that appears in your own command line.

Behaviour can be tested without the real accounts: build with dummy `NEXT_PUBLIC_*` values, then intercept `https://formspree.io/**` and `https://*.list-manage.com/**` with `page.route()` (the Mailchimp mock must answer JSONP: `<c param>({"result":"success","msg":"ok"})`). Use `page.clock.install()` + `runFor()` to test the pop-up's 12 s timer. **Rebuild without the dummy values afterwards.**

## QA checklist (on the preview URL, before DNS)

- [ ] All 5 routes and every anchor/deep link work; refreshing each route returns the page
- [ ] 360 / 390 / 768 / 1440 px: no horizontal scroll, tap targets ≥ 40px, nav usable
- [ ] Chrome, iOS Safari, Firefox: layout, video (muted autoplay on iOS, poster first), pop-up
- [ ] Images are WebP, sized to their slot, with alt text; the hero is preloaded; page weight is sane on 4G
- [ ] Pop-up passes the full §5.1 criteria (including 30-day suppression); forms pass the full §5.2 criteria (including the failure state)
- [ ] Copy proofread against Appendix A: names, email, URLs, product order, taglines spelled exactly
- [ ] Unique `<title>` + description per page; OG/Twitter image; favicon; robots allows indexing
- [ ] Accessibility: heading order, labels, visible focus (gold outline), contrast on cream
- [ ] **No placeholder text (`[CLIENT TO SUPPLY`), no invented facts, no lorem ipsum anywhere reachable**: `grep -r "CLIENT TO SUPPLY" src/content` must be empty for launch

## Go-live checklist

- [ ] Written client sign-off on the preview
- [ ] Spaceship DNS screenshotted; only `@`/`www` changed; MX + SPF/DKIM/DMARC untouched (diff against the screenshot)
- [ ] HTTPS on www, apex redirects, deep links load
- [ ] Email round-trip to/from hello@royalbasketgroup.com passes
- [ ] Test pop-up sign-up and test contact submission on the **live** domain
- [ ] Footer social links open the correct profiles
- [ ] Handover note: how to request edits (§8), who owns which account (§9)
