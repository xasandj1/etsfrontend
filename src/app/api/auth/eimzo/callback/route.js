// app/api/eimzo/callback/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';

export const runtime = 'nodejs';

export async function POST(request) {
  const { pkcs7 } = await request.json();

  if (!pkcs7) {
    return NextResponse.json({ error: 'pkcs7 yo‘q' }, { status: 400 });
  }

  // Serverga yuborish
  const res = await fetch(`${process.env.EIMZO_URL}/frontend/challenge`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: pkcs7,
  });

  const result = await res.json();

  if (result.status !== 1) {
    return NextResponse.json({ error: 'Imzo xato' }, { status: 401 });
  }

  // Sessiya
  const session = await getIronSession(cookies(), sessionOptions);
  session.user = result.user || result.subjectCertificateInfo || null;
  await session.save();

  return NextResponse.redirect(new URL('/dashboard', request.url), { status: 303 });
}
