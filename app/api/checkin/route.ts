import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { city_id, message = '', lang = 'en' } = body as Record<string, string>

  if (!city_id || typeof city_id !== 'string') {
    return NextResponse.json({ error: 'city_id required' }, { status: 400 })
  }

  const msg = String(message ?? '').trim()
  if (msg.length > 20) {
    return NextResponse.json({ error: 'Message max 20 chars' }, { status: 400 })
  }

  // Verify city exists
  const { data: city, error: cityErr } = await supabase
    .from('cities')
    .select('id')
    .eq('id', city_id)
    .single()

  if (cityErr || !city) {
    return NextResponse.json({ error: 'City not found' }, { status: 404 })
  }

  const now = new Date()
  const expires = new Date(now.getTime() + 24 * 60 * 60 * 1000)

  const { error } = await supabase.from('checkins').insert({
    city_id,
    message: msg,
    lang: String(lang).slice(0, 10),
    created_at: now.toISOString(),
    expires_at: expires.toISOString(),
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true }, { status: 201 })
}
