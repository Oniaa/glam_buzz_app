import Image from 'next/image';
import Link from 'next/link';
import { getProductsWithBrandNames } from '../../database/products';
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
    <main>
      <h1>Discover</h1>
      <div>
        {products.map((product) => {
          return (
            <div key={`product-div-${product.id}`}>
              <Image
                src={product.imagePath}
                alt="Beauty Product"
                width={100}
                height={100}
              />
              <div>
                <h3>{product.brandName}</h3>
                <h2>{product.name}</h2>
                <h4>{product.type}</h4>
              </div>
              <span>{product.price}</span>
            </div>
          );
        })}
      </div>
    </main>
  );
}
