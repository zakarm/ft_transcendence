import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from 'next'
import './global.css';
import ToastProvider  from '@/components/ToastProvider';

export const metadata = {
  title: 'ft_transcendence',
  description: 'the world of game',
}

export default function RootLayout({children}: {children: React.ReactNode}) 
{
  return (
    <html lang="en">
      <body>
      <ToastProvider children={children} />
      {/* </ToastProvider> */}
      </body>
    </html>
  )
}
