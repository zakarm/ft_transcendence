import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from 'next'
import './global.css';
// import Bootstrap from "@/components/bootstrap";


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
        {/* <Bootstrap /> */}
      </body>
    </html>
  )
}
