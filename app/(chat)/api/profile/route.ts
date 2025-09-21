import { auth } from '@/app/(auth)/auth';
import { NextResponse } from 'next/server';
import {
  createManufacturer,
  getManufacturerByUserId,
} from '@/lib/db/firestore-queries';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const manufacturer = await getManufacturerByUserId(session.user.id);

  return NextResponse.json({ data: manufacturer }, { status: 200 });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { name, location, description, manufacturerUrl } = await request.json();
  const manufacturer = await createManufacturer({
    id: uuidv4(),
    userId: session.user.id,
    name,
    location,
    established: 0,
    description,
    manufacturerUrl,
  });
  if (!manufacturer) {
    return NextResponse.json(
      { error: 'Failed to create manufacturer' },
      { status: 500 },
    );
  }
  return NextResponse.json({ data: manufacturer }, { status: 200 });
}
