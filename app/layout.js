import './globals.scss';

export const metadata = {
  title: 'Glam Buzz',
  description: 'Get all the reviews of you favorite products',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
