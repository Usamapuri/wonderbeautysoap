# Wonder Beauty Soap — website

Portfolio site for Wonder Beauty Soap (Royal Basket Group). Next.js 16 · shadcn/ui · Tailwind v4.

- Brief: [implementation-plan.md](implementation-plan.md)
- Build guide for agents: [.claude/skills/wonder-site/SKILL.md](.claude/skills/wonder-site/SKILL.md)
- Open items: [DELIVERY-NOTES.md](DELIVERY-NOTES.md)

```bash
npm install
npm run dev                         # http://localhost:3000
npm run build                       # production build (must pass before merging)
python3 scripts/prepare_assets.py   # regenerate web images from brand-assets/
```

All copy lives in `src/content/`. Edit wording there, and push to deploy.
