/* ============================================
   NQH COMPANION — AI INTEGRATION
   Direct calls to Anthropic API using practitioner's own key.
   Stored only in browser localStorage. Never sent anywhere else.
   ============================================ */

const AI = (() => {
  const API_URL = 'https://api.anthropic.com/v1/messages';
  const MODEL = 'claude-sonnet-4-5-20250929'; // High-quality default

  // Master system prompt: NQH/Miindtraa context the AI carries everywhere
  const SYSTEM_PROMPT = `You are the NQH Practitioner Companion AI — an in-program coach for healers enrolled in the NQH™ Healer Accelerator by Miindtraa, co-created by Dr. Amaey A. Parekh and Pankaj S. Nikam.

ABOUT NQH:
NQH (Neurochakra Quantum Healing) is an IPHM-accredited integrative methodology combining neuroscience, chakra psychology, emotional processing, and quantum identity work. The four pillars are: Neuro Rewiring, Chakra Activation, Emotion Mastery, and Quantum Manifestation.

THE ACCELERATOR:
A 120-day evergreen practitioner-to-practice program. Four phases:
- Phase 1: NQH L1 Certification (technique mastery)
- Phase 2: Identity & Positioning (niche, offer, money reset, video challenge)
- Phase 3: Client Pipeline (VSL funnel: Meta Ads → Landing → TidyCal → Thank-You → WhatsApp)
- Phase 4: Scaling Systems (KPIs, SOPs, money management, 90-day plan)

YOUR ROLE:
You are a coach, not a therapist. You are a strategist, not a guru. You are direct, warm, grounded — never mystical-woo, never corporate-bubbly, never motivational-empty.

VOICE RULES (Amaey + Pankaj):
- Indian English. Rupees (₹), WhatsApp, Hinglish allowed sparingly.
- "You" centered. Not "we at Miindtraa".
- Science-meets-spirit framing. No bypassing. No manifestation hype.
- Hard truths over soft validation when the practitioner needs it.
- Specific examples over generic principles.

WHAT YOU NEVER DO:
- Give medical, legal, or financial advice — always defer to a professional.
- Replace L1 teaching. Methodology is taught only in L1 by certified facilitators. You can REINFORCE concepts, never NEW-TEACH them.
- Use mystical bypass ("trust the universe", "everything happens for a reason").
- Promise outcomes or guarantee results.
- Talk about specific Miindtraa pricing to the practitioner — that's locked at their Foundation Call with Pankaj.

THE DOCTRINE:
"Diagnose generously. Demonstrate selectively. Teach only in Level 1."

When in doubt: be the steady, grounded friend who knows the work and has done it themselves.`;

  // ============================================
  // Key management
  // ============================================
  function getKey() {
    return localStorage.getItem('nqh_anthropic_key') || '';
  }
  function setKey(k) {
    if (k) localStorage.setItem('nqh_anthropic_key', k.trim());
    else localStorage.removeItem('nqh_anthropic_key');
  }
  function hasKey() {
    const k = getKey();
    return !!(k && k.startsWith('sk-'));
  }

  // ============================================
  // Call API
  // ============================================
  async function complete({ userMessage, conversation = [], maxTokens = 1500, onChunk = null }) {
    const key = getKey();
    if (!key) throw new Error('No API key set. Add your Anthropic key in Settings.');

    const messages = [...conversation, { role: 'user', content: userMessage }];

    const body = {
      model: MODEL,
      max_tokens: maxTokens,
      system: SYSTEM_PROMPT,
      messages: messages,
      stream: !!onChunk
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const errText = await res.text();
        let errMsg;
        try {
          const e = JSON.parse(errText);
          errMsg = e.error?.message || errText;
        } catch { errMsg = errText; }
        throw new Error(`API ${res.status}: ${errMsg}`);
      }

      if (onChunk) {
        // Streaming
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let full = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;
            try {
              const obj = JSON.parse(data);
              if (obj.type === 'content_block_delta' && obj.delta?.type === 'text_delta') {
                const text = obj.delta.text || '';
                full += text;
                onChunk(text, full);
              }
            } catch (e) { /* skip parse errors on partial chunks */ }
          }
        }
        return full;
      } else {
        const data = await res.json();
        const text = data.content?.map(c => c.text || '').join('') || '';
        return text;
      }
    } catch (err) {
      if (err.message?.includes('Failed to fetch')) {
        throw new Error('Network error reaching Anthropic API. Check your internet, then try again.');
      }
      throw err;
    }
  }

  // ============================================
  // Markdown formatter (lightweight, for AI output)
  // ============================================
  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  }

  function renderMarkdown(text) {
    if (!text) return '';
    let html = escapeHtml(text);

    // Code blocks (triple backtick)
    html = html.replace(/```([\s\S]*?)```/g, (_, code) => `<pre><code>${code}</code></pre>`);
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Headers
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    // Bold
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    // Italic
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    html = html.replace(/_([^_]+)_/g, '<em>$1</em>');
    // Unordered lists
    html = html.replace(/^(\s*)[-*] (.+)$/gm, '$1<li>$2</li>');
    // Ordered lists
    html = html.replace(/^(\s*)\d+\. (.+)$/gm, '$1<li>$2</li>');
    // Wrap consecutive <li> in <ul>
    html = html.replace(/(<li>.*?<\/li>(?:\s*<li>.*?<\/li>)*)/gs, '<ul>$1</ul>');
    // Paragraphs (blank-line separated)
    html = html.split(/\n\n+/).map(p => {
      if (p.match(/^<(h\d|ul|ol|pre|blockquote)/)) return p;
      return `<p>${p.replace(/\n/g, '<br>')}</p>`;
    }).join('\n');

    return html;
  }

  return {
    complete,
    renderMarkdown,
    getKey,
    setKey,
    hasKey,
    MODEL,
    SYSTEM_PROMPT
  };
})();

if (typeof window !== 'undefined') window.AI = AI;
