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

export const findFavorite = async (userId: number, productId: number) => {
  const [favorite] = await sql<Favorite[]>`
    SELECT * FROM favorites
    WHERE user_id = ${userId} AND product_id = ${productId}
  `;

  return favorite;
};

export const getFavorites = cache(async () => {
  const favorites = await sql<Favorite[]>`
    SELECT * FROM favorites
 `;
  return favorites;
});
