import { cache } from 'react';
import { sql } from './connect';

export type Image = {
  id: number;
  url: string;
};

export const uploadImage = cache(async (url: string) => {
  const [image] = await sql<Image[]>`
    INSERT INTO images
      (url)
    VALUES
      (${url})
    RETURNING
    id,
    url
 `;

  return image;
});
