# TSYL Marketing — Corporate Modern Rebuild

Static multi-page website for TSYL Marketing Sdn. Bhd. — Malaysia's insulation, fire safety, and building materials supplier.

**Brand:** TSYL Marketing Sdn. Bhd. (NOT TSYL Vision)
**Tagline:** Built to Supply, Committed to Safety
**Direction:** Corporate modern · supply-focused · sans-serif only · white surfaces · dark green (#1F6846)

## File structure

```
tsyl/
├── index.html          Home (supply hero, stats, products, services preview, about, trust, industries, projects strip, CTA)
├── about.html          About (overview, vision/mission, 6 values, timeline, certifications)
├── products.html       Full catalog (4 categories × 6 products each)
├── services.html       Services (6 services, 6-step process, why TSYL)  ← replaces Projects
├── industries.html     8 sectors + "Selected Supplies" project credibility list
├── contact.html        Form + 2 offices + operating hours + map links
└── assets/
    ├── css/styles.css  Corporate modern design system, sans-only, brand-green tokens
    ├── js/main.js      Nav, mobile drawer, reveal, stat counters, category jump, form preview
    └── img/logo.svg    Official TSYL Marketing logo (provided by client)
```

## Design system

- **Brand green** `#1F6846` (sampled from logo wordmark)
- **Sage accent** `#86AA6B` (logo leaf element)
- **Dark sections** `#0E3526` (hero, CTA banners, page hero)
- **Orange accent** `#E94E1B` (CTAs only — safety orange, used sparingly)
- **Typography:** Manrope (300–800) + JetBrains Mono (eyebrows, stats)
- **Radii:** 2–6px (sharp corporate, no pill buttons)
- **Surfaces:** White primary, very light gray `#FAFAFA` secondary

## Local preview

Open any `.html` directly in a browser, or run:
```bash
python -m http.server 8000
```
then visit `http://localhost:8000`.

## Deploy to Vercel

1. Push to Git (see deployment steps in latest chat message).
2. Vercel auto-deploys static files.
3. Hard-refresh (Ctrl+Shift+R) after deploy.

## Form integration (TODO)

The contact form is currently UI-only with a JS preview. To make it functional:

- **Formspree** (no backend): replace `<form id="contact-form">` action with your Formspree endpoint.
- **Vercel Forms / API route**: add a serverless function under `/api/contact.js`.
- **Email service**: integrate Resend, SendGrid, or similar.

## Notes

- All Unsplash photos are stable IDs; replace with TSYL's own photography when available.
- Product images from `tsylvision.com/wp-content/uploads/` are used as placeholders for fire-rated system shots; swap to TSYL Marketing's own product images when available.
- Static maps in `contact.html` use the Google Maps Static API; if the API key isn't provided, the map background will be gray (still functional — the cards still link to maps).

---
© 2025 TSYL Marketing Sdn. Bhd.
