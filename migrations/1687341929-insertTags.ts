import { Sql } from 'postgres';
import { tags } from '../util/tagCatalogue';

export async function up(sql: Sql) {
  for (const tag of tags) {
    await sql`
    INSERT INTO tags
      (name)
    VALUES
      (${tag.name})
  `;
  }
}

export async function down(sql: Sql) {
  for (const tag of tags) {
    await sql`
      DELETE FROM tags WHERE id = ${tag.id}
  `;
  }
}
