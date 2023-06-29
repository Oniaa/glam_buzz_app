import { cache } from 'react';
import { sql } from './connect';

export type Favorite = {
  id: number;
  userId: number;
  productId: number;
};

export type FavoriteDelete = {
  id: number;
};

export type FavoritesByUser = {
  productId: number;
  name: string;
  type: string;
  price: number;
  imagePath: string;
  brandName: string;
  userId: number;
  username: string;
  id: number;
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

export const getFavoritesByUser = cache(async (username: string) => {
  const favoritesWithUsername = await sql<FavoritesByUser[]>`
    SELECT
      product_id,
      products.name,
      products.type,
      products.price,
      products.image_path,
      brands.brand_name,
      user_id,
      users.username,
      favorites.id
    FROM
      favorites
    INNER JOIN
    products ON products.id = favorites.product_id
    INNER JOIN
      brands ON brands.id = products.brand_id
    INNER JOIN
      users ON users.id = favorites.user_id
   WHERE
      users.username = ${username.toLowerCase()}
  `;

  return favoritesWithUsername;
});

export const deleteFavoriteById = cache(async (id: number) => {
  const [favorite] = await sql<Favorite[]>`
    DELETE FROM
      favorites
    WHERE
      id = ${id}
    RETURNING *
 `;
  return favorite;
});
