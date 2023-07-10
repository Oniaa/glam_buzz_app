import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteFavoriteById,
  Favorite,
  findFavorite,
  getFavorites,
  pushToFavorite,
} from '../../../database/favorites';

type Error = {
  error: string;
};

export type FavoriteResponseBodyPost =
  | {
      favorite: Favorite;
    }
  | Error;

export type FavoriteResponseBodyGet =
  | {
      favorite: Favorite[];
    }
  | Error;

export type FavoriteResponseBodyDelete =
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
        error: 'Please login',
      },
      { status: 400 },
    );
  }

  const existingFavorite = await findFavorite(
    result.data.userId,
    result.data.productId,
  );

  console.log('existing', existingFavorite);

  if (existingFavorite) {
    return NextResponse.json(
      {
        error: 'Product already exists in the wishlist',
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

export async function GET(): Promise<NextResponse<FavoriteResponseBodyGet>> {
  // query the database to get the favorites
  const favorites = await getFavorites();

  return NextResponse.json({
    favorite: favorites,
  });
}

export async function DELETE(
  request: NextRequest,
): Promise<NextResponse<FavoriteResponseBodyDelete>> {
  const url = new URL(request.url);
  // console.log('hello url', url);

  const favoriteId = url.searchParams.get('favoriteId');
  console.log('favoriteId:', favoriteId);

  if (!favoriteId) {
    return NextResponse.json(
      {
        error: 'Favorite id is not valid',
      },
      { status: 400 },
    );
  }

  const deleteFavorite = await deleteFavoriteById(Number(favoriteId));
  // query the database to get all the animals
  console.log('delete favorite', deleteFavorite);

  if (!deleteFavorite) {
    return NextResponse.json(
      {
        error: 'Favorite Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    favorite: deleteFavorite,
  });
}
