import { cache } from 'react';
import { sql } from './connect';

export type ReviewSubmit = {
  id: number;
  userId: number;
  comment: string;
  productId: number;
  rating: number | null;
};

export type ReviewRating = {
  id: number;
  userId: number;
  comment: string;
  productId: number;
  rating: number;
};

export type ReviewUser = {
  id: number;
  userId: number;
  comment: string;
  productId: number;
  rating: number;
  username: string;
};

export type ReviewByUser = {
  name: string;
  type: string;
  price: number;
  imagePath: string;
  brandName: string;
  productId: number;
  id: number;
  comment: string;
  rating: number;
  username: string;
};

export const getReviews = cache(async () => {
  const reviews = await sql<ReviewRating[]>`
    SELECT * FROM reviews
 `;
  return reviews;
});

export const getReviewById = cache(async (id: number) => {
  const [review] = await sql<ReviewSubmit[]>`
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
    const [review] = await sql<ReviewSubmit[]>`
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

export const getReviewsByProductId = cache(async (productId: number) => {
  const reviewsByProductId = await sql<ReviewRating[]>`
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

export const getReviewsByUser = cache(async (username: string) => {
  const reviewsWithUsername = await sql<ReviewByUser[]>`
    SELECT
      products.name,
      products.type,
      products.price,
      products.image_path,
      brands.brand_name,
      product_id,
      reviews.id,
      comment,
      rating,
      users.username
    FROM
      reviews
    INNER JOIN
      products ON products.id = reviews.product_id
    INNER JOIN
      brands ON brands.id = products.brand_id
    INNER JOIN
      users ON users.id = reviews.user_id
   WHERE
      users.username = ${username.toLowerCase()}
  `;

  return reviewsWithUsername;
});
