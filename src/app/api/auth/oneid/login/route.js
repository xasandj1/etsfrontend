import { NextResponse } from 'next/server';

export async function GET(request) {
  const params = new URLSearchParams({
    client_id: process.env.ONEID_CLIENT_ID,
    redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/oneid/callback`,
    response_type: 'code',
    scope: 'openid email profile',
    state: 'random_state',
    nonce: 'random_nonce',
  });
  return NextResponse.redirect(`https://id.egov.uz/oauth/authorize?${params.toString()}`);;
}
