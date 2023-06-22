import { cache } from 'react';
import { sql } from './connect';

export type Product = {
  id: number;
  name: string;
  type: string;
  description: string;
  application: string;
  tagId: number;
  brandId: number;
  imagePath: string;
  price: number;
};

export type ProductBrand = {
  id: number;
  name: string;
  type: string;
  description: string;
  application: string;
  tagId: number;
  brandId: number;
  imagePath: string;
  price: number;
  brandName: string;
};

export const getProducts = cache(async () => {
  const products = await sql<Product[]>`
    SELECT * FROM products
 `;
  return products;
});

export const getProductById = cache(async (id: number) => {
  const [product] = await sql<Product[]>`
    SELECT
      *
    FROM
      products
    WHERE
      id = ${id}
  `;
  return product;
});

export const getProductWithBrandNameById = cache(async (productId: number) => {
  const [product] = await sql<ProductBrand[]>`
    SELECT
      products.id,
      products.name,
      products.type,
      products.description,
      products.application,
      products.tag_id,
      products.brand_id,
      products.image_path,
      products.price,
      brands.brand_name
    FROM
      products
    INNER JOIN
      brands ON brands.id = products.brand_id
    WHERE
      products.id = ${productId}
  `;

  return product;
});

export const getProductsWithBrandNames = cache(async () => {
  const productsWithBrandNames = await sql<ProductBrand[]>`
    SELECT
      products.id,
      products.name,
      products.type,
      products.description,
      products.application,
      products.tag_id,
      products.brand_id,
      products.image_path,
      products.price,
      brands.brand_name
    FROM
      products
    INNER JOIN
      brands ON brands.id = products.brand_id
  `;

  return productsWithBrandNames;
});
