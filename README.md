# TSYL Marketing staging website

Static HTML/CSS/JavaScript website. Serve the repository root with a static server (for example, `python -m http.server 8000`). No build step is required.

## Pages
- `index.html`: overview, product families and client logos.
- `about.html`: company overview, vision, mission, values and commitment.
- `products.html`: category tabs, a six-product paginated All Products view and expandable WDS 1700 details.
- `services.html`: Supply & Support.
- `contact.html`: both offices and an email-draft enquiry form.

## Sources
Content and product photography follow **TSYL-M Company Profile_Revised02_04Aug2026.pdf**. WDS 1700 application details follow **[Review02] TSYL-M_WDS1700-Sealant_June26.pdf**. Original PDFs are available in `assets/documents/`.

Client logos are locally hosted copies from the **Esteemed Clients** section of https://tsylvision.com/, downloaded on 21 September 2026. The client strip identifies them as TSYL group clients. The requested heading is “Trusted by 300+ Businesses”.

The WDS brochure has a malformed “Viscosity Cp” row that contains flash-point wording rather than a viscosity value. No numeric viscosity or flash-point claim has been invented. Its solvent-flammability / dry fire-retardant wording is preserved separately. Contact details follow the newer company profile.

## Enquiries
The contact form opens a prefilled draft in the visitor's email application. The visitor must send that email. No message is sent by this static website, and it never shows a false delivery confirmation. Direct email, telephone and WhatsApp links are also provided.

## Deployment
Deploy the repository root as a static site on Vercel. Push the approved changes to the connected GitHub branch. There are no runtime dependencies, API keys or environment variables.

Legacy project URLs redirect to the product catalogue via `vercel.json`. Company profile links open in a new tab.
