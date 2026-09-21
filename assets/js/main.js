// TSYL Marketing — accessible navigation, client logos and email enquiry.
(() => {
  'use strict';
  const nav = document.querySelector('.nav');
  const updateNav = () => nav?.classList.toggle('scrolled', window.scrollY > 8);
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.nav-drawer');
  const setMenu = (open) => {
    drawer.classList.toggle('open', open);
    drawer.inert = !open;
    drawer.setAttribute('aria-hidden', String(!open));
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  toggle?.addEventListener('click', () => setMenu(!drawer.classList.contains('open')));
  drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (!drawer?.classList.contains('open')) return;
    if (event.key === 'Escape') { setMenu(false); toggle.focus(); }
    if (event.key === 'Tab') {
      const items = [toggle, ...drawer.querySelectorAll('a')];
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  window.matchMedia('(min-width: 1021px)').addEventListener('change', e => { if (e.matches) setMenu(false); });
  // Category tabs keep product browsing compact; links retain shareable hashes.
  const tablist = document.querySelector('[role="tablist"]');
  if (tablist) {
    const tabs = [...tablist.querySelectorAll('[role="tab"]')];
    const cards = [...document.querySelectorAll('.catalogue-grid .product-card')];
    const results = document.querySelector('#product-results');
    const specifications = document.querySelector('#wds1700');
    const pagination = document.querySelector('.catalogue-pagination');
    const previous = document.querySelector('#previous-products');
    const next = document.querySelector('#next-products');
    const descriptions = {
      all: 'Explore our complete range of insulation, accessories and building supplies.',
      thermal: 'Materials for internal and external HVAC insulation.',
      accessories: 'Flexible ducting, connectors, gaskets and foil.',
      sealants: 'Duct sealing, bonding and firestop products.',
      building: 'Fireproof, safety and general construction supplies.'
    };
    let category = 'all';
    let page = 0;
    const pageSize = 6;
    function render() {
      const matching = cards.filter(card => category === 'all' || card.dataset.category === category);
      const pageCount = Math.ceil(matching.length / pageSize);
      page = Math.max(0, Math.min(page, pageCount - 1));
      const visible = matching.slice(page * pageSize, (page + 1) * pageSize);
      cards.forEach(card => { card.hidden = !visible.includes(card); });
      const selected = tabs.find(tab => tab.dataset.category === category);
      tabs.forEach(tab => {
        const active = tab === selected;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
      });
      results.setAttribute('aria-labelledby', selected.id);
      document.querySelector('#category-heading').textContent = selected.textContent;
      document.querySelector('#category-description').textContent = descriptions[category];
      document.querySelector('#product-count').textContent = `Showing ${page * pageSize + 1}–${page * pageSize + visible.length} of ${matching.length} products`;
      pagination.hidden = pageCount <= 1;
      previous.disabled = page === 0;
      next.disabled = page === pageCount - 1;
      document.querySelector('#product-page').textContent = `Page ${page + 1} of ${pageCount}`;
      specifications.hidden = category !== 'all' && category !== 'sealants';
      if (specifications.hidden) specifications.open = false;
    }
    function select(value, updateUrl = true) {
      category = Object.hasOwn(descriptions, value) ? value : 'all';
      page = 0;
      render();
      if (updateUrl) history.pushState(null, '', `#${category}`);
    }
    function fromHash() {
      const hash = location.hash.slice(1);
      if (hash === 'wds1700') {
        select('sealants', false);
        specifications.open = true;
        requestAnimationFrame(() => specifications.scrollIntoView({ block: 'start' }));
      } else select(hash, false);
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => select(tab.dataset.category));
      tab.addEventListener('keydown', event => {
        let target;
        if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') target = (index + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') target = 0;
        if (event.key === 'End') target = tabs.length - 1;
        if (target !== undefined) {
          event.preventDefault();
          tabs[target].focus();
          select(tabs[target].dataset.category);
        }
      });
    });
    [previous, next].forEach((button, index) => button.addEventListener('click', () => {
      page += index === 0 ? -1 : 1;
      render();
      results.focus({ preventScroll: true });
      results.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }));
    document.querySelectorAll('a[href="products.html#wds1700"]').forEach(link => link.addEventListener('click', event => {
      event.preventDefault();
      history.pushState(null, '', '#wds1700');
      fromHash();
    }));
    window.addEventListener('hashchange', fromHash);
    fromHash();
  }
  const form = document.querySelector('#contact-form');
  if (form) {
    const product = new URLSearchParams(location.search).get('product');
    const productNames = { wds1700: 'WDS 1700 Air Duct Sealant', vision555: 'Contact Adhesive (Vision 555)', vfc919: 'Flexible Connector VFC 919', nbr: 'Nitrile Rubber (NBR)', gasket: 'Vision Fire Retardant Gasket (VG919)', foil: 'Fire Retardant D/S Aluminium Foil', 'open-cell': 'Open Cell Insulation', fireseal: 'Fireseal', 'pe-foam': 'PE Foam', 'fiberglass-rockwool': 'Fiberglass and Rockwool Insulation', ducts: 'Flexible Duct and Semi-Rigid Ducts', metacaulk: 'Metacaulk 1000 & Metacaulk 1200', 'kitchen-sealant': 'Kitchen Sealant', fireproof: 'Fireproof and Safety Materials', construction: 'General Construction and Industrial Supplies' };
    if (productNames[product]) form.elements.message.value = `I would like to enquire about ${productNames[product]}.\n\nQuantity:\nDelivery location:\nRequired date:`;
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const recipient = data.get('office') === 'tsylmarketingkch@hotmail.com' ? 'tsylmarketingkch@hotmail.com' : 'tsylmarketing@hotmail.com';
      const subject = `Product enquiry — ${data.get('company')}`;
      const body = `Company: ${data.get('company')}\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\n\n${data.get('message')}`;
      location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      document.querySelector('#form-status').textContent = 'Your email draft is ready to open. Send it from your email app to complete the enquiry. If no app opens, email our team directly; your entries are still here.';
    });
  }
})();
