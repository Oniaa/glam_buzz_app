import Image from 'next/image';
import Link from 'next/link';
import { poppins, quicksand, raleway } from '../util/fonts';
import { DiscoverButton } from './DiscoverButton';
import style from './page.module.scss';

export const metadata = {
  title: 'Home Page',
  description: 'This is our Home Page',
};

export default function Home() {
  return (
    <main className={style.main}>
      <Image
        priority
        unoptimized={true}
        src={'/images/abstract-face-one-line-art.avif'}
        width={300}
        height={204}
        alt="One line art Face"
      />
      <h1 className={quicksand.className}>Welcome to Glam Buzz</h1>
      <p className={raleway.className}>
        The ultimate destination for beauty enthusiasts!
        <br />
        Our web app empowers you to discover, rate, and review your favorite
        beauty products with ease. Showcase your expertise by linking your
        insightful reviews to your personalized profile page.
        <br />
        Join our vibrant community and dive into a world of beauty exploration.
      </p>
      <Link href="/register" className={`${poppins.className} ${style.link}`}>
        Join
      </Link>
      <DiscoverButton />
    </main>
  );
}
