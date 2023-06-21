import { Sql } from 'postgres';
import { products } from '../util/productCatalogue';

export async function up(sql: Sql) {
  for (const product of products) {
    await sql`
    INSERT INTO products
      (name, type, description, application, tag_id, brand_id, image_path, price)
    VALUES
      (${product.name}, ${product.type}, ${product.description}, ${product.application}, ${product.tagId}, ${product.brandId}, ${product.imagePath}, ${product.price})
  `;
  }
}

export async function down(sql: Sql) {
  for (const product of products) {
    await sql`
      DELETE FROM products WHERE id = ${product.id}
  `;
  }
}
