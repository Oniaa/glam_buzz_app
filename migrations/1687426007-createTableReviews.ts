import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE reviews (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer NOT NULL REFERENCES users (id),
      rating integer,
      comment varchar(1000) NOT NULL,
      product_id integer NOT NULL REFERENCES products (id),
      created_at TIMESTAMP DEFAULT NOW()

    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE reviews
  `;
}
