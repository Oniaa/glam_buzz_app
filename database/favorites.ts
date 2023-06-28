import { cache } from 'react';
import { sql } from './connect';

export type Favorite = {
  id: number;
  userId: number;
  productId: number;
};

export const pushToFavorite = cache(
  async (userId: number, productId: number) => {
    const [favorite] = await sql<Favorite[]>`
    INSERT INTO favorites
      (user_id, product_id)
    VALUES
      (${userId}, ${productId})
    RETURNING
    id,
    user_id,
    product_id
 `;

    return favorite;
  },
);
