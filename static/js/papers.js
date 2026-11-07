/* Approved v13 figures inside the existing SOLARIS topic/card layout. */
(() => {
  'use strict';
  const gallery = document.querySelector('[data-papers-gallery]');
  if (!gallery || gallery.dataset.ready) return;
  gallery.dataset.ready = 'true';
  const find = s => gallery.querySelector(s);
  const cards = [...gallery.querySelectorAll('[data-spg-card]')];
  const dialog = find('#spg-viewer'), stage = find('[data-spg-stage]');
  const status = find('[data-spg-load-status]'), play = find('[data-spg-play]');
  const restart = find('[data-spg-restart]'), close = find('[data-spg-close]');
  const previous = find('[data-spg-previous]'), next = find('[data-spg-next]');
  const overviewPlay = find('[data-spg-overview-play]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const engine = window.SolarisAbstracts;
  const states = new Map(cards.map(card => [card, {svg: null, time: 2, failed: false}]));
  const visible = new Set();
  let ready = false, overviewPaused = reducedMotion.matches, paused = reducedMotion.matches;
  let current = null, opener = null, ticket = 0, last = performance.now(), lastPaint = 0;

  const sections = [...gallery.querySelectorAll('.papers-section-to-track')];
  const navLinks = [...gallery.querySelectorAll('.papers-tracker')];
  function setActive(id) { navLinks.forEach(link => link.classList.toggle('active', link.dataset.target === id)); }
  if (sections.length) {
    setActive(sections[0].id);
    const topics = new IntersectionObserver(entries => {
      const active = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (active.length) setActive(active[0].target.id);
    }, {rootMargin: '-15% 0px -65% 0px', threshold: [.05, .2, .5]});
    sections.forEach(section => topics.observe(section));
  }

  function syncControls() {
    overviewPlay.disabled = !ready || reducedMotion.matches;
    overviewPlay.textContent = reducedMotion.matches ? 'Animations paused' : overviewPaused ? 'Play animations' : 'Pause animations';
    overviewPlay.title = reducedMotion.matches ? 'Reduced motion is enabled' : '';
    play.textContent = paused ? 'Play' : 'Pause';
    play.setAttribute('aria-label', paused ? 'Play animation' : 'Pause animation');
    const usable = current && states.get(current).svg && !states.get(current).failed;
    play.disabled = restart.disabled = !usable;
  }
  function render(card) {
    const state = states.get(card);
    if (!ready || state.failed) return null;
    try {
      if (!state.svg) {
        state.svg = engine.create(card.dataset.scene);
        state.svg.setAttribute('role', 'img');
        state.svg.setAttribute('aria-label', 'Illustrative graphical abstract for ' + card.querySelector('.spg-paper-title').textContent.trim());
      }
      engine.render(state.svg, card.dataset.scene, state.time);
      return state.svg;
    } catch (error) {
      state.failed = true;
      state.svg?.remove();
      console.error('Graphical abstract unavailable:', card.dataset.paperId, error);
      return null;
    }
  }
  function mountOverview(card) {
    if (card === current || reducedMotion.matches) return;
    const svg = render(card);
    if (svg) card.querySelector('.spg-art').append(svg);
  }
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) { visible.add(entry.target); mountOverview(entry.target); }
      else visible.delete(entry.target);
    }
  }, {rootMargin: '160px 0px'});
  cards.forEach(card => observer.observe(card));
  overviewPlay.addEventListener('click', () => { overviewPaused = !overviewPaused; syncControls(); });
  syncControls();
  const engineReady = engine ? engine.ready.then(() => {
    ready = true;
    for (const card of visible) mountOverview(card);
    syncControls();
  }).catch(error => { console.error('Graphical abstract engine unavailable:', error); }) : Promise.resolve();

  function frame(now) {
    const dt = Math.min((now - last) / 1000, .1); last = now;
    if (ready && !document.hidden) {
      const active = current ? (!paused ? [current] : []) : (!overviewPaused && !reducedMotion.matches ? [...visible] : []);
      for (const card of active) states.get(card).time += dt;
      if (now - lastPaint >= 33) {
        for (const card of active) render(card);
        lastPaint = now;
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  if (!dialog || typeof dialog.showModal !== 'function') return;

  function restoreCurrent() {
    if (!current) return;
    const card = current, svg = states.get(card).svg;
    current = null;
    if (svg) {
      if (reducedMotion.matches) svg.remove();
      else card.querySelector('.spg-art').append(svg);
    }
  }
  function placeholder(card) {
    const img = card.querySelector('.spg-art img').cloneNode();
    img.loading = 'eager'; img.removeAttribute('data-spg-overview');
    stage.replaceChildren(img);
  }
  async function show(card, trigger) {
    if (!card) return;
    if (trigger) opener = trigger;
    restoreCurrent(); current = card;
    const request = ++ticket;
    find('#spg-modal-title').textContent = card.querySelector('.spg-paper-title').textContent;
    find('#spg-modal-authors').textContent = card.querySelector('.spg-authors').textContent;
    find('[data-spg-modal-links]').replaceChildren(...[...card.querySelector('.spg-resource-links').children].map(link => link.cloneNode(true)));
    find('[data-spg-science]').replaceChildren(card.querySelector('[data-spg-details]').content.cloneNode(true));
    const download = find('[data-spg-static]');
    download.href = card.dataset.static; download.hidden = !card.dataset.static;
    placeholder(card);
    paused = reducedMotion.matches;
    previous.disabled = next.disabled = cards.length < 2;
    syncControls();
    status.textContent = 'Loading animation…';
    if (!dialog.open) { dialog.showModal(); document.body.classList.add('spg-modal-open'); close.focus({preventScroll: true}); }
    dialog.scrollTop = 0;
    await engineReady;
    if (request !== ticket || !dialog.open) return;
    const svg = render(card);
    if (svg) {
      stage.replaceChildren(svg);
      status.textContent = reducedMotion.matches ? 'Animation is paused to match your reduced-motion preference.' : '';
    } else status.textContent = 'The animation could not load. The preview and static SVG remain available.';
    syncControls();
  }
  function navigate(delta) { show(cards[(cards.indexOf(current) + delta + cards.length) % cards.length]); }
  gallery.addEventListener('click', event => {
    const trigger = event.target.closest('[data-spg-open]');
    if (!trigger || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); show(trigger.closest('[data-spg-card]'), trigger);
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    ticket++; restoreCurrent(); stage.replaceChildren();
    document.body.classList.remove('spg-modal-open');
    opener?.focus({preventScroll: true});
    for (const card of visible) mountOverview(card);
    syncControls();
  });
  play.addEventListener('click', () => { paused = !paused; status.textContent = ''; syncControls(); });
  restart.addEventListener('click', () => { if (current) { states.get(current).time = 0; render(current); } });
  previous.addEventListener('click', () => navigate(-1));
  next.addEventListener('click', () => navigate(1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
      const focusable = [...dialog.querySelectorAll('a[href],button,[tabindex]')].filter(e => e.tabIndex >= 0 && !e.matches(':disabled') && e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden');
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) { event.preventDefault(); first?.focus(); }
      return;
    }
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.target.matches('input,textarea,select,[contenteditable]')) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); navigate(event.key === 'ArrowLeft' ? -1 : 1); }
  });
  reducedMotion.addEventListener('change', event => {
    overviewPaused = event.matches;
    if (event.matches) {
      paused = true;
      for (const [card, state] of states) if (card !== current) state.svg?.remove();
      if (current) status.textContent = 'Animation paused to match your reduced-motion preference.';
    } else for (const card of visible) mountOverview(card);
    syncControls();
  });
})();
