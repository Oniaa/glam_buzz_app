import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  getUserWithPasswordHashByUsername,
  User,
} from '../../../../database/users';

type Error = {
  error: string;
};

export type LoginResponseBodyPost =
  | {
      user: User;
    }
  | Error;

const userSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<LoginResponseBodyPost>> {
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

  const userWithPasswordHash = await getUserWithPasswordHashByUsername(
    result.data.username,
  );

  console.log('userWithHash', userWithPasswordHash);

  if (!userWithPasswordHash) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'user or password not valid',
      },
      { status: 401 },
    );
  }

  // 3. hash the password
  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  console.log(
    'data result',
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  console.log('valid password:', isPasswordValid);

  if (!isPasswordValid) {
    return NextResponse.json(
      {
        error: 'user or password not valid',
      },
      { status: 401 },
    );
  }

  return NextResponse.json(
    {
      user: {
        id: userWithPasswordHash.id,
        username: userWithPasswordHash.username,
      },
    },
    {
      status: 200,
    },
  );
}
