import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE favorites (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer NOT NULL REFERENCES users (id),
      product_id integer NOT NULL REFERENCES products (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE favorites
  `;
}
