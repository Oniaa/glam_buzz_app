import { cookies } from 'next/headers';
import Image from 'next/image';
import { getFavoritesByUser } from '../../../../database/favorites';
import { getReviews } from '../../../../database/reviews';
import { getUserBySessionToken } from '../../../../database/users';
import { quicksand } from '../../../../util/fonts';
import StarRating from '../../../RatingStars';
import DeleteFavorite from './DeleteButton';
import style from './page.module.scss';

export const dynamic = 'force-dynamic';

type Props = {
  params: { username: string };
};

export default async function UserWishListPage({ params }: Props) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  const favorites = await getFavoritesByUser(params.username);
  // console.log('favorites by user', favorites);

  const reviews = await getReviews();

  const canDelete = user?.username === params.username;

  return (
    <main className={style.mainContainer}>
      <h1 className={quicksand.className}>Wish List</h1>
      <section>
        {favorites.map((favorite) => {
          const productReview = reviews.filter(
            (review) => review.productId === favorite.productId,
          );

          const ratings = productReview.map((review) => review.rating);
          const sum = ratings.reduce((total, rating) => total + rating, 0);
          const averageRating = sum / ratings.length;

          return (
            <div
              className={style.productContainer}
              key={`product-div-${favorite.id}`}
            >
              <Image
                className={style.imageContainer}
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
                <div className={style.starAndDelete}>
                  <StarRating rating={averageRating} />
                  {canDelete && <DeleteFavorite favoriteId={favorite.id} />}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
