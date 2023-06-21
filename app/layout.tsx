import './globals.scss';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ReactNode } from 'react';
import { GrHomeRounded } from 'react-icons/gr';
import { RiCompassDiscoverLine } from 'react-icons/ri';
import { getUserBySessionToken } from '../database/users';
import { poppins } from '../util/fonts';
import style from './layout.module.scss';
import { LogoutButton } from './LogoutButton';

export const metadata = {
  title: 'Glam Buzz',
  description: 'Get all the reviews of you favorite products',
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <html lang="en">
      <body>
        <nav className={style.navBar}>
          <div>
            <Link href="/">
              <GrHomeRounded size="1.65rem" />
            </Link>
          </div>
          <div>
            <Link href="/products">
              <RiCompassDiscoverLine size="2rem" />
            </Link>
          </div>
          <div>
            {user ? (
              <>
                <Link
                  className={poppins.className}
                  href={`/profile/${user.username}`}
                >
                  {user.username}
                </Link>
                <LogoutButton />
              </>
            ) : (
              <Link className={poppins.className} href="/login">
                login
              </Link>
            )}
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
