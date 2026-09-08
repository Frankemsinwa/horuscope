import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { CartProvider } from '@/lib/cart-context'
import CartPanel from '@/components/CartPanel'
import './globals.css'

export const metadata: Metadata = {
  title: 'HORUSCOPE — Stories, bottled.',
  description: 'An olfactive archive of the invisible forces that shape us. Discover your fragrance constellation.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#090e13',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
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
