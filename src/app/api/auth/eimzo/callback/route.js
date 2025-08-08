import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';

export async function POST(request) {
  const { pkcs7 } = await request.json();

  const headers = {
    'Content-Type': 'text/plain',                  // body — PKCS7 Base64 matn
    'X-Real-IP': request.headers.get('x-forwarded-for') ?? '127.0.0.1',
    'Host': request.headers.get('host') ?? 'localhost',
  };

  const verRes = await fetch(`${process.env.EIMZO_URL}/frontend/challenge`, {
    method: 'POST',
    headers,
    body: pkcs7,
  });

  let result = null;
  try { result = await verRes.json(); } catch (_) {}

  if (!verRes.ok || !result || result.status !== 1) {
    return NextResponse.json({ error: 'Imzo invalid' }, { status: 401 });
  }

  const session = await getIronSession(cookies(), sessionOptions);
  session.user = result.subjectCertificateInfo || result.user || null;
  await session.save();

  return NextResponse.redirect(new URL('/dashboard', request.url));
}
