import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import { CartProvider } from '@/lib/cart-context'
import CartPanel from '@/components/CartPanel'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'HORUSCOPE — Stories, bottled.',
  description: 'An olfactive archive of the invisible forces that shape us. Discover your fragrance constellation.',
  generator: 'v0.app',
  icons: {
    icon: '/HL WMWT (G).png',
    apple: '/HL WMWT (G).png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#090e13',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`bg-background ${montserrat.variable}`}>
      <body className="antialiased">
        <CartProvider>
          {children}
          <CartPanel />
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
