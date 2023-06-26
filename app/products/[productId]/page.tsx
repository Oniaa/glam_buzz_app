import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductWithBrandNameById } from '../../../database/products';
import {
  getReviewsByProductId,
  getReviewsWithUsername,
} from '../../../database/reviews';
import { poppins, quicksand, raleway } from '../../../util/fonts';
import StarRating from '../../RatingStars';
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

  const reviews = await getReviewsWithUsername(Number(props.params.productId));
  // console.log('reviews', reviews);
  const allreviews = await getReviewsByProductId(
    Number(props.params.productId),
  );
  console.log('all reviews', allreviews);
  const ratings = allreviews.map((review) => review.rating);
  console.log('ratings', ratings);
  const sum = ratings.reduce((total, rating) => total + rating, 0);
  const averageRating = sum / ratings.length;
  console.log('average rating', averageRating);

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
        <StarRating rating={averageRating} />
        {isNaN(averageRating) ? null : <span>{averageRating}</span>}
        <span className={`${quicksand.className} ${style.price}`}>
          {product.price}€
        </span>
      </div>

      <Link
        className={`${poppins.className} ${style.reviewBnt}`}
        href={`/products/${product.id}/reviews` as any}
      >
        <span>Review</span>
      </Link>
      <button className={`${poppins.className} ${style.wishListBtn}`}>
        Wish List
      </button>

      <section className={style.productText}>
        <span className={quicksand.className}>Product Details</span>
        <br />
        <p className={raleway.className}>{product.description}</p>
        <br />
        <span className={quicksand.className}>Application</span>
        <br />
        <p className={raleway.className}>{product.application}</p>
        <br />
        <span className={quicksand.className}>Community Reviews</span>
        <div>
          {reviews.map((review) => {
            return (
              <div key={`review-div-${review.id}`}>
                <span>{review.username}</span>
                <br />
                <StarRating rating={review.rating} />
                <p>{review.comment}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
