import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const type = searchParams.get('type');

  if (code) {
    // Przekieruj na stronę ustawienia hasła z kodem
    return NextResponse.redirect(`${origin}/auth/set-password?code=${code}&type=${type || 'invite'}`);
  }

  return NextResponse.redirect(`${origin}/login`);
}
