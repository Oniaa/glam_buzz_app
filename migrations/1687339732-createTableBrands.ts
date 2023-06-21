import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE brands (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      brand_name varchar(80) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE brands
  `;
}
