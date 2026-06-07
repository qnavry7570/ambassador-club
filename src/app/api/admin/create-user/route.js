import { createClient } from '@supabase/supabase-js';

const ADMIN_EMAIL = 'b.kawecki@ambassadorclub.pl';

export async function POST(request) {
  try {
    const { email, password, full_name, requestEmail } = await request.json();

    // Sprawdź czy requester to admin
    if (requestEmail !== ADMIN_EMAIL) {
      return Response.json({ error: 'Brak uprawnień.' }, { status: 403 });
    }

    if (!email || !password) {
      return Response.json({ error: 'Email i hasło są wymagane.' }, { status: 400 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name },
    });

    if (error) return Response.json({ error: error.message }, { status: 400 });

    return Response.json({ success: true, userId: data.user.id });
  } catch (e) {
    return Response.json({ error: 'Błąd serwera.' }, { status: 500 });
  }
}
