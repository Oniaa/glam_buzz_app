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

export type Review = {
  id: number;
  userId: number;
  comment: string;
  productId: number;
  rating: number;
};

export const getReviewsByProductId = cache(async (productId: number) => {
  const reviewsByProductId = await sql<Review[]>`
    SELECT
      reviews.id,
      user_id,
      comment,
      product_id,
      rating
    FROM
      reviews
   INNER JOIN
      products ON products.id = reviews.product_id
    WHERE
    products.id = ${productId}
  `;
  return reviewsByProductId;
});

export const getReviewsWithUsername = cache(async (productId: number) => {
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
    INNER JOIN
      products ON products.id = reviews.product_id
    WHERE
    products.id = ${productId}
  `;

  return reviewsWithUsername;
});
