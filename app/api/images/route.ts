import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Image, uploadImage } from '../../../database/images';

type Error = {
  error: string;
};

export type ImageResponseBodyPost =
  | {
      image: Image;
    }
  | Error;

const imageSchema = z.object({
  url: z.string().min(1),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ImageResponseBodyPost>> {
  const body = await request.json();
  console.log('body', body);

  // zod please verify the body matches my schema
  const result = imageSchema.safeParse(body);
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
  const image = await uploadImage(result.data.url);

  if (!image) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'Error uploading the image',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    image: image,
  });
}
