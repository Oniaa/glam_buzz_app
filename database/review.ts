import { cache } from 'react';
import { sql } from './connect';

export type Review = {
  id: number;
  userId: number;
  comment: string;
  productId: number;
  rating: number | null;
};

export const getReviews = cache(async () => {
  const reviews = await sql<Review[]>`
    SELECT * FROM reviews
 `;

  return reviews;
});

export const getReviewById = cache(async (id: number) => {
  const [review] = await sql<Review[]>`
    SELECT
      *
    FROM
      reviews
    WHERE
      id = ${id}
  `;
  return review;
});

export const submitReview = cache(
  async (
    userId: number,
    comment: string,
    productId: number,
    rating?: number,
  ) => {
    const [review] = await sql<Review[]>`
    INSERT INTO reviews
      (user_id, comment, product_id, rating )
    VALUES
      (${userId}, ${comment}, ${productId}, ${rating || null})
    RETURNING
    id,
    user_id,
    comment,
    product_id,
    rating
 `;

    return review;
  },
);
