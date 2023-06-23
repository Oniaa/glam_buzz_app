'use client';
// import { useRouter } from 'next/navigation';
import { useState } from 'react';
/* import {
  getProductWithBrandNameById,
  Product,
} from '../../../../database/products';
import { Review } from '../../../../database/review'; */
import { ReviewResponseBodyPost } from '../../../api/reviews/route';

type Props = {
  userId: number | undefined;
  productId: number;
};

export default function ReviewForm({ userId, productId }: Props) {
  const [commentInput, setCommentInput] = useState('');
  const [ratingInput, setRatingInput] = useState('');
  const [error, setError] = useState('');
  // const router = useRouter();

  async function createReview() {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify({
        comment: commentInput,
        userId,
        productId,
      }),
    });

    const data: ReviewResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      return;
    }
  }
  console.log(userId, productId, commentInput);
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <label>
        Comment
        <textarea
          value={commentInput}
          onChange={(event) => setCommentInput(event.currentTarget.value)}
        />
      </label>

      <br />
      <button onClick={async () => await createReview()}>Submit</button>
      {error !== '' && <div>{error}</div>}
    </form>
  );
}
