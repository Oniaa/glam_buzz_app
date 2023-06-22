import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getProductWithBrandNameById } from '../../../../database/products';
import { getValidSessionByToken } from '../../../../database/sessions';
import { quicksand } from '../../../../util/fonts';

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

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // 3. Either redirect or render the login form
  if (!session) redirect(`/login?returnTo=/products/${product.id}/reviews`);

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
      <span>Write Comment</span>
      <button>Upload Picture</button>
      <button>Submit</button>
    </main>
  );
}
