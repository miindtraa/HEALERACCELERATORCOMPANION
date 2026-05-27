/* ============================================
   NQH PRACTITIONER COMPANION — MAIN APP
   ============================================ */

const App = (() => {
  // ============================================
  // STATE & STORAGE
  // ============================================
  const STORAGE_KEY = 'nqh_companion_state_v1';

  const DEFAULT_STATE = {
    profile: { name: '', city: '', currentPhase: 'p2', startedAt: null, onboarded: false },
    modules: {},
    completed: {},
    chat: [],
    lastSave: null
  };

  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredClone(DEFAULT_STATE);
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_STATE, ...parsed, profile: { ...DEFAULT_STATE.profile, ...parsed.profile } };
    } catch (e) {
      console.warn('Could not load saved state, starting fresh.', e);
      return structuredClone(DEFAULT_STATE);
    }
  }

  function saveState() {
    state.lastSave = new Date().toISOString();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      flashSaveIndicator();
    } catch (e) {
      toast('Could not save. Storage may be full.', 'error');
    }
  }

  function flashSaveIndicator() {
    const el = $('#save-indicator');
    if (!el) return;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), 1200);
  }

  let saveDebounce;
  function queueSave() {
    clearTimeout(saveDebounce);
    saveDebounce = setTimeout(saveState, 300);
  }

  // ============================================
  // DOM UTILITIES
  // ============================================
  function $(sel, root = document) { return root.querySelector(sel); }
  function $$(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }
  function el(tag, attrs = {}, ...children) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') e.className = v;
      else if (k === 'style') e.style.cssText = v;
      else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2), v);
      else if (k === 'html') e.innerHTML = v;
      else if (v !== null && v !== undefined && v !== false) e.setAttribute(k, v);
    }
    for (const c of children) {
      if (c === null || c === undefined || c === false) continue;
      if (typeof c === 'string' || typeof c === 'number') e.appendChild(document.createTextNode(String(c)));
      else e.appendChild(c);
    }
    return e;
  }

  function toast(message, type = '') {
    const c = $('#toast-container');
    if (!c) return;
    const t = el('div', { class: `toast ${type}` }, message);
    c.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(40px)'; }, 3500);
    setTimeout(() => t.remove(), 4000);
  }

  // ============================================
  // PROGRESS LOGIC
  // ============================================
  function isModuleComplete(modId) { return !!state.completed[modId]; }

  function phaseProgress(phaseId) {
    const modules = CURRICULUM.modules.filter(m => m.phase === phaseId);
    const done = modules.filter(m => isModuleComplete(m.id)).length;
    return { done, total: modules.length, pct: modules.length ? Math.round(done / modules.length * 100) : 0 };
  }

  function overallProgress() {
    const all = CURRICULUM.modules.length;
    const done = CURRICULUM.modules.filter(m => isModuleComplete(m.id)).length;
    return { done, total: all, pct: all ? Math.round(done / all * 100) : 0 };
  }

  function nextIncomplete() {
    return CURRICULUM.modules.find(m => !isModuleComplete(m.id));
  }

  function getSectionValue(modId, secId, field = null) {
    const m = state.modules[modId] || {};
    const s = m[secId];
    if (field === null) return s;
    if (s && typeof s === 'object') return s[field];
    return undefined;
  }

  function setSectionValue(modId, secId, value, field = null) {
    if (!state.modules[modId]) state.modules[modId] = {};
    if (field === null) {
      state.modules[modId][secId] = value;
    } else {
      if (!state.modules[modId][secId] || typeof state.modules[modId][secId] !== 'object') {
        state.modules[modId][secId] = {};
      }
      state.modules[modId][secId][field] = value;
    }
    queueSave();
  }

  // Flatten module data for AI prompt building. Returns a flat object keyed by [moduleId.sectionId.field?].
  function aiContext() {
    const out = {};
    for (const [modId, sections] of Object.entries(state.modules)) {
      out[modId] = sections;
    }
    return out;
  }

  // ============================================
  // ROUTING
  // ============================================
  function parseRoute() {
    const h = (location.hash || '#/home').replace(/^#\/?/, '');
    if (!h || h === '/') return { kind: 'home' };
    if (h === 'home') return { kind: 'home' };
    if (h === 'chat') return { kind: 'chat' };
    if (h === 'settings') return { kind: 'settings' };
    if (h === 'resources') return { kind: 'resources' };
    if (h.startsWith('m/')) return { kind: 'module', id: h.slice(2) };
    return { kind: 'home' };
  }

  function go(path) { location.hash = '#/' + path; }

  // ============================================
  // RENDER ROUTER
  // ============================================
  function renderAll() {
    if (!state.profile.onboarded) { renderOnboarding(); return; }
    const overlay = $('#onboarding');
    if (overlay) overlay.remove();
    renderSidebar();
    renderMain();
  }

  function renderSidebar() {
    const route = parseRoute();
    const nav = $('#sidebar');
    if (!nav) return;
    nav.innerHTML = '';

    const quick = el('div', { class: 'nav-section' });
    quick.appendChild(el('div', { class: 'nav-label' }, 'Workspace'));
    [
      { icon: '🏠', label: 'Dashboard', path: 'home' },
      { icon: '💬', label: 'AI Coach', path: 'chat' },
      { icon: '📚', label: 'Resources', path: 'resources' },
      { icon: '⚙️', label: 'Settings', path: 'settings' }
    ].forEach(item => {
      const active = route.kind === item.path;
      const node = el('div', {
        class: `nav-item ${active ? 'active' : ''}`,
        onclick: () => go(item.path)
      },
        el('span', { class: 'icon' }, item.icon),
        el('span', {}, item.label)
      );
      quick.appendChild(node);
    });
    nav.appendChild(quick);

    CURRICULUM.phases.forEach(phase => {
      const prog = phaseProgress(phase.id);
      const wrapper = el('div', { class: 'nav-section' });
      const phaseHead = el('div', { class: 'nav-phase' },
        el('span', {}, phase.icon),
        el('span', { style: 'flex:0 0 auto;' }, phase.id.toUpperCase() + ' · ' + prog.done + '/' + prog.total)
      );
      const bar = el('div', { class: 'progress-mini' }, el('div', { style: `width:${prog.pct}%` }));
      phaseHead.appendChild(bar);
      wrapper.appendChild(phaseHead);

      const modules = CURRICULUM.modules.filter(m => m.phase === phase.id);
      modules.forEach(mod => {
        const isActive = route.kind === 'module' && route.id === mod.id;
        const isComplete = isModuleComplete(mod.id);
        const inProgress = !isComplete && !!state.modules[mod.id];
        const classes = ['nav-module'];
        if (isActive) classes.push('active');
        if (isComplete) classes.push('complete');
        else if (inProgress) classes.push('in-progress');

        const node = el('div', {
          class: classes.join(' '),
          onclick: () => go(`m/${mod.id}`)
        },
          el('span', { class: 'status-dot' }),
          el('span', {}, `${mod.id} · ${mod.title}`)
        );
        wrapper.appendChild(node);
      });

      nav.appendChild(wrapper);
    });
  }

  function renderMain() {
    const route = parseRoute();
    const main = $('#main');
    if (!main) return;
    main.innerHTML = '';

    if (route.kind === 'home') renderHome(main);
    else if (route.kind === 'module') renderModule(main, route.id);
    else if (route.kind === 'chat') renderChat(main);
    else if (route.kind === 'settings') renderSettings(main);
    else if (route.kind === 'resources') renderResources(main);
    else renderHome(main);

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // ============================================
  // HOME / DASHBOARD
  // ============================================
  function renderHome(root) {
    const profile = state.profile;
    const overall = overallProgress();
    const next = nextIncomplete();
    const hour = new Date().getHours();
    const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

    const hero = el('div', { class: 'card raised', style: 'background: linear-gradient(135deg, rgba(201,169,97,0.10), rgba(212,168,140,0.04));' });
    hero.appendChild(el('div', { class: 'kicker' }, 'NQH™ Practitioner Companion'));
    hero.appendChild(el('h1', { style: 'margin-bottom: 6px;' }, `${greet}, ${profile.name || 'Practitioner'}.`));
    hero.appendChild(el('p', { class: 'text-mute' }, profile.startedAt
      ? `You began this journey ${daysSince(profile.startedAt)} days ago. ${overall.done} of ${overall.total} modules complete.`
      : 'Your journey begins today. Let\'s walk through Phase 2.'));

    if (next) {
      const action = el('div', { class: 'flex items-center gap-3 mt-4', style: 'flex-wrap: wrap;' },
        el('button', { class: 'btn primary lg', onclick: () => go(`m/${next.id}`) },
          `Continue → Module ${next.id}: ${next.title}`
        ),
        el('span', { class: 'text-sm text-mute' }, next.week)
      );
      hero.appendChild(action);
    } else {
      hero.appendChild(el('div', { class: 'mt-4 text-gold' }, '🌟 All modules complete. You are a practising NQH practitioner.'));
    }
    root.appendChild(hero);

    // Stats
    const stats = el('div', { class: 'grid cols-4 mb-4' });
    stats.appendChild(statCard('Overall', `${overall.pct}%`, `${overall.done}/${overall.total} modules`));
    CURRICULUM.phases.forEach(phase => {
      const p = phaseProgress(phase.id);
      const short = phase.label.replace('Phase ', 'P').split(' — ')[0];
      stats.appendChild(statCard(short, `${p.pct}%`, `${p.done}/${p.total}`));
    });
    root.appendChild(stats);

    // Phase cards
    const phaseGrid = el('div', { class: 'grid cols-3' });
    CURRICULUM.phases.forEach(phase => {
      const p = phaseProgress(phase.id);
      const card = el('div', { class: 'card', style: 'cursor:pointer;', onclick: () => {
        const firstIncomplete = CURRICULUM.modules.find(m => m.phase === phase.id && !isModuleComplete(m.id));
        const target = firstIncomplete || CURRICULUM.modules.find(m => m.phase === phase.id);
        if (target) go(`m/${target.id}`);
      }});
      card.appendChild(el('div', { class: 'flex items-center gap-3 mb-2' },
        el('span', { style: 'font-size: 32px;' }, phase.icon),
        el('div', {},
          el('div', { class: 'kicker' }, phase.weeks),
          el('h3', { style: 'font-family: var(--serif);' }, phase.label)
        )
      ));
      card.appendChild(el('p', { class: 'text-mute text-sm mb-4', style: 'font-style: italic;' }, phase.tagline));
      const bar = el('div', { class: 'progress', style: 'margin-bottom: 8px;' }, el('div', { style: `width:${p.pct}%` }));
      card.appendChild(bar);
      card.appendChild(el('div', { class: 'text-xs text-mute flex justify-between' },
        el('span', {}, `${p.done}/${p.total} modules`),
        el('span', { class: 'text-gold' }, `Gate: ${phase.gate}`)
      ));
      phaseGrid.appendChild(card);
    });
    root.appendChild(phaseGrid);

    // AI Coach call-out
    root.appendChild(el('div', { class: 'card mt-4' },
      el('div', { class: 'flex items-center justify-between gap-3', style: 'flex-wrap: wrap;' },
        el('div', { style: 'flex:1; min-width: 250px;' },
          el('div', { class: 'kicker' }, 'AI Coach'),
          el('h3', {}, 'Ask anything about your practice'),
          el('p', { class: 'text-mute text-sm' }, 'Niche doubts, copy critique, sales objections, KPI math. Trained on the NQH curriculum, your saved worksheets become its memory.')
        ),
        el('button', { class: 'btn primary', onclick: () => go('chat') }, 'Open Coach →')
      )
    ));

    // Privacy disclaimer
    root.appendChild(el('div', { class: 'card mt-4', style: 'background: transparent; border-style: dashed;' },
      el('div', { class: 'kicker' }, 'Your data, your device'),
      el('p', { class: 'text-mute text-sm', style: 'margin-bottom: 0;' }, 'Everything you write — worksheets, money work, journaling — stays in your browser\'s local storage. AI requests go from your browser directly to Anthropic using your own API key. Nothing touches Miindtraa servers. Use Settings → Export Backup regularly to keep your own copy.')
    ));
  }

  function daysSince(iso) {
    const ms = Date.now() - new Date(iso).getTime();
    return Math.max(0, Math.floor(ms / 86400000));
  }

  function statCard(label, value, sub) {
    return el('div', { class: 'stat' },
      el('div', { class: 'stat-label' }, label),
      el('div', { class: 'stat-value' }, value),
      el('div', { class: 'stat-sub' }, sub)
    );
  }

  // ============================================
  // MODULE PAGE
  // ============================================
  function renderModule(root, modId) {
    const mod = CURRICULUM.modules.find(m => m.id === modId);
    if (!mod) {
      root.appendChild(el('div', { class: 'card' }, 'Module not found.'));
      return;
    }
    const phase = CURRICULUM.phases.find(p => p.id === mod.phase);

    const head = el('div', { class: 'module-head' });
    head.appendChild(el('div', { class: 'badge' }, mod.id));
    const meta = el('div', { style: 'flex:1;' });
    meta.appendChild(el('div', { class: 'kicker' }, phase.label));
    meta.appendChild(el('h1', {}, mod.title));
    meta.appendChild(el('div', { class: 'module-meta' },
      el('span', {}, mod.week),
      mod.outputs?.length ? el('span', { class: 'dot' }, `${mod.outputs.length} outputs`) : null,
      el('span', { class: 'dot' }, mod.milestone)
    ));
    head.appendChild(meta);

    const completeBtn = el('button', {
      class: isModuleComplete(mod.id) ? 'btn primary' : 'btn',
      onclick: () => toggleComplete(mod.id)
    },
      isModuleComplete(mod.id) ? '✓ Complete' : 'Mark complete'
    );
    head.appendChild(completeBtn);
    root.appendChild(head);

    root.appendChild(el('div', { class: 'objective-card' },
      el('div', { class: 'label' }, 'Objective'),
      el('div', { class: 'text' }, mod.objective)
    ));

    if (mod.outputs?.length) {
      const outputsCard = el('div', { class: 'card', style: 'margin-bottom: 28px;' });
      outputsCard.appendChild(el('h4', { class: 'kicker', style: 'margin-bottom: 10px;' }, 'By the end of this module'));
      const ul = el('ul', { style: 'list-style:none;' });
      mod.outputs.forEach(o => {
        ul.appendChild(el('li', { style: 'padding: 4px 0; padding-left: 22px; position: relative;' },
          el('span', { style: 'position: absolute; left: 0; color: var(--gold);' }, '◆ '),
          o
        ));
      });
      outputsCard.appendChild(ul);
      root.appendChild(outputsCard);
    }

    mod.sections.forEach((section, idx) => {
      root.appendChild(renderSection(mod.id, section, idx + 1));
    });

    // Footer
    const footer = el('div', { class: 'card', style: 'margin-top: 32px; background: rgba(201,169,97,0.04);' },
      el('div', { class: 'flex justify-between items-center', style: 'flex-wrap: wrap; gap: 12px;' },
        el('div', { style: 'flex:1; min-width: 220px;' },
          el('div', { class: 'kicker' }, 'Milestone'),
          el('div', {}, mod.milestone)
        ),
        el('button', {
          class: 'btn primary',
          onclick: () => {
            toggleComplete(mod.id);
            if (state.completed[mod.id]) {
              const next = nextIncomplete();
              if (next) setTimeout(() => go(`m/${next.id}`), 700);
            }
          }
        }, isModuleComplete(mod.id) ? '✓ Module complete' : 'I\'ve completed this module')
      )
    );
    root.appendChild(footer);
  }

  function toggleComplete(modId) {
    state.completed[modId] = !state.completed[modId];
    saveState();
    renderAll();
    if (state.completed[modId]) toast(`Module ${modId} marked complete. 🌟`, 'success');
  }

  // ============================================
  // SECTION RENDERERS
  // ============================================
  function renderSection(modId, section, n) {
    const wrap = el('div', { class: 'section', id: `sec-${section.id}` });
    wrap.appendChild(el('div', { class: 'section-title' },
      el('span', { class: 'num' }, String(n)),
      el('span', {}, section.title)
    ));
    if (section.hint && section.kind !== 'video_day') {
      wrap.appendChild(el('div', { class: 'text-sm text-mute', style: 'margin-bottom: 14px; line-height: 1.6;' }, section.hint));
    }

    switch (section.kind) {
      case 'info': wrap.appendChild(renderInfo(section)); break;
      case 'text': wrap.appendChild(renderText(modId, section)); break;
      case 'textarea': wrap.appendChild(renderTextarea(modId, section)); break;
      case 'radio': wrap.appendChild(renderRadio(modId, section)); break;
      case 'check': wrap.appendChild(renderCheck(modId, section)); break;
      case 'select': wrap.appendChild(renderSelectField(modId, section)); break;
      case 'group': wrap.appendChild(renderGroup(modId, section)); break;
      case 'table': wrap.appendChild(renderTable(modId, section)); break;
      case 'video_day': wrap.appendChild(renderVideoDay(modId, section)); break;
      case 'ai_action': wrap.appendChild(renderAIActionBlock(section)); break;
    }

    if (section.aiPrompt) wrap.appendChild(renderAIAssist(modId, section));

    return wrap;
  }

  function renderInfo(section) {
    return el('div', {
      style: 'background: var(--charcoal); border-left: 2px solid var(--gold); padding: 16px 20px; border-radius: 6px; font-size: 14px; line-height: 1.7; white-space: pre-wrap; color: var(--text-mute);'
    }, section.body || '');
  }

  function renderText(modId, section) {
    const value = getSectionValue(modId, section.id) || '';
    const input = el('input', { type: 'text', placeholder: section.placeholder || '' });
    input.value = value;
    input.addEventListener('input', e => setSectionValue(modId, section.id, e.target.value));
    return el('div', { class: 'field' }, input);
  }

  function renderTextarea(modId, section) {
    const value = getSectionValue(modId, section.id) || '';
    const ta = el('textarea', { placeholder: section.placeholder || '', rows: 5 });
    ta.value = value;
    ta.addEventListener('input', e => setSectionValue(modId, section.id, e.target.value));
    autoResize(ta);
    return el('div', { class: 'field' }, ta);
  }

  function autoResize(ta) {
    const adjust = () => { ta.style.height = 'auto'; ta.style.height = Math.max(90, ta.scrollHeight) + 'px'; };
    ta.addEventListener('input', adjust);
    setTimeout(adjust, 0);
  }

  function renderRadio(modId, section) {
    const current = getSectionValue(modId, section.id);
    const group = el('div', { class: 'checkbox-group' });
    section.options.forEach(opt => {
      const checked = current === opt.value;
      const item = el('label', { class: `checkbox-item ${checked ? 'checked' : ''}` });
      const input = el('input', { type: 'radio', name: `${modId}-${section.id}` });
      input.checked = checked;
      input.addEventListener('change', () => {
        setSectionValue(modId, section.id, opt.value);
        // Visual refresh
        Array.from(group.children).forEach(c => c.classList.remove('checked'));
        item.classList.add('checked');
      });
      item.appendChild(input);
      const lblWrap = el('div', { style: 'flex: 1;' });
      lblWrap.appendChild(el('div', { class: 'label' }, opt.label));
      if (opt.hint) lblWrap.appendChild(el('div', { class: 'sublabel' }, opt.hint));
      item.appendChild(lblWrap);
      group.appendChild(item);
    });
    return group;
  }

  function renderCheck(modId, section) {
    const current = getSectionValue(modId, section.id) || [];
    const group = el('div', { class: 'checkbox-group' });
    section.options.forEach(opt => {
      const checked = current.includes(opt.value);
      const item = el('label', { class: `checkbox-item ${checked ? 'checked' : ''}` });
      const input = el('input', { type: 'checkbox' });
      input.checked = checked;
      input.addEventListener('change', e => {
        const cur = getSectionValue(modId, section.id) || [];
        let next;
        if (e.target.checked) next = [...new Set([...cur, opt.value])];
        else next = cur.filter(v => v !== opt.value);
        setSectionValue(modId, section.id, next);
        item.classList.toggle('checked', e.target.checked);
      });
      item.appendChild(input);
      const lblWrap = el('div', { style: 'flex: 1;' });
      lblWrap.appendChild(el('div', { class: 'label' }, opt.label));
      if (opt.hint) lblWrap.appendChild(el('div', { class: 'sublabel' }, opt.hint));
      item.appendChild(lblWrap);
      group.appendChild(item);
    });
    return group;
  }

  function renderSelectField(modId, section) {
    const value = getSectionValue(modId, section.id) || '';
    const sel = el('select');
    sel.appendChild(el('option', { value: '' }, '— choose —'));
    (section.options || []).forEach(opt => {
      const o = el('option', { value: opt }, opt);
      if (opt === value) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener('change', e => setSectionValue(modId, section.id, e.target.value));
    return el('div', { class: 'field' }, sel);
  }

  function renderGroup(modId, section) {
    const wrap = el('div');
    (section.fields || []).forEach(f => {
      const value = getSectionValue(modId, section.id, f.id) || '';
      const fwrap = el('div', { class: 'field' });
      if (f.label) fwrap.appendChild(el('label', {}, f.label));
      let input;
      if (f.kind === 'textarea') {
        input = el('textarea', { placeholder: f.placeholder || '', rows: 4 });
        input.value = value;
        autoResize(input);
      } else if (f.kind === 'select') {
        input = el('select');
        input.appendChild(el('option', { value: '' }, '— choose —'));
        (f.options || []).forEach(opt => {
          const o = el('option', { value: opt }, opt);
          if (opt === value) o.selected = true;
          input.appendChild(o);
        });
      } else if (f.kind === 'radio') {
        input = el('div', { class: 'checkbox-group' });
        (f.options || []).forEach(opt => {
          const checked = value === opt.value;
          const item = el('label', { class: `checkbox-item ${checked ? 'checked' : ''}` });
          const ri = el('input', { type: 'radio', name: `${modId}-${section.id}-${f.id}` });
          ri.checked = checked;
          ri.addEventListener('change', () => {
            setSectionValue(modId, section.id, opt.value, f.id);
            Array.from(input.children).forEach(c => c.classList.remove('checked'));
            item.classList.add('checked');
          });
          item.appendChild(ri);
          item.appendChild(el('span', { class: 'label' }, opt.label));
          input.appendChild(item);
        });
        fwrap.appendChild(input);
        wrap.appendChild(fwrap);
        return;
      } else {
        input = el('input', { type: 'text', placeholder: f.placeholder || '' });
        input.value = value;
      }
      input.addEventListener('input', e => setSectionValue(modId, section.id, e.target.value, f.id));
      input.addEventListener('change', e => setSectionValue(modId, section.id, e.target.value, f.id));
      fwrap.appendChild(input);
      wrap.appendChild(fwrap);
    });
    return wrap;
  }

  function renderTable(modId, section) {
    const wrap = el('div', { style: 'overflow-x: auto;' });
    const table = el('table', { style: 'width:100%; border-collapse: collapse; font-size: 13px;' });
    const thead = el('thead');
    const trh = el('tr');
    section.columns.forEach(c => {
      trh.appendChild(el('th', { style: 'text-align:left; padding: 8px 6px; border-bottom: 1px solid var(--border); color: var(--gold); font-weight: 500;' }, c));
    });
    thead.appendChild(trh);
    table.appendChild(thead);

    const tbody = el('tbody');
    const stored = getSectionValue(modId, section.id) || {};
    for (let r = 0; r < section.rows; r++) {
      const tr = el('tr');
      section.columns.forEach((col, ci) => {
        const td = el('td', { style: 'padding: 4px; border-bottom: 1px solid var(--border);' });
        const cellKey = `r${r}c${ci}`;
        const input = el('input', { type: 'text', style: 'padding: 6px 8px; font-size: 13px; background: var(--charcoal);' });
        input.value = (stored[cellKey] !== undefined) ? stored[cellKey] : (ci === 0 ? String(r + 1) : '');
        input.addEventListener('input', e => {
          const cur = getSectionValue(modId, section.id) || {};
          cur[cellKey] = e.target.value;
          setSectionValue(modId, section.id, cur);
        });
        td.appendChild(input);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    wrap.appendChild(table);
    return wrap;
  }

  function renderVideoDay(modId, section) {
    const wrap = el('div', { class: 'card', style: 'background: var(--charcoal); margin-bottom: 12px;' });
    const stored = getSectionValue(modId, section.id) || {};
    wrap.appendChild(el('div', { class: 'flex items-center justify-between mb-2', style: 'flex-wrap: wrap; gap: 12px;' },
      el('div', { style: 'flex:1;' },
        el('div', { class: 'kicker', style: 'margin-bottom: 4px;' }, section.format + ' · Goal: ' + section.goal),
        el('div', { style: 'font-weight: 500; font-size: 14px; margin-bottom: 6px;' }, section.prompt)
      )
    ));

    // Checkmark
    const checkRow = el('div', { class: 'flex items-center gap-3', style: 'margin-top: 10px;' });
    const cb = el('input', { type: 'checkbox' });
    cb.checked = !!stored.posted;
    cb.addEventListener('change', e => {
      const cur = getSectionValue(modId, section.id) || {};
      cur.posted = e.target.checked;
      setSectionValue(modId, section.id, cur);
      // Mark visually
      if (e.target.checked) wrap.style.borderColor = 'var(--success)';
      else wrap.style.borderColor = '';
    });
    if (cb.checked) wrap.style.borderColor = 'var(--success)';

    const cbLbl = el('label', { class: 'flex items-center gap-2', style: 'cursor:pointer; font-size: 13px;' }, cb, el('span', {}, 'Posted'));
    checkRow.appendChild(cbLbl);

    // Caption helper button
    const aiBtn = el('button', { class: 'btn sm', onclick: async (e) => {
      e.preventDefault();
      const niche = state.modules['2.2']?.niche_statement || '(set your niche in Module 2.2 first)';
      const userMessage = `Generate 3 Instagram caption variants in Amaey's voice for this NQH practitioner's Day ${section.id.replace('day','')} post.

Niche: ${niche}
Prompt: ${section.prompt}
Format: ${section.format}
Goal: ${section.goal}

For each caption:
- 80–120 words
- Hook in line 1 (no "Hi guys" openers)
- 2–3 line breaks for scannability
- 1 question to invite engagement
- 3 hashtags (niche-specific, no generic)

Voice: grounded, direct, warm. Indian English. No mystical-woo. No "trust the universe" type language.`;

      aiBtn.disabled = true;
      aiBtn.textContent = 'Generating…';
      try {
        if (!AI.hasKey()) {
          toast('Add your Anthropic API key in Settings first.', 'error');
          aiBtn.disabled = false; aiBtn.textContent = '✨ Caption ideas';
          return;
        }
        const out = el('div', { class: 'ai-output', style: 'margin-top: 12px;' });
        wrap.appendChild(out);
        await AI.complete({
          userMessage,
          onChunk: (chunk, full) => { out.innerHTML = AI.renderMarkdown(full); }
        });
        aiBtn.disabled = false;
        aiBtn.textContent = '✨ Regenerate';
      } catch (err) {
        toast(err.message, 'error');
        aiBtn.disabled = false;
        aiBtn.textContent = '✨ Caption ideas';
      }
    }}, '✨ Caption ideas');
    checkRow.appendChild(aiBtn);

    wrap.appendChild(checkRow);

    // Caption text area
    const ta = el('textarea', { placeholder: 'Paste / draft your final caption here', rows: 3, style: 'margin-top: 10px;' });
    ta.value = stored.caption || '';
    autoResize(ta);
    ta.addEventListener('input', e => {
      const cur = getSectionValue(modId, section.id) || {};
      cur.caption = e.target.value;
      setSectionValue(modId, section.id, cur);
    });
    wrap.appendChild(ta);

    return wrap;
  }

  function renderAIActionBlock(section) {
    const wrap = el('div', { class: 'ai-assist' });
    if (section.body) wrap.appendChild(el('p', { class: 'text-sm text-mute', style: 'margin-bottom: 10px;' }, section.body));
    return wrap;
  }

  function renderAIAssist(modId, section) {
    const wrap = el('div', { class: 'ai-assist' });
    const head = el('div', { class: 'ai-assist-head' },
      el('div', { class: 'label' }, '✨ ', section.aiPrompt.label),
      el('div', { style: 'display:flex; gap: 6px;' })
    );

    const out = el('div', { class: 'ai-output hidden' });

    const runBtn = el('button', { class: 'btn primary sm', onclick: async () => {
      if (!AI.hasKey()) {
        toast('Add your Anthropic API key in Settings first.', 'error');
        go('settings');
        return;
      }
      runBtn.disabled = true;
      runBtn.textContent = 'Thinking…';
      out.classList.remove('hidden');
      out.innerHTML = '<div class="ai-loading">The Companion is thinking…</div>';

      try {
        const userMessage = section.aiPrompt.build(aiContext());
        await AI.complete({
          userMessage,
          onChunk: (chunk, full) => { out.innerHTML = AI.renderMarkdown(full); }
        });
        runBtn.textContent = '↻ Run again';
        runBtn.disabled = false;
      } catch (err) {
        out.innerHTML = `<div style="color: var(--error);">Error: ${err.message}</div>`;
        runBtn.textContent = 'Try again';
        runBtn.disabled = false;
      }
    }}, 'Run');

    head.children[1].appendChild(runBtn);
    wrap.appendChild(head);
    wrap.appendChild(out);

    return wrap;
  }

  // ============================================
  // CHAT
  // ============================================
  function renderChat(root) {
    root.appendChild(el('div', { class: 'flex items-center justify-between mb-4', style: 'flex-wrap: wrap; gap: 12px;' },
      el('div', {},
        el('div', { class: 'kicker' }, 'AI Coach'),
        el('h1', {}, 'Companion Chat'),
        el('p', { class: 'text-mute text-sm' }, 'Trained on the NQH curriculum. Your saved worksheets are its working memory.')
      ),
      el('button', { class: 'btn ghost', onclick: () => {
        if (confirm('Clear this conversation? Your worksheets stay safe — only the chat history is wiped.')) {
          state.chat = [];
          saveState();
          renderMain();
        }
      }}, 'Clear chat')
    ));

    const wrap = el('div', { class: 'chat-wrap' });
    const msgs = el('div', { class: 'chat-messages', id: 'chat-messages' });

    if (state.chat.length === 0) {
      msgs.appendChild(el('div', { class: 'card', style: 'background: var(--charcoal); text-align: center;' },
        el('h3', { class: 'text-gold', style: 'margin-bottom: 8px;' }, 'Where shall we begin?'),
        el('p', { class: 'text-mute text-sm', style: 'margin-bottom: 14px;' }, 'Some starting questions practitioners ask their Coach:'),
        el('div', { class: 'flex gap-2', style: 'flex-wrap: wrap; justify-content: center;' },
          ...[
            'I\'m stuck choosing between two niches — help me decide',
            'My VSL feels generic. What\'s missing?',
            'A prospect said "I\'ll think about it" — what do I say?',
            'My ads aren\'t getting clicks. Where do I look first?',
            'I feel guilty about charging premium. Talk me through it.'
          ].map(q => el('button', {
            class: 'btn sm',
            onclick: () => { $('#chat-input').value = q; sendChat(); }
          }, q))
        )
      ));
    } else {
      state.chat.forEach(m => msgs.appendChild(chatMsgElement(m)));
    }

    wrap.appendChild(msgs);

    const inputWrap = el('div', { class: 'chat-input-wrap' });
    const ta = el('textarea', { id: 'chat-input', placeholder: 'Ask the Companion…', rows: 2 });
    ta.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(); }
    });
    ta.addEventListener('input', () => {
      ta.style.height = 'auto';
      ta.style.height = Math.min(200, Math.max(24, ta.scrollHeight)) + 'px';
    });
    const send = el('button', { class: 'btn primary', onclick: sendChat }, 'Send');
    inputWrap.appendChild(ta);
    inputWrap.appendChild(send);
    wrap.appendChild(inputWrap);

    root.appendChild(wrap);
    setTimeout(() => { msgs.scrollTop = msgs.scrollHeight; }, 50);
  }

  function chatMsgElement(m) {
    const wrap = el('div', { class: `chat-msg ${m.role}` });
    wrap.appendChild(el('div', { class: 'avatar' }, m.role === 'user' ? (state.profile.name?.[0]?.toUpperCase() || 'P') : 'N'));
    const bubble = el('div', { class: 'bubble' });
    bubble.innerHTML = AI.renderMarkdown(m.content);
    wrap.appendChild(bubble);
    return wrap;
  }

  async function sendChat() {
    const ta = $('#chat-input');
    const text = ta.value.trim();
    if (!text) return;
    if (!AI.hasKey()) {
      toast('Add your Anthropic API key in Settings first.', 'error');
      go('settings');
      return;
    }

    state.chat.push({ role: 'user', content: text });
    ta.value = ''; ta.style.height = 'auto';
    saveState();

    // Refresh chat to show new user message
    const msgs = $('#chat-messages');
    // Remove empty-state if present
    if (state.chat.length === 1) msgs.innerHTML = '';
    msgs.appendChild(chatMsgElement(state.chat[state.chat.length - 1]));

    // Placeholder AI message
    const aiPlaceholder = el('div', { class: 'chat-msg ai' },
      el('div', { class: 'avatar' }, 'N'),
      el('div', { class: 'bubble' }, el('div', { class: 'ai-loading' }, 'Thinking…'))
    );
    msgs.appendChild(aiPlaceholder);
    msgs.scrollTop = msgs.scrollHeight;

    // Build conversation — augment with practitioner state context
    const contextSummary = buildContextSummary();
    const conversation = state.chat.slice(0, -1).map(m => ({ role: m.role, content: m.content }));

    const enrichedUserMsg = contextSummary
      ? `[Practitioner's saved worksheet context — use only if relevant]\n${contextSummary}\n\n[Their message]\n${text}`
      : text;

    try {
      let acc = '';
      await AI.complete({
        userMessage: enrichedUserMsg,
        conversation,
        maxTokens: 2000,
        onChunk: (chunk, full) => {
          acc = full;
          aiPlaceholder.querySelector('.bubble').innerHTML = AI.renderMarkdown(full);
          msgs.scrollTop = msgs.scrollHeight;
        }
      });
      state.chat.push({ role: 'assistant', content: acc });
      saveState();
    } catch (err) {
      aiPlaceholder.querySelector('.bubble').innerHTML = `<span style="color: var(--error);">Error: ${err.message}</span>`;
    }
  }

  function buildContextSummary() {
    const m = state.modules;
    const parts = [];
    if (m['2.1']?.identity_statement) parts.push(`Identity statement: ${m['2.1'].identity_statement}`);
    if (m['2.2']?.niche_statement) parts.push(`Niche: ${m['2.2'].niche_statement}`);
    if (m['2.3']?.positioning_statement) parts.push(`Positioning: ${m['2.3'].positioning_statement}`);
    if (m['2.4']?.t1_name) parts.push(`Tier 1: ${m['2.4'].t1_name} — ${m['2.4'].t1_promise || ''}`);
    if (m['2.4']?.t2_name) parts.push(`Tier 2: ${m['2.4'].t2_name} — ${m['2.4'].t2_promise || ''}`);
    if (m['2.4']?.t3_name) parts.push(`Tier 3: ${m['2.4'].t3_name} — ${m['2.4'].t3_promise || ''}`);
    return parts.join('\n');
  }

  // ============================================
  // SETTINGS
  // ============================================
  function renderSettings(root) {
    root.appendChild(el('div', { class: 'kicker' }, 'Settings'));
    root.appendChild(el('h1', { style: 'margin-bottom: 24px;' }, 'Settings & Data'));

    // Profile
    const profCard = el('div', { class: 'card' });
    profCard.appendChild(el('h3', { style: 'margin-bottom: 14px;' }, 'Profile'));
    profCard.appendChild(field('Your name', state.profile.name, v => { state.profile.name = v; queueSave(); }));
    profCard.appendChild(field('City', state.profile.city, v => { state.profile.city = v; queueSave(); }));
    root.appendChild(profCard);

    // API Key
    const keyCard = el('div', { class: 'card' });
    keyCard.appendChild(el('h3', { style: 'margin-bottom: 6px;' }, 'Anthropic API key'));
    keyCard.appendChild(el('p', { class: 'text-mute text-sm mb-4' }, 'Required to use AI Assist + AI Coach. Get one at ',
      el('a', { href: 'https://console.anthropic.com/settings/keys', target: '_blank' }, 'console.anthropic.com/settings/keys'),
      '. Stored only in your browser. Never sent to Miindtraa.'
    ));
    const cur = AI.getKey();
    const masked = cur ? (cur.slice(0, 8) + '...' + cur.slice(-4)) : '';
    const keyInput = el('input', { type: 'password', placeholder: 'sk-ant-...' });
    keyInput.value = cur;
    const status = el('div', { class: 'text-sm mt-2', style: cur ? 'color: var(--success);' : 'color: var(--text-mute);' },
      cur ? `✓ Key set (${masked})` : 'No key set'
    );
    const saveKeyBtn = el('button', { class: 'btn primary mt-2', onclick: () => {
      const v = keyInput.value.trim();
      if (v && !v.startsWith('sk-')) {
        toast('Key should start with "sk-ant-..."', 'error');
        return;
      }
      AI.setKey(v);
      toast(v ? 'API key saved.' : 'API key removed.', 'success');
      renderSettings($('#main'));
    }}, 'Save key');
    const clearKeyBtn = el('button', { class: 'btn ghost danger mt-2', style: 'margin-left: 8px;', onclick: () => {
      if (confirm('Remove your API key from this browser?')) {
        AI.setKey('');
        renderSettings($('#main'));
      }
    }}, 'Remove key');
    keyCard.appendChild(keyInput);
    keyCard.appendChild(status);
    keyCard.appendChild(el('div', { class: 'mt-2' }, saveKeyBtn, clearKeyBtn));
    root.appendChild(keyCard);

    // Data
    const dataCard = el('div', { class: 'card' });
    dataCard.appendChild(el('h3', { style: 'margin-bottom: 6px;' }, 'Your data'));
    dataCard.appendChild(el('p', { class: 'text-mute text-sm mb-4' }, 'Everything is stored in this browser only. Export regularly to keep your own backup. Import lets you move to a new device.'));

    const exportBtn = el('button', { class: 'btn', onclick: () => {
      const json = JSON.stringify(state, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nqh-companion-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
      toast('Backup exported.', 'success');
    }}, '⬇ Export backup');

    const importBtn = el('label', { class: 'btn', style: 'margin-left: 8px;' }, '⬆ Import backup');
    const importInput = el('input', { type: 'file', accept: 'application/json' });
    importInput.style.display = 'none';
    importInput.addEventListener('change', async e => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const text = await file.text();
        const parsed = JSON.parse(text);
        if (!confirm('Replace ALL current data with this backup? This cannot be undone.')) return;
        state = { ...DEFAULT_STATE, ...parsed, profile: { ...DEFAULT_STATE.profile, ...parsed.profile } };
        saveState();
        toast('Backup restored.', 'success');
        renderAll();
      } catch (err) {
        toast('Could not read this file. Is it a valid backup?', 'error');
      }
    });
    importBtn.appendChild(importInput);

    const resetBtn = el('button', { class: 'btn ghost danger', style: 'margin-left: 8px;', onclick: () => {
      const confirm1 = confirm('This will erase ALL your worksheets, progress, and chat history. Are you sure?');
      if (!confirm1) return;
      const confirm2 = prompt('Type RESET to confirm.');
      if (confirm2 !== 'RESET') return;
      const key = AI.getKey(); // preserve key
      localStorage.removeItem(STORAGE_KEY);
      state = structuredClone(DEFAULT_STATE);
      if (key) AI.setKey(key);
      toast('All data erased.', 'success');
      renderAll();
    }}, 'Reset everything');

    dataCard.appendChild(exportBtn);
    dataCard.appendChild(importBtn);
    dataCard.appendChild(resetBtn);
    root.appendChild(dataCard);

    // About
    const aboutCard = el('div', { class: 'card', style: 'background: transparent; border-style: dashed;' });
    aboutCard.appendChild(el('h3', {}, 'About'));
    aboutCard.appendChild(el('p', { class: 'text-mute text-sm mt-2' }, 'NQH™ Practitioner Companion — built for participants of the NQH Healer Accelerator by Miindtraa. Co-created by Dr. Amaey A. Parekh and Pankaj S. Nikam.'));
    aboutCard.appendChild(el('p', { class: 'text-mute text-sm mt-2' }, 'AI model: ', el('code', {}, AI.MODEL), '. Curriculum reflects the NQH Healer Accelerator v1.0 (April 2026).'));
    root.appendChild(aboutCard);
  }

  function field(label, value, onChange) {
    const f = el('div', { class: 'field' });
    f.appendChild(el('label', {}, label));
    const i = el('input', { type: 'text' });
    i.value = value || '';
    i.addEventListener('input', e => onChange(e.target.value));
    f.appendChild(i);
    return f;
  }

  // ============================================
  // RESOURCES
  // ============================================
  function renderResources(root) {
    root.appendChild(el('div', { class: 'kicker' }, 'Resources'));
    root.appendChild(el('h1', { style: 'margin-bottom: 24px;' }, 'Quick reference library'));

    const sections = [
      {
        title: 'The locked VSL funnel',
        items: [
          'Meta Ads → Landing Page → TidyCal Booking → Thank-You Page → WhatsApp Group',
          'Every step exists to solve a psychological problem. Skip any and the funnel breaks.',
          'Approved tools only: Systeme.io (free), TidyCal (free), Pabbly Connect (100 tasks/mo free), WhatsApp Business (free), Meta Ads Manager, Razorpay.'
        ]
      },
      {
        title: 'The Four NQH Pillars',
        items: [
          'Neuro Rewiring — nervous system regulation and pattern interrupt work',
          'Chakra Activation — energy alignment via Sedona Flow Loop, FFT, Quantum Mind Programming',
          'Emotion Mastery — completion through Energy Reconciliation (Ho\'oponopono variant)',
          'Quantum Manifestation — Reality Sculpting + identity-level installation'
        ]
      },
      {
        title: 'The Doctrine',
        items: [
          '"Diagnose generously. Demonstrate selectively. Teach only in Level 1."',
          'On sales calls: you are a diagnostician first, not a closer.',
          'On content: solve fully in public for one slice. Save the system for L1.',
          'On positioning: narrow is evolution, broad is drift.'
        ]
      },
      {
        title: 'Compliance — Meta Ads for healers',
        items: [
          'NO personal-attribute "you" statements ("you anxious...", "you traumatised...")',
          'NO medical claims (no "cure", "treat", "heal [disease]")',
          'NO before/after physical-transformation imagery',
          'NO income or outcome guarantees',
          'Health/wellness category declared in Business Settings',
          'Special Ad Category NOT required — do NOT toggle on'
        ]
      },
      {
        title: 'Weekly rhythm at the Accelerator',
        items: [
          'Monday — async momentum + CRM check-in (Rakhi)',
          'Thursday 8–10 PM — Technical clinic (Amaey)',
          'Friday 8–10 PM — L1 live support (Amaey or Pankaj alternating)',
          'Saturday 11 AM–1 PM — Front-end lab (Pankaj)',
          'Wednesday — Amaey\'s rest day. Non-negotiable. Schedule nothing.'
        ]
      },
      {
        title: 'Key prompts to keep handy',
        items: [
          '"Pressure-test my niche as a skeptical Indian market researcher."',
          '"Critique my VSL script the way Pankaj would on Saturday."',
          '"Generate 5 hook variants for [niche + pain]."',
          '"Roleplay this objection: [exact wording the prospect used]."',
          '"Stress-test my 90-day plan — where is the math optimistic?"'
        ]
      }
    ];

    sections.forEach(sec => {
      const card = el('div', { class: 'card' });
      card.appendChild(el('h3', { style: 'margin-bottom: 12px;' }, sec.title));
      const ul = el('ul', { style: 'list-style:none;' });
      sec.items.forEach(it => {
        ul.appendChild(el('li', { style: 'padding: 6px 0 6px 22px; position: relative; line-height: 1.6;' },
          el('span', { style: 'position: absolute; left: 0; color: var(--gold);' }, '◆'),
          it
        ));
      });
      card.appendChild(ul);
      root.appendChild(card);
    });
  }

  // ============================================
  // ONBOARDING
  // ============================================
  function renderOnboarding() {
    let overlay = $('#onboarding');
    if (overlay) overlay.remove();
    overlay = el('div', { id: 'onboarding', class: 'modal-overlay' });

    const modal = el('div', { class: 'modal' });
    modal.appendChild(el('div', { class: 'kicker' }, 'Welcome to'));
    modal.appendChild(el('h2', {}, 'NQH™ Practitioner Companion'));
    modal.appendChild(el('p', { class: 'sub' },
      'A personal, AI-powered dashboard that walks with you through Phases 2, 3, and 4 of the Healer Accelerator. Built by Miindtraa for your private practice.'
    ));

    modal.appendChild(el('div', { class: 'field' },
      el('label', {}, 'What should we call you?'),
      (() => {
        const i = el('input', { type: 'text', placeholder: 'e.g., Ananya' });
        i.id = 'onb-name';
        return i;
      })()
    ));

    modal.appendChild(el('div', { class: 'field' },
      el('label', {}, 'Your city (optional)'),
      (() => {
        const i = el('input', { type: 'text', placeholder: 'e.g., Mumbai' });
        i.id = 'onb-city';
        return i;
      })()
    ));

    modal.appendChild(el('div', { class: 'field' },
      el('label', {}, 'Anthropic API key (optional now — you can add later)'),
      el('div', { class: 'text-mute text-sm mb-2' },
        'Required only to use AI Assist + AI Coach. Get one free at ',
        el('a', { href: 'https://console.anthropic.com/settings/keys', target: '_blank' }, 'console.anthropic.com'),
        '. Stored only in your browser. Never sent anywhere except Anthropic for AI replies.'
      ),
      (() => {
        const i = el('input', { type: 'password', placeholder: 'sk-ant-...' });
        i.id = 'onb-key';
        return i;
      })()
    ));

    modal.appendChild(el('div', { style: 'background: var(--charcoal); padding: 14px; border-radius: 6px; font-size: 13px; color: var(--text-mute); margin-bottom: 20px; line-height: 1.6;' },
      el('div', { style: 'color: var(--gold); font-weight: 600; margin-bottom: 6px;' }, '🔒 Your privacy'),
      'Everything you write — niche work, money beliefs, journaling — lives only in this browser\'s local storage. The Companion never sends your worksheets to any server. AI responses go from your browser directly to Anthropic. Export a backup regularly to keep your own copy.'
    ));

    const startBtn = el('button', { class: 'btn primary lg', style: 'width: 100%;', onclick: () => {
      const name = $('#onb-name').value.trim();
      const city = $('#onb-city').value.trim();
      const key = $('#onb-key').value.trim();
      if (!name) { toast('Please share your name to begin.', 'error'); return; }
      state.profile.name = name;
      state.profile.city = city;
      state.profile.startedAt = new Date().toISOString();
      state.profile.onboarded = true;
      if (key) AI.setKey(key);
      saveState();
      renderAll();
      toast(`Welcome, ${name}. Your journey begins now. 🌟`, 'success');
    }}, 'Begin →');
    modal.appendChild(startBtn);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }

  // ============================================
  // BOOT
  // ============================================
  function init() {
    // Wire topbar
    $('#menu-toggle')?.addEventListener('click', () => {
      $('#sidebar')?.classList.toggle('open');
    });

    window.addEventListener('hashchange', renderAll);

    // Auto-save before unload (safety)
    window.addEventListener('beforeunload', () => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
    });

    renderAll();
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
