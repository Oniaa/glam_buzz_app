'use client';

import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { montserrat, poppins, quicksand } from '../../../util/fonts';
import { getSafeReturnToPath } from '../../../util/validation';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';
import style from './LoginForm.module.scss';

type Props = { returnTo?: string | string[] };

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function login() {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    const data: LoginResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      console.log(data.error);
      return;
    }

    router.push(
      getSafeReturnToPath(props.returnTo) ||
        (`/profile/${data.user.username}` as Route),
    );
    // we may have in the future revalidatePath()
    router.refresh();
  }

  return (
    <main className={style.mainContainer}>
      <h1 className={montserrat.className}>GLAM BUZZ</h1>
      <h2 className={quicksand.className}>Sign In</h2>
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
          style={{ marginBottom: '40px' }}
        />
        <button
          className={`${poppins.className} ${style.button}`}
          style={{ marginBottom: '32px' }}
          onClick={async () => await login()}
        >
          Sign in
        </button>
        {error !== '' && <div>{error}</div>}
      </form>
      <div className={style.orContainer} style={{ marginBottom: '32px' }}>
        <hr className={style.hr} />
        <span className={poppins.className}>OR</span>
        <hr className={style.hr} />
      </div>
      <button className={`${poppins.className} ${style.button}`}>
        Register
      </button>
    </main>
  );
}
