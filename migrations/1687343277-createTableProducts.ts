import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE products (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(100) NOT NULL,
      type varchar(100) NOT NULL,
      description varchar(1700) NOT NULL,
      application varchar(1000) NOT NULL,
      tag_id integer NOT NULL REFERENCES tags (id),
      brand_id integer NOT NULL REFERENCES brands (id),
      image_path varchar(150) NOT NULL,
      price integer NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE products
  `;
}
