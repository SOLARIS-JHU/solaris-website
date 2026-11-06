/* Animated topic overview and accessible enlarged SVG playback. */
(() => {
  'use strict';
  const gallery = document.querySelector('[data-papers-gallery]');
  if (!gallery || gallery.dataset.ready) return;
  gallery.dataset.ready = 'true';
  const find = selector => gallery.querySelector(selector);
  const cards = [...gallery.querySelectorAll('[data-spg-card]')];
  const dialog = find('#spg-viewer');
  const stage = find('[data-spg-stage]');
  const status = find('[data-spg-load-status]');
  const play = find('[data-spg-play]');
  const restart = find('[data-spg-restart]');
  const close = find('[data-spg-close]');
  const previous = find('[data-spg-previous]');
  const next = find('[data-spg-next]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const overviewPlay = find('[data-spg-overview-play]');
  let overviewPaused = reducedMotion.matches;
  const cache = new Map();
  let current = null, opener = null, controller = null, request = 0;
  let svg = null, paused = true, explicitMotion = false;

  function initializeTopics() {
    const sections = gallery.querySelectorAll(".papers-section-to-track");
    const navLinks = gallery.querySelectorAll(".papers-tracker");
    const setActive = (targetId) => {
      navLinks.forEach((link) => link.classList.toggle("active", link.dataset.target === targetId));
    };

    if (sections.length) {
      setActive(sections[0].id);
      const observer = new IntersectionObserver((entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length) setActive(visible[0].target.id);
      }, { rootMargin: "-15% 0px -65% 0px", threshold: [0.05, 0.2, 0.5] });
      sections.forEach((section) => observer.observe(section));
    }

  }

  function refreshOverview() {
    const stopped = overviewPaused || reducedMotion.matches || document.hidden || dialog?.open;
    for (const card of cards) {
      const img = card.querySelector('.spg-art img');
      if (!img) continue;
      const source = card.querySelector('.spg-art source');
      const url = localURL(stopped ? (card.dataset.static || card.dataset.thumbnail) : (card.dataset.animated || card.dataset.thumbnail));
      if (source) source.media = stopped ? 'all' : '(prefers-reduced-motion: reduce)';
      if (url && img.src !== url.href) img.src = url.href;
    }
    if (overviewPlay) {
      overviewPlay.disabled = reducedMotion.matches;
      overviewPlay.textContent = reducedMotion.matches ? 'Animations paused' : overviewPaused ? 'Play animations' : 'Pause animations';
      overviewPlay.title = reducedMotion.matches ? 'Reduced motion is enabled' : '';
    }
  }
  overviewPlay?.addEventListener('click', () => { overviewPaused = !overviewPaused; refreshOverview(); });
  document.addEventListener('visibilitychange', refreshOverview);
  initializeTopics();
  refreshOverview();
  // With no dialog support, links retain their ordinary standalone-SVG behavior.
  if (!dialog || typeof dialog.showModal !== 'function') return;

  function localURL(value, extension) {
    if (!value) return null;
    try {
      const url = new URL(value, document.baseURI);
      if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return null;
      if (extension && !url.pathname.toLowerCase().endsWith(extension)) return null;
      return url;
    } catch (_) { return null; }
  }
  function resourceLink(selector, value) {
    const link = find(selector), url = localURL(value, '.svg');
    link.hidden = !url;
    if (url) link.href = url.href; else link.removeAttribute('href');
  }
  function placeholder(card) {
    stage.replaceChildren();
    const url = localURL(card.dataset.thumbnail) || localURL(card.dataset.static, '.svg');
    if (!url) return;
    const img = document.createElement('img');
    img.src = url.href;
    img.alt = card.querySelector('.spg-art img')?.alt || 'Graphical abstract';
    img.width = 1200; img.height = 620;
    stage.append(img);
  }
  function safeSVG(source) {
    const parsed = new DOMParser().parseFromString(source, 'image/svg+xml');
    if (parsed.querySelector('parsererror') || parsed.documentElement.localName !== 'svg') throw new Error('Invalid SVG');
    const allowed = new Set(['svg', 'g', 'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'defs', 'clipPath', 'mask', 'linearGradient', 'radialGradient', 'stop', 'pattern', 'use', 'symbol', 'title', 'desc', 'style']);
    const root = parsed.documentElement;
    for (const element of [root, ...root.querySelectorAll('*')]) {
      if (!allowed.has(element.localName)) { element.remove(); continue; }
      for (const attribute of [...element.attributes]) {
        const name = attribute.localName.toLowerCase(), value = attribute.value.trim();
        if (name.startsWith('on') || name === 'src' || name === 'base' || (name === 'href' && !value.startsWith('#'))) element.removeAttributeNode(attribute);
        else if (/url\s*\(/i.test(value) && !/^url\(\s*['"]?#[\w:.-]+['"]?\s*\)$/i.test(value)) element.removeAttributeNode(attribute);
      }
      if (element.localName === 'style' && /@import|@font-face|expression\s*\(|url\s*\(/i.test(element.textContent)) throw new Error('Unexpected external SVG styling');
    }
    return document.importNode(root, true);
  }
  async function loadSVG(url, signal) {
    if (cache.has(url.href)) return cache.get(url.href);
    const response = await fetch(url.href, { signal, credentials: 'same-origin', mode: 'same-origin' });
    if (!response.ok || new URL(response.url).origin !== location.origin) throw new Error('SVG could not be loaded');
    const text = await response.text();
    if (text.length > 6_000_000) throw new Error('Unexpected SVG size');
    return text;
  }
  function allowMotion() {
    // Explicit Play is an opt-in when the operating system requests reduced motion.
    // The original SVG's reduced-motion fallback remains intact until that click.
    if (!svg || explicitMotion) return;
    for (const style of svg.querySelectorAll('style')) {
      style.textContent = style.textContent.replace(/@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)/gi, '@media not all');
    }
    explicitMotion = true;
  }
  function setPaused(value) {
    paused = value;
    if (svg) svg.classList.toggle('paused', paused);
    play.textContent = paused ? 'Play' : 'Pause';
    play.setAttribute('aria-label', paused ? 'Play animation' : 'Pause animation');
    restart.disabled = !svg || (reducedMotion.matches && !explicitMotion);
  }
  async function show(card, trigger) {
    if (!card) return;
    if (trigger) opener = trigger;
    current = card; svg = null; explicitMotion = false;
    const ticket = ++request;
    controller?.abort(); controller = new AbortController();
    const activeController = controller;
    const signal = activeController.signal;
    find('#spg-modal-title').textContent = card.querySelector('.spg-paper-title').textContent;
    find('#spg-modal-authors').textContent = card.querySelector('.spg-authors').textContent;
    find('[data-spg-modal-links]').replaceChildren(...[...card.querySelector('.spg-resource-links').children].map(link => link.cloneNode(true)));
    find('[data-spg-science]').replaceChildren(card.querySelector('[data-spg-details]').content.cloneNode(true));
    resourceLink('[data-spg-animated]', card.dataset.animated);
    resourceLink('[data-spg-static]', card.dataset.static);
    placeholder(card);
    const visible = cards.filter(item => !item.closest('[hidden]'));
    previous.disabled = next.disabled = visible.length < 2;
    play.disabled = restart.disabled = true;
    setPaused(reducedMotion.matches);
    if (!dialog.open) { dialog.showModal(); document.body.classList.add('spg-modal-open'); close.focus({ preventScroll: true }); }
    refreshOverview();
    dialog.scrollTop = 0;
    const url = localURL(card.dataset.animated, '.svg');
    if (!url) { status.textContent = 'A static graphical abstract is available for this paper.'; return; }
    status.textContent = 'Loading animation…';
    const timeout = setTimeout(() => activeController.abort(), 20000);
    try {
      const source = await loadSVG(url, signal);
      if (ticket !== request || !dialog.open) return;
      const figure = safeSVG(source);
      cache.set(url.href, source);
      while (cache.size > 3) cache.delete(cache.keys().next().value);
      // Shadow DOM contains the SVG's animation styles and IDs within this figure.
      const host = document.createElement('div'); host.style.cssText = 'width:100%;height:100%';
      const shadow = host.attachShadow({ mode: 'open' });
      const style = document.createElement('style');
      style.textContent = ':host{display:block;width:100%;height:100%}:host > svg{display:block;width:100%;height:100%}';
      shadow.append(style, figure); stage.replaceChildren(host); svg = figure;
      play.disabled = false; setPaused(reducedMotion.matches);
      status.textContent = reducedMotion.matches ? 'Animation is paused to match your reduced-motion preference.' : '';
    } catch (_) {
      if (ticket === request && dialog.open) status.textContent = 'The animation could not load. The preview and SVG links are still available.';
    } finally { clearTimeout(timeout); }
  }
  function navigate(delta) {
    const visible = cards.filter(card => !card.closest('[hidden]'));
    if (visible.length < 2) return;
    const index = visible.indexOf(current);
    show(visible[(index + delta + visible.length) % visible.length]);
  }
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
    request++; controller?.abort(); svg = null; stage.replaceChildren();
    document.body.classList.remove('spg-modal-open');
    if (opener?.isConnected && !opener.closest('[hidden]')) opener.focus({ preventScroll: true });
    else cards.find(card => !card.closest('[hidden]'))?.querySelector('[data-spg-open]')?.focus({ preventScroll: true });
    refreshOverview();
  });
  play.addEventListener('click', () => {
    if (!svg) return;
    if (paused) { allowMotion(); status.textContent = ''; }
    setPaused(!paused);
  });
  restart.addEventListener('click', () => {
    if (!svg) return;
    svg.getAnimations({ subtree: true }).forEach(animation => { animation.currentTime = 0; });
  });
  previous.addEventListener('click', () => navigate(-1));
  next.addEventListener('click', () => navigate(1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
      // Keep keyboard focus inside the enlarged view, including when its source
      // details are expanded or playback buttons become enabled asynchronously.
      const candidates = [...dialog.querySelectorAll('a[href], button, input, select, textarea, summary, [tabindex]')];
      const focusable = candidates.filter(element => {
        if (element.tabIndex < 0 || element.matches(':disabled') || !element.getClientRects().length || getComputedStyle(element).visibility === 'hidden') return false;
        // Closed details retain layout boxes in some engines, but only their
        // own summary participates in keyboard navigation.
        for (let parent = element.parentElement; parent && parent !== dialog; parent = parent.parentElement) {
          if (parent.tagName === 'DETAILS' && !parent.open && element !== parent.querySelector(':scope > summary')) return false;
        }
        return true;
      });
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (!first) { event.preventDefault(); close.focus(); return; }
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !dialog.contains(active))) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (active === last || !dialog.contains(active))) {
        event.preventDefault(); first.focus();
      }
      return;
    }
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.target.matches('input, textarea, select, [contenteditable]')) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); navigate(event.key === 'ArrowLeft' ? -1 : 1); }
  });
  reducedMotion.addEventListener('change', event => {
    if (event.matches && svg) { setPaused(true); status.textContent = 'Animation paused to match your reduced-motion preference.'; }
    overviewPaused = event.matches;
    refreshOverview();
  });
})();
