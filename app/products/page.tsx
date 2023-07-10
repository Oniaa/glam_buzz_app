import Image from 'next/image';
import Link from 'next/link';
import { getProductsWithBrandNames } from '../../database/products';
import { getReviews } from '../../database/reviews';
import { quicksand } from '../../util/fonts';
import StarRating from '../RatingStars';
// import { getBrandByProductId } from '../../database/brands';
// import { getProducts } from '../../database/products';
import style from './page.module.scss';

// import SearchBar from './SearBarch';

export const metadata = {
  title: 'Discover Page',
  description: 'Find the best beauty products',
  shortcut: '/favicon.ico',
};

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  // const products = await getProducts();
  // const brand = await getBrandByProductId();
  const products = await getProductsWithBrandNames();
  // console.log(products);
  const reviews: any = await getReviews();
  console.log('reviews', reviews);

  /*   const handleSearch = (searchProduct: string) => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchProduct.toLowerCase()) ||
        product.brandName.toLowerCase().includes(searchProduct.toLowerCase()),
    );
    // Use the filtered products as needed
    console.log(filtered);
  }; */

  return (
    <main className={style.mainContainer}>
      <h1 className={quicksand.className}>Discover</h1>
      {/*   <div className={`${quicksand.className} ${style.searchBar}`}>Search</div>
      <div className={style.tagContainer}>
        <span className={`${poppins.className} ${style.tag}`}>Face</span>
        <span className={`${poppins.className} ${style.tag}`}>Body</span>
        <span className={`${poppins.className} ${style.tag3}`}>Make up</span>
        <span className={`${poppins.className} ${style.tag}`}>Hair</span>
      </div> */}
      <section>
        {products.map((product) => {
          const productReview = reviews.filter(
            (review: any) => review.productId === product.id,
          );

          const ratings = productReview.map((review: any) => review.rating);
          console.log('ratings', ratings);
          const sum = ratings.reduce(
            (total: any, rating: any) => total + rating,
            0,
          );
          const averageRating = sum / ratings.length;
          console.log('average rating', averageRating);

          return (
            <div
              className={style.productContainer}
              key={`product-div-${product.id}`}
            >
              <Image
                priority
                unoptimized={true}
                className={style.imageContainer}
                src={product.imagePath}
                alt="Beauty Product"
                width={100}
                height={100}
              />
              <div className={style.textContainer}>
                <Link href={`/products/${product.id}` as any}>
                  <h3 className={quicksand.className}>{product.brandName}</h3>
                  <h2 className={quicksand.className}>{product.name}</h2>
                  <h4 className={quicksand.className}>{product.type}</h4>
                </Link>
                <div className={style.ratingAndPrice}>
                  <StarRating rating={averageRating} />
                  <span className={`${quicksand.className} ${style.price}`}>
                    {product.price}€
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
