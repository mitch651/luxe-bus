-- Run this in your Supabase project: SQL Editor > New query > Paste & Run
-- Creates the reviews table and allows public read/insert for the website

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  content text not null,
  created_at timestamptz default now()
);

-- Allow anyone to read reviews (for displaying on the website)
alter table reviews enable row level security;

create policy "Anyone can read reviews"
  on reviews for select
  using (true);

-- Allow anyone to insert reviews (for the Leave a Review form)
create policy "Anyone can insert reviews"
  on reviews for insert
  with check (true);

-- Optional: Add seed reviews to get started (run after table is created)
-- insert into reviews (name, rating, content) values
--   ('Jessica M.', 5, 'Absolutely incredible experience! We booked The Luxe Bus for my bachelorette party and it was the highlight of the night.'),
--   ('Carlos R.', 5, 'Used them for an airport transfer with the whole family. Fit all our luggage, car seats, strollers—no problem.'),
--   ('Amanda T.', 5, 'We took The Luxe Bus to Temecula wine country and it was the best decision ever. Everyone had a blast!');
