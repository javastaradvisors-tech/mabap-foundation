# MaBap Foundation — Next.js rebuild (in progress)

This is a from-scratch Next.js (App Router + TypeScript) conversion of the static
site living one level up (`../`). It lives on the `nextjs-rebuild` branch, in
this `web-next/` folder, so it doesn't touch or overwrite the current static
site — that stays exactly as-is on `main`.

## Status: Homepage only (checkpoint 1)

Only `/` (the homepage) has been converted so far, on purpose — this is a
checkpoint so the approach can be reviewed before converting the remaining 8
pages (About, Our Work, Courses & Activities, Media, Donate, Past Work,
Messages, Privacy). The shared header, footer, page loader, and scroll-reveal
system are built as reusable components, so the remaining pages will mostly be
content conversion from here, not new plumbing.

**The other nav links (About, Our Work, etc.) will 404 right now** — those
routes don't exist yet. That's expected at this stage.

No backend yet, on purpose: this is a pure static conversion. Supabase,
donation processing, the admin CRM, and email are a separate, later phase.

## Running it

This machine doesn't have Node.js installed, so none of this has been run or
build-tested yet — only written carefully against Next.js 15 / React 19
conventions. First thing to do on a machine with Node:

```bash
cd web-next
npm install
npm run dev
```

Then open http://localhost:3000 and compare it against the static homepage at
`../index.html` (or the live static site) side by side.

To do a production build (this is a static export — see `next.config.mjs` —
so it produces plain HTML/CSS/JS in `out/`, deployable anywhere, same as the
current static site):

```bash
npm run build
```

If anything doesn't compile cleanly, that's the first thing to fix — I
couldn't verify the build myself without Node available.

## What's been ported vs. what's new

- **Ported as-is**: `css/style.css` → `src/app/globals.css`, copied verbatim
  (no rewrite) so the visual design should match pixel-for-pixel.
  `data/daily-messages.json` → `public/assets/data/`.
- **Componentized** (was duplicated markup on every static page, now shared):
  `Header`, `Footer`, `PageLoader`, `ScrollReveal`, `SectionMountains`.
- **Rebuilt in React idioms**:
  - Nav mobile-toggle and active-link highlighting now use React state and
    `usePathname()` instead of manual DOM classList/`class="active"` per page.
  - The page loader's "show once per session" behavior is now partly free —
    since Next.js does client-side navigation between pages within the app,
    the loader (in the root layout) only mounts once per real page load
    anyway. `sessionStorage` is kept as a backstop for hard refreshes.
  - Scroll-reveal is ported near-verbatim from the original `main.js` (same
    class-based `IntersectionObserver` approach, no per-page markup changes
    needed) rather than rewritten as individual wrapped components, to keep
    the conversion low-risk.
- **Not yet touched**: the donate form's validation logic, the timeline
  accordion, and the 8 remaining pages — all still only exist in the static
  `../` version.

## Known gap I can't close from here

I don't have Node.js/npm in this environment, so I could not run
`npm install`, `next dev`, `next build`, or `next lint` to verify any of this
actually compiles and renders correctly. Everything here was written
carefully against known Next.js/React conventions, but it needs a real build
on a machine with Node before it's trusted. Please run `npm run build` first
and tell me about any errors — I'll fix them from there.
