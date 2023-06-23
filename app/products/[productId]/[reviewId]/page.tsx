import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getProductWithBrandNameById } from '../../../../database/products';
import { getReviews } from '../../../../database/review';
import { getValidSessionByToken } from '../../../../database/sessions';
import { getUserBySessionToken } from '../../../../database/users';
import { quicksand } from '../../../../util/fonts';
import ReviewForm from './ReviewForm';

// import ReviewButton from './ReviewButton';

export const metadata = {
  title: 'Single Product Page',
  description: 'This is our Single Product Page',
};

export const dynamic = 'force-dynamic';

type Props = {
  params: { productId: string };
};

export default async function ReviewPage(props: Props) {
  const product = await getProductWithBrandNameById(
    Number(props.params.productId),
  );

  if (!product) {
    notFound();
  }
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the sessionToken has a valid session
  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));
  console.log('user', user);

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // 3. Either redirect or render the login form
  if (!session) redirect(`/login?returnTo=/products/${product.id}/reviews`);

  const reviews = await getReviews();

  return (
    <main>
      <div>
        <h3 className={quicksand.className}>{product.brandName}</h3>
        <h2 className={quicksand.className}>{product.name}</h2>
        <h4 className={quicksand.className}>{product.type}</h4>
      </div>
      <Image
        src={product.imagePath}
        alt="Beauty Product"
        width={100}
        height={100}
      />
      {product.price}
      <br />
      <span>RATING</span>
      <br />
      <span>Write Comment</span>
      <ReviewForm userId={user?.id} productId={product.id} />
      <br />
    </main>
  );
}
