'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { poppins } from '../../../util/fonts';
import { FavoriteResponseBodyPost } from '../../api/favorites/route';
import style from './WishListButton.module.scss';

type Props = {
  userId: number | undefined;
  productId: number;
};

export default function WishListButton({ userId, productId }: Props) {
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  async function pushToFavorite() {
    const response = await fetch('/api/favorites', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        productId,
      }),
    });

    const data: FavoriteResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
    } else {
      setSuccessMessage('Added to wish list!');
    }

    router.refresh();
  }

  async function handleSubmit() {
    await pushToFavorite();
  }

  return (
    <div>
      <button
        onClick={handleSubmit}
        className={`${poppins} ${style.wishListBtn}`}
      >
        Wish List
      </button>
      {error !== '' && <div>{error}</div>}
      {successMessage !== '' && <div>{successMessage}</div>}
    </div>
  );
}
