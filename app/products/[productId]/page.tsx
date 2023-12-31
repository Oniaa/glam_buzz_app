import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductWithBrandNameById } from '../../../database/products';
import {
  getReviewsByProductId,
  getReviewsWithUsername,
} from '../../../database/reviews';
import { getUserBySessionToken } from '../../../database/users';
import { poppins, quicksand, raleway } from '../../../util/fonts';
import StarRating from '../../RatingStars';
import style from './page.module.scss';
import WishListButton from './WishListButton';

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
  const reviewCount = allreviews.length;

  const ratings = allreviews.map((review) => review.rating);
  const ratingCount = ratings.length;

  const sum = ratings.reduce((total, rating) => total + rating, 0);
  const averageRating = Math.round((sum / ratings.length) * 10) / 10;

  // console.log('Review Count:', reviewCount);
  // console.log('Rating Count:', ratingCount);

  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the sessionToken has a valid session
  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));
  // console.log('user', user);

  return (
    <main className={style.mainContainer}>
      <div className={style.productTitle}>
        <h3 className={quicksand.className}>{product.brandName}</h3>
        <h2 className={quicksand.className}>{product.name}</h2>
        <h4 className={quicksand.className}>{product.type}</h4>
      </div>
      <Image
        className={style.img}
        src={product.imagePath}
        alt="Beauty Product"
        width={300}
        height={300}
      />

      <div className={style.ratingAndPrice}>
        <StarRating rating={averageRating} />
        {isNaN(averageRating) ? null : (
          <span className={quicksand.className}>{averageRating}</span>
        )}
        <span className={`${quicksand.className} ${style.price}`}>
          {product.price}€
        </span>
      </div>
      <div className={style.reviewAndRating}>
        {isNaN(reviewCount) ? null : (
          <span className={quicksand.className}>{reviewCount} reviews</span>
        )}{' '}
        {isNaN(ratingCount) ? null : (
          <span className={quicksand.className}>{ratingCount} ratings</span>
        )}
      </div>
      <hr className={style.line} />
      <Link
        className={`${poppins.className} ${style.reviewBnt}`}
        href={`/products/${product.id}/reviews` as any}
      >
        <span>Review</span>
      </Link>

      <WishListButton userId={user?.id} productId={product.id} />

      <section>
        <div className={style.productText}>
          <span className={quicksand.className}>Product Details</span>
          <br />
          <p className={raleway.className}>{product.description}</p>
          <br />
          <span className={quicksand.className}>Application</span>
          <br />
          <p className={raleway.className}>{product.application}</p>
        </div>
        <span className={`${quicksand.className} ${style.title}`}>
          Community Reviews
        </span>
        <div>
          {reviews.map((review) => {
            return (
              <div className={style.reviews} key={`review-div-${review.id}`}>
                <div className={style.nameAndStar}>
                  <span className={quicksand.className}>{review.username}</span>
                  <StarRating rating={review.rating} />
                </div>
                <p className={raleway.className}>{review.comment}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
