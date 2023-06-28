import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Favorite, pushToFavorite } from '../../../database/favorites';

type Error = {
  error: string;
};

export type FavoriteResponseBodyPost =
  | {
      favorite: Favorite;
    }
  | Error;

const favoriteSchema = z.object({
  userId: z.number(),
  productId: z.number(),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<FavoriteResponseBodyPost>> {
  const body = await request.json();
  console.log('body', body);

  // zod please verify the body matches my schema
  const result = favoriteSchema.safeParse(body);
  console.log('result', result);

  if (!result.success) {
    console.log('Validation error:', result.error);
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'The data is incomplete',
      },
      { status: 400 },
    );
  }
  // query the database to get all the animals
  const favorite = await pushToFavorite(
    result.data.userId,
    result.data.productId,
  );

  if (!favorite) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'Error creating the new favorite',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    favorite: favorite,
  });
}
