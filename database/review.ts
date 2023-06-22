import { cache } from 'react';
import { sql } from './connect';

export type Review = {
  id: number;
  userId: number;
  rating: number | null;
  comment: string;
  productId: number;
  createdAt: Date;
};

export const submitReview = cache(
  async (
    userId: number,
    rating?: number,
    comment: string,
    productId: number,
    createdAt: Date,
  ) => {
    const [review] = await sql<Review[]>`
    INSERT INTO reviews
      (user_id, rating, comment, product_id, created_at)
    VALUES
      (${userId}, ${rating || null}, ${comment}, ${productId}, ${createdAt})
    RETURNING
    id,
    user_id,
    rating,
    comment,
    product_id,
    created_at
 `;

    return review;
  },
);
