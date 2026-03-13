-- Homepage hero content (single row CMS)
-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

create table if not exists homepage_content (
  id text primary key default 'hero',
  eyebrow text,
  headline text,
  subheadline text,
  body text,
  cta_text text,
  cta_href text,
  cta_secondary_text text,
  cta_secondary_href text,
  badge1 text,
  badge2 text,
  hero_image_url text,
  hero_image_alt text,
  updated_at timestamptz default now()
);

-- Insert default row so we have something to update
insert into homepage_content (
  id, eyebrow, headline, subheadline, cta_text, cta_href, cta_secondary_text, cta_secondary_href, hero_image_url, hero_image_alt
) values (
  'hero',
  'Southern California''s Premier Luxury Transport',
  'The Luxe Bus',
  'Luxury party bus for airports, sporting events, birthdays, bachelor & bachelorette parties, wineries, casinos, and more.',
  'Get a Quote',
  '#trip',
  'Explore the Fleet',
  '#fleet',
  '/images/fleet/sprinter-black-disneyland.png',
  'Black Mercedes Sprinter at Disneyland Resort'
) on conflict (id) do nothing;

-- Allow public read for the site (so the homepage can fetch content)
alter table homepage_content enable row level security;

create policy "Allow public read homepage content"
  on homepage_content for select
  using (true);

-- Only authenticated users can update (add Supabase Auth later; for now you may need to allow anon update or use service role from API)
-- For simplicity: allow anon update so server action can save (restrict in production via env / auth)
create policy "Allow anon update homepage content"
  on homepage_content for update
  using (true)
  with check (true);

create policy "Allow insert default hero row"
  on homepage_content for insert
  with check (id = 'hero');

-- Storage bucket for hero images (run in Dashboard > Storage > New bucket)
-- Bucket name: hero-images, set to Public.
-- Then in Storage > hero-images > Policies: New policy for "Allow public uploads"
-- Policy: (allow insert for anon with bucket_id = 'hero-images'), (allow select for anon)
