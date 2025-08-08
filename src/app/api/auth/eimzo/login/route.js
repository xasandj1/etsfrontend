import { NextResponse } from 'next/server';

export async function GET() {
  const r = await fetch(`${process.env.EIMZO_URL}/frontend/challenge`);
  return NextResponse.json(await r.json());
}