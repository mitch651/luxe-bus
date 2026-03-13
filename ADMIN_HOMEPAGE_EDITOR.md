# Admin Homepage Editor

## Overview

- **Admin dashboard:** `/admin` — lists “Homepage” and other content links.
- **Homepage editor:** `/admin/homepage` — live-edit the hero section with instant preview.

## Setup

1. **Supabase table**  
   Run `supabase-homepage-content-setup.sql` in the Supabase SQL Editor so the `homepage_content` table exists and has a default row.

2. **Hero image uploads (optional)**  
   In Supabase Dashboard → Storage:
   - Create a **public** bucket named `hero-images`.
   - Add a policy so the app can upload (e.g. allow `insert` for anon on `hero-images`).
   - If you skip this, you can still set the hero image via the “Image URL or path” field.

3. **Environment variables**  
   Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set (e.g. in Netlify).

## Features

- **Live preview** — Left (or top on mobile): hero preview updates as you type.
- **Desktop / Mobile toggle** — Switch preview viewport.
- **Editable fields** — Eyebrow, headline, subheadline, body, primary & secondary CTA text/link, badge 1 & 2, hero image URL, hero image alt.
- **Hero image** — Paste a URL or use “Upload new image” (uses Supabase Storage when the bucket is configured).
- **Save / Revert** — Sticky bar: Save persists to Supabase, Revert discards unsaved changes.
- **Public homepage** — The main site fetches hero content from `homepage_content` and passes it to the Hero component; unchanged design, data-driven content.

## Files

- `app/admin/layout.tsx` — Admin shell and nav.
- `app/admin/page.tsx` — Dashboard with link to Homepage.
- `app/admin/homepage/page.tsx` — Loads hero content and renders the editor.
- `components/admin/homepage-editor.tsx` — Editor layout, draft state, save/reset, image upload.
- `components/admin/hero-preview.tsx` — Renders the Hero with draft content for preview.
- `components/admin/conditional-header.tsx` — Hides the main site header on `/admin` routes.
- `components/hero.tsx` — Accepts optional `content` and `preview` props; used on both the site and in the admin preview.
- `lib/homepage.ts` — `getHomepageHeroContent()`, `saveHomepageHeroContent()`.
- `types/homepage.ts` — `HeroContent` and defaults.
- `supabase-homepage-content-setup.sql` — Table and default row for hero content.
