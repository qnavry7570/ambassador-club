import { createClient } from '@supabase/supabase-js';

const ADMIN_EMAILS = ['b.kawecki@ambassadorclub.pl'];

const serviceSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  // Weryfikacja — tylko admin
  const authHeader = request.headers.get('x-admin-email');
  if (!ADMIN_EMAILS.includes(authHeader)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');
  if (!file) return Response.json({ error: 'Brak pliku' }, { status: 400 });

  const ext = file.name.split('.').pop().toLowerCase();
  const allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
  if (!allowed.includes(ext)) {
    return Response.json({ error: 'Niedozwolony format. Użyj JPG, PNG lub WebP.' }, { status: 400 });
  }

  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error } = await serviceSupabase.storage
    .from('article-images')
    .upload(fileName, buffer, { contentType: file.type, upsert: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });

  const { data } = serviceSupabase.storage.from('article-images').getPublicUrl(fileName);
  return Response.json({ url: data.publicUrl });
}
