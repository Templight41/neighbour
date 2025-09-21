import { tool } from 'ai';
import { z } from 'zod';
import {
  createItem as createItemFirestore,
  getItemById,
  getManufacturerById,
  getItemsByUserId,
} from '@/lib/db/firestore-queries';
import { auth } from '@/app/(auth)/auth';
import type { ItemResRef } from '@/lib/db/schema';

export const createItem = tool({
  description: 'Create an item for the user OR add item for selling',
  inputSchema: z.object({
    name: z.string(),
    price: z.number(),
    description: z.string(),
    imageUrl: z.array(z.string()),
  }),
  execute: async ({ name, price, description, imageUrl }) => {
    const session = await auth();
    if (!session) {
      return { error: 'Unauthorized' };
    }

    const timestamp = new Date().toISOString();
    const endTimestamp = new Date();
    endTimestamp.setDate(endTimestamp.getDate() + 7);
    const endTimeISOString = endTimestamp.toISOString();

    const itemToAdd: Omit<ItemResRef, 'id'> = {
      name,
      manufacturerId: session.user.id,
      price,
      description,
      imageUrl,
      timeForEnd: endTimeISOString,
      createdAt: timestamp,
      updatedAt: timestamp,
      isSold: false,
    };

    const item = await createItemFirestore(itemToAdd);

    return item;
  },
});

export const getItem = tool({
  description: 'Get an item of the user by id',
  inputSchema: z.object({
    id: z.string(),
  }),
  execute: async ({ id }) => {
    const item = await getItemById(id);
    if (!item) {
      return { error: 'Item not found' };
    }
    const manufacturer = await getManufacturerById(item.manufacturerId);
    if (!manufacturer) {
      return { error: 'Manufacturer not found' };
    }
    return {
      item,
      manufacturer,
    };
  },
});

export const getUserItems = tool({
  description: 'Get all the items of the user',
  inputSchema: z.object({}),
  execute: async () => {
    const session = await auth();
    if (!session) {
      return { error: 'Unauthorized' };
    }
    const items = await getItemsByUserId(session.user.id);
    if (!items) {
      return { error: 'Items not found' };
    }
    return items;
  },
});
