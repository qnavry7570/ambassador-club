import { createClient } from '@supabase/supabase-js';

const ADMIN_EMAILS = ['b.kawecki@ambassadorclub.pl'];

export async function POST(request) {
  try {
    const { email, full_name, requestEmail } = await request.json();

    if (!ADMIN_EMAILS.includes(requestEmail)) {
      return Response.json({ error: 'Brak uprawnień.' }, { status: 403 });
    }

    if (!email) {
      return Response.json({ error: 'Email jest wymagany.' }, { status: 400 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Wyślij zaproszenie — członek sam ustawi hasło
    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      data: { full_name },
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ambassador-club.vercel.app'}/auth/callback`,
    });

    if (error) return Response.json({ error: error.message }, { status: 400 });

    return Response.json({ success: true, userId: data.user.id });
  } catch (e) {
    return Response.json({ error: 'Błąd serwera.' }, { status: 500 });
  }
}
