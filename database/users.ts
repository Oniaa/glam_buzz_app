import { cache } from 'react';
import { sql } from './connect';

export type UserWithPasswordHash = {
  id: number;
  username: string;
  passwordHash: string;
};

export type CreateUser = {
  id: number;
  username: string;
  bio: string;
};

export type User = {
  id: number;
  username: string;
};

export const getUserWithPasswordHashByUsername = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
    SELECT * FROM
      users
    WHERE
      users.username = ${username.toLowerCase()}
 `;

    return user;
  },
);

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<CreateUser[]>`
    SELECT
      id,
      username,
      bio
    FROM
      users
    WHERE
      users.username = ${username.toLowerCase()}
 `;

  return user;
});

export const createUser = cache(
  async (username: string, passwordHash: string, bio: string) => {
    const [user] = await sql<CreateUser[]>`
    INSERT INTO users
      (username, password_hash, bio)
    VALUES
      (${username.toLowerCase()}, ${passwordHash}, ${bio})
    RETURNING
    id,
    username,
    bio
 `;

    return user;
  },
);

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<User[]>`
  SELECT
    users.id,
    users.username
  FROM
    users
  INNER JOIN
    sessions ON (
      sessions.token = ${token} AND
      sessions.user_id = users.id AND
      sessions.expiry_timestamp > now()
    )
  `;

  return user;
});
