import Image from 'next/image';
import { getReviewsByUser } from '../../../../database/reviews';
import { quicksand, raleway } from '../../../../util/fonts';
import StarRating from '../../../RatingStars';
import style from './page.module.scss';

type Props = {
  params: { username: string };
};

export default async function UserReviewedPage({ params }: Props) {
  const reviews = await getReviewsByUser(params.username);
  // console.log('reviews by user', reviews);
  return (
    <main className={style.mainContainer}>
      <h1 className={quicksand.className}>Reviewed products</h1>
      <section>
        {reviews.map((review) => {
          return (
            <div
              className={style.contentBorder}
              key={`product-div-${review.id}`}
            >
              <div className={style.productContainer}>
                <Image
                  className={style.imageContainer}
                  src={review.imagePath}
                  alt="Beauty Product"
                  width={100}
                  height={100}
                />
                <div className={style.productTitle}>
                  <h3 className={quicksand.className}>{review.brandName}</h3>
                  <h2 className={quicksand.className}>{review.name}</h2>
                  <h4 className={quicksand.className}>
                    {review.type}
                    <span>{review.price}€</span>
                  </h4>

                  <span className={quicksand.className}>
                    Rated this product:
                  </span>
                  <StarRating rating={review.rating} />
                </div>
              </div>
              <hr className={style.line} />
              <p className={`${raleway.className} ${style.review}`}>
                Review:
                <br />
                <br />
                {review.comment}
              </p>
            </div>
          );
        })}
      </section>
    </main>
  );
}
