# NQH™ Practitioner Companion

> An AI-powered dashboard that walks you through Phases 2, 3, and 4 of the **NQH™ Healer Accelerator** by Miindtraa. Built by Dr. Amaey A. Parekh and Pankaj S. Nikam for practitioners building their first ₹25K+ clients.

---

## What this is

A **private, local-first** companion you run in your own browser. As you move through the Accelerator:

- 🎯 **Phase 2 — Identity & Positioning.** Niche worksheet, positioning triangle, 3-tier offer architecture, money-belief reset, 14-day video challenge.
- 🔧 **Phase 3 — Client Pipeline.** Funnel map, 9-chapter VSL script, landing page + TidyCal + thank-you page + WhatsApp nurture, Meta Pixel + CAPI, ad compliance, sales call script + 10 objection cards.
- 📊 **Phase 4 — Scaling Systems.** KPI tracker, 6-SOP pack, money management, AI prompt library, 90-day growth plan, graduation checklist.

Each module has:
- The objective from the NQH Healer Accelerator curriculum
- Worksheets that auto-save as you type
- An **AI Assist** button on every prompt — uses your own Anthropic API key to give NQH-aware feedback in Amaey's voice
- A milestone checkbox to track completion

Plus a dedicated **AI Coach** chat that has memory of all your saved worksheets.

---

## How to run it

You have three options.

### Option A — Just open it (zero setup)

Download this folder. Open `index.html` in any modern browser. Done.

That's it. No build step, no server, no dependencies.

### Option B — Host it free on GitHub Pages (recommended for practitioners)

1. Create a free GitHub account at [github.com](https://github.com).
2. Click **New repository** → name it `nqh-companion` (or anything). Keep it **Public** (Pages requires this on free accounts) or **Private** if you're on GitHub Pro.
3. Click **Add file → Upload files** and drag this entire folder in. Commit.
4. Go to your repo's **Settings → Pages**.
5. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`. Save.
6. Wait 1–2 minutes. Your companion is live at `https://yourusername.github.io/nqh-companion/`.

The included GitHub Actions workflow at `.github/workflows/deploy.yml` will also re-deploy automatically on every push.

### Option C — Self-host

This is plain HTML + CSS + JavaScript. Drop the folder on any static host (Netlify, Vercel, Cloudflare Pages, your own server). No backend needed.

---

## First-time setup (~3 minutes)

1. Open the app. The welcome screen will ask for your name and (optionally) an Anthropic API key.
2. **Get your API key** (free to start):
   - Go to [console.anthropic.com](https://console.anthropic.com/settings/keys)
   - Sign up, then create an API key. It will start with `sk-ant-...`
   - Anthropic gives you free credits to start. Pay-as-you-go after that. Typical cost: ₹2–8 per AI Assist run.
3. Paste your key into the Companion. It's stored **only in your browser** (`localStorage`). It never touches our servers.
4. Click **Begin** and start with Module 2.1.

---

## Privacy & data ownership

This was built **local-first** on purpose. Healing work involves money beliefs, family stories, niche decisions, and private journaling. None of that should sit on someone else's server.

- ✅ Everything you write stays in your browser's `localStorage` on your device.
- ✅ Your Anthropic API key never leaves your browser except to call Anthropic directly.
- ✅ AI requests go from your browser → Anthropic. Miindtraa servers see nothing.
- ✅ Use **Settings → Export Backup** any time to save a JSON copy you control.
- ✅ Use **Settings → Import Backup** to move to a new device.

If you clear your browser data or use Incognito, the Companion forgets everything. **Export backups regularly** — your worksheets are valuable.

---

## How AI Assist works

Each module has prompts that combine **your saved worksheet data** + the **NQH curriculum context** + a **specific task** (critique my niche, generate landing page copy, etc.).

When you click `Run`, the prompt is sent directly from your browser to Anthropic's API. The response streams back into the module page. You can run it as many times as you want; only API token cost applies.

The AI is loaded with a system prompt that:
- Knows the four NQH pillars (Neuro Rewiring, Chakra Activation, Emotion Mastery, Quantum Manifestation)
- Knows the 120-day Accelerator structure
- Speaks in Amaey + Pankaj's grounded-direct voice (Indian English, no mystical-woo, no corporate-bubbly)
- Defers to L1 facilitators for new methodology teaching (doctrine: "diagnose generously, demonstrate selectively, teach only in Level 1")
- Will not give medical, legal, or financial advice — always defers to a professional

---

## Project structure

```
nqh-companion/
├── index.html              # entry point — open this in browser
├── css/
│   └── styles.css          # gold-on-black design system, Cormorant Garamond + Inter
├── js/
│   ├── curriculum.js       # all 24 modules, worksheets, AI prompts
│   ├── ai.js               # Anthropic API integration + markdown rendering
│   └── app.js              # state, routing, rendering, chat, settings
├── assets/
│   └── favicon.svg         # NQH mark
├── .github/workflows/
│   └── deploy.yml          # auto-deploy to GitHub Pages
├── README.md               # this file
└── LICENSE                 # see below
```

---

## What's where in the curriculum

| Phase | Module | Title |
|---|---|---|
| **2** | 2.1 | The Healer Identity Shift |
|  | 2.2 | Niche Selection Without Freezing |
|  | 2.3 | Positioning Statement + Profile Optimization |
|  | 2.4 | Offer Architecture + Pricing Reset |
|  | 2.5 | Money-Belief Reset |
|  | 2.6 | The 14-Day Video Challenge |
| **3** | 3.1 | Funnel Strategy Overview |
|  | 3.2 | VSL Script + Recording |
|  | 3.3 | Landing Page Build (Systeme.io) |
|  | 3.4 | TidyCal Booking Page |
|  | 3.5 | Thank-You Page |
|  | 3.6 | WhatsApp Group Nurture |
|  | 3.7 | Meta Pixel + Conversions API |
|  | 3.8 | Meta Ads Account Setup |
|  | 3.9 | Meta Ad Compliance + Creative |
|  | 3.10 | Ad Launch + 7-Day Learning Phase |
|  | 3.11 | Sales Call Script + Objection Handling |
|  | 3.12 | Launch + Pabbly Automations |
| **4** | 4.1 | KPI Tracker Install |
|  | 4.2 | The 6-SOP Pack |
|  | 4.3 | Money Management for Practitioners |
|  | 4.4 | AI Support Stack |
|  | 4.5 | 90-Day Growth Plan |
|  | 4.6 | Graduation Checklist |

24 modules. Roughly 90 worksheet fields + 18 AI Assist prompts + AI Coach with full memory.

---

## Cost expectations (Anthropic API)

The Companion uses `claude-sonnet-4-5-20250929` (current default). Rough cost per session of practitioner work:

- AI Assist click (1500–2000 token response): **₹2–6**
- AI Coach 15-message conversation: **₹15–40**
- Full module completion with 3 AI Assist runs + chat: **₹20–60**

Across all 24 modules with frequent AI use, expect **₹500–₹1,500 in total API costs** for the full Phase 2/3/4 journey. Anthropic's free credit covers the first few modules. After that, you load $5 (~₹420) at a time.

You control your budget — set spending limits at [console.anthropic.com/settings/limits](https://console.anthropic.com/settings/limits).

---

## Troubleshooting

**The AI button does nothing.**
→ You haven't added an API key. Go to Settings → paste it → Save.

**"API 401: Invalid API key"**
→ Key is wrong or revoked. Generate a new one at [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys).

**"API 429: Rate limit"**
→ You're hitting Anthropic's per-minute limit. Wait 60 seconds.

**"Network error reaching Anthropic"**
→ Check internet. Try again. If on a corporate network, an ad blocker or firewall may be blocking `api.anthropic.com`.

**I lost my data.**
→ If you cleared browser storage, the worksheets are gone unless you exported a backup. The lesson: **export weekly**.

**Can I share my dashboard with my coach?**
→ Yes. Settings → Export Backup → send the JSON file. They import it to see what you see.

**Can two devices stay in sync?**
→ Not automatically. Export from device A → Import on device B. The Companion is deliberately local-only.

---

## For Miindtraa internal use

This Companion is the practitioner-facing layer of the Accelerator. It does NOT replace:
- The L1 certification curriculum (still taught only in Level 1)
- The Foundation Call (Pankaj locks the niche live)
- The Launch Review 1:1 (live diagnostic)
- The Saturday Front-End Lab + Thursday Tech Clinic
- Rakhi's WhatsApp operations

It is a **scaffold** the practitioner can lean on between live sessions. The doctrine holds:

> *Diagnose generously. Demonstrate selectively. Teach only in Level 1.*

The AI does not give new NQH technique instruction. It reinforces frameworks already taught and helps the practitioner apply them.

---

## License & attribution

© 2026 Miindtraa School of Healing & Training. All rights reserved.

NQH™ and Neurochakra Quantum Healing™ are trademarks of Miindtraa. The curriculum, frameworks, and methodology embedded in this Companion are the intellectual property of Dr. Amaey A. Parekh and Pankaj S. Nikam.

**For NQH Healer Accelerator practitioners:** You have a personal license to use this Companion for your own practice building. Do not redistribute, repackage, or resell.

**For others:** The code is here for inspection and learning. The curriculum content is not transferable outside the Accelerator.

---

## Credits

- Built by Dr. Amaey A. Parekh + Pankaj S. Nikam
- Curriculum derived from the NQH Healer Accelerator v1.0 (April 2026)
- AI integration: Anthropic Claude
- Typography: Cormorant Garamond + Inter (Google Fonts)
- Hosting: GitHub Pages (free)

---

*Built for healers building real practices. Confidential — for Accelerator participants only.*
