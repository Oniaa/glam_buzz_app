import { Sql } from 'postgres';
import { brands } from '../util/brandCatalogue';

export async function up(sql: Sql) {
  for (const brand of brands) {
    await sql`
    INSERT INTO brands
      (brand_name)
    VALUES
      (${brand.brandName})
  `;
  }
}

export async function down(sql: Sql) {
  for (const brand of brands) {
    await sql`
      DELETE FROM brands WHERE id = ${brand.id}
  `;
  }
}
