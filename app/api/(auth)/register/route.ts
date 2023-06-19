import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createUser,
  getUserByUsername,
  User,
} from '../../../../database/users';

type Error = {
  error: string;
};

export type RegisterResponseBodyPost =
  | {
      user: User;
    }
  | Error;

const userSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  bio: z.string().optional(),
  imageId: z.number().optional(),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBodyPost>> {
  const body = await request.json();

  const result = userSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'username or password missing',
      },
      { status: 400 },
    );
  }

  if (await getUserByUsername(result.data.username)) {
    return NextResponse.json(
      {
        error: 'username is already used',
      },
      { status: 406 },
    );
  }

  // console.log('query', await getUserByUsername(result.data.username));

  const passwordHash = await bcrypt.hash(result.data.password, 10);

  // console.log('from bcrypt', passwordHash, result.data.password);

  const newUser = await createUser(
    result.data.username,
    passwordHash,
    result.data.bio,
    result.data.imageId,
  );

  // console.log('new User', newUser);

  if (!newUser) {
    return NextResponse.json(
      {
        error: 'Error creating the new user',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ user: newUser });
}
