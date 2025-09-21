import {
  createManufacturer,
  getManufacturerById,
  getManufacturerByUserId,
} from '@/lib/db/firestore-queries';
import { tool } from 'ai';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '@/app/(auth)/auth';

export const setManufacturer = tool({
  description: `Set the user's information`,
  inputSchema: z.object({
    name: z.string(),
    location: z.string(),
    description: z.string(),
    imageUrl: z.string(),
  }),
  execute: async ({ name, location, description, imageUrl }) => {
    const session = await auth();
    if (!session) {
      return { error: 'Unauthorized' };
    }
    console.log('setManufacturer', name, location, description, imageUrl);
    const manufacturer = await createManufacturer({
      id: uuidv4(),
      userId: session.user.id,
      established: 0,
      name,
      location,
      description,
      manufacturerUrl: imageUrl,
    });
    return manufacturer;
  },
});

export const getManufacturer = tool({
  description: `Get the user's information`,
  inputSchema: z.object({}),
  execute: async () => {
    const session = await auth();
    if (!session) {
      return { error: 'Unauthorized' };
    }
    const manufacturer = await getManufacturerByUserId(session.user.id);
    return manufacturer;
  },
});
