import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function GET() {
  const data = readDb();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const newData = await request.json();
    writeDb(newData);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to write data' }, { status: 500 });
  }
}
