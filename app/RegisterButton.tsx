'use client';

import { useRouter } from 'next/navigation';
import style from './RegisterButton.module.scss';

export function RegisterButton() {
  const router = useRouter();
  return (
    <form>
      <button
        type="button"
        className={style.button}
        onClick={() => router.push('/register')}
      >
        Sign up
      </button>
    </form>
  );
}
