# The Luxe Bus

Luxury group transportation site for Southern California. Next.js app with quote form, reviews (Supabase), and Netlify Forms for email notifications.

## Features

- **Quote form** – Trip details, add-ons, travel agent/agency, airport pickup info
- **Reviews** – Stored in Supabase, displayed on the site
- **Netlify Forms** – Quote requests and review notifications emailed via Netlify
- **Single-page layout** – Hero, Fleet, Services, Reviews, Instagram, Contact

## Tech Stack

- Next.js 15, React 19
- Tailwind CSS
- Supabase (reviews)
- Netlify (hosting + forms)

## Run Locally

```bash
npm install
npm run dev
```

Create `.env.local` with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Note:** Netlify Forms only work when deployed. Form submissions on localhost show a message to test on the live site.

## Deploy to Netlify

```bash
npm run build
netlify deploy --prod
```

1. Set env vars in Netlify: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. In Netlify: **Form submission notifications** → Email notification for `trip-request` and `review-notification`

## Project Structure

| File | Purpose |
|------|---------|
| `app/page.tsx` | Homepage |
| `app/layout.tsx` | Root layout, metadata |
| `app/booking/page.tsx` | Redirects to `/#trip` |
| `components/trip-booker.tsx` | Quote form (posts to `/__forms.html`) |
| `components/reviews-section.tsx` | Reviews + Supabase + Netlify Forms |
| `components/header.tsx` | Nav with links to `#trip`, `#fleet`, etc. |
| `components/contact-section.tsx` | "Get a Quote" CTA |
| `components/footer.tsx` | Footer nav |
| `public/__forms.html` | Netlify Forms detection (trip-request, review-notification) |
| `lib/supabase.ts` | Supabase client |
| `netlify.toml` | Netlify build config |

## Recent Updates (Feb 2025)

- Hero "Get a Quote" links to `#trip` (form)
- Footer nav: Get a Quote, Contact, and other sections
- `.gitignore` updated for Node, env files, build output
- All links and forms verified; build passes
