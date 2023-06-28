'use client';
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

  async function createFavorite() {
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
  }

  async function handleSubmit() {
    await createFavorite();
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
