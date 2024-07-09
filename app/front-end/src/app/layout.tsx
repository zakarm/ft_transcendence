import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from 'next';
import './global.css';
import ToastProvider from '@/components/ToastProvider';

export const metadata = {
  title: 'ft_transcendence',
  description: 'the world of game',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/icons/LOGO.svg" sizes="any" />
      </head>
      <body>
        <ToastProvider children={children} />
      </body>
    </html>
  );
}
