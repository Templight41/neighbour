import app from '@/lib/db/firestore';
import {
  createAuctionBid,
  getAuctionHighestBid,
  getItemById,
  getManufacturerById,
} from '@/lib/db/firestore-queries';
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { auth } from '@/app/(auth)/auth';
import type { AuctionItemRef } from '@/lib/db/schema';
import { v4 as uuidv4 } from 'uuid';

// TypeScript interfaces for type safety
interface AuctionItem {
  id?: string;
  name: string;
  price: string | number;
  imageUrl: string;
  manufacturerId: string;
  description?: string;
  startingBid?: number;
  currentBid?: number;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
  manufacturerUrl?: string;
  manufacturerDetails?: {
    location: string;
    established: number;
    description: string;
  };
  timeForEnd?: string;
  isSold?: boolean;
  sellAmount?: number | null;
}

interface UpdateAuctionItemRequest {
  name?: string;
  price?: string | number;
  imageUrl?: string;
  manufacturer?: string;
  description?: string;
  currentBid?: number;
  endDate?: string;
  isSold?: boolean;
  sellAmount?: number | null;
}

// Validation function for update requests
function validateUpdateRequest(item: any): item is UpdateAuctionItemRequest {
  if (typeof item !== 'object' || item === null) return false;

  // At least one field should be present for update
  const hasValidField =
    (item.name && typeof item.name === 'string') ||
    (item.price &&
      (typeof item.price === 'string' || typeof item.price === 'number')) ||
    (item.imageUrl && typeof item.imageUrl === 'string') ||
    (item.manufacturer && typeof item.manufacturer === 'string') ||
    (item.description && typeof item.description === 'string') ||
    typeof item.currentBid === 'number' ||
    (item.endDate && typeof item.endDate === 'string') ||
    typeof item.isSold === 'boolean' ||
    item.sellAmount === null ||
    typeof item.sellAmount === 'number';

  return hasValidField;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // console.log(session);

  try {
    const { id } = await context.params;
    console.log(id);

    if (!id || id.trim() === '') {
      return NextResponse.json(
        { error: 'Invalid auction item ID', success: false },
        { status: 400 },
      );
    }

    let result: AuctionItemRef | null = null;

    // const item = await getItemById(id);
    // const highestBid = await getAuctionHighestBid(id);

    const [item, highestBid] = await Promise.all([
      getItemById(id),
      getAuctionHighestBid(id),
    ]);

    console.log(highestBid);

    if (!item) {
      return NextResponse.json(
        { error: 'Auction item not found', success: false },
        { status: 404 },
      );
    }

    const manufacturer = await getManufacturerById(item.manufacturerId);
    // if (!manufacturer) {
    //   console.log('Manufacturer not found');
    //   return NextResponse.json(
    //     { error: 'Manufacturer not found', success: false },
    //     { status: 404 },
    //   );
    // }

    result = {
      ...item,
      id: item?.id,
      name: item?.name,
      price: item?.price,
      description: item?.description,
      imageUrl: item?.imageUrl,
      timeForEnd: item?.timeForEnd,
      createdAt: item?.createdAt,
      updatedAt: item?.updatedAt,
      manufacturerDetails: {
        manufacturer: manufacturer?.name ?? '',
        location: manufacturer?.location ?? '',
        established: manufacturer?.established ?? 0,
        description: manufacturer?.description ?? '',
        manufacturerUrl: manufacturer?.manufacturerUrl ?? '',
      },
      currentBid: highestBid || item?.price || 0,
    };

    // console.log(item);

    if (!result) {
      return NextResponse.json(
        { error: 'Auction item not found', success: false },
        { status: 404 },
      );
    }

    return NextResponse.json({
      data: result,
      success: true,
    });
  } catch (error) {
    console.error('Error fetching auction item:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch auction item',
        success: false,
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const body = await request.json();

    if (!id || id.trim() === '') {
      return NextResponse.json(
        { error: 'Invalid auction item ID', success: false },
        { status: 400 },
      );
    }

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Request body is required', success: false },
        { status: 400 },
      );
    }
    const itemToSet = {
      id: uuidv4(),
      itemId: id,
      bid: body.newBid,
      userId: session.user.id,
      createdAt: new Date().toISOString(),
    };
    const bid = await createAuctionBid(id, itemToSet);

    if (!bid) {
      return NextResponse.json(
        { error: 'Failed to create auction bid', success: false },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...itemToSet,
      },
      message: 'Auction bid created successfully',
    });
  } catch (error) {
    console.error('Error updating auction item:', error);
    return NextResponse.json(
      {
        error: 'Failed to update auction item',
        success: false,
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  // const session = await auth();
  // if (!session) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  try {
    const { id } = await context.params;
    const body = await request.json();

    if (!id || id.trim() === '') {
      return NextResponse.json(
        { error: 'Invalid auction item ID', success: false },
        { status: 400 },
      );
    }

    if (!validateUpdateRequest(body)) {
      return NextResponse.json(
        {
          error: 'Invalid update data. At least one valid field is required.',
          success: false,
        },
        { status: 400 },
      );
    }

    const db = getFirestore(app);
    const docRef = doc(db, 'auction', id);

    // Check if document exists
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return NextResponse.json(
        { error: 'Auction item not found', success: false },
        { status: 404 },
      );
    }

    const timestamp = new Date().toISOString();
    const updateData = {
      ...body,
      updatedAt: timestamp,
    };

    await updateDoc(docRef, updateData);

    // Get updated document
    const updatedDoc = await getDoc(docRef);
    const updatedItem = {
      id: updatedDoc.id,
      ...updatedDoc.data(),
    };

    return NextResponse.json({
      success: true,
      data: updatedItem,
      message: 'Auction item updated successfully',
    });
  } catch (error) {
    console.error('Error updating auction item:', error);
    return NextResponse.json(
      {
        error: 'Failed to update auction item',
        success: false,
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
