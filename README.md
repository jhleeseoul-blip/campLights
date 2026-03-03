# 🏕 CampLights

World camping hotspot map. Dark map with animated light markers — blue for known hotspots, red for cities with active check-ins in the last 24 hours.

## Stack
- **Next.js 14** (App Router) + TypeScript
- **Google Maps JS API** (`@googlemaps/js-api-loader`)
- **Supabase** (Postgres + RLS)
- CSS animations for marker blink

---

## Quick Start

### 1. Clone & install
```bash
git clone https://github.com/yourname/camplights
cd camplights
npm install
```

### 2. Environment variables
```bash
cp .env.example .env.local
# Fill in your values:
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY
# NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
```

### 3. Set up Supabase
1. Create a project at [supabase.com](https://supabase.com)
2. Open **SQL Editor** and paste + run the entire `supabase/schema.sql`
3. This creates:
   - `cities` table
   - `checkins` table (24h TTL via `expires_at`)
   - `city_status_24h` view
   - RLS policies
   - `cleanup_expired_checkins()` function

### 4. Schedule cleanup (optional but recommended)
In Supabase Dashboard → **Database → Cron Jobs**, add:
- Schedule: `*/15 * * * *`
- Command: `SELECT cleanup_expired_checkins();`

### 5. Google Maps API
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable **Maps JavaScript API**
3. Create an API key, add HTTP referrer restrictions for your domain
4. Set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

### 6. Run locally
```bash
npm run dev
# → http://localhost:3000
```

---

## Deploy to Vercel

1. Push to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
4. Deploy ✅

---

## PWA Icons (placeholder)
Add these files to `/public/`:
- `icon-192.png` — 192×192 app icon (dark background)
- `icon-512.png` — 512×512 app icon

You can generate them from a campfire/tent emoji at [realfavicongenerator.net](https://realfavicongenerator.net).

---

## Folder Structure

```
camplights/
├── app/
│   ├── layout.tsx              # Root layout + manifest link
│   ├── globals.css             # All styles + marker animations
│   ├── page.tsx                # / WorldMap (Google Maps + markers)
│   ├── checkin/
│   │   └── page.tsx            # /checkin  City search + submit
│   ├── city/
│   │   └── [cityId]/
│   │       └── page.tsx        # /city/:id  City detail + checkins
│   ├── settings/
│   │   └── page.tsx            # /settings  Toggle + privacy info
│   └── api/
│       ├── city-status/
│       │   └── route.ts        # GET  /api/city-status
│       ├── city/
│       │   └── [cityId]/
│       │       └── route.ts    # GET  /api/city/:id
│       └── checkin/
│           └── route.ts        # POST /api/checkin
├── lib/
│   └── supabase.ts             # Supabase client
├── types/
│   └── index.ts                # City, Checkin, CityStatus types
├── public/
│   ├── manifest.json           # PWA manifest
│   ├── icon-192.png            # (add manually)
│   └── icon-512.png            # (add manually)
├── supabase/
│   └── schema.sql              # DB schema + seed (run in SQL Editor)
├── .env.example
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## How It Works

| Marker | Condition |
|--------|-----------|
| 🔴 Red (strong blink) | `count_24h > 0` — someone checked in within 24h |
| 🔵 Blue (soft blink) | `is_hotspot = true` — known camping location |

- Check-ins are **manual** (user searches city name) — no GPS tracking
- Messages max **20 characters**
- All check-ins **auto-delete after 24 hours** via `expires_at`
- Anonymous — no accounts required
