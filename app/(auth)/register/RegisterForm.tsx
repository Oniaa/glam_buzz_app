'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { montserrat, poppins, quicksand } from '../../../util/fonts';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';
import style from './RegisterForm.module.scss';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function register() {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    const data: RegisterResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      return;
    }

    console.log(data.user);
    router.push(`/profile/${data.user.username}`);
    // we may have in the future revalidatePath()
    router.refresh();
  }
  }

  return (
    <main className={style.mainContainer}>
      <h1 className={montserrat.className}>GLAM BUZZ</h1>
      <h2 className={quicksand.className}>Sign Up</h2>
      <form
        className={style.formContainer}
        onSubmit={(event) => event.preventDefault()}
      >
        <input
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
          placeholder="Enter Name"
          className={poppins.className}
          style={{ marginBottom: '32px' }}
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          placeholder="Enter Password"
          className={poppins.className}
          style={{ marginBottom: '48px' }}
        />
        <button
          className={`${poppins.className} ${style.button}`}
          onClick={async () => await register()}
        >
          Sign up
        </button>
        {error !== '' && <div>{error}</div>}
      </form>
    </main>
  );
}
