'use client'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { Product } from './products'

export type CartItem = { product: Product; qty: number; size: '50ml' | '100ml' }

type CartCtx = {
  items: CartItem[]
  count: number
  total: number
  add: (product: Product, qty?: number, size?: '50ml' | '100ml') => void
  remove: (slug: string, size: string) => void
  setQty: (slug: string, size: string, qty: number) => void
  clear: () => void
  open: boolean
  setOpen: (v: boolean) => void
}

const Ctx = createContext<CartCtx | null>(null)

const STORAGE_KEY = 'horuscope-cart'

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function itemKey(slug: string, size: string) { return `${slug}--${size}` }

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setItems(loadCart())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  const add = useCallback((product: Product, qty = 1, size: '50ml' | '100ml' = '50ml') => {
    setItems(prev => {
      const key = itemKey(product.slug, size)
      const existing = prev.find(i => itemKey(i.product.slug, i.size) === key)
      if (existing) return prev.map(i => itemKey(i.product.slug, i.size) === key ? { ...i, qty: i.qty + qty } : i)
      return [...prev, { product, qty, size }]
    })
    setOpen(true)
  }, [])

  const remove = useCallback((slug: string, size: string) => {
    setItems(prev => prev.filter(i => !(i.product.slug === slug && i.size === size)))
  }, [])

  const setQty = useCallback((slug: string, size: string, qty: number) => {
    if (qty < 1) return setItems(prev => prev.filter(i => !(i.product.slug === slug && i.size === size)))
    setItems(prev => prev.map(i => i.product.slug === slug && i.size === size ? { ...i, qty } : i))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items])
  const total = useMemo(() => items.reduce((n, i) => {
    const price = i.size === '50ml' ? i.product.price50ml : i.product.price100ml
    return n + price * i.qty
  }, 0), [items])

  const value = useMemo(() => ({ items, count, total, add, remove, setQty, clear, open, setOpen }), [items, count, total, add, remove, setQty, clear, open, setOpen])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCart() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
