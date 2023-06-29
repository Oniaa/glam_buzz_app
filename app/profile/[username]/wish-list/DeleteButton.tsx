'use client';

import { useState } from 'react';
import { FavoriteResponseBodyDelete } from '../../../api/favorites/route';

type Props = {
  favoriteId: number;
};

export default function DeleteFavorite({ favoriteId }: Props) {
  const [error, setError] = useState('');

  async function delelteFavorite() {
    console.log('favorit id', favoriteId);
    const response = await fetch(`/api/favorites?favoriteId=${favoriteId}`, {
      method: 'DELETE',
      /* body: JSON.stringify({
        favoriteId,
      }), */
    });

    const data: FavoriteResponseBodyDelete = await response.json();

    if ('error' in data) {
      setError(data.error);
    }
  }

  async function handleSubmit() {
    await delelteFavorite();
  }

  return (
    <div>
      <button onClick={handleSubmit}>X</button>
      {error !== '' && <div>{error}</div>}
    </div>
  );
}
