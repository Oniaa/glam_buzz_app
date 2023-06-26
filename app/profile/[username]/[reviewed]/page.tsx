import Image from 'next/image';
import { getReviewsByUser } from '../../../../database/reviews';
import { quicksand } from '../../../../util/fonts';
import style from './page.module.scss';

type Props = {
  params: { username: string };
};

export default async function UserReviewedPage({ params }: Props) {
  const reviews = await getReviewsByUser(params.username);
  console.log('reviews by user', reviews);
  return (
    <main>
      <h1>Reviewed products</h1>
      <section className={style.sectionContainer}>
        {reviews.map((review) => {
          return (
            <div key={`product-div-${review.id}`}>
              <Image
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
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
