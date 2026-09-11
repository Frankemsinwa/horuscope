'use client'
import { useState } from 'react'
import { ArrowUpRight, Minus, Plus } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/lib/products'

export default function AddToBag({ product }: { product: Product }) {
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState<'50ml' | '100ml'>('50ml')
  const { add } = useCart()

  const price = size === '50ml' ? product.price50ml : product.price100ml

  return (
    <div className="mt-8 flex flex-col gap-4">
      <div className="flex gap-3">
        <button
          onClick={() => setSize('50ml')}
          className={`flex-1 border px-4 py-3 font-mono text-[10px] uppercase tracking-[.15em] transition-colors ${size === '50ml' ? 'border-[#c19a52] text-[#c19a52]' : 'border-[#66532f] text-[#a7a39a] hover:border-[#f0cc7d]'}`}
        >
          50ML — ₦{product.price50ml.toLocaleString()}
        </button>
        <button
          onClick={() => setSize('100ml')}
          className={`flex-1 border px-4 py-3 font-mono text-[10px] uppercase tracking-[.15em] transition-colors ${size === '100ml' ? 'border-[#c19a52] text-[#c19a52]' : 'border-[#66532f] text-[#a7a39a] hover:border-[#f0cc7d]'}`}
        >
          100ML — ₦{product.price100ml.toLocaleString()}
        </button>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center self-start border border-[#66532f]">
          <button aria-label="Decrease quantity" onClick={() => setQty(q => Math.max(1, q - 1))} className="p-4"><Minus size={14}/></button>
          <span className="w-8 text-center font-mono text-xs">{qty}</span>
          <button aria-label="Increase quantity" onClick={() => setQty(q => q + 1)} className="p-4"><Plus size={14}/></button>
        </div>
        <button
          onClick={() => add(product, qty, size)}
          className="flex flex-1 items-center justify-center gap-3 bg-[#c19a52] px-6 py-4 font-mono text-[10px] uppercase tracking-[.18em] text-[#050b13] hover:bg-[#f0cc7d] transition-colors"
        >
          Add to bag — ₦{(price * qty).toLocaleString()} <ArrowUpRight size={15}/>
        </button>
      </div>
    </div>
  )
}
