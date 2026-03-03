-- ============================================================
-- CampLights — Supabase SQL Setup
-- Run this entire script in Supabase SQL Editor
-- ============================================================

-- 1. Extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- 2. Tables
-- ============================================================

CREATE TABLE IF NOT EXISTS cities (
  id           TEXT PRIMARY KEY,
  name_en      TEXT NOT NULL,
  name_local   TEXT NOT NULL DEFAULT '',
  country_code TEXT NOT NULL,          -- ISO 3166-1 alpha-2
  lat          DOUBLE PRECISION NOT NULL,
  lng          DOUBLE PRECISION NOT NULL,
  is_hotspot   BOOLEAN NOT NULL DEFAULT false,
  hotspot_rank INTEGER,
  region       TEXT NOT NULL DEFAULT '',
  type         TEXT NOT NULL DEFAULT 'city',  -- city | town | village
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS checkins (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id    TEXT NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  message    TEXT NOT NULL DEFAULT '',
  lang       TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '24 hours'),
  CONSTRAINT chk_message_len CHECK (char_length(message) <= 20)
);

-- ============================================================
-- 3. Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_checkins_city_expires ON checkins (city_id, expires_at);
CREATE INDEX IF NOT EXISTS idx_checkins_expires      ON checkins (expires_at);

-- ============================================================
-- 4. View: city_status_24h
-- ============================================================

CREATE OR REPLACE VIEW city_status_24h AS
SELECT
  c.id           AS city_id,
  c.name_en,
  c.name_local,
  c.country_code,
  c.lat,
  c.lng,
  c.is_hotspot,
  c.hotspot_rank,
  c.region,
  COALESCE(COUNT(ci.id) FILTER (WHERE ci.expires_at > now()), 0)::INT AS count_24h
FROM cities c
LEFT JOIN checkins ci ON ci.city_id = c.id AND ci.expires_at > now()
GROUP BY c.id, c.name_en, c.name_local, c.country_code, c.lat, c.lng,
         c.is_hotspot, c.hotspot_rank, c.region;

-- ============================================================
-- 5. Cleanup function
-- ============================================================

CREATE OR REPLACE FUNCTION cleanup_expired_checkins()
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM checkins WHERE expires_at <= now();
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

-- ============================================================
-- 6. Row Level Security (RLS)
-- ============================================================

-- cities: public read
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS cities_select ON cities;
CREATE POLICY cities_select ON cities
  FOR SELECT TO anon, authenticated USING (true);

-- checkins: public read + public insert
ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS checkins_select ON checkins;
CREATE POLICY checkins_select ON checkins
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS checkins_insert ON checkins;
CREATE POLICY checkins_insert ON checkins
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- ============================================================
-- 7. Seed — 20 sample cities
-- ============================================================

INSERT INTO cities (id, name_en, name_local, country_code, lat, lng, is_hotspot, hotspot_rank, region, type)
VALUES
  ('tokyo',        'Tokyo',           '東京',          'JP',  35.6895, 139.6917, true,  1,  'East Asia',        'city'),
  ('seoul',        'Seoul',           '서울',          'KR',  37.5665, 126.9780, true,  2,  'East Asia',        'city'),
  ('paris',        'Paris',           'Paris',         'FR',  48.8566,   2.3522, true,  3,  'Western Europe',   'city'),
  ('london',       'London',          'London',        'GB',  51.5074,  -0.1278, true,  4,  'Western Europe',   'city'),
  ('new-york',     'New York',        'New York',      'US',  40.7128, -74.0060, true,  5,  'North America',    'city'),
  ('sydney',       'Sydney',          'Sydney',        'AU', -33.8688, 151.2093, true,  6,  'Oceania',          'city'),
  ('cape-town',    'Cape Town',       'Kaapstad',      'ZA', -33.9249,  18.4241, true,  7,  'Southern Africa',  'city'),
  ('rio',          'Rio de Janeiro',  'Rio de Janeiro','BR', -22.9068, -43.1729, true,  8,  'South America',    'city'),
  ('banff',        'Banff',           'Banff',         'CA',  51.1784,-115.5708, true,  9,  'North America',    'town'),
  ('queenstown',   'Queenstown',      'Queenstown',    'NZ', -45.0312, 168.6626, true,  10, 'Oceania',          'town'),
  ('reykjavik',    'Reykjavik',       'Reykjavík',     'IS',  64.1265, -21.8174, true,  11, 'Northern Europe',  'city'),
  ('kathmandu',    'Kathmandu',       'काठमाडौं',      'NP',  27.7172,  85.3240, true,  12, 'South Asia',       'city'),
  ('cusco',        'Cusco',           'Qusqu',         'PE', -13.5319, -71.9675, true,  13, 'South America',    'city'),
  ('nairobi',      'Nairobi',         'Nairobi',       'KE',  -1.2921,  36.8219, true,  14, 'East Africa',      'city'),
  ('moab',         'Moab',            'Moab',          'US',  38.5733,-109.5498, true,  15, 'North America',    'town'),
  ('patagonia',    'Puerto Natales',  'Puerto Natales','CL', -51.7267, -72.5019, true,  16, 'South America',    'town'),
  ('chiang-mai',   'Chiang Mai',      'เชียงใหม่',     'TH',  18.7883,  98.9853, true,  17, 'Southeast Asia',   'city'),
  ('lisbon',       'Lisbon',          'Lisboa',        'PT',  38.7169,  -9.1399, false, null,'Western Europe',  'city'),
  ('amsterdam',    'Amsterdam',       'Amsterdam',     'NL',  52.3676,   4.9041, false, null,'Western Europe',  'city'),
  ('denver',       'Denver',          'Denver',        'US',  39.7392, -104.9903,false, null,'North America',   'city')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 8. TTL Scheduling Note
-- ============================================================
-- In Supabase Dashboard → Database → Cron Jobs (pg_cron),
-- add a job that runs every 15 minutes:
--
--   SELECT cleanup_expired_checkins();
--
-- Or use Supabase Scheduled Edge Functions for the same.
-- ============================================================
