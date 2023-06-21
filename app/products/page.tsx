import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '../../database/products';
import style from './page.module.scss';

export const metadata = {
  title: 'Discover Page',
  description: 'Find the best beauty products',
};

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await getProducts();

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
                width={200}
                height={200}
              />
              <h3>{product.brandId}</h3>
              <h2>{product.name}</h2>
              <h4>{product.type}</h4>
              <span>{product.price}</span>
            </div>
          );
        })}
      </div>
    </main>
  );
}
