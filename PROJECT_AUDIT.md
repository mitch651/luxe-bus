# Luxe Bus — Project Audit

**Date:** February 2025  
**Status:** ✅ Build passes | All source files verified

---

## File Inventory (Needed vs Optional)

### ✅ Required source files

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout, metadata, fonts |
| `app/page.tsx` | Home page |
| `app/globals.css` | Tailwind + custom styles |
| `app/booking/page.tsx` | Redirects `/booking` → `/#trip` |
| `components/header.tsx` | Fixed nav, logo, links |
| `components/hero.tsx` | Hero section, hero images |
| `components/trip-booker.tsx` | Quote form (Netlify Forms) |
| `components/fleet-section.tsx` | Grey/black vans + Cybertruck |
| `components/videos-section.tsx` | Video grid |
| `components/services-section.tsx` | Services list |
| `components/reviews-section.tsx` | Reviews + Supabase |
| `components/instagram-section.tsx` | Instagram grid |
| `components/contact-section.tsx` | CTA + contact links |
| `components/footer.tsx` | Footer nav + logo |
| `components/auth-error-handler.tsx` | OTP/redirect error handling |
| `lib/supabase.ts` | Supabase client for reviews |
| `public/__forms.html` | Netlify Forms detection |

### ✅ Config files

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js config |
| `tailwind.config.ts` | Tailwind content paths |
| `tsconfig.json` | TypeScript |
| `postcss.config.mjs` | PostCSS |
| `package.json` | Dependencies |
| `.gitignore` | Git exclusions |

### ✅ Documentation (optional but helpful)

| File | Purpose |
|------|---------|
| `IMAGES_OVERVIEW.md` | Image paths and setup |
| `PROJECT_AUDIT.md` | This file |

### ❌ Removed (unused)

| File | Reason |
|------|--------|
| `components/logo.tsx` | Never imported; header/footer use `/images/logo.png` instead |

### Public assets expected

**`public/images/`**
- `logo.png` — Header, footer
- `hero-desktop.png` — Hero desktop
- `hero-mobile.png` — Hero mobile

**`public/images/fleet/`**
- `sprinter-grey-night.jpg` — Grey van exterior
- `sprinter-starlight-tv.jpg.jpg`, `sprinter-seating.jpg.jpg`, `sprinter-lounge.jpg.jpg`, `sprinter-interior.jpg.jpg` — Grey interior
- `sprinter-cooler.jpg.jpg`, `sprinter-console.jpg.jpg`, `sprinter-speaker.jpg.jpg`, `sprinter-amenities.jpg.jpg` — Grey amenities
- `sprinter-black-disneyland.png` — Black van exterior
- `sprinter-black-interior-1.png` … `sprinter-black-interior-5.png` — Black interior
- `cybertruck.png` — Cybertruck section

**`public/videos/`**
- `IMG_4615.mp4`, `IMG_4616.mp4`, `IMG_4628.mp4`, `IMG_4632.mp4` — Optional; section shows "Video coming soon" if missing

---

## Fixes applied

1. **Removed `components/logo.tsx`** — Unused; header/footer use `Image` with `/images/logo.png`.
2. **Removed Sintra from `next.config.ts`** — All images are local; no remote domains needed.
3. **Fixed typo in `trip-booker.tsx`** — "Rachl Miles" → "Rachel Miles".

---

## Code checks

- ✅ No Sintra URLs in source
- ✅ All `<a href="#…">` match section IDs
- ✅ Netlify form names match `__forms.html` (`trip-request`, `review-notification`)
- ✅ Supabase env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `scroll-margin-top` for fixed header
- ✅ Mobile menu closes on nav link click

---

## Dependencies

- **Next.js 15** — App Router
- **React 19**
- **Tailwind CSS**
- **Supabase** — Reviews
- **Netlify Forms** — Trip quote + review notification

All dependencies are in use.
