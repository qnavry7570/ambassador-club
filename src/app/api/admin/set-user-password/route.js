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

  const { email, password } = await request.json();
  if (!email || !password || password.length < 6) {
    return Response.json({ error: 'Email i hasło (min 6 znaków) wymagane' }, { status: 400 });
  }

  // Znajdź usera
  const { data: { users }, error: listErr } = await serviceSupabase.auth.admin.listUsers();
  if (listErr) return Response.json({ error: listErr.message }, { status: 500 });

  const user = users.find(u => u.email === email);
  if (!user) return Response.json({ error: 'Użytkownik nie znaleziony' }, { status: 404 });

  // Ustaw hasło
  const { error } = await serviceSupabase.auth.admin.updateUserById(user.id, { password });
  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ success: true });
}
