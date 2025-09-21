import { auth } from '@/app/(auth)/auth';
import {
  // createManufacturer,
  getManufacturerByUserId,
} from '@/lib/db/firestore-queries';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();
  if (!session) {
    redirect('/api/auth/guest');
  }

  const manufacturer = await getManufacturerByUserId(session.user.id);

  return (
    <div>
      {manufacturer?.name}
      <img src={manufacturer?.manufacturerUrl} alt={manufacturer?.name} />
    </div>
  );
}
