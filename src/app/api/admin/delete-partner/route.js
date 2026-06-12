import { createClient } from '@supabase/supabase-js';

const ADMIN_EMAILS = ['b.kawecki@ambassadorclub.pl', 'janusz.janke@svarion.com'];

const serviceSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  const adminEmail = request.headers.get('x-admin-email');
  if (!ADMIN_EMAILS.includes(adminEmail)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await request.json();
  if (!id) return Response.json({ error: 'Brak id' }, { status: 400 });

  const { error } = await serviceSupabase.from('partners').delete().eq('id', id);
  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ success: true });
}
