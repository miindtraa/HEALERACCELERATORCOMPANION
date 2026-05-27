/* ============================================
   NQH CURRICULUM DATA
   24 modules across Phases 2, 3, 4
   Each module has: id, title, week, objective, outputs, sections
   Each section has: id, title, kind (text/textarea/check/list/table), prompts
   AI prompts are NQH-tuned and pull from user's saved state.
   ============================================ */

const CURRICULUM = {
  phases: [
    {
      id: 'p2',
      label: 'Phase 2 — Identity & Positioning',
      tagline: 'You cannot sell a practice you have not become.',
      icon: '🎯',
      weeks: 'Weeks 7–12 · Days 46–90',
      gate: '1:1 Foundation Call approves niche + offer'
    },
    {
      id: 'p3',
      label: 'Phase 3 — Client Pipeline',
      tagline: 'Build the acquisition machine.',
      icon: '🔧',
      weeks: 'Weeks 13–17 · Days 91–120',
      gate: '1:1 Launch Review'
    },
    {
      id: 'p4',
      label: 'Phase 4 — Scaling Systems',
      tagline: 'Run it like a practice, not a project.',
      icon: '📊',
      weeks: 'Weeks 15–17 (parallel) · Days 101–120',
      gate: 'Graduation checklist'
    }
  ],

  modules: [
    // ============ PHASE 2 ============
    {
      id: '2.1',
      phase: 'p2',
      title: 'The Healer Identity Shift',
      week: 'Week 7',
      objective: 'Release imposter syndrome. Claim the NQH practitioner identity.',
      outputs: ['Healer Identity Statement (1 paragraph)', '"I help [X] achieve [Y]" posted publicly'],
      milestone: 'Statement posted as Instagram story + LinkedIn post.',
      sections: [
        {
          id: 'pre',
          title: 'Before you begin',
          kind: 'info',
          body: `Watch the Identity Shift video (Amaey + Pankaj, ~20 min). The shift you're making this week is not from "untrained" to "trained" — you're already certified. The shift is from "I am learning" to "I am the practitioner."

What changes is what you say when someone asks "what do you do?" — and whether you shrink or stand tall in the next 5 seconds.`
        },
        {
          id: 'archetype',
          title: 'Which of the 3 healer archetypes are you becoming?',
          kind: 'radio',
          options: [
            { value: 'helper', label: 'Helper', hint: 'The one who sits beside the pain — gentle, present, deeply attuned.' },
            { value: 'teacher', label: 'Teacher', hint: 'The one who explains, demystifies, gives frameworks and language.' },
            { value: 'guide', label: 'Guide', hint: 'The one who has walked the path and now walks it with others.' }
          ]
        },
        {
          id: 'identity_statement',
          title: 'Your Healer Identity Statement',
          kind: 'textarea',
          hint: 'Write 1 paragraph (4–6 sentences) describing who you are as a healer now. Not who you want to be. Not who you used to be. Who you are. Use present tense.',
          placeholder: 'I am an NQH-certified practitioner. I work at the intersection of [...]. The people I work with come to me because [...]. What makes my work different is [...]. I believe [...].',
          aiPrompt: {
            label: 'Refine my identity statement in Amaey\'s voice',
            build: (state) => `You are Dr. Amaey Parekh, co-founder of Miindtraa and co-creator of NQH (Neurochakra Quantum Healing). You write in a grounded, direct, warm voice — never bubbly, never mystical-woo, never corporate. Indian context. You teach: "you cannot sell a practice you have not become."

A newly L1-certified NQH practitioner has drafted their Healer Identity Statement. Here it is:

"""
${state['2.1']?.identity_statement || '(empty)'}
"""

They've chosen the archetype: ${state['2.1']?.archetype || '(not chosen)'}

Your job:
1. Hold a mirror to what's already strong — name 1 specific phrase that's working.
2. Name 2 specific places where they're shrinking, hedging, or using mystical-vague language. Quote them back.
3. Rewrite the statement in their direction — keep their voice, sharpen their stake. Present tense only. No "I help people" generic talk.
4. Add 1 line they could practice saying out loud to a stranger at a dinner party.

Indian English. Direct. No motivational fluff.`
          }
        },
        {
          id: 'public_post',
          title: 'Your "I help X achieve Y" public post',
          kind: 'textarea',
          hint: 'Write the exact text you will post as an Instagram story and LinkedIn post by Friday. Format: "I help [specific person] achieve [specific outcome]."',
          placeholder: 'I help [...] achieve [...]'
        },
        {
          id: 'posted',
          title: 'Milestone',
          kind: 'check',
          options: [
            { value: 'posted_ig', label: 'Posted to Instagram story' },
            { value: 'posted_li', label: 'Posted to LinkedIn' },
            { value: 'shared_wa', label: 'Screenshot shared in Accelerator WhatsApp group' }
          ]
        }
      ]
    },
    {
      id: '2.2',
      phase: 'p2',
      title: 'Niche Selection Without Freezing',
      week: 'Week 8',
      objective: 'Lock one specific niche. No more "I help everyone."',
      outputs: ['Completed Niche Worksheet', 'ICP profile', '5 "would you pay" conversations logged'],
      milestone: 'Foundation Call with Pankaj — niche locked.',
      sections: [
        {
          id: 'seed',
          title: 'The seed — who are you actually drawn to help?',
          kind: 'textarea',
          hint: 'Think of the last 3 people who opened up to you about a struggle. What did they have in common? Be specific. 3–5 sentences.',
          placeholder: ''
        },
        {
          id: 'niche_pick',
          title: 'Which niche pulls a "yes" in your body?',
          kind: 'check',
          hint: 'Tick the ones that resonate. Up to 3. We will narrow to 1 by the end of this module.',
          options: [
            { value: 'anxious_founders', label: 'Anxious entrepreneurs / founders' },
            { value: 'new_mothers', label: 'New mothers (0–2 years postpartum)' },
            { value: 'post_corp', label: 'Post-corporate professionals in transition' },
            { value: 'chronic_pain', label: 'Chronic-pain sufferers open to energy work' },
            { value: 'grief', label: 'Grief (specific: parent / child / partner / divorce)' },
            { value: 'relationship_trauma', label: 'Relationship trauma / anxious-attachment' },
            { value: 'burnt_healers', label: 'Burnt-out therapists / healers themselves' },
            { value: 'spiritual', label: 'Spiritual seekers moving from modality-hopping to depth' },
            { value: 'menopause', label: 'Menopause + hormonal transition' },
            { value: 'genz', label: 'Gen-Z emotional regulation (18–28)' },
            { value: 'performers', label: 'High-performers (executives, athletes, artists)' },
            { value: 'leaders', label: 'Leaders in major transition (C-suite, sabbatical, reinvention)' },
            { value: 'other', label: 'Other (specify below)' }
          ]
        },
        {
          id: 'niche_other',
          title: 'If "Other" — describe your niche idea',
          kind: 'text',
          placeholder: 'e.g., Bharatanatyam dancers in their 30s navigating injury and identity'
        },
        {
          id: 'resonance',
          title: 'What about this niche resonates with YOUR story?',
          kind: 'textarea',
          hint: 'No vague answers. Be specific. If you can\'t name a real personal connection, this niche will not sustain you.',
          placeholder: ''
        },
        {
          id: 'pressure_test',
          title: 'Pressure-test your niche with AI',
          kind: 'ai_action',
          body: 'Once you\'ve picked your top niche, use this to stress-test it against the Indian market. The AI plays a skeptical market researcher — no encouragement, just truth.',
          aiPrompt: {
            label: 'Pressure-test my niche',
            build: (state) => {
              const picked = (state['2.2']?.niche_pick || []).join(', ');
              const other = state['2.2']?.niche_other || '';
              const resonance = state['2.2']?.resonance || '';
              return `Act as a skeptical Indian market researcher. Do not be encouraging. Be direct.

A newly NQH-certified healer is considering this niche: ${picked}${other ? ` / ${other}` : ''}

Their personal resonance: ${resonance || '(not stated)'}

In bullet form, tell them:
1. Are there enough of these people online in India (specifically Tier 1 + Tier 2 cities) to build a premium practice from?
2. Do they have the discretionary spend to commit to a multi-session transformation programme?
3. What language does this niche use about their pain? Give 5 actual phrases they'd type into Google or whisper to a friend.
4. What's the #1 objection a healer in this niche will face when selling?
5. Is there a tighter sub-niche within this that would convert better? Suggest 2.
6. One uncomfortable truth about this niche the healer is probably not seeing.

Indian context only. No Western examples. Rupees if money comes up.`;
            }
          }
        },
        {
          id: 'four_filters',
          title: 'The 4 filters — apply rigorously',
          kind: 'group',
          fields: [
            { id: 'pain_one_sentence', kind: 'text', label: 'Filter 1: Their pain in 1 sentence a 15-year-old could understand', placeholder: '' },
            { id: 'pain_chai_words', kind: 'textarea', label: 'Filter 1b: What they\'d tell a close friend over chai about this pain', placeholder: 'Exact words they\'d use, not your interpretation' },
            { id: 'income_bracket', kind: 'select', label: 'Filter 2: Their monthly income bracket', options: ['₹50K–1L/mo', '₹1L–3L/mo', '₹3L–5L/mo', '₹5L+/mo', 'Variable / entrepreneur'] },
            { id: 'already_spent_on', kind: 'textarea', label: 'Filter 2b: What they\'ve already spent money on trying to solve this', placeholder: 'List 3–5 things' },
            { id: 'where_online', kind: 'textarea', label: 'Filter 3: 5 IG accounts / LI profiles / FB groups where this niche hangs out', placeholder: '1.\n2.\n3.\n4.\n5.' },
            { id: 'hashtags', kind: 'text', label: 'Filter 3b: 5–10 hashtags or keywords they use', placeholder: '' },
            { id: 'no_money_resonance', kind: 'radio', label: 'Filter 4: If you never made a single rupee from this niche, would you still want to spend time with these people?', options: [{ value: 'yes', label: 'Yes — and here\'s why' }, { value: 'maybe', label: 'Maybe — needs more thought' }, { value: 'no', label: 'No' }] },
            { id: 'past_self', kind: 'textarea', label: 'Filter 4b: Is there a version of "me from 3 years ago" in this niche?', placeholder: 'Genuine resonance usually comes from having walked this path.' }
          ]
        },
        {
          id: 'conversations',
          title: 'The 5-Conversation Test',
          kind: 'table',
          hint: 'Before your Foundation Call, have 5 real conversations with people who look like your target niche. Log them here.',
          columns: ['#', 'Name', 'How you found them', 'Their top pain word', 'Money already spent', 'Solved = ?'],
          rows: 5
        },
        {
          id: 'niche_statement',
          title: 'Your locked niche statement (draft)',
          kind: 'textarea',
          hint: 'Format: "I work with [SPECIFIC PERSON] who are struggling with [SPECIFIC PAIN] and want to [SPECIFIC OUTCOME]."',
          placeholder: 'I work with ___ who are struggling with ___ and want to ___.',
          aiPrompt: {
            label: 'Sharpen my niche statement',
            build: (state) => {
              const s = state['2.2'] || {};
              return `You are a niche clarity coach trained on NQH (Neurochakra Quantum Healing) positioning frameworks. You are direct, not encouraging.

A practitioner has drafted this niche statement:

"""
${s.niche_statement || '(empty)'}
"""

Supporting context from their worksheet:
- Niches considered: ${(s.niche_pick || []).join(', ')}${s.niche_other ? ` / ${s.niche_other}` : ''}
- Pain in plain language: ${s.pain_one_sentence || '(not stated)'}
- How they\'d describe it over chai: ${s.pain_chai_words || '(not stated)'}
- Personal resonance: ${s.resonance || '(not stated)'}
- Past-self in niche?: ${s.past_self || '(not stated)'}

Do this:
1. Is the niche statement specific enough? Most healers fail by being vague ("women", "professionals", "stressed people"). Name where they're still vague.
2. Rewrite the statement in 3 progressively tighter versions — each one narrows further. Examples of tight statements: "burnt-out Reiki teachers age 35–50 who want to become respected professional practitioners"; "first-time mothers in the first 18 months postpartum who want to rediscover themselves without leaving motherhood."
3. Flag any red flag: are they picking the niche because it's trendy, because they want to fix the old self in others, or because they can't decide between two?
4. Give them the one sentence to bring to the Foundation Call.

Indian context. Direct. No softening.`;
            }
          }
        },
        {
          id: 'red_flags',
          title: 'Red flags — the "not this niche" check',
          kind: 'check',
          hint: 'Be brutally honest. Tick any that apply. If 2+ are ticked, talk to Pankaj before the Foundation Call.',
          options: [
            { value: 'trendy', label: 'I\'m picking this because it\'s marketing-popular right now' },
            { value: 'fix_old_self', label: 'I\'m picking this to fix the "old me" in others (and I haven\'t done my own work yet)' },
            { value: 'family_pressure', label: 'I\'m picking this because friends/family think I should' },
            { value: 'cant_decide', label: 'I\'m splitting across 2+ niches because I can\'t decide' }
          ]
        }
      ]
    },
    {
      id: '2.3',
      phase: 'p2',
      title: 'Positioning Statement + Profile Optimization',
      week: 'Week 9',
      objective: 'Produce a 1-sentence positioning statement and rebuild your IG + LinkedIn profiles to reflect it.',
      outputs: ['Positioning statement (1 sentence)', 'Updated IG bio + Highlights', 'Updated LinkedIn headline + Featured'],
      milestone: 'Both profiles live with new positioning. Saturday Profile Audit feedback incorporated.',
      sections: [
        {
          id: 'triangle',
          title: 'The Positioning Triangle',
          kind: 'group',
          hint: 'Three lines. WHO you serve. WHAT you help them achieve. HOW you do it (your method, in 5 words).',
          fields: [
            { id: 'who', kind: 'text', label: 'WHO', placeholder: 'e.g., Burnt-out Reiki teachers age 35–50' },
            { id: 'what', kind: 'text', label: 'WHAT (outcome)', placeholder: 'e.g., charge premium prices with confidence' },
            { id: 'how', kind: 'text', label: 'HOW (your method, ≤5 words)', placeholder: 'e.g., the NQH practitioner protocol' }
          ]
        },
        {
          id: 'positioning_statement',
          title: 'Your positioning statement (1 sentence)',
          kind: 'textarea',
          hint: 'Format: "I help [WHO] [WHAT] using [HOW]." This is the single sentence you\'ll repeat everywhere — IG bio, LinkedIn headline, sales calls, networking events.',
          aiPrompt: {
            label: 'Generate 5 positioning statement variants',
            build: (state) => {
              const t = state['2.3'] || {};
              const niche = state['2.2'] || {};
              return `Generate 5 different versions of a positioning statement for a healer in the NQH (Neurochakra Quantum Healing) tradition.

Their triangle:
- WHO: ${t.who || niche.niche_statement || '(not stated)'}
- WHAT: ${t.what || '(not stated)'}
- HOW: ${t.how || 'the NQH practitioner protocol'}

Generate 5 variants. Each should:
- Be ONE sentence, under 22 words
- Use plain English (no jargon, no "energy healing", no "transformation journey")
- Filter out the wrong-fit person — be so specific that non-fits self-eject
- Not over-promise — no "in 30 days" or "guaranteed"

Format:
1. The conservative version (safe, clear, no risk)
2. The bold version (specific outcome, slightly polarising)
3. The story version (hints at why this niche)
4. The contrarian version (names what they DON\'T do)
5. The "founder voice" version (sounds like a real person, not a marketer)

After the list, give 1 line of guidance on which one to start with and why.`;
            }
          }
        },
        {
          id: 'ig_bio',
          title: 'Instagram Bio (rewrite)',
          kind: 'group',
          hint: 'IG bio formula: Identity line · Niche line · Proof line · CTA · Link.',
          fields: [
            { id: 'ig_identity', kind: 'text', label: 'Line 1: Identity', placeholder: 'NQH™ Practitioner · Counselling Psychologist' },
            { id: 'ig_niche', kind: 'text', label: 'Line 2: Niche + outcome', placeholder: 'Helping [WHO] [WHAT]' },
            { id: 'ig_proof', kind: 'text', label: 'Line 3: Proof / credentials', placeholder: 'Featured in [...] · 200+ clients · IPHM-accredited' },
            { id: 'ig_cta', kind: 'text', label: 'Line 4: CTA', placeholder: 'DM "READY" for a free clarity call ↓' },
            { id: 'ig_link', kind: 'text', label: 'Link in bio', placeholder: 'Linktree / website / booking page' }
          ]
        },
        {
          id: 'li_headline',
          title: 'LinkedIn Headline (rewrite)',
          kind: 'text',
          hint: 'Formula: Role + Niche + Promise + Credential. Max 220 characters.',
          placeholder: 'NQH™ Practitioner | Helping [WHO] [WHAT] | Counselling Psychologist | IPHM-Accredited | Co-creator of NQH'
        },
        {
          id: 'li_about',
          title: 'LinkedIn About (first 3 lines = critical)',
          kind: 'textarea',
          hint: 'The first 3 lines show before "see more". Make them count. Lead with a pain statement OR a contrarian claim — never with "Hi, I am a..."',
          aiPrompt: {
            label: 'Draft my LinkedIn About in Amaey\'s voice',
            build: (state) => {
              const p = state['2.3'] || {};
              const n = state['2.2'] || {};
              const id = state['2.1'] || {};
              return `You are Dr. Amaey Parekh's writing assistant. Write in his voice: grounded, direct, warm, never woo, never corporate. Indian context.

Draft a LinkedIn About section for an NQH-certified healer. About 150 words. Structure:

LINE 1: A pain statement or contrarian claim that the niche will recognise immediately. Not "Hi, I am..."
LINE 2-3: Continue to draw the reader in. End line 3 with a hook so they click "see more".
PARAGRAPH 2: Their story — why this work, why this niche. 3–4 sentences.
PARAGRAPH 3: What they do (their NQH-based method) in 2 sentences.
PARAGRAPH 4: A specific CTA. Not "DM me to learn more". Something concrete.

Context:
- Niche: ${n.niche_statement || n.niche_pick?.join(', ') || '(not specified)'}
- Identity statement: ${id.identity_statement || '(not drafted)'}
- Positioning: ${p.positioning_statement || '(not drafted)'}
- Their personal resonance with the niche: ${n.resonance || '(not specified)'}

Output the full About text, ready to paste into LinkedIn. No meta-commentary.`;
            }
          }
        },
        {
          id: 'highlights_featured',
          title: 'IG Highlights & LinkedIn Featured (4 mandatory)',
          kind: 'check',
          hint: 'Build these 4 covers/sections. They are the structural backbone of your profile.',
          options: [
            { value: 'start_here', label: 'Start Here — who you are, who you work with, how to begin' },
            { value: 'about', label: 'About — your story, credentials, why this work' },
            { value: 'offer', label: 'Offer — what working with you looks like (no prices)' },
            { value: 'proof', label: 'Proof — testimonials, case stories, press features' }
          ]
        },
        {
          id: 'live',
          title: 'Profile audit milestone',
          kind: 'check',
          options: [
            { value: 'ig_live', label: 'IG bio updated' },
            { value: 'ig_highlights', label: 'IG Highlights covers redone' },
            { value: 'li_live', label: 'LinkedIn headline + About updated' },
            { value: 'li_featured', label: 'LinkedIn Featured rebuilt with 4 items' },
            { value: 'audit_done', label: 'Submitted for Saturday Profile Audit feedback' }
          ]
        }
      ]
    },
    {
      id: '2.4',
      phase: 'p2',
      title: 'Offer Architecture + Pricing Reset',
      week: 'Week 10',
      objective: 'Design a 3-tier offer. Lock your tiers. No more "per session".',
      outputs: ['3-Tier Offer One-Pager', 'Pricing Calculator filled', 'Who-it-is-for / not-for defined'],
      milestone: 'Offer drafted and submitted before Foundation Call.',
      sections: [
        {
          id: 'context',
          title: 'Why we stop selling sessions',
          kind: 'info',
          body: `Sessions don\'t scale. They tie your fee to your hours. Worse — they invite the client to ask "how many sessions until I'm done?" — the wrong question.

A package answers a transformation, not a clock. This module asks you to design 3 tiers so people choose YOU, not "your hourly rate".

We won\'t talk about your specific fee in this dashboard — your Foundation Call with Pankaj is where pricing gets locked. Here, we design the STRUCTURE.`
        },
        {
          id: 'tier1',
          title: 'Tier 1 — Starter (entry)',
          kind: 'group',
          hint: 'Shortest engagement. The "try-before-the-big-one" tier. Roughly 4 weeks, 4 sessions, 1 transformation moment.',
          fields: [
            { id: 't1_name', kind: 'text', label: 'Tier name (something the client will say aloud)', placeholder: 'e.g., "The Reset"' },
            { id: 't1_promise', kind: 'text', label: 'The one transformation promised', placeholder: 'e.g., "Land back in your body after burnout"' },
            { id: 't1_duration', kind: 'text', label: 'Duration', placeholder: 'e.g., 4 weeks' },
            { id: 't1_sessions', kind: 'text', label: 'Number of 1:1 sessions', placeholder: 'e.g., 4 sessions of 75 min' },
            { id: 't1_inclusions', kind: 'textarea', label: 'Inclusions (bullets)', placeholder: '- 4 × 75-min 1:1 sessions\n- Custom journaling prompts\n- WhatsApp support between sessions' },
            { id: 't1_who_for', kind: 'textarea', label: 'Who it\'s for', placeholder: '' },
            { id: 't1_who_not_for', kind: 'textarea', label: 'Who it\'s NOT for', placeholder: '' }
          ]
        },
        {
          id: 'tier2',
          title: 'Tier 2 — Core (most clients pick this)',
          kind: 'group',
          hint: 'The "default best" tier. Roughly 8 weeks, 8 sessions, deeper work, ideally a group component or asset included.',
          fields: [
            { id: 't2_name', kind: 'text', label: 'Tier name', placeholder: 'e.g., "The Practitioner Path"' },
            { id: 't2_promise', kind: 'text', label: 'The transformation promised', placeholder: '' },
            { id: 't2_duration', kind: 'text', label: 'Duration', placeholder: 'e.g., 8 weeks' },
            { id: 't2_sessions', kind: 'text', label: 'Number of sessions', placeholder: '' },
            { id: 't2_inclusions', kind: 'textarea', label: 'Inclusions', placeholder: '' },
            { id: 't2_group_or_asset', kind: 'text', label: 'Group element OR asset included', placeholder: 'e.g., Workbook · Recorded meditation series · Monthly group circle' },
            { id: 't2_who_for', kind: 'textarea', label: 'Who it\'s for', placeholder: '' }
          ]
        },
        {
          id: 'tier3',
          title: 'Tier 3 — Premium (the deep work)',
          kind: 'group',
          hint: 'The "for the serious ones" tier. Roughly 12 weeks, deep work, high-touch, possibly with a retreat or extended access.',
          fields: [
            { id: 't3_name', kind: 'text', label: 'Tier name', placeholder: 'e.g., "The Inner Architect"' },
            { id: 't3_promise', kind: 'text', label: 'The transformation promised', placeholder: '' },
            { id: 't3_duration', kind: 'text', label: 'Duration', placeholder: 'e.g., 12 weeks' },
            { id: 't3_sessions', kind: 'text', label: 'Number of sessions', placeholder: '' },
            { id: 't3_inclusions', kind: 'textarea', label: 'Inclusions', placeholder: '- 10 × 90-min 1:1 sessions\n- Daily WhatsApp support\n- Personalised meditation library\n- 1 in-person session (or retreat day)' },
            { id: 't3_who_for', kind: 'textarea', label: 'Who it\'s for', placeholder: '' }
          ]
        },
        {
          id: 'offer_critique',
          title: 'Critique my 3-tier offer',
          kind: 'ai_action',
          body: 'Stress-test your offer architecture. The AI will check tier-to-tier escalation, packaging clarity, and whether the language pulls the right-fit person.',
          aiPrompt: {
            label: 'Critique my 3-tier offer',
            build: (state) => {
              const o = state['2.4'] || {};
              const n = state['2.2'] || {};
              const p = state['2.3'] || {};
              return `You are an offer architect for premium healing practices. Critique this 3-tier offer for an NQH-certified practitioner.

CONTEXT:
- Niche: ${n.niche_statement || '(not set)'}
- Positioning: ${p.positioning_statement || '(not set)'}

OFFER:

Tier 1 (Starter):
- Name: ${o.t1_name || '(empty)'}
- Promise: ${o.t1_promise || '(empty)'}
- Duration / sessions: ${o.t1_duration || '(empty)'} / ${o.t1_sessions || '(empty)'}
- Inclusions: ${o.t1_inclusions || '(empty)'}
- For: ${o.t1_who_for || '(empty)'} | Not for: ${o.t1_who_not_for || '(empty)'}

Tier 2 (Core):
- Name: ${o.t2_name || '(empty)'}
- Promise: ${o.t2_promise || '(empty)'}
- Duration / sessions: ${o.t2_duration || '(empty)'} / ${o.t2_sessions || '(empty)'}
- Inclusions: ${o.t2_inclusions || '(empty)'}
- Group/asset: ${o.t2_group_or_asset || '(empty)'}
- For: ${o.t2_who_for || '(empty)'}

Tier 3 (Premium):
- Name: ${o.t3_name || '(empty)'}
- Promise: ${o.t3_promise || '(empty)'}
- Duration / sessions: ${o.t3_duration || '(empty)'} / ${o.t3_sessions || '(empty)'}
- Inclusions: ${o.t3_inclusions || '(empty)'}
- For: ${o.t3_who_for || '(empty)'}

DO THIS:
1. Tier 1 → Tier 2 → Tier 3 escalation: does each tier feel genuinely different in transformation, not just "more sessions"? Name what's working and what's not.
2. Are the tier names client-aspirational, or are they internal-jargon? Rate each name 1–10 and explain.
3. Inclusions: are any tiers stuffed with low-value extras? Identify "filler".
4. Who-it-is-for: is the language tight enough to filter? Where is it vague?
5. Suggest 1 thing to ADD and 1 thing to REMOVE from each tier.
6. The "elevator pitch" for the whole suite, in 2 sentences, that the practitioner can say at a networking event.

Indian English. Direct. No softening.`;
            }
          }
        },
        {
          id: 'pricing_logic',
          title: 'Pricing logic (private — for your Foundation Call only)',
          kind: 'group',
          hint: 'This is for YOUR clarity before you bring it to Pankaj. We do not display prices in your public offer until they are locked.',
          fields: [
            { id: 'pricing_anchor', kind: 'text', label: 'Anchor: what do clients in your niche typically pay for adjacent work today?', placeholder: 'e.g., ₹2.5K/session with a therapist; ₹15K for a 6-week course' },
            { id: 'pricing_t1', kind: 'text', label: 'Tier 1 fee (your draft)', placeholder: '' },
            { id: 'pricing_t2', kind: 'text', label: 'Tier 2 fee (your draft)', placeholder: '' },
            { id: 'pricing_t3', kind: 'text', label: 'Tier 3 fee (your draft)', placeholder: '' },
            { id: 'say_aloud', kind: 'textarea', label: 'Practice saying your highest-tier fee out loud. What came up?', placeholder: 'Notice the shrink, the apology, the explanation. Write it down. We work with this in Module 2.5.' }
          ]
        }
      ]
    },
    {
      id: '2.5',
      phase: 'p2',
      title: 'Money-Belief Reset',
      week: 'Week 11',
      objective: 'Clear the money guilt that will otherwise sabotage Phase 3. Use L1 techniques on yourself.',
      outputs: ['3 self-sessions on money blocks using L1 stack', '10 journaling prompts answered', '1-page reflection'],
      milestone: 'Reflection submitted. Money-number pre/post tracked.',
      sections: [
        {
          id: 'context',
          title: 'Why this comes BEFORE you launch',
          kind: 'info',
          body: `If you cannot say your Tier 3 fee out loud without flinching, every sales call after Phase 3 will collapse at the price reveal. This is not motivation. It\'s nervous system work.

You\'ll use the L1 technique stack on yourself: FFT → Quantum Mind Programming → Energy Reconciliation (Ho\'oponopono) → Reality Sculpting. Three full self-sessions. Track what shifts.`
        },
        {
          id: 'pre_score',
          title: 'Money-number — BEFORE this module',
          kind: 'group',
          fields: [
            { id: 'pre_guilt_score', kind: 'select', label: '"I feel guilty asking for my Tier 3 fee" — 1 (no guilt) to 10 (full collapse)', options: ['1','2','3','4','5','6','7','8','9','10'] },
            { id: 'pre_belief', kind: 'textarea', label: 'The exact money belief running underneath, in 1 sentence', placeholder: 'e.g., "If I charge premium I\'m exploiting people who need help."' }
          ]
        },
        {
          id: 'beliefs',
          title: 'Which of the 6 healer money beliefs run in you?',
          kind: 'check',
          options: [
            { value: 'unspiritual', label: 'Money is unspiritual' },
            { value: 'fraud_premium', label: 'If I charge premium I\'m a fraud' },
            { value: 'best_cant_afford', label: 'My best client can\'t afford me' },
            { value: 'should_give_free', label: 'I should give for free' },
            { value: 'lose_edge', label: 'I\'ll lose my edge if I become commercial' },
            { value: 'corrupt', label: 'Money will corrupt my practice' }
          ]
        },
        {
          id: 'journal_prompts',
          title: '10 journaling prompts',
          kind: 'group',
          hint: 'Answer all 10. Use voice notes if writing feels heavy.',
          fields: [
            { id: 'j1', kind: 'textarea', label: '1. What did money mean in my house growing up?', placeholder: '' },
            { id: 'j2', kind: 'textarea', label: '2. The first time I felt ashamed about money was…', placeholder: '' },
            { id: 'j3', kind: 'textarea', label: '3. The person in my family who handled money taught me that…', placeholder: '' },
            { id: 'j4', kind: 'textarea', label: '4. If I make ₹X/month, the dangerous thing that might happen is…', placeholder: '' },
            { id: 'j5', kind: 'textarea', label: '5. If I never charge premium, the safe thing I get to keep is…', placeholder: '' },
            { id: 'j6', kind: 'textarea', label: '6. The healer I admire who charges well — what does she/he know that I don\'t?', placeholder: '' },
            { id: 'j7', kind: 'textarea', label: '7. If a client paid me my Tier 3 fee tomorrow, the first thing I\'d want to do is…', placeholder: '' },
            { id: 'j8', kind: 'textarea', label: '8. The story I tell about "spiritual people don\'t care about money" was given to me by…', placeholder: '' },
            { id: 'j9', kind: 'textarea', label: '9. If money were just energy, and my work returned that energy as transformation — would I still feel guilty?', placeholder: '' },
            { id: 'j10', kind: 'textarea', label: '10. The new money belief I am installing, in 1 line, is…', placeholder: '' }
          ]
        },
        {
          id: 'sessions',
          title: 'Three self-sessions using L1 stack',
          kind: 'group',
          fields: [
            { id: 's1_date', kind: 'text', label: 'Session 1 — date', placeholder: '' },
            { id: 's1_notes', kind: 'textarea', label: 'Session 1 — what surfaced, what released', placeholder: '' },
            { id: 's2_date', kind: 'text', label: 'Session 2 — date', placeholder: '' },
            { id: 's2_notes', kind: 'textarea', label: 'Session 2 — what surfaced, what released', placeholder: '' },
            { id: 's3_date', kind: 'text', label: 'Session 3 — date', placeholder: '' },
            { id: 's3_notes', kind: 'textarea', label: 'Session 3 — what surfaced, what released', placeholder: '' }
          ]
        },
        {
          id: 'companion',
          title: 'Use AI as a journaling companion',
          kind: 'ai_action',
          body: 'Not a therapist. A companion. The AI will ask you 1 question at a time about the belief you uncovered — and wait for your answer.',
          aiPrompt: {
            label: 'Begin AI journaling companion',
            build: (state) => {
              const m = state['2.5'] || {};
              return `You are a reflective journaling companion for a healer doing money-belief work in the NQH tradition. You are NOT a therapist. You do not give advice or insight. You ONLY ask questions — one at a time — and wait.

The healer\'s pre-work:
- Their current guilt score (1–10): ${m.pre_guilt_score || '(not given)'}
- Their core money belief in 1 sentence: ${m.pre_belief || '(not given)'}
- Patterns they identified: ${(m.beliefs || []).join(', ') || '(not given)'}

Begin by asking ONE question that softly opens the belief they named. Wait for their reply. Then ask the next question based on what they say. Maximum 6 questions per session. No interpretation, no summarising, no "I hear you". Just the next gentle question.

Start now with question 1.`;
            }
          }
        },
        {
          id: 'post_score',
          title: 'Money-number — AFTER this module',
          kind: 'group',
          fields: [
            { id: 'post_guilt_score', kind: 'select', label: '"I feel guilty asking for my Tier 3 fee" — 1 to 10', options: ['1','2','3','4','5','6','7','8','9','10'] },
            { id: 'shift_notes', kind: 'textarea', label: 'What shifted? What still feels stuck?', placeholder: '' },
            { id: 'new_belief', kind: 'text', label: 'The new belief I am installing (1 line)', placeholder: '' }
          ]
        }
      ]
    },
    {
      id: '2.6',
      phase: 'p2',
      title: 'The 14-Day Video Challenge',
      week: 'Weeks 11–12',
      objective: 'Break camera fear. Build a first content library. Create posting momentum.',
      outputs: ['14 daily posts published (mix of Stories, Posts, Reels)'],
      milestone: 'All 14 posts live. Phase 2 complete.',
      sections: [
        {
          id: 'context',
          title: 'The rules of the challenge',
          kind: 'info',
          body: `Post every single day for 14 days. No perfection. No editing for hours. If it takes you more than 30 minutes to produce one piece, you\'re overworking it.

Each day below has its own prompt, format, and goal. Tick when posted. Use the AI Caption Generator beside each to draft your caption in your own voice in 60 seconds.

Rakhi will see your daily check-in in the Accelerator WhatsApp group.`
        },
        {
          id: 'day1', title: 'Day 1 — "Hi, I\'m..." voice note', kind: 'video_day',
          prompt: 'Selfie + voice note: "Hi, I\'m [X], and for the last [Y] years I\'ve been..."', format: 'Story', goal: 'Get comfortable on camera'
        },
        {
          id: 'day2', title: 'Day 2 — Speak a pain point', kind: 'video_day',
          prompt: '30-second face: "Here\'s the thing most people don\'t know about [niche pain]"', format: 'Story', goal: 'Speak a pain point out loud'
        },
        {
          id: 'day3', title: 'Day 3 — Educational carousel', kind: 'video_day',
          prompt: '"3 signs you have [niche pain]"', format: 'Carousel post', goal: 'Demonstrate expertise'
        },
        {
          id: 'day4', title: 'Day 4 — Old belief → new belief', kind: 'video_day',
          prompt: '45-second face: "I used to think [old belief]. Now I know [new belief]"', format: 'Reel', goal: 'Share transformation'
        },
        {
          id: 'day5', title: 'Day 5 — Testimonial-style', kind: 'video_day',
          prompt: 'Selfie + voice: testimonial-style (even if hypothetical — "what a client recently said was…")', format: 'Story', goal: 'Imagine success'
        },
        {
          id: 'day6', title: 'Day 6 — The #1 thing I wish…', kind: 'video_day',
          prompt: '"The #1 thing I wish healers/[niche] understood about [pain]"', format: 'Educational post', goal: 'Teach'
        },
        {
          id: 'day7', title: 'Day 7 — AMA invite', kind: 'video_day',
          prompt: '30-second face: "Ask me anything about [niche]" CTA', format: 'Story', goal: 'Invite interaction'
        },
        {
          id: 'day8', title: 'Day 8 — Your 5-step process', kind: 'video_day',
          prompt: 'Carousel: "My 5-step process for [niche outcome]"', format: 'Carousel post', goal: 'Show system'
        },
        {
          id: 'day9', title: 'Day 9 — The first time I realised…', kind: 'video_day',
          prompt: '60-second Reel: "The first time I realised [personal insight]"', format: 'Reel', goal: 'Vulnerability'
        },
        {
          id: 'day10', title: 'Day 10 — Behind the scenes', kind: 'video_day',
          prompt: 'Behind-the-scenes of your own practice (session setup, journal, tools)', format: 'Story', goal: 'Humanise'
        },
        {
          id: 'day11', title: 'Day 11 — De-mystify', kind: 'video_day',
          prompt: '"Here\'s what actually happens in [niche] work"', format: 'Educational post', goal: 'De-mystify'
        },
        {
          id: 'day12', title: 'Day 12 — If you\'re struggling…', kind: 'video_day',
          prompt: '45-second face: "If you\'re struggling with [pain], here\'s what I\'d do first"', format: 'Reel', goal: 'Give value'
        },
        {
          id: 'day13', title: 'Day 13 — Client story / NQH journey', kind: 'video_day',
          prompt: 'Client story (anonymised, permission-based) OR your own NQH journey story', format: 'Reel', goal: 'Proof'
        },
        {
          id: 'day14', title: 'Day 14 — Why my practice exists', kind: 'video_day',
          prompt: '60-second face: "My practice exists because [purpose]" + CTA to DM', format: 'Reel', goal: 'Pull interested people'
        }
      ]
    },

    // ============ PHASE 3 ============
    {
      id: '3.1',
      phase: 'p3',
      title: 'Funnel Strategy Overview',
      week: 'Week 13',
      objective: 'Understand the full sequence before building any piece.',
      outputs: ['1-page funnel map for your practice'],
      milestone: 'Funnel map submitted end of Week 13.',
      sections: [
        {
          id: 'context',
          title: 'The locked funnel — non-negotiable',
          kind: 'info',
          body: `Every Accelerator participant builds EXACTLY this flow:

  Meta Ads → Landing Page (with VSL) → Calendly/TidyCal Booking → Thank-You Page (Pixel) → WhatsApp Group

Each step exists to solve a specific psychological problem. Skip a step and the funnel breaks.

  · No VSL = no education before the call (call burns)
  · No application form = wrong-fit calls eat your week
  · No thank-you page = no Pixel = no Meta optimisation
  · No WhatsApp group = no nurture = no-shows skyrocket`
        },
        {
          id: 'funnel_map',
          title: 'Your 1-page funnel map',
          kind: 'group',
          hint: 'Fill in YOUR version of each stage — the page name, the one-line purpose, the KPI for that stage.',
          fields: [
            { id: 'stage_ads', kind: 'textarea', label: 'Stage 1 — Meta Ads (purpose + KPI)', placeholder: 'Purpose: Drive cold traffic from IG/FB to landing page.\nKPI: CPL (target ₹X), CTR (target Y%)' },
            { id: 'stage_landing', kind: 'textarea', label: 'Stage 2 — Landing Page (purpose + KPI)', placeholder: 'Purpose: Educate via VSL, capture application via form.\nKPI: Application rate (form submits / page views)' },
            { id: 'stage_booking', kind: 'textarea', label: 'Stage 3 — Booking Page (purpose + KPI)', placeholder: 'Purpose: Convert application to booked call.\nKPI: Booking rate (bookings / applications)' },
            { id: 'stage_thankyou', kind: 'textarea', label: 'Stage 4 — Thank-You Page (purpose + KPI)', placeholder: 'Purpose: Fire Pixel event, invite to WhatsApp.\nKPI: WhatsApp join rate' },
            { id: 'stage_whatsapp', kind: 'textarea', label: 'Stage 5 — WhatsApp Group (purpose + KPI)', placeholder: 'Purpose: Nurture, social proof, no-show recovery.\nKPI: Show-up rate' }
          ]
        },
        {
          id: 'map_review',
          title: 'Get your funnel map reviewed',
          kind: 'ai_action',
          body: 'AI will play "skeptical funnel architect" and flag gaps before Thursday tech session.',
          aiPrompt: {
            label: 'Review my funnel map',
            build: (state) => {
              const f = state['3.1'] || {};
              return `You are a skeptical Meta-ads-to-VSL funnel architect for premium healing practices in India. Critique this practitioner\'s funnel map.

THEIR MAP:
Stage 1 (Ads): ${f.stage_ads || '(empty)'}
Stage 2 (Landing): ${f.stage_landing || '(empty)'}
Stage 3 (Booking): ${f.stage_booking || '(empty)'}
Stage 4 (Thank-You): ${f.stage_thankyou || '(empty)'}
Stage 5 (WhatsApp): ${f.stage_whatsapp || '(empty)'}

For each stage:
1. Is the purpose clear and singular, or is it doing too many things?
2. Is the KPI named correctly and measurable with free tools (Meta Events Manager, Google Sheets)?
3. What's missing that will cause this stage to fail under cold traffic?

End with: the ONE thing this practitioner should bring to Thursday's tech clinic.`;
            }
          }
        }
      ]
    },
    {
      id: '3.2',
      phase: 'p3',
      title: 'VSL Script + Recording',
      week: 'Week 14',
      objective: 'Record a 20–30 minute VSL that sells your offer.',
      outputs: ['Final VSL script', 'Recorded VSL uploaded to Drive'],
      milestone: 'VSL recorded by end of Week 14. Phone quality is fine.',
      sections: [
        {
          id: 'context',
          title: 'The anti-perfectionism rule',
          kind: 'info',
          body: `A phone-quality 25-minute VSL that converts beats a studio-quality 8-minute VSL that confuses. Stop optimising lighting. Start recording.

Use the 9-chapter structure below. Draft each chapter as bullet points — then read it aloud, not from script. Read-aloud kills the corporate tone every VSL slips into.`
        },
        {
          id: 'ch1', title: 'Ch. 1 — Cold Open + Pattern Interrupt (0:00–1:30)', kind: 'textarea',
          hint: 'Bold claim + pain statement + "this video changes that". 3–5 bullets.', placeholder: ''
        },
        {
          id: 'ch2', title: 'Ch. 2 — Who This Is For (1:30–4:00)', kind: 'textarea',
          hint: 'Niche filter. Repel non-fit. "If you are [X], keep watching. If you are [Y], this is not for you."'
        },
        {
          id: 'ch3', title: 'Ch. 3 — Pain Agitation (4:00–9:00)', kind: 'textarea',
          hint: 'The 5–7 things your ideal client is feeling RIGHT NOW. Name them so specifically they think you\'re reading their journal.'
        },
        {
          id: 'ch4', title: 'Ch. 4 — Failed Attempts (9:00–13:00)', kind: 'textarea',
          hint: 'What they\'ve already tried and why it didn\'t work. This is empathy + positioning combined.'
        },
        {
          id: 'ch5', title: 'Ch. 5 — Your Story + Credentials (13:00–17:00)', kind: 'textarea',
          hint: 'Brief. No over-claiming. The ONE story that explains why you do this work. Not your whole biography.'
        },
        {
          id: 'ch6', title: 'Ch. 6 — The Mechanism (17:00–25:00)', kind: 'textarea',
          hint: 'YOUR NQH-based framework. This is the teaching moment. Give them a real insight they didn\'t have before. Diagnose generously.'
        },
        {
          id: 'ch7', title: 'Ch. 7 — Live Micro-Demo (25:00–28:00)', kind: 'textarea',
          hint: 'Walk through ONE real example, anonymised. "A client came to me with X. We worked through Y. Three weeks later, Z." Concrete.'
        },
        {
          id: 'ch8', title: 'Ch. 8 — Path + Proof (28:00–35:00)', kind: 'textarea',
          hint: 'How you work with clients (offer preview, no fees mentioned) + 1–2 testimonials.'
        },
        {
          id: 'ch9', title: 'Ch. 9 — The Invitation (35:00–40:00)', kind: 'textarea',
          hint: 'What to do next. Click the button. Book the call. Fill the form. Be explicit. No "hope to hear from you".'
        },
        {
          id: 'vsl_critique',
          title: 'Critique my full VSL script',
          kind: 'ai_action',
          body: 'AI plays Pankaj-on-Saturday — direct, no softening, flags every place the script wanders.',
          aiPrompt: {
            label: 'Critique my VSL script',
            build: (state) => {
              const s = state['3.2'] || {};
              const n = state['2.2'] || {};
              return `You are Pankaj S. Nikam, co-founder of Miindtraa, running the Saturday Front-End Lab. You are doing a VSL Script Hot-Seat. Critique this script honestly, the way you would on a Saturday call: warm, sharp, no softening.

PRACTITIONER\'S NICHE: ${n.niche_statement || '(not specified)'}

THEIR 9-CHAPTER VSL DRAFT:

Ch1 (Cold Open): ${s.ch1 || '(empty)'}
Ch2 (Who For): ${s.ch2 || '(empty)'}
Ch3 (Pain): ${s.ch3 || '(empty)'}
Ch4 (Failed Attempts): ${s.ch4 || '(empty)'}
Ch5 (Story): ${s.ch5 || '(empty)'}
Ch6 (Mechanism): ${s.ch6 || '(empty)'}
Ch7 (Demo): ${s.ch7 || '(empty)'}
Ch8 (Path + Proof): ${s.ch8 || '(empty)'}
Ch9 (Invitation): ${s.ch9 || '(empty)'}

CRITIQUE FRAMEWORK:
1. Where does the script "go corporate" or "go mystical"? Quote it and rewrite that line.
2. Which chapter is weakest and why? Don\'t soften. Name it.
3. Is the mechanism (Ch 6) actually teaching something, or is it bypass-speak? Be honest.
4. The micro-demo (Ch 7) — is it specific enough to be believable? If vague, give 1 concrete rewrite.
5. The invitation (Ch 9) — is the action crystal clear? Yes or no.
6. ONE concrete next step this person should do before recording.

End with: "Record it this week. Phone quality is fine. Done > perfect."`;
            }
          }
        }
      ]
    },
    {
      id: '3.3',
      phase: 'p3',
      title: 'Landing Page Build (Systeme.io)',
      week: 'Weeks 14–15',
      objective: 'Live landing page with VSL embed + opt-in form using Systeme.io free plan.',
      outputs: ['Live landing page URL'],
      milestone: 'Page live + URL shared in WhatsApp group.',
      sections: [
        {
          id: 'context',
          title: 'Tool stack',
          kind: 'info',
          body: `Systeme.io free plan: 3 funnels, unlimited contacts, 1 custom domain subdirectory, email automation included. Miindtraa provides a cloneable template — Amaey walks through the clone-and-customise on Thursday tech.

You are NOT building a website. You are building a one-page funnel.`
        },
        {
          id: 'hero',
          title: 'Hero section (above the fold)',
          kind: 'group',
          fields: [
            { id: 'headline', kind: 'text', label: 'Headline (use your positioning statement)', placeholder: '' },
            { id: 'subheadline', kind: 'text', label: 'Subheadline (one specific pain)', placeholder: '' },
            { id: 'cta_text', kind: 'text', label: 'CTA button text', placeholder: 'e.g., "Watch the video + book your free clarity call"' }
          ]
        },
        {
          id: 'vsl_embed',
          title: 'VSL embed',
          kind: 'check',
          options: [
            { value: 'unlisted', label: 'VSL uploaded to YouTube (unlisted) OR direct-uploaded to Systeme.io' },
            { value: 'thumbnail', label: 'Custom thumbnail set (not a default frame)' },
            { value: 'autoplay_off', label: 'Autoplay OFF (let them choose)' }
          ]
        },
        {
          id: 'form',
          title: 'Application form (below VSL)',
          kind: 'group',
          hint: 'Keep it short — Name, Email, Phone, City, + 2 qualifying questions max.',
          fields: [
            { id: 'qual_q1', kind: 'text', label: 'Qualifying Question 1', placeholder: 'e.g., "What\'s the #1 thing blocking your practice right now?"' },
            { id: 'qual_q2', kind: 'text', label: 'Qualifying Question 2', placeholder: 'e.g., "What have you already tried?"' }
          ]
        },
        {
          id: 'below_fold',
          title: 'Below-the-fold sections',
          kind: 'check',
          options: [
            { value: 'transformation', label: '3 transformation bullets (what becomes possible)' },
            { value: 'testimonials', label: '3 testimonials (anonymised if needed)' },
            { value: 'founder_photo', label: 'Your photo + 2-line credential summary' },
            { value: 'second_cta', label: 'Second CTA button (same copy as first)' }
          ]
        },
        {
          id: 'copy_help',
          title: 'Generate hero + below-the-fold copy',
          kind: 'ai_action',
          aiPrompt: {
            label: 'Generate landing page copy',
            build: (state) => {
              const n = state['2.2'] || {};
              const p = state['2.3'] || {};
              const o = state['2.4'] || {};
              const h = state['3.3'] || {};
              return `Write landing page copy for an NQH-certified healer\'s VSL funnel page. Voice: grounded, direct, warm (like Amaey Parekh). Indian English.

CONTEXT:
- Niche: ${n.niche_statement || '(not set)'}
- Positioning: ${p.positioning_statement || '(not set)'}
- Top tier offer name: ${o.t3_name || o.t2_name || '(not set)'}
- Their top tier promise: ${o.t3_promise || o.t2_promise || '(not set)'}
- User's draft headline: ${h.headline || '(none)'}
- User's draft subheadline: ${h.subheadline || '(none)'}

Output exactly this structure:

## HEADLINE (3 variants)
[3 different one-line hooks. Each ≤ 14 words.]

## SUBHEADLINE (3 variants)
[3 versions of the supporting line — one specific pain stated plainly.]

## CTA BUTTON (3 variants)
[3 button copy options. Action-first. No "submit" or "learn more".]

## TRANSFORMATION BULLETS (3)
[3 bullets of "what becomes possible" — written in the client\'s voice, present tense.]

## CREDIBILITY BLOCK (one paragraph)
[2–3 lines — credentials in plain language, no name-dropping.]

## SECOND CTA (1 line of copy + button text)

Tone check: nothing salesy. Nothing mystical. Just clear, grounded, specific.`;
            }
          }
        },
        {
          id: 'launch',
          title: 'Launch checklist',
          kind: 'check',
          options: [
            { value: 'cloned', label: 'Miindtraa Systeme.io template cloned' },
            { value: 'copy_added', label: 'My copy added (hero, transformation, testimonials, founder)' },
            { value: 'form_works', label: 'Form submits tested — confirmation flow works' },
            { value: 'mobile_tested', label: 'Tested on mobile (most clients will land here on phone)' },
            { value: 'published', label: 'Published to subdomain' },
            { value: 'shared', label: 'URL shared in Accelerator WhatsApp group' }
          ]
        }
      ]
    },
    {
      id: '3.4',
      phase: 'p3',
      title: 'TidyCal Booking Page',
      week: 'Week 15',
      objective: 'Live booking page with intake questions.',
      outputs: ['TidyCal URL with 5–7 intake questions'],
      milestone: 'Booking page live. Landing page CTA points here.',
      sections: [
        {
          id: 'tool',
          title: 'TidyCal setup (free plan)',
          kind: 'check',
          options: [
            { value: 'account', label: 'TidyCal account created' },
            { value: 'calendar_synced', label: 'Google Calendar synced' },
            { value: 'slot_30_45', label: '30–45 min call slots configured' },
            { value: 'tz', label: 'Time zone set to your local zone' },
            { value: 'max_4', label: 'Max 4 bookings/day cap set' },
            { value: 'buffer', label: '15-min buffer between calls' },
            { value: 'wed_blocked', label: 'Wednesday evenings BLOCKED if you are Amaey or Pankaj — for you, decide your own rest day and block it' }
          ]
        },
        {
          id: 'intake',
          title: 'Intake questions (5–7 max, all required)',
          kind: 'check',
          hint: 'These are the locked Miindtraa questions. Tick when added to TidyCal.',
          options: [
            { value: 'q1', label: 'What do you currently practice / do for a living?' },
            { value: 'q2', label: 'How many clients are you seeing now per month?' },
            { value: 'q3', label: 'What\'s your current pricing per session/package?' },
            { value: 'q4', label: 'What\'s the #1 thing blocking your practice right now?' },
            { value: 'q5', label: 'What\'s your goal for the next 90 days?' },
            { value: 'q6', label: 'Why now? (urgency check)' },
            { value: 'q7', label: 'Are you ready to invest at [your price band] if this is the right fit?' }
          ]
        },
        {
          id: 'flow',
          title: 'Booking flow check',
          kind: 'check',
          options: [
            { value: 'redirect', label: 'Confirmation page redirects to your Thank-You page' },
            { value: 'email_confirm', label: 'Auto-email confirmation to client' },
            { value: 'cal_invite', label: 'Calendar invite auto-sent with Zoom/Meet link' },
            { value: 'reminder', label: '24-hour reminder + 1-hour reminder set' }
          ]
        }
      ]
    },
    {
      id: '3.5',
      phase: 'p3',
      title: 'Thank-You Page',
      week: 'Week 15',
      objective: 'Thank-you page with Meta Pixel event + WhatsApp group invite.',
      outputs: ['Live thank-you URL', '60-90 sec thank-you video', 'WhatsApp group invite active'],
      milestone: 'Thank-you page live with Pixel firing.',
      sections: [
        {
          id: 'structure',
          title: 'Thank-you page structure',
          kind: 'check',
          options: [
            { value: 'header', label: 'Header: "You\'re booked! Here\'s what happens next."' },
            { value: 'video', label: '60–90 sec personal thank-you video (reduces no-shows by 30%+)' },
            { value: 'three_steps', label: '3-step "What to expect" bullets' },
            { value: 'wa_button', label: 'Big visible WhatsApp group invite button' },
            { value: 'pixel_fires', label: 'Pixel event fires on page view (ViewContent → Lead)' }
          ]
        },
        {
          id: 'thank_you_script',
          title: 'Your 60-90 sec thank-you video script',
          kind: 'textarea',
          hint: 'Record on phone. Look at camera. Smile. 90 seconds. The goal is they FEEL like they already started.',
          placeholder: 'Hi [name pulled from form]! I just saw your booking come through, and I want to say — thank you for trusting me with your time. Before our call, here\'s ONE thing to reflect on: [...]\n\nIn the meantime, I\'ve added you to our WhatsApp community — click the button below to join. See you on [day]!',
          aiPrompt: {
            label: 'Draft my thank-you video script',
            build: (state) => {
              const n = state['2.2'] || {};
              return `Write a 90-second thank-you video script for an NQH practitioner whose niche is: ${n.niche_statement || '(not set)'}

Structure:
- Warm hello (2 sentences)
- Acknowledge their courage in booking
- ONE reflection prompt for them to journal on before the call
- WhatsApp invite mention
- Sign-off

Voice: warm, direct, grounded. Not bubbly. Indian English. Around 220 words.`;
            }
          }
        }
      ]
    },
    {
      id: '3.6',
      phase: 'p3',
      title: 'WhatsApp Group Nurture',
      week: 'Weeks 15–16',
      objective: 'WhatsApp group active with nurture rhythm.',
      outputs: ['Active group with welcome script', 'First 4 posts scheduled'],
      milestone: 'Group active with at least 10 contacts + welcome sequence running.',
      sections: [
        {
          id: 'setup',
          title: 'Group setup',
          kind: 'group',
          fields: [
            { id: 'group_name', kind: 'text', label: 'Group name', placeholder: '[Your Name]\'s Community  OR  NQH-inspired [niche] Circle' },
            { id: 'pinned_purpose', kind: 'textarea', label: 'Pinned purpose statement (2–3 lines)', placeholder: '' },
            { id: 'welcome_msg', kind: 'textarea', label: 'Welcome auto-message (sent when someone joins)', placeholder: 'Includes: warm hello, link to recent post, founder voice note URL, "what to expect"' }
          ]
        },
        {
          id: 'cadence',
          title: 'Weekly content cadence',
          kind: 'group',
          fields: [
            { id: 'mon', kind: 'text', label: 'Monday — Teaching post / insight', placeholder: 'Topic: ___' },
            { id: 'wed', kind: 'text', label: 'Wednesday — Client transformation (anonymised)', placeholder: '' },
            { id: 'fri', kind: 'text', label: 'Friday — Behind-the-scenes / personal reflection', placeholder: '' },
            { id: 'sun', kind: 'text', label: 'Sunday — Community question', placeholder: '' }
          ]
        },
        {
          id: 'pre_call',
          title: 'Pre-call nurture sequence',
          kind: 'group',
          fields: [
            { id: 'plus_24h', kind: 'textarea', label: '+24h after booking', placeholder: 'Welcome message + 1 thing to reflect on before our call.' },
            { id: 'day_of', kind: 'textarea', label: 'Morning of the call', placeholder: 'Looking forward to today + Zoom link confirmation.' },
            { id: 'post_call_yes', kind: 'textarea', label: 'Post-call: YES outcome', placeholder: '' },
            { id: 'post_call_thinking', kind: 'textarea', label: 'Post-call: THINKING outcome', placeholder: '' },
            { id: 'post_call_no_show', kind: 'textarea', label: 'Post-call: NO-SHOW', placeholder: '' }
          ]
        }
      ]
    },
    {
      id: '3.7',
      phase: 'p3',
      title: 'Meta Pixel + Conversions API',
      week: 'Week 16',
      objective: 'Pixel firing correctly + CAPI configured.',
      outputs: ['5 events firing', 'Pixel Helper screenshot'],
      milestone: 'All events verified.',
      sections: [
        {
          id: 'events',
          title: 'Events to configure',
          kind: 'check',
          options: [
            { value: 'pageview', label: 'PageView — landing page loads' },
            { value: 'viewcontent', label: 'ViewContent — VSL played (engagement signal)' },
            { value: 'lead', label: 'Lead — application form submitted' },
            { value: 'completeregistration', label: 'CompleteRegistration — TidyCal booking confirmed' },
            { value: 'schedule', label: 'Schedule — thank-you page viewed' }
          ]
        },
        {
          id: 'capi',
          title: 'Conversions API (server-side)',
          kind: 'check',
          options: [
            { value: 'pabbly_connected', label: 'Pabbly Connect linked to Meta Events Manager' },
            { value: 'syst_to_capi', label: 'Systeme.io form-submit → Pabbly → CAPI Lead event' },
            { value: 'tidycal_to_capi', label: 'TidyCal booking → Pabbly → CAPI CompleteRegistration' }
          ]
        },
        {
          id: 'verify',
          title: 'Verification',
          kind: 'check',
          options: [
            { value: 'pixel_helper', label: 'Pixel Helper Chrome extension shows all 5 events' },
            { value: 'test_event', label: 'Test Event in Events Manager shows recent firings' },
            { value: 'screenshot', label: 'Screenshot submitted to Amaey in Thursday tech session' }
          ]
        }
      ]
    },
    {
      id: '3.8',
      phase: 'p3',
      title: 'Meta Ads Account Setup',
      week: 'Week 16',
      objective: 'Business Manager + Ad Account + audiences + first campaign ready.',
      outputs: ['Full Ads Manager hygiene passed'],
      milestone: 'Ads Manager screenshot approved by Amaey.',
      sections: [
        {
          id: 'setup',
          title: 'Account hygiene',
          kind: 'check',
          options: [
            { value: 'bm', label: 'Facebook Business Manager created + verified' },
            { value: 'ad_acct', label: 'Ad Account created + billing added' },
            { value: 'pixel_assigned', label: 'Pixel assigned to Ad Account' },
            { value: 'page_connected', label: 'FB Page connected to BM' },
            { value: 'ig_linked', label: 'Instagram account linked' },
            { value: 'roles', label: 'Roles assigned (Admin only — no agency/Pankaj/Amaey access)' }
          ]
        },
        {
          id: 'audiences',
          title: 'Custom Audiences to create',
          kind: 'check',
          options: [
            { value: 'ig_followers', label: 'Instagram followers' },
            { value: 'website_visitors_90', label: 'Website visitors (last 90 days)' },
            { value: 'video_viewers_25', label: 'Video viewers (25%+ of VSL)' },
            { value: 'engagers', label: 'Page engagers (last 90 days)' }
          ]
        },
        {
          id: 'structure',
          title: 'Campaign structure planned',
          kind: 'check',
          options: [
            { value: 'one_campaign', label: '1 campaign (Lead objective)' },
            { value: 'two_adsets', label: '2 ad sets (2 personas OR 2 interest buckets)' },
            { value: 'two_creatives', label: '2 creatives per ad set (= 4 total ads)' },
            { value: 'budget_set', label: 'Budget: ₹300/day per ad set (₹9,000/month for 1 month — practice money, not ROI money)' }
          ]
        }
      ]
    },
    {
      id: '3.9',
      phase: 'p3',
      title: 'Meta Ad Compliance + Creative',
      week: 'Weeks 16–17',
      objective: 'Compliance-safe ads + 2 creatives ready.',
      outputs: ['2 ad creatives ready for review'],
      milestone: 'First 2 ads submitted for Meta review.',
      sections: [
        {
          id: 'compliance',
          title: 'Compliance rules — DO NOT skip',
          kind: 'check',
          hint: 'Healers and wellness practitioners are flagged often. Read every rule.',
          options: [
            { value: 'no_personal_attr', label: 'NO "you" implicit personal attribute statements ("you anxious...", "you traumatised...")' },
            { value: 'no_medical', label: 'NO medical claims — never use "cure", "treat", "heal [disease]"' },
            { value: 'no_before_after', label: 'NO before/after physical-transformation imagery' },
            { value: 'no_income', label: 'NO income or outcome guarantees' },
            { value: 'health_disclosed', label: 'Health/wellness category declared in Business Settings' },
            { value: 'no_sac', label: 'Special Ad Category NOT required for healers (do not toggle on)' }
          ]
        },
        {
          id: 'creative_a',
          title: 'Creative A — Short-form Reel (≤60 sec, 9:16)',
          kind: 'group',
          fields: [
            { id: 'a_hook', kind: 'text', label: 'Hook (first 3 seconds)', placeholder: '' },
            { id: 'a_agitate', kind: 'text', label: 'Agitate (3–15 sec)', placeholder: '' },
            { id: 'a_mechanism', kind: 'text', label: 'Mechanism (15–30 sec)', placeholder: '' },
            { id: 'a_proof', kind: 'text', label: 'Proof (30–40 sec)', placeholder: '' },
            { id: 'a_cta', kind: 'text', label: 'CTA (40–50 sec)', placeholder: 'e.g., "Watch the free video + book your call"' }
          ]
        },
        {
          id: 'creative_b',
          title: 'Creative B — Static + 2-line copy',
          kind: 'group',
          fields: [
            { id: 'b_headline', kind: 'text', label: 'Headline (image overlay)', placeholder: '' },
            { id: 'b_body', kind: 'textarea', label: '1-paragraph body copy', placeholder: '' }
          ]
        },
        {
          id: 'critique',
          title: 'Pre-flight compliance + hook critique',
          kind: 'ai_action',
          aiPrompt: {
            label: 'Critique my ad creatives',
            build: (state) => {
              const c = state['3.9'] || {};
              const n = state['2.2'] || {};
              return `You are a Meta-ads-compliance + hook strategist for healing-niche ads in India. Critique these two creatives.

NICHE: ${n.niche_statement || '(not set)'}

CREATIVE A (Reel):
- Hook: ${c.a_hook || '(empty)'}
- Agitate: ${c.a_agitate || '(empty)'}
- Mechanism: ${c.a_mechanism || '(empty)'}
- Proof: ${c.a_proof || '(empty)'}
- CTA: ${c.a_cta || '(empty)'}

CREATIVE B (Static):
- Headline: ${c.b_headline || '(empty)'}
- Body: ${c.b_body || '(empty)'}

OUTPUT:
1. COMPLIANCE FLAGS — go line by line. Flag any "you" personal attribute, medical claim, outcome guarantee, before/after framing. Quote the exact line.
2. HOOK RATING — Creative A hook scored 1–10 with reasoning. Suggest 3 stronger hooks.
3. STATIC HOOK — Creative B headline scored 1–10 with reasoning. Suggest 3 stronger headlines.
4. ONE THING to fix before submitting for Meta review.

Indian English. Direct.`;
            }
          }
        }
      ]
    },
    {
      id: '3.10',
      phase: 'p3',
      title: 'Ad Launch + 7-Day Learning Phase',
      week: 'Week 17',
      objective: '2 ads live, running ≥7 days with enough spend for learning phase.',
      outputs: ['Ads active', 'Spend log + 7 days of data'],
      milestone: 'Ads ran ≥7 days. Data collected for Launch Review.',
      sections: [
        {
          id: 'launch_check',
          title: 'Pre-launch checklist',
          kind: 'check',
          options: [
            { value: 'ads_approved', label: 'Both ads APPROVED by Meta' },
            { value: 'pixel_verified', label: 'Pixel verified firing on landing + thank-you' },
            { value: 'budget_set', label: 'Budget ₹300/day per ad set set' },
            { value: 'schedule_set', label: 'Schedule set (continuous, no end date)' }
          ]
        },
        {
          id: 'learning_phase',
          title: 'Learning phase — what NOT to do',
          kind: 'info',
          body: `Meta needs ~50 conversions per ad set for the learning phase to exit. With ₹300/day, you will NOT exit the learning phase in 7 days. That\'s fine.

DO NOT:
- Pause and restart (kills learning)
- Edit budget more than once
- Edit audience more than once
- Change creative mid-flight

Wait until Launch Review (Day 100, 1:1 #2) to make changes. Until then: watch, log, do not touch.`
        },
        {
          id: 'daily_log',
          title: '7-day spend log',
          kind: 'table',
          columns: ['Day', 'Spend ₹', 'Impressions', 'CTR%', 'Landing views', 'Applications', 'Bookings'],
          rows: 7
        }
      ]
    },
    {
      id: '3.11',
      phase: 'p3',
      title: 'Sales Call Script + Objection Handling',
      week: 'Weeks 16–17 (parallel)',
      objective: 'Run a 45–60 min sales call confidently. Use your own version of the Pankaj script.',
      outputs: ['Personalised sales call script', '10 objection cards filled', '2 roleplays recorded'],
      milestone: 'First real sales conversation by Week 17.',
      sections: [
        {
          id: 'context',
          title: 'The call flow — 12 steps',
          kind: 'info',
          body: `Welcome → Background → Certifications history → Current practice stage → Growth challenge → Client + income pattern → Diagnose gap → Explain offer (only if relevant) → Clarify expectations → Investment + payment options → Handle objections → Close OR recommend alternative.

You are a diagnostician first. Not a closer.`
        },
        {
          id: 'personal_script',
          title: 'Personalise the script',
          kind: 'group',
          fields: [
            { id: 'opener', kind: 'textarea', label: 'Your opening 2 lines', placeholder: 'Warm, sets tone, lowers their guard.' },
            { id: 'diagnostic_qs', kind: 'textarea', label: 'Your 3 favourite diagnostic questions', placeholder: '1.\n2.\n3.' },
            { id: 'transition_to_offer', kind: 'textarea', label: 'Transition into your offer (after diagnosing the gap)', placeholder: '' },
            { id: 'price_reveal', kind: 'textarea', label: 'Your exact words at the price reveal', placeholder: '' },
            { id: 'close', kind: 'textarea', label: 'Your closing question (NOT "what do you think?")', placeholder: 'e.g., "Based on what we\'ve uncovered today, does it feel like the right move for you to begin?"' }
          ]
        },
        {
          id: 'objections',
          title: '10 objection cards',
          kind: 'group',
          fields: [
            { id: 'obj1', kind: 'textarea', label: '1. "I need to think about it"', placeholder: 'Your one-liner response + your follow-up question' },
            { id: 'obj2', kind: 'textarea', label: '2. "I need to discuss with my spouse/family"', placeholder: '' },
            { id: 'obj3', kind: 'textarea', label: '3. "I don\'t have the budget right now"', placeholder: '' },
            { id: 'obj4', kind: 'textarea', label: '4. "Can I do EMI / instalments?"', placeholder: '' },
            { id: 'obj5', kind: 'textarea', label: '5. "How do I know this will work for me?"', placeholder: '' },
            { id: 'obj6', kind: 'textarea', label: '6. "Can I start with one session first?"', placeholder: '' },
            { id: 'obj7', kind: 'textarea', label: '7. "I\'ve already done other courses — how is this different?"', placeholder: '' },
            { id: 'obj8', kind: 'textarea', label: '8. "I\'m not sure I\'m the right kind of client"', placeholder: '' },
            { id: 'obj9', kind: 'textarea', label: '9. "What if I don\'t get results?"', placeholder: '' },
            { id: 'obj10', kind: 'textarea', label: '10. "Is this accredited / recognised?"', placeholder: '' }
          ]
        },
        {
          id: 'objection_help',
          title: 'Get help with an objection',
          kind: 'ai_action',
          body: 'Stuck on one? Drop the exact objection wording you\'ve heard from a real prospect — AI will draft 3 ways to handle it in your voice.',
          aiPrompt: {
            label: 'Help with an objection',
            build: (state) => {
              const n = state['2.2'] || {};
              return `You are Pankaj S. Nikam, doing a Saturday Sales Roleplay. A practitioner is stuck on an objection.

Their niche: ${n.niche_statement || '(not set)'}

The objection they\'re hearing from real prospects (they\'ll type it next): [INSERT EXACT OBJECTION WORDING]

You\'ll draft 3 different response strategies:
1. AGREE + REDIRECT — agree with the surface concern, redirect to a deeper question
2. REFRAME — shift the lens entirely
3. DIRECT QUESTION — answer the objection by asking the better question back

Each response: 3–4 sentences. Indian English. Diagnostic, not pushy.

Before drafting, ask them: "What exact words did the prospect use? Paste it verbatim."`;
            }
          }
        },
        {
          id: 'practice',
          title: 'Practice log',
          kind: 'check',
          options: [
            { value: 'roleplay1', label: 'Roleplay 1 with practice partner recorded (audio)' },
            { value: 'roleplay2', label: 'Roleplay 2 with practice partner recorded' },
            { value: 'real_call_attempted', label: 'First real discovery call attempted on ads traffic' }
          ]
        }
      ]
    },
    {
      id: '3.12',
      phase: 'p3',
      title: 'Launch + Pabbly Automations',
      week: 'Week 17',
      objective: 'Form-submit → Sheet + email notify + WhatsApp DM within 100 Pabbly tasks/month.',
      outputs: ['Active Pabbly automations'],
      milestone: 'Pabbly recipes live. End of Phase 3.',
      sections: [
        {
          id: 'recipes',
          title: 'The 3 Pabbly recipes',
          kind: 'check',
          options: [
            { value: 'recipe1', label: 'Recipe 1: Systeme.io form-submit → Google Sheet row + email notification to you' },
            { value: 'recipe2', label: 'Recipe 2: TidyCal booking confirmed → WhatsApp message to client + your phone notification' },
            { value: 'recipe3', label: 'Recipe 3: Thank-you page visit → Meta CAPI conversion event' }
          ]
        },
        {
          id: 'launch_review_prep',
          title: 'Launch Review prep (1:1 #2 with Amaey/Pankaj)',
          kind: 'check',
          hint: 'Bring this to your Launch Review call.',
          options: [
            { value: 'vsl_live', label: 'VSL embedded and live' },
            { value: 'landing_live', label: 'Landing page live + tested on mobile' },
            { value: 'booking_live', label: 'TidyCal page live' },
            { value: 'thankyou_live', label: 'Thank-you page live with Pixel firing' },
            { value: 'wa_active', label: 'WhatsApp group active' },
            { value: 'ads_ran_7d', label: 'Ads ran ≥7 days with data' },
            { value: '10_apps_or_org', label: '≥10 applications OR 14-day organic-only test completed' }
          ]
        }
      ]
    },

    // ============ PHASE 4 ============
    {
      id: '4.1',
      phase: 'p4',
      title: 'KPI Tracker Install',
      week: 'Weeks 15–16 (parallel start)',
      objective: 'One Google Sheet tracks the entire funnel + practice.',
      outputs: ['Live KPI Sheet with 7 days of real data'],
      milestone: 'Dashboard running.',
      sections: [
        {
          id: 'tabs',
          title: 'The 7 required tabs',
          kind: 'check',
          options: [
            { value: 'funnel_dash', label: 'Funnel Dashboard — daily summary: spend, CPL, applications, bookings, shows, closes' },
            { value: 'leads', label: 'Leads — every lead captured with source, status, notes (real-time)' },
            { value: 'bookings', label: 'Bookings — every TidyCal booking + pre-call Q answers' },
            { value: 'sales_calls', label: 'Sales Calls — every call: outcome, objection, next step' },
            { value: 'clients', label: 'Clients — active + completed + pricing + sessions done (weekly)' },
            { value: 'content', label: 'Content — posts published + engagement (weekly)' },
            { value: 'scorecard', label: 'Weekly Scorecard — Sunday evening roll-up' }
          ]
        },
        {
          id: 'data',
          title: 'Your first 7-day data snapshot',
          kind: 'table',
          columns: ['Date', 'Spend ₹', 'CPL ₹', 'Apps', 'Bookings', 'Shows', 'Closes', 'Notes'],
          rows: 7
        }
      ]
    },
    {
      id: '4.2',
      phase: 'p4',
      title: 'The 6-SOP Pack',
      week: 'Week 16',
      objective: '6 short SOPs (1 page each) so the practice runs when you are distracted, sick, or travelling.',
      outputs: ['6 customised SOPs in your Drive'],
      milestone: 'SOP pack complete.',
      sections: [
        {
          id: 'sops',
          title: 'The 6 SOPs',
          kind: 'check',
          options: [
            { value: 'enquiry', label: 'Enquiry SOP — DM/email/form → booked call (response templates, TidyCal link, WA welcome)' },
            { value: 'onboarding', label: 'Onboarding SOP — payment received → Welcome Kit → Session 1 → Intake form' },
            { value: 'session', label: 'Session Delivery SOP — pre-prep, 5-phase L1 structure, post-session notes, WA summary' },
            { value: 'followup', label: 'Follow-up SOP — between-session check-ins, post-session reflection, quiet-client recovery' },
            { value: 'payment', label: 'Payment SOP — Razorpay Payment Links, invoicing, GST tracking, failed-payment recovery' },
            { value: 'referral', label: 'Referral SOP — when to ask (Session 3+), the script, the bonus structure' }
          ]
        },
        {
          id: 'enquiry_template',
          title: 'Enquiry SOP — your 3 response templates',
          kind: 'group',
          fields: [
            { id: 'dm_warm', kind: 'textarea', label: 'Warm IG/LI DM response', placeholder: '' },
            { id: 'cold_dm', kind: 'textarea', label: 'Cold DM response (stranger)', placeholder: '' },
            { id: 'form_to_call', kind: 'textarea', label: 'Form submission → call invite message', placeholder: '' }
          ]
        }
      ]
    },
    {
      id: '4.3',
      phase: 'p4',
      title: 'Money Management for Practitioners',
      week: 'Weeks 16–17',
      objective: 'Understand the math of your practice + basics of being a solo practitioner business owner in India.',
      outputs: ['Money Tracker filled', 'Revenue math set', 'Business account opened (if not already)'],
      milestone: 'Money systems installed.',
      sections: [
        {
          id: 'revenue_math',
          title: 'Revenue math',
          kind: 'group',
          fields: [
            { id: 'target_annual', kind: 'text', label: 'Target annual revenue (in ₹)', placeholder: 'e.g., ₹24L' },
            { id: 'monthly_target', kind: 'text', label: 'Monthly target', placeholder: 'e.g., ₹2L' },
            { id: 'tier_mix', kind: 'textarea', label: 'Your tier mix to hit it', placeholder: 'e.g., 4 × Tier 2 + 1 × Tier 3 per month' },
            { id: 'clients_needed', kind: 'text', label: 'Clients per month needed', placeholder: '' },
            { id: 'apps_needed', kind: 'text', label: 'Applications per month needed (at your conversion rate)', placeholder: 'Apps × Booking rate × Show rate × Close rate = Clients' }
          ]
        },
        {
          id: 'systems',
          title: 'Money systems checklist',
          kind: 'check',
          options: [
            { value: 'biz_account', label: 'Business bank account opened (HDFC / ICICI / Axis current account)' },
            { value: 'tax_account', label: 'Separate tax set-aside account (25–30% of every payment goes here)' },
            { value: 'gst_awareness', label: 'GST awareness: required if turnover >₹20L/yr (or >₹10L in special-category states)' },
            { value: 'razorpay', label: 'Razorpay account set up for payment links' },
            { value: 'expense_tracker', label: 'Simple expense tracker (tool subs, ad spend, training, supplies)' },
            { value: 'emergency_fund', label: 'Emergency fund rule: 3 months of fixed costs in savings' },
            { value: 'ca_relationship', label: 'CA relationship started (worth it once revenue hits ₹5L/yr)' }
          ]
        }
      ]
    },
    {
      id: '4.4',
      phase: 'p4',
      title: 'AI Support Stack',
      week: 'Weeks 16–17',
      objective: 'Use free-tier AI to save 3+ hours/week on content + admin.',
      outputs: ['Personal Prompt Library (15+ prompts)'],
      milestone: 'Prompt library active.',
      sections: [
        {
          id: 'domains',
          title: 'The 5 domains where AI helps a healer',
          kind: 'check',
          options: [
            { value: 'content', label: 'Content — captions, hooks, carousel scripts, video outlines' },
            { value: 'client_comms', label: 'Client communication — welcome emails, follow-up DMs, intake summaries' },
            { value: 'systems', label: 'Systems — SOP drafts, checklist generation, weekly review prompts' },
            { value: 'research', label: 'Research — niche analysis, competitor scans, language audits' },
            { value: 'self_lift', label: 'Self-lift — journaling companion, reflection partner, mood-words' }
          ]
        },
        {
          id: 'what_not',
          title: 'What AI is NOT for',
          kind: 'info',
          body: `· Intuition during sessions — your gut, your training, your presence
· Reading a client\'s energy — no AI does this
· Generic bypass content — AI loves "trust the universe" and that\'s the OPPOSITE of NQH
· Anything that replaces being present

The rule: AI drafts. You revise. You publish. Never the other way around.`
        },
        {
          id: 'prompts',
          title: 'Your personal prompt library',
          kind: 'group',
          hint: 'Build 15+ saved prompts in a Google Doc, customised for your niche. Below are 5 starters — adapt and add 10 more.',
          fields: [
            { id: 'p1', kind: 'textarea', label: 'Prompt 1: Weekly content calendar generator', placeholder: '' },
            { id: 'p2', kind: 'textarea', label: 'Prompt 2: Caption rewriter (drop in raw idea, get 3 caption variants)', placeholder: '' },
            { id: 'p3', kind: 'textarea', label: 'Prompt 3: Client follow-up message generator', placeholder: '' },
            { id: 'p4', kind: 'textarea', label: 'Prompt 4: Objection response generator', placeholder: '' },
            { id: 'p5', kind: 'textarea', label: 'Prompt 5: Weekly review reflection partner', placeholder: '' }
          ]
        }
      ]
    },
    {
      id: '4.5',
      phase: 'p4',
      title: '90-Day Growth Plan',
      week: 'Week 17 (the graduation document)',
      objective: 'Your own 90-day post-graduation plan.',
      outputs: ['90-Day Plan written'],
      milestone: 'Plan shared at Saturday 90-Day Plan Hot-Seat.',
      sections: [
        {
          id: 'month1',
          title: 'Month 1 — Days 1–30 post-graduation',
          kind: 'group',
          fields: [
            { id: 'm1_revenue', kind: 'text', label: 'Revenue target', placeholder: '' },
            { id: 'm1_clients', kind: 'text', label: 'Client target', placeholder: '' },
            { id: 'm1_tier', kind: 'text', label: 'Offer tier to push', placeholder: 'e.g., Tier 2 (Core)' },
            { id: 'm1_content', kind: 'text', label: 'Content pillar focus', placeholder: '' },
            { id: 'm1_ad_spend', kind: 'text', label: 'Ad spend + spend rule', placeholder: 'e.g., ₹15K/month, no scaling until CPL <₹X' },
            { id: 'm1_ritual', kind: 'text', label: 'Weekly ritual (Sunday 2-hr review)', placeholder: '' }
          ]
        },
        {
          id: 'month2',
          title: 'Month 2 — Days 31–60',
          kind: 'group',
          fields: [
            { id: 'm2_scale', kind: 'text', label: 'What to scale (what\'s working)', placeholder: '' },
            { id: 'm2_kill', kind: 'text', label: 'What to kill (what\'s not)', placeholder: '' },
            { id: 'm2_case_study', kind: 'text', label: 'First testimonial/case study to publish', placeholder: '' },
            { id: 'm2_content_rule', kind: 'text', label: 'Content engine: minimum 3 posts/week', placeholder: '' },
            { id: 'm2_pricing_review', kind: 'text', label: 'Pricing review — time to raise?', placeholder: 'Yes / No / When' }
          ]
        },
        {
          id: 'month3',
          title: 'Month 3 — Days 61–90',
          kind: 'group',
          fields: [
            { id: 'm3_referral', kind: 'text', label: 'Referral engine activation', placeholder: '' },
            { id: 'm3_second_offer', kind: 'text', label: 'Second offer / second tier to test', placeholder: '' },
            { id: 'm3_asset', kind: 'text', label: 'Substantive asset to create (book chapter, course, retreat)', placeholder: '' },
            { id: 'm3_reengage', kind: 'text', label: 'Re-engage past leads — when, how', placeholder: '' },
            { id: 'm3_next', kind: 'text', label: 'What\'s the plan for Months 4–6?', placeholder: '' }
          ]
        },
        {
          id: 'plan_review',
          title: 'AI Review of your 90-day plan',
          kind: 'ai_action',
          aiPrompt: {
            label: 'Stress-test my 90-day plan',
            build: (state) => {
              const p = state['4.5'] || {};
              const o = state['2.4'] || {};
              const n = state['2.2'] || {};
              return `You are a growth strategist for premium healing practices in India. Stress-test this 90-day post-graduation plan.

CONTEXT:
- Niche: ${n.niche_statement || '(not set)'}
- Offer tiers: T1: ${o.t1_name || '(empty)'} · T2: ${o.t2_name || '(empty)'} · T3: ${o.t3_name || '(empty)'}

THE PLAN:

Month 1: Revenue ${p.m1_revenue || '(empty)'} · Clients ${p.m1_clients || '(empty)'} · Push tier ${p.m1_tier || '(empty)'} · Content ${p.m1_content || '(empty)'} · Ads ${p.m1_ad_spend || '(empty)'} · Ritual ${p.m1_ritual || '(empty)'}

Month 2: Scale ${p.m2_scale || '(empty)'} · Kill ${p.m2_kill || '(empty)'} · Case study ${p.m2_case_study || '(empty)'} · Content ${p.m2_content_rule || '(empty)'} · Pricing review ${p.m2_pricing_review || '(empty)'}

Month 3: Referral ${p.m3_referral || '(empty)'} · 2nd offer ${p.m3_second_offer || '(empty)'} · Asset ${p.m3_asset || '(empty)'} · Re-engage ${p.m3_reengage || '(empty)'} · Months 4–6 ${p.m3_next || '(empty)'}

OUTPUT:
1. The MATH check — does the revenue math actually pencil out given their tier mix? Where\'s the gap?
2. The DELUSION check — what part of this plan is over-optimistic? (Hint: every plan has this. Be honest.)
3. The MISSING piece — what does this plan forget? (Energy management, founder burnout, weekend rest, etc.)
4. The ONE adjustment that would 2x the realistic outcome of this plan.
5. The "if everything goes wrong, what survives?" question — what's the baseline they can hit even in a bad quarter?

Indian English. Direct. Grounded.`;
            }
          }
        }
      ]
    },
    {
      id: '4.6',
      phase: 'p4',
      title: 'Graduation Checklist',
      week: 'Week 17 — end',
      objective: 'Final graduation gate.',
      outputs: ['All deliverables checked', 'Graduation badge unlocked'],
      milestone: 'Phase 4 complete. You are an NQH Practitioner with a working practice.',
      sections: [
        {
          id: 'phase2',
          title: 'Phase 2 — Positioning (gate)',
          kind: 'check',
          options: [
            { value: 'identity', label: 'Healer Identity Statement written + posted' },
            { value: 'niche', label: 'Niche locked at Foundation Call' },
            { value: 'positioning', label: 'Positioning statement live on IG + LinkedIn' },
            { value: 'offer', label: '3-tier offer with prices locked' },
            { value: 'money', label: 'Money-belief reset — guilt score reduced by ≥3 points' },
            { value: 'video_challenge', label: '14-Day Video Challenge — all 14 posts live' }
          ]
        },
        {
          id: 'phase3',
          title: 'Phase 3 — Pipeline (gate)',
          kind: 'check',
          options: [
            { value: 'vsl', label: 'VSL recorded + embedded' },
            { value: 'landing', label: 'Landing page live + tested on mobile' },
            { value: 'booking', label: 'TidyCal booking page live with intake questions' },
            { value: 'thankyou', label: 'Thank-you page live with Pixel firing' },
            { value: 'wa_group', label: 'WhatsApp group active with nurture rhythm' },
            { value: 'pixel_capi', label: 'Pixel + CAPI verified, all 5 events firing' },
            { value: 'ads_ran', label: 'Ads ran ≥7 days' },
            { value: 'sales_script', label: 'Personalised sales script + 10 objection cards filled' },
            { value: 'first_call', label: 'First real discovery call attempted' },
            { value: 'launch_review', label: 'Launch Review 1:1 completed' }
          ]
        },
        {
          id: 'phase4',
          title: 'Phase 4 — Scaling (gate)',
          kind: 'check',
          options: [
            { value: 'kpi', label: 'KPI Tracker live with ≥7 days of data' },
            { value: 'sops', label: 'All 6 SOPs customised + saved' },
            { value: 'money_systems', label: 'Money systems installed (account, tax set-aside, expense tracker)' },
            { value: 'ai_library', label: 'AI Prompt Library with 15+ prompts' },
            { value: '90day_plan', label: '90-Day Growth Plan written + shared on Hot-Seat' }
          ]
        },
        {
          id: 'reflection',
          title: 'Graduation reflection',
          kind: 'textarea',
          hint: 'Write 1 paragraph: who were you when you started, who are you now. This goes into your alumni file and Pankaj reads it at your Launch Review.',
          placeholder: ''
        }
      ]
    }
  ]
};

// Make available globally
if (typeof window !== 'undefined') window.CURRICULUM = CURRICULUM;
