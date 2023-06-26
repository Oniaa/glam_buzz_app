'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { poppins, quicksand, raleway } from '../../../../util/fonts';
import { ReviewResponseBodyPost } from '../../../api/reviews/route';
import style from './ReviewForm.module.scss';

type Props = {
  userId: number | undefined;
  productId: number;
};

export default function ReviewForm({ userId, productId }: Props) {
  const [commentInput, setCommentInput] = useState('');
  const [ratingInput, setRatingInput] = useState(0);
  const [error, setError] = useState('');
  const router = useRouter();

  async function createReview() {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify({
        comment: commentInput,
        userId,
        productId,
        rating: ratingInput,
      }),
    });

    const data: ReviewResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      return;
    }
  }

  const handleRating = (selectedRating: number) => {
    setRatingInput(selectedRating);
  };
  const handleRatingKeyDown = (
    event: React.KeyboardEvent<HTMLSpanElement>,
    newRating: number,
  ) => {
    if (event.key === 'Enter') {
      setRatingInput(newRating);
    }
  };
  async function handleReviewSubmit() {
    await createReview();
    router.push(`/products/${productId}` as any);
  }

  console.log('review + rating', userId, productId, commentInput, ratingInput);
  return (
    <form
      className={style.formContainer}
      onSubmit={(event) => event.preventDefault()}
    >
      <div>
        <span className={quicksand.className}>Rate this product:</span>
        <div>
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={`rating-${value}`}
              onClick={() => handleRating(value)}
              onKeyDown={(event) => handleRatingKeyDown(event, value)}
              role="button"
              style={{ cursor: 'pointer' }}
              tabIndex={0}
            >
              {value <= ratingInput ? '★' : '☆'}
            </span>
          ))}
        </div>
      </div>
      <label>
        <textarea
          className={raleway.className}
          placeholder="Write Review"
          value={commentInput}
          onChange={(event) => setCommentInput(event.currentTarget.value)}
        />
      </label>
      <button className={`${poppins.className} ${style.button}`}>
        Upload Picture
      </button>
      <button
        className={`${poppins.className} ${style.button}`}
        onClick={handleReviewSubmit}
      >
        Submit
      </button>
      {error !== '' && <div>{error}</div>}
    </form>
  );
}
