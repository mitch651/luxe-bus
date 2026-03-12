-- Quote requests table (backup for booking/quote form submissions)
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

create table if not exists quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  quote_type text not null,
  trip_type text not null,
  name text not null,
  email text not null,
  phone text not null,
  timezone text,
  passengers text,
  -- Airport pickup fields
  pickup text,
  dropoff text,
  arrival_date text,
  arrival_time text,
  flight_number text,
  airport_return_pickup_address text,
  airport_return_dropoff_address text,
  departing_date text,
  departing_time text,
  -- Event pickup fields
  pickup_address text,
  dropoff_address text,
  pickup_time text,
  return_pickup_address text,
  return_dropoff_address text,
  estimated_hours text,
  -- Add-ons
  travel_agent text,
  car_seats text,
  boosters text,
  age_of_children text,
  movie_choice text,
  welcome_sign_description text,
  add_on text,
  stops_yes_no text,
  stops_where text,
  travel_agency text
);

-- Enable Row Level Security (optional - allows public insert for form submissions)
alter table quote_requests enable row level security;

-- Allow anonymous inserts (form submissions from the site)
create policy "Allow public insert for quote form"
  on quote_requests for insert
  with check (true);

-- Restrict selects/updates to authenticated users only (or remove if you want public read)
create policy "No public read"
  on quote_requests for select
  using (false);
