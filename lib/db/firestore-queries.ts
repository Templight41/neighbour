import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
  writeBatch,
  where,
} from 'firebase/firestore';
import app from './firestore';
import type {
  AuctionBidRef,
  ItemRef,
  ItemResRef,
  ManufacturerRef,
} from './schema';

export async function getItems() {
  try {
    const db = getFirestore(app);
    const items = await getDocs(collection(db, 'item'));
    return items.docs.map((doc) => doc.data());
  } catch (error) {
    return null;
  }
}

export async function getItemsByLimit(
  limitCount: number,
  startAfterDoc: string | null,
) {
  try {
    const db = getFirestore(app);
    let q = query(
      collection(db, 'item'),
      orderBy('createdAt', 'desc'),
      limit(limitCount),
    );

    // Add startAfter if provided
    if (startAfterDoc) {
      const startDoc = await getDoc(doc(db, 'item', startAfterDoc));
      if (startDoc.exists()) {
        q = query(
          collection(db, 'item'),
          orderBy('createdAt', 'desc'),
          startAfter(startDoc),
          limit(limitCount),
        );
      }
    }

    const itemsSnapshot = await getDocs(q);

    if (itemsSnapshot.empty) {
      return [];
    }

    const items: ItemResRef[] = itemsSnapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        }) as ItemResRef,
    );
    return items;
  } catch (error) {
    return null;
  }
}

export async function getItemById(id: string) {
  try {
    const db = getFirestore(app);
    const item = await getDoc(doc(db, 'item', id));
    return {
      ...item.data(),
      id: item.id,
    } as ItemResRef;
  } catch (error) {
    return null;
  }
}

export async function createItem(item: ItemRef) {
  try {
    const db = getFirestore(app);

    // Calculate end time (7 days from now)
    const timestamp = new Date().toISOString();
    const endTimestamp = new Date();
    endTimestamp.setDate(endTimestamp.getDate() + 7);
    const endTimeISOString = endTimestamp.toISOString();

    // If single item, use addDoc for simplicity
    const itemToAdd: Omit<ItemResRef, 'id'> = {
      ...item,
      isSold: false,
      timeForEnd: endTimeISOString,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const docRef = await addDoc(collection(db, 'item'), itemToAdd);

    return {
      ...itemToAdd,
      id: docRef.id,
    } as ItemResRef;
  } catch (error) {
    return null;
  }
}

export async function createMultipleItems(items: ItemRef[]) {
  try {
    const db = getFirestore(app);
    const timestamp = new Date().toISOString();
    const endTimestamp = new Date();
    endTimestamp.setDate(endTimestamp.getDate() + 7);
    const endTimeISOString = endTimestamp.toISOString();
    const batch = writeBatch(db);
    const createdItems: ItemResRef[] = [];

    items.forEach((item) => {
      const docRef = doc(collection(db, 'item'));
      const itemToAdd: Omit<ItemResRef, 'id'> = {
        ...item,
        isSold: false,
        timeForEnd: endTimeISOString,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      batch.set(docRef, itemToAdd);
      createdItems.push({
        ...itemToAdd,
        id: docRef.id,
      });
    });

    await batch.commit();

    return createdItems as ItemResRef[];
  } catch (error) {
    return null;
  }
}

export async function updateItem(id: string, item: Partial<ItemRef>) {
  try {
    const db = getFirestore(app);
    await updateDoc(doc(db, 'item', id), { ...item });
    return id as string;
  } catch (error) {
    return null;
  }
}

export async function deleteItem(id: string) {
  try {
    const db = getFirestore(app);
    await deleteDoc(doc(db, 'item', id));
    return id as string;
  } catch (error) {
    return null;
  }
}

export async function getAuctionBids(itemId: string) {
  try {
    const db = getFirestore(app);
    const bids = await getDocs(collection(db, 'auction_bid', itemId));
    return bids;
  } catch (error) {
    return null;
  }
}

export async function createAuctionBid(itemId: string, bid: AuctionBidRef) {
  try {
    const db = getFirestore(app);
    const bidDoc = await addDoc(collection(db, 'auction_bid'), bid);
    return bidDoc.id as string;
  } catch (error) {
    console.error('Error creating auction bid:', error);
    return null;
  }
}

export async function getAuctionHighestBid(itemId: string) {
  try {
    const db = getFirestore(app);
    console.log(itemId);
    const q = query(
      collection(db, 'auction_bid'),
      where('itemId', '==', itemId),
      orderBy('bid', 'desc'),
      limit(1),
    );
    const bidsSnapshot = await getDocs(q);
    console.log(bidsSnapshot);
    if (bidsSnapshot.empty) {
      return 0;
    }
    const highestBid = bidsSnapshot.docs.reduce((max, bid) => {
      return bid.data().bid > max ? bid.data().bid : max;
    }, 0);
    return highestBid;
  } catch (error) {
    console.error('Error getting auction highest bid:', error);
    return null;
  }
}

export async function createManufacturer(manufacturer: ManufacturerRef) {
  try {
    const db = getFirestore(app);

    const existingManufacturer = await getManufacturerByUserId(
      manufacturer.userId,
    );
    if (existingManufacturer) {
      return existingManufacturer.id as string;
    }

    const manufacturerDoc = await addDoc(collection(db, 'manufacturer'), {
      ...manufacturer,
      userId: manufacturer.userId,
    });
    return manufacturerDoc.id as string;
  } catch (error) {
    return null;
  }
}

export async function getManufacturerById(id: string) {
  try {
    const db = getFirestore(app);
    const manufacturer = await getDoc(doc(db, 'manufacturer', id));
    return manufacturer.data() as ManufacturerRef;
  } catch (error) {
    return null;
  }
}

export async function getManufacturerByUserId(userId: string) {
  try {
    const db = getFirestore(app);
    const q = query(
      collection(db, 'manufacturer'),
      where('userId', '==', userId),
    );
    const manufacturerSnapshot = await getDocs(q);

    if (manufacturerSnapshot.empty) {
      return undefined;
    }

    // Return the first matching manufacturer
    return manufacturerSnapshot.docs[0].data() as ManufacturerRef;
  } catch (error) {
    console.error('Error getting manufacturer by user id:', error);
    return null;
  }
}
