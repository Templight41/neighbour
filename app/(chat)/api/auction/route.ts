import { type NextRequest, NextResponse } from 'next/server';
import app from '@/lib/db/firestore';
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  getFirestore,
  writeBatch,
  doc,
  limit,
  startAfter,
  orderBy,
  query,
} from 'firebase/firestore';
import {
  createItem,
  createMultipleItems,
  getItemsByLimit,
} from '@/lib/db/firestore-queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const limitCount = Number.parseInt(searchParams.get('limit') || '10');
    const startAfterDoc = searchParams.get('start'); // Document ID to start after

    const items = await getItemsByLimit(limitCount, startAfterDoc);

    if (!items) {
      throw new Error('Failed to fetch items');
    }

    return NextResponse.json({
      data: items,
      count: items.length,
      success: true,
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch items',
        success: false,
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  // const session = await auth();
  // if (!session) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  try {
    const body = await request.json();

    if (Array.isArray(body)) {
      const createdItems = await createMultipleItems(body);
      if (!createdItems) {
        throw new Error('Failed to create items');
      }
      return NextResponse.json({
        data: createdItems,
        count: createdItems.length,
        success: true,
      });
    }

    const createdItems = await createItem(body);

    if (!createdItems) {
      throw new Error('Failed to add items');
    }

    return NextResponse.json({
      data: createdItems,
      count: 1,
      success: true,
    });
  } catch (error) {
    console.error('Error creating items:', error);

    return NextResponse.json(
      {
        error: 'Failed to create items',
        success: false,
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
