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
  const pause = document.querySelector('#logos-toggle');
  const marquee = document.querySelector('.marquee');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (pause) {
    const syncMotion = () => { pause.hidden = reducedMotion.matches; };
    syncMotion(); reducedMotion.addEventListener('change', syncMotion);
    pause.addEventListener('click', () => {
      const paused = marquee.classList.toggle('paused');
      pause.setAttribute('aria-pressed', String(paused));
      pause.textContent = paused ? 'Resume logos' : 'Pause logos';
    });
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
