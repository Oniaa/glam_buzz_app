import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductWithBrandNameById } from '../../../database/products';
import { quicksand } from '../../../util/fonts';

// import ReviewButton from './ReviewButton';

export const metadata = {
  title: 'Single Product Page',
  description: 'This is our Single Product Page',
};

export const dynamic = 'force-dynamic';

type Props = {
  params: { productId: string };
};

export default async function ProductPage(props: Props) {
  const product = await getProductWithBrandNameById(
    Number(props.params.productId),
  );

  if (!product) {
    notFound();
  }

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

      <br />
      <button>Wish List</button>
      <br />
      <Link href={`/products/${product.id}/reviews`}>
        <span>Write a review</span>
      </Link>

      <br />
      <br />
      <div>
        {product.description}
        <br />
        {product.application}
      </div>
    </main>
  );
}
