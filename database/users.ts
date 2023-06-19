import { cache } from 'react';
import { sql } from './connect';

export type UserWithPasswordHash = {
  id: number;
  username: string;
  passwordHash: string;
};

type CreateUser = {
  id: number;
  username: string;
  bio: string | null;
  imageId: number | null;
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
  const [user] = await sql<User[]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      users.username = ${username.toLowerCase()}
 `;

  return user;
});

export const createUser = cache(
  async (
    username: string,
    passwordHash: string,
    bio?: string,
    imageId?: number,
  ) => {
    const [user] = await sql<CreateUser[]>`
    INSERT INTO users
      (username, password_hash, bio, image_id)
    VALUES
      (${username.toLowerCase()}, ${passwordHash}, ${bio || null}, ${
      imageId || null
    })
    RETURNING
    id,
    username,
    bio,
    image_id
 `;

    return user;
  },
);
