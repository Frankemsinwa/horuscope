'use client'
import { useEffect } from 'react'
import Image from 'next/image'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export default function CartPanel() {
  const { items, count, total, open, setOpen, remove, setQty, clear } = useCart()

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const whatsappLink = () => {
    const lines = items.map(i => {
      const price = i.size === '50ml' ? i.product.price50ml : i.product.price100ml
      return `${i.qty}x ${i.product.name} (${i.size.toUpperCase()}) — ₦${(price * i.qty).toLocaleString()}`
    })
    const msg = encodeURIComponent(`Hello HORUSCOPE — I'd like to order:\n\n${lines.join('\n')}\n\nTotal: ₦${total.toLocaleString()}`)
    return `https://wa.me/2349017769998?text=${msg}`
  }

  return (
    <>
      <div className={`cart-overlay ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`cart-panel ${open ? 'is-open' : ''}`} aria-label="Shopping bag">
        <div className="flex items-center justify-between border-b border-[#66532f] px-6 py-5">
          <h2 className="font-mono text-[10px] uppercase tracking-[.18em] text-[#c19a52]">Your bag ({count})</h2>
          <button onClick={() => setOpen(false)} aria-label="Close bag" className="p-1 hover:text-[#f0cc7d]"><X size={18}/></button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag size={32} className="text-[#66532f]"/>
            <p className="font-serif text-lg text-[#a7a39a]">Your bag is empty.</p>
            <p className="font-mono text-[10px] uppercase tracking-[.15em] text-[#66532f]">Discover something that stays.</p>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 py-4">
              {items.map(i => {
                const price = i.size === '50ml' ? i.product.price50ml : i.product.price100ml
                return (
                  <li key={`${i.product.slug}--${i.size}`} className="flex gap-4 border-b border-[#66532f]/40 py-5">
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden border border-[#66532f] bg-[#091522]">
                      <Image src={i.product.image} alt={i.product.name} fill className="object-cover" sizes="64px"/>
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-serif text-sm">{i.product.name}</p>
                          <p className="font-mono text-[10px] uppercase tracking-[.12em] text-[#c19a52]">{i.size.toUpperCase()}</p>
                          <p className="font-mono text-[10px] uppercase tracking-[.12em] text-[#a7a39a]">{i.product.family}</p>
                        </div>
                        <button onClick={() => remove(i.product.slug, i.size)} aria-label={`Remove ${i.product.name}`} className="p-1 text-[#a7a39a] hover:text-[#f0cc7d]"><X size={14}/></button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-[#66532f]">
                          <button onClick={() => setQty(i.product.slug, i.size, i.qty - 1)} className="p-2" aria-label="Decrease quantity"><Minus size={12}/></button>
                          <span className="w-7 text-center font-mono text-xs">{i.qty}</span>
                          <button onClick={() => setQty(i.product.slug, i.size, i.qty + 1)} className="p-2" aria-label="Increase quantity"><Plus size={12}/></button>
                        </div>
                        <span className="font-mono text-xs text-[#c19a52]">₦{(price * i.qty).toLocaleString()}</span>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="border-t border-[#66532f] px-6 py-5">
              <div className="mb-5 flex items-center justify-between font-mono text-xs uppercase tracking-[.12em]">
                <span className="text-[#a7a39a]">Total</span>
                <span className="text-[#c19a52]">₦{total.toLocaleString()}</span>
              </div>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 bg-[#c19a52] px-6 py-4 font-mono text-[10px] uppercase tracking-[.18em] text-[#050b13] hover:bg-[#f0cc7d] transition-colors"
              >
                Proceed to payment via WhatsApp
              </a>
              <button onClick={clear} className="mt-3 w-full py-3 text-center font-mono text-[10px] uppercase tracking-[.15em] text-[#a7a39a] hover:text-[#f0cc7d] transition-colors">
                Clear bag
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
