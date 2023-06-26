import { cache } from 'react';
import { sql } from './connect';

export type ReviewUser = {
  id: number;
  userId: number;
  comment: string;
  productId: number;
  rating: number;
  username: string;
};

export const getReviewsWithUsername = cache(async () => {
  const reviewsWithUsername = await sql<ReviewUser[]>`
    SELECT
      reviews.id,
      user_id,
      comment,
      product_id,
      rating,
      users.username
    FROM
      reviews
    INNER JOIN
      users ON users.id = reviews.user_id
  `;

  return reviewsWithUsername;
});
