import { auth } from '@/app/(auth)/auth';
import { NextResponse } from 'next/server';
import { getManufacturerByUserId } from '@/lib/db/firestore-queries';

export async function GET(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const manufacturer = await getManufacturerByUserId(session.user.id);

  return NextResponse.json({ data: manufacturer }, { status: 200 });
}
