import Image from 'next/image';
import Link from 'next/link';
import { getProductsWithBrandNames } from '../../database/products';
import { poppins, quicksand } from '../../util/fonts';
// import { getBrandByProductId } from '../../database/brands';
// import { getProducts } from '../../database/products';
import style from './page.module.scss';

export const metadata = {
  title: 'Discover Page',
  description: 'Find the best beauty products',
};

export const dynamic = 'force-dynamic';
type Props = {
  params: { productId: string };
};

export default async function ProductsPage(props: Props) {
  // const products = await getProducts();
  // const brand = await getBrandByProductId();
  const products = await getProductsWithBrandNames();
  console.log(products);

  return (
    <main className={style.mainContainer}>
      <h1 className={quicksand.className}>Discover</h1>
      <div className={`${quicksand.className} ${style.searchBar}`}>Search</div>
      <div className={style.tagContainer}>
        <span className={`${poppins.className} ${style.tag}`}>Face</span>
        <span className={`${poppins.className} ${style.tag}`}>Body</span>
        <span className={`${poppins.className} ${style.tag3}`}>Make up</span>
        <span className={`${poppins.className} ${style.tag}`}>Hair</span>
      </div>
      <section>
        {products.map((product) => {
          return (
            <div
              className={style.productContainer}
              key={`product-div-${product.id}`}
            >
              <Image
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
                  <span>Rating Stars</span>
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
