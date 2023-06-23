import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductWithBrandNameById } from '../../../database/products';
import { poppins, quicksand, raleway } from '../../../util/fonts';
import style from './page.module.scss';

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
    <main className={style.mainContainer}>
      <div className={style.productTitle}>
        <h3 className={quicksand.className}>{product.brandName}</h3>
        <h2 className={quicksand.className}>{product.name}</h2>
        <h4 className={quicksand.className}>{product.type}</h4>
      </div>
      <Image
        src={product.imagePath}
        alt="Beauty Product"
        width={300}
        height={300}
      />

      <div className={style.ratingAndPrice}>
        <span>RATING STARS</span>
        <span className={`${quicksand.className} ${style.price}`}>
          {product.price}€
        </span>
      </div>

      <Link
        className={`${poppins.className} ${style.reviewBnt}`}
        href={`/products/${product.id}/reviews`}
      >
        <span>Review</span>
      </Link>
      <button className={`${poppins.className} ${style.wishListBtn}`}>
        Wish List
      </button>

      <div className={style.productText}>
        <span className={quicksand.className}>Product Details</span>
        <br />
        <p className={raleway.className}>{product.description}</p>
        <br />
        <span className={quicksand.className}>Application</span>
        <br />
        <p className={raleway.className}>{product.application}</p>
        <br />
        <span className={quicksand.className}>Community Reviews</span>
      </div>
    </main>
  );
}
