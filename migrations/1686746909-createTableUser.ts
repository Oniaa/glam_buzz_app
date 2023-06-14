import { Sql } from 'postgres';

export type User = {
  id: number;
  username: string;
  password_hash: string;
  bio: string | null;
  image_id: number | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(80) NOT NULL,
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
