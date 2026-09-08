'use client'
import { useState } from 'react'
import { ArrowUpRight, Minus, Plus } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/lib/products'

export default function AddToBag({ product }: { product: Product }) {
  const [qty, setQty] = useState(1)
  const { add } = useCart()

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
      <div className="flex items-center self-start border border-[#66532f]">
        <button aria-label="Decrease quantity" onClick={() => setQty(q => Math.max(1, q - 1))} className="p-4"><Minus size={14}/></button>
        <span className="w-8 text-center font-mono text-xs">{qty}</span>
        <button aria-label="Increase quantity" onClick={() => setQty(q => q + 1)} className="p-4"><Plus size={14}/></button>
      </div>
      <button
        onClick={() => add(product, qty)}
        className="flex flex-1 items-center justify-center gap-3 bg-[#c19a52] px-6 py-4 font-mono text-[10px] uppercase tracking-[.18em] text-[#050b13] hover:bg-[#f0cc7d] transition-colors"
      >
        Add to bag <ArrowUpRight size={15}/>
      </button>
    </div>
  )
}
