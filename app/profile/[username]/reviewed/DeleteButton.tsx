'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ReviewResponseBodyDelete } from '../../../api/reviews/route';

type Props = {
  reviewId: number;
};

export default function DeleteReview({ reviewId }: Props) {
  const [error, setError] = useState('');

  const router = useRouter();

  async function deleteReview() {
    console.log('review id', reviewId);
    const response = await fetch(`/api/reviews?reviewId=${reviewId}`, {
      method: 'DELETE',
    });

    const data: ReviewResponseBodyDelete = await response.json();
    console.log('response data', data);

    if ('error' in data) {
      setError(data.error);
    }

    router.refresh();
  }

  return (
    <div>
      <button onClick={async () => await deleteReview()}>X</button>
      {error !== '' && <div>{error}</div>}
    </div>
  );
}
