import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteReviewById,
  ReviewSubmit,
  submitReview,
} from '../../../database/reviews';

type Error = {
  error: string;
};

export type ReviewResponseBodyPost =
  | {
      review: ReviewSubmit;
    }
  | Error;

export type ReviewResponseBodyDelete =
  | {
      review: ReviewSubmit;
    }
  | Error;

const reviewSchema = z.object({
  userId: z.number(),
  comment: z.string().min(1),
  productId: z.number(),
  rating: z.number().optional(),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ReviewResponseBodyPost>> {
  const body = await request.json();
  console.log('body', body);

  // zod please verify the body matches my schema
  const result = reviewSchema.safeParse(body);
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
  const review = await submitReview(
    result.data.userId,
    result.data.comment,
    result.data.productId,
    result.data.rating,
  );

  if (!review) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'Error creating the new review',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    review: review,
  });
}

export async function DELETE(
  request: NextRequest,
): Promise<NextResponse<ReviewResponseBodyDelete>> {
  const url = new URL(request.url);
  console.log('hello url', url);

  const reviewId = url.searchParams.get('reviewId');
  console.log('reviewId:', reviewId);

  if (!reviewId) {
    return NextResponse.json(
      {
        error: 'Review id is not valid',
      },
      { status: 400 },
    );
  }

  const deleteReview = await deleteReviewById(Number(reviewId));
  // query the database to get all the animals
  console.log('delete review', deleteReview);

  if (!deleteReview) {
    return NextResponse.json(
      {
        error: 'Review Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    review: deleteReview,
  });
}
