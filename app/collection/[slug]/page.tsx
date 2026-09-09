import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getProduct, products } from '@/lib/products'
import BagButton from '@/components/BagButton'
import AddToBag from '@/components/AddToBag'

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })) }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  return (
    <main className="min-h-screen bg-[#050b13] text-[#eee8da]">
      <header className="flex items-center justify-between border-b border-[#66532f] px-6 py-6 lg:px-12">
        <Link href="/collection" className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.15em] text-[#a7a39a] hover:text-[#f0cc7d]">
          <ArrowLeft size={15}/> The archive
        </Link>
        <Link href="/" className="inline-flex items-center" aria-label="HORUSCOPE Home">
          <Image
            src="/HL WMWT (G).png"
            alt="HORUSCOPE"
            width={150}
            height={32}
            priority
            className="h-7 w-auto object-contain transition-opacity duration-300 hover:opacity-85"
          />
        </Link>
        <BagButton />
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-20 lg:px-12 lg:py-20">
        <div className="relative aspect-[4/5] overflow-hidden border border-[#66532f] bg-[#091522] lg:sticky lg:top-8 lg:h-[calc(100vh-10rem)]">
          <Image src={product.image} alt={`${product.name} fragrance bottle`} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 55vw"/>
          <span className="absolute left-5 top-5 font-mono text-[10px] tracking-[.16em] text-[#f0cc7d]">{product.code}</span>
        </div>

        <div className="flex flex-col justify-center py-4">
          <p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#c19a52]">The archive / {product.family}</p>
          <h1 className="mt-6 font-serif text-6xl leading-[.9] tracking-[-.04em] sm:text-8xl">{product.name}</h1>
          <p className="mt-6 max-w-lg font-serif text-xl leading-relaxed text-[#a7a39a]">{product.description}</p>

          <div className="mt-8 flex items-center justify-between border-y border-[#66532f] py-5 font-mono text-xs uppercase tracking-[.12em]">
            <span>{product.notes}</span>
            <span>${product.price}</span>
          </div>

          <div className="mt-10 border border-[#66532f] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#c19a52]">Personalization / your root</p>
            <h2 className="mt-4 font-serif text-3xl">A scent becomes yours by remembering you.</h2>
            <p className="mt-4 leading-7 text-[#a7a39a]">{product.story}</p>
            <p className="mt-5 border-t border-[#66532f] pt-5 font-mono text-xs leading-6 tracking-[.08em] text-[#eee8da]">YOUR ORIGIN — {product.origin}</p>
          </div>

          <AddToBag product={product} />

          <div className="mt-12 grid gap-6 border-t border-[#66532f] pt-8 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.15em] text-[#c19a52]">The ritual</p>
              <p className="mt-3 leading-6 text-[#a7a39a]">Apply to pulse points and let the composition find its own temperature.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.15em] text-[#c19a52]">The constellation</p>
              <p className="mt-3 leading-6 text-[#a7a39a]">Aligned with {product.zodiac.join(' and ')} — a personal signal, never a prescription.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
