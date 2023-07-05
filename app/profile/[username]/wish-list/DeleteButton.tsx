'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FavoriteResponseBodyDelete } from '../../../api/favorites/route';

type Props = {
  favoriteId: number;
};

export default function DeleteFavorite({ favoriteId }: Props) {
  const [error, setError] = useState('');

  const router = useRouter();

  async function deleteFavorite() {
    console.log('favorite id', favoriteId);
    const response = await fetch(`/api/favorites?favoriteId=${favoriteId}`, {
      method: 'DELETE',
    });

    const data: FavoriteResponseBodyDelete = await response.json();
    console.log('response data', data);

    if ('error' in data) {
      setError(data.error);
    }

    router.refresh();
  }

  return (
    <div>
      <button onClick={async () => await deleteFavorite()}>X</button>
      {error !== '' && <div>{error}</div>}
    </div>
  );
}
