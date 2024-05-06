import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from 'next'
import './global.css';


export const metadata = {
  title: 'ft_transcendence',
  description: 'the world of game',
}

export default function RootLayout({children,}: {children: React.ReactNode}) 
{
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
