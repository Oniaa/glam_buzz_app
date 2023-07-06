'use client';

import { useRouter } from 'next/navigation';
import { TbLogout } from 'react-icons/tb';
import { logout } from './(auth)/logout/actions';
import style from './LogoutButton.module.scss';

export function LogoutButton() {
  const router = useRouter();
  return (
    <form>
      <button
        className={style.button}
        formAction={async () => {
          await logout();
          router.push('/' as any);
          router.refresh();
        }}
      >
        <TbLogout size="1.65rem" />
      </button>
    </form>
  );
}
