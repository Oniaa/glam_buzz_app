import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username varchar(80) NOT NULL,
      password_hash varchar(80) NOT NULL,
      bio varchar(500),
      image_id integer
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE users
  `;
}
