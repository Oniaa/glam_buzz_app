import styles from './page.module.scss';

export const metadata = {
  title: 'Home Page',
  description: 'This is our Home Page',
};

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>home</h1>
    </main>
  );
}
