import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductWithBrandNameById } from '../../../database/products';

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

  return (
    <main>
      <div>
        <div>
          <Image
            src={product.imagePath}
            alt="Beauty Product"
            width={100}
            height={100}
          />
          <h1>{product.name}</h1>
          <br />
          <h4>
            <span>{product.price} </span>
            <span> $</span>
          </h4>
          <br />
          <p>{product.description} </p>
          <br />
        </div>
      </div>
    </main>
  );
}
