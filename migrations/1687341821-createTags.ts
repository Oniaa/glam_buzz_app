import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE tags (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      tag_name varchar(80) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE tags
  `;
}
