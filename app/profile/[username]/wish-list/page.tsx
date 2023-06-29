import Image from 'next/image';
import { getFavoritesByUser } from '../../../../database/favorites';
import { getReviews } from '../../../../database/reviews';
import { quicksand } from '../../../../util/fonts';
import StarRating from '../../../RatingStars';
import DeleteFavorite from './DeleteButton';
import style from './page.module.scss';

export const dynamic = 'force-dynamic';

type Props = {
  params: { username: string };
};

export default async function UserWishListPage({ params }: Props) {
  const favorites = await getFavoritesByUser(params.username);
  // console.log('favorites by user', favorites);

  const reviews = await getReviews();

  return (
    <main className={style.mainContainer}>
      <h1 className={quicksand.className}>Wish List</h1>
      <section className={style.sectionContainer}>
        {favorites.map((favorite) => {
          console.log('favorite map id', favorite.id);
          const productReview = reviews.filter(
            (review) => review.productId === favorite.productId,
          );

          const ratings = productReview.map((review) => review.rating);
          const sum = ratings.reduce((total, rating) => total + rating, 0);
          const averageRating = sum / ratings.length;

          return (
            <div key={`product-div-${favorite.id}`}>
              <div>
                <Image
                  src={favorite.imagePath}
                  alt="Beauty Product"
                  width={100}
                  height={100}
                />
                <div className={style.productTitle}>
                  <h3 className={quicksand.className}>{favorite.brandName}</h3>
                  <h2 className={quicksand.className}>{favorite.name}</h2>
                  <h4 className={quicksand.className}>
                    {favorite.type}
                    <span>{favorite.price}€</span>
                  </h4>
                  <StarRating rating={averageRating} />
                </div>
                <DeleteFavorite favoriteId={favorite.id} />
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
