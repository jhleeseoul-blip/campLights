import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ cityId: string }> }
) {
  const { cityId } = await params

  const [cityRes, checkinsRes] = await Promise.all([
    supabase.from('cities').select('*').eq('id', cityId).single(),
    supabase
      .from('checkins')
      .select('*')
      .eq('city_id', cityId)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(20),
  ])

  if (cityRes.error || !cityRes.data) {
    return NextResponse.json({ error: 'City not found' }, { status: 404 })
  }

  return NextResponse.json({
    city: cityRes.data,
    checkins: checkinsRes.data ?? [],
  })
}