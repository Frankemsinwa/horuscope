'use client'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export default function BagButton({ className = '' }: { className?: string }) {
  const { count, setOpen } = useCart()
  return (
    <button onClick={() => setOpen(true)} aria-label="Shopping bag" className={`flex items-center gap-2 font-mono text-[10px] text-[#c19a52] ${className}`}>
      <ShoppingBag size={16}/> {count}
    </button>
  )
}
