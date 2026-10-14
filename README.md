# ABDIRIZAK MOKTAR — FULL-STACK DEVELOPER

Personal brand portfolio. *Building meaningful digital experiences through code, creativity, and technology.*

Next.js App Router · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui pattern · GSAP + ScrollTrigger · Framer Motion · Lenis · Three.js · React Three Fiber · Drei · Lucide React

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in your real details
npm run dev                  # http://localhost:3000
```

```bash
npm run typecheck   # strict TypeScript
npm run lint        # ESLint
npm run build       # production build (all routes are statically generated)
npm run start       # serve the production build
npm run content:check   # lists everything still to fill in before you publish
```

Requires Node 20.9 or newer.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home: name reveal, 3D full-stack scene, scroll-scrubbed statement, featured work |
| `/about` | About Me: sticky monogram and facts beside the story |
| `/expertise` | Expertise & Tech Stack: 3D stack that lights up the layer you scroll to |
| `/projects` | Selected Projects: asymmetric editorial list |
| `/projects/[slug]` | Case study for each project |
| `/experience` | Experience & Education: self-drawing timeline |
| `/process` | Development Process: pinned, horizontally scrolling stages |
| `/certifications` | Certifications & Achievements |
| `/contact` | Contact |

## Add your real information

Nothing about your employment, projects, certifications or contact details has been invented. Anything you have not provided yet is either empty or a clearly marked **Placeholder** (dashed badge on the page).

Edit these files. Everything is typed, so the compiler tells you if a field is wrong.

| What | Where |
| --- | --- |
| Name, title, statement, CV path | `src/content/site.ts` |
| Biography and principles, optional portrait | `src/content/about.ts` |
| Tech stack | `src/content/expertise.ts` |
| Projects and case studies | `src/content/projects.ts` |
| Work experience and education | `src/content/experience.ts` |
| Certifications and achievements | `src/content/certifications.ts` |
| Process stages | `src/content/process.ts` |

For each placeholder entry: replace the values and delete the `placeholder: true` line. Set `showPlaceholders: false` in `site.ts` to hide every placeholder at once. Add `links.live` or `links.repository` to a project **only when the URL really exists**. Without them the case study says "No public links for this project yet."

Run `npm run content:check` at any time to see what is left.

### Contact details and social links

Set these in `.env.local` (see `.env.example`):

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CONTACT_EMAIL=you@example.com
NEXT_PUBLIC_GITHUB_URL=https://github.com/your-username
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/your-profile
```

Until a value is set, the matching control is shown as "not configured" (with a tooltip) instead of linking to a made-up profile. The contact form is switched off until an email exists. When an email is set, the form opens the visitor's email app with the message pre-filled (there is no backend and nothing is stored).

### CV download

Put your CV at:

```
public/cv/abdirizak-moktar-cv.pdf
```

The **Download My CV** buttons then download it as `abdirizak-moktar-cv.pdf`. Before downloading, the button checks the file exists; if it does not, visitors see a short message instead of a 404. No placeholder CV is shipped.

> Next.js serves the files that were in `public/` when the server started or the build ran, so **rebuild or redeploy after adding the CV**.

## Design system

Tokens live in `src/app/globals.css` (`@theme`):

| Token | Value |
| --- | --- |
| Primary background | `#080808` |
| Secondary background | `#101010` |
| Primary text | `#F5F5F0` |
| Secondary text | `#A1A1AA` |
| Accent | `#C6FF4A` |

Typography: **Bricolage Grotesque** (variable, width axis used for the condensed display face) and **Instrument Serif** for editorial statements. Both are self-hosted from `src/assets/fonts` (SIL OFL licences included), so the build needs no font network request.

## Architecture

```
src/
  app/                 routes, metadata, sitemap, robots, 404
  components/
    ui/                shadcn/ui-style primitives (Button, Badge, Input, Dialog, Tooltip …)
    layout/            header, menu overlay, footer, cursor, page transition
    motion/            Lenis provider, split-text reveal, scrubbed text, marquee
    three/             React Three Fiber scene, WebGL guard and still fallback
    sections/          page-level compositions
    shared/            CV button, social links, project cover, badges
  content/             all editable, typed content
  lib/                 utilities, metadata helper
scripts/content-check.mjs
```

How the pieces fit:

- **Lenis** drives smooth scrolling from the GSAP ticker, so **ScrollTrigger** stays in sync. The scrubbed statement, pinned process track, timeline and 3D "exploded" stack use ScrollTrigger.
- **Framer Motion** powers the name reveal, the menu and the page curtain.
- **React Three Fiber / Drei** render the 3D stack. The scene pauses off-screen, lowers its resolution automatically if the frame rate drops, and falls back to a still illustration if WebGL is unavailable.
- **Radix UI** primitives (Dialog, Tooltip, Label, Separator) supply focus trapping and keyboard behaviour.

## Accessibility and performance

- Skip link, one `h1` per page, landmarks, visible focus ring, focus-trapped menu (Escape closes it).
- `prefers-reduced-motion`: Lenis is disabled, the name appears without animation, scroll-driven motion and the 3D animation stop, and the process section stacks vertically.
- Every route is statically generated. Fonts are self-hosted. Three.js is loaded only where the scene appears.
- Metadata, Open Graph tags, a `Person` JSON-LD block, `sitemap.xml` and `robots.txt` use the name **ABDIRIZAK MOKTAR** and the title **FULL-STACK DEVELOPER** consistently.

## Deploy

Works on any host that runs Next.js (Vercel, Netlify, a Node server). Set the environment variables above on the host, add the CV, and run `npm run build`.
# New-Portifalio
