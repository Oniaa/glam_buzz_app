import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getUserByUsername } from '../../../database/users';
import { poppins, quicksand } from '../../../util/fonts';
import style from './page.module.scss';

type Props = {
  params: { username: string };
};

export default async function ProfileUsernamePage({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  return (
    <main className={style.mainContainer}>
      <Image
        src={`/images/profilePics/${user.username}.avif`}
        width={150}
        height={150}
        alt="Profile Picture"
      />
      <h1 className={quicksand.className}> {user.username}</h1>
      <p className={quicksand.className}>Bio:</p>
      <div className={style.buttonContainer}>
        <button className={`${poppins.className} ${style.button}`}>
          Edit Profile
        </button>
        <button className={`${poppins.className} ${style.button}`}>
          Share Profile
        </button>
      </div>
      <div className={style.divContainer}>
        <Link href={`/profile/${user.username}/reviewed` as any}>
          <span className={poppins.className}>Reviewed Products</span>
        </Link>
      </div>
      <div className={style.divContainer}>
        <span className={poppins.className}>Wish List</span>
      </div>
    </main>
  );
}
