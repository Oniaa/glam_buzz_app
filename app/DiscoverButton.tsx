'use client';

import { useRouter } from 'next/navigation';
import { poppins } from '../util/fonts';
import { logout } from './(auth)/logout/actions';
import style from './DiscoverButton.module.scss';

export function DiscoverButton() {
  const router = useRouter();
  return (
    <form>
      <button
        className={`${poppins.className} ${style.button}`}
        formAction={async () => {
          await logout();
          router.push('/products' as any);
          router.refresh();
        }}
      >
        Discover
      </button>
    </form>
  );
}
