export type Product = {
  slug: string
  code: string
  name: string
  price: number
  zodiac: string[]
  family: string
  notes: string
  description: string
  story: string
  origin: string
  image: string
}

export const products: Product[] = [
  { slug: 'after-the-sun', code: 'SOL / 01', name: 'After the Sun', price: 185, zodiac: ['Leo', 'Aries'], family: 'Woody', notes: 'Saffron · Cedar · Skin', description: 'A warm mineral glow, captured at the exact moment day becomes memory.', story: 'For the one who carries summer long after the light has gone. After the Sun begins with saffron warmed over stone, then settles into cedar and the quiet salt of skin.', origin: 'Inspired by the red earth and late light of the Atlas foothills.', image: '/images/horuscope-hero.png' },
  { slug: 'blue-hour', code: 'LUNA / 02', name: 'Blue Hour', price: 195, zodiac: ['Pisces', 'Cancer'], family: 'Floral', notes: 'Iris · Fig · Smoke', description: 'A cool, silvery composition for those who find their clearest thoughts after dark.', story: 'Blue Hour belongs to the threshold: not day, not night. Iris opens like a held breath, fig softens the edges, and smoke leaves a trace of distance.', origin: 'A study in twilight made between the Aegean coast and an old Parisian studio.', image: '/images/horuscope-collection.png' },
  { slug: 'deep-earth', code: 'TERRA / 03', name: 'Deep Earth', price: 175, zodiac: ['Taurus', 'Virgo'], family: 'Woody', notes: 'Vetiver · Moss · Resin', description: 'Roots, rain and the low hum of a forest floor.', story: 'A return to what is steady. Wet vetiver, green moss and resin create a fragrance that feels less applied than remembered.', origin: 'Composed from the scent of rain settling into the forest floor of southern France.', image: '/images/horuscope-craft.png' },
  { slug: 'electric-air', code: 'AURA / 04', name: 'Electric Air', price: 165, zodiac: ['Gemini', 'Aquarius'], family: 'Fresh', notes: 'Bergamot · Ink · Amber', description: 'The charged instant before a storm. Bright, restless, alive.', story: 'Electric Air is movement made visible: bergamot cuts through ink, while amber holds the charge close to the skin.', origin: 'Born from summer storms over the high plains of Navarra.', image: '/images/horuscope-collection.png' },
  { slug: 'the-dark-room', code: 'NOCT / 05', name: 'The Dark Room', price: 210, zodiac: ['Scorpio', 'Capricorn'], family: 'Oriental', notes: 'Black tea · Oud · Velvet', description: 'A private ritual, worn close.', story: 'The Dark Room does not announce itself. Black tea and oud move through velvet shadows, revealing only what you are ready to keep.', origin: 'A nocturne assembled in a candlelit atelier in the Marais.', image: '/images/horuscope-hero.png' },
  { slug: 'first-light', code: 'HUM / 06', name: 'First Light', price: 155, zodiac: ['Aries', 'Libra'], family: 'Fresh', notes: 'Mimosa · Salt · White wood', description: 'The clean pulse of beginning again.', story: 'First Light is a beginning with a point of view. Mimosa, sea salt and white wood make softness feel quietly courageous.', origin: 'Drawn from the first hour on the Atlantic shore.', image: '/images/horuscope-craft.png' },
]

export function getProduct(slug: string) { return products.find((product) => product.slug === slug) }
