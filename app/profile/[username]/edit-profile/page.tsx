import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../../database/sessions';
import { getUserBySessionToken } from '../../../../database/users';
import { quicksand } from '../../../../util/fonts';

export const dynamic = 'force-dynamic';

type Props = {
  params: { username: string };
};

export default async function EditProfilePage({ params }: Props) {
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the sessionToken has a valid session
  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));
  console.log('user', user);

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // 3. Either redirect or render the login form
  if (!session || user?.username !== params.username) {
    redirect(`/login?returnTo=/profile/${params.username}/edit-profile`);
  }

  return (
    <main>
      <h1 className={quicksand.className}>Edit Profile</h1>
    </main>
  );
}
