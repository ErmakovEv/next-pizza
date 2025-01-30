import { getUserSession } from '@/lib/getUserSession';
import { prisma } from '@/prisma/prisma-client';
import { redirect } from 'next/navigation';
import { ProfileForm } from '@/components/shared/ProfileForm';

const ProfilePage = async () => {
  const userSession = await getUserSession();

  if (!userSession) {
    return redirect('/not-auth');
  }

  const user = await prisma.user.findFirst({ where: { id: +userSession.id } });

  return <>{user && <ProfileForm data={user} />}</>;
};

export default ProfilePage;
