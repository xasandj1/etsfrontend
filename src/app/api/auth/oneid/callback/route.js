import { NextResponse } from 'next/server';

export async function GET(request) {
  const code = new URL(request.url).searchParams.get('code');

  const tokenRes = await fetch('https://id.egov.uz/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/oneid/callback`,
      client_id: process.env.ONEID_CLIENT_ID,
      client_secret: process.env.ONEID_CLIENT_SECRET,
    })
  });
  const { access_token } = await tokenRes.json();

  const userRes = await fetch('https://id.egov.uz/oauth/userinfo', {
    headers: { Authorization: `Bearer ${access_token}` }
  });
  const user = await userRes.json();

  return NextResponse.redirect('/dashboard');
}
