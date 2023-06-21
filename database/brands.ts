/* import { cache } from 'react';
import { sql } from './connect';

export type Brand = {
  id: number;
  brandName: string;
};

export const getBrandByProductId = cache(async () => {
  const [brand] = await sql<Brand[]>`
  SELECT
    brands.id,
    brands.brand_name
  FROM
    brands
  INNER JOIN
    products ON (
    brands.id = products.brand_id
    )
  `;

  return brand;
});
 */
