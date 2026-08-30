'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowUpRight, Menu, X, Sparkles } from 'lucide-react'

const signs = [
  ['Aries', '21 Mar — 19 Apr', 'The Initiator'], ['Taurus', '20 Apr — 20 May', 'The Keeper'], ['Gemini', '21 May — 20 Jun', 'The Messenger'],
  ['Cancer', '21 Jun — 22 Jul', 'The Tender'], ['Leo', '23 Jul — 22 Aug', 'The Radiant'], ['Virgo', '23 Aug — 22 Sep', 'The Devotee'],
  ['Libra', '23 Sep — 22 Oct', 'The Balancer'], ['Scorpio', '23 Oct — 21 Nov', 'The Alchemist'], ['Sagittarius', '22 Nov — 21 Dec', 'The Seeker'],
  ['Capricorn', '22 Dec — 19 Jan', 'The Builder'], ['Aquarius', '20 Jan — 18 Feb', 'The Visionary'], ['Pisces', '19 Feb — 20 Mar', 'The Dreamer'],
]

const fragrances = [
  { name: 'SOL / 01', title: 'After the Sun', note: 'Saffron · Cedar · Skin', text: 'A warm mineral glow, captured at the exact moment day becomes memory.', sign: 'Leo' },
  { name: 'LUNA / 02', title: 'Blue Hour', note: 'Iris · Fig · Smoke', text: 'A cool, silvery composition for those who find their clearest thoughts after dark.', sign: 'Pisces' },
  { name: 'TERRA / 03', title: 'Deep Earth', note: 'Vetiver · Moss · Resin', text: 'Roots, rain and the low hum of a forest floor. Quiet, but impossible to forget.', sign: 'Taurus' },
  { name: 'AURA / 04', title: 'Electric Air', note: 'Bergamot · Ink · Amber', text: 'The charged instant before a storm. Bright, restless, alive.', sign: 'Gemini' },
  { name: 'NOCT / 05', title: 'The Dark Room', note: 'Black tea · Oud · Velvet', text: 'A private ritual, worn close. For the parts of you that only emerge in shadow.', sign: 'Scorpio' },
  { name: 'HUM / 06', title: 'First Light', note: 'Mimosa · Salt · White wood', text: 'The clean pulse of beginning again. Softness with a point of view.', sign: 'Aries' },
]

function SectionLabel({ children }: { children: React.ReactNode }) { return <p className="section-label">{children}</p> }

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedSign, setSelectedSign] = useState('Leo')
  const [activeFragrance, setActiveFragrance] = useState(0)
  const [quizOpen, setQuizOpen] = useState(false)
  const [quizStep, setQuizStep] = useState(0)
  const [quizResult, setQuizResult] = useState('')
  const quizQuestions = [
    ['Where do you feel most like yourself?', ['In the sun', 'Near water', 'Among trees', 'Under stars']],
    ['Choose a texture.', ['Warm stone', 'Wet silk', 'Raw wood', 'Black velvet']],
    ['Your ideal hour?', ['Golden hour', 'Blue hour', 'Midnight', 'First light']],
  ]
  const sign = signs.find((s) => s[0] === selectedSign) ?? signs[0]

  return (
    <main className="horuscope-shell">
      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="HORUSCOPE home">HORUSCOPE<span>®</span></a>
        <nav className="desktop-nav" aria-label="Primary navigation"><a href="#collection">Collection</a><a href="#archive">Archive</a><a href="#journal">Journal</a></nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </header>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation"><a href="#collection" onClick={() => setMenuOpen(false)}>Collection</a><a href="#archive" onClick={() => setMenuOpen(false)}>Archive</a><a href="#journal" onClick={() => setMenuOpen(false)}>Journal</a></nav>}

      <section className="hero" id="top">
        <div className="hero-copy"><SectionLabel>Vol. 01 — The Celestial Collection</SectionLabel><h1>Born<br /><em>under</em><br />different skies.</h1><p className="hero-intro">Fragrance as a record of where you have been, and a quiet signal of where you are going.</p><a className="text-link" href="#collection">Enter the collection <ArrowDown size={15} /></a></div>
        <div className="hero-image"><Image src="/images/horuscope-hero.png" alt="Black HORUSCOPE fragrance bottle on volcanic stone" fill priority sizes="(max-width: 800px) 100vw, 55vw" /></div>
        <p className="hero-caption">Fig. 01 — Sol / 01<br />Eau de parfum, 50 ml</p>
      </section>

      <section className="manifesto"><div><SectionLabel>01 / A point of origin</SectionLabel><h2>Every bottle<br />holds a <em>world.</em></h2></div><div className="manifesto-copy"><p>HORUSCOPE is an olfactive archive of the invisible forces that shape us. Six compositions, each a different atmosphere. Find the one that feels like it has been waiting for you.</p><a className="text-link" href="#archive">Read our story <ArrowUpRight size={15} /></a></div></section>

      <section className="zodiac-section" id="collection"><div className="section-heading"><div><SectionLabel>02 / Your constellation</SectionLabel><h2>Choose your <em>signal.</em></h2></div><p>There is no right answer.<br />Only the one that stays.</p></div><div className="zodiac-grid">{signs.map(([name, dates, title]) => <button key={name} className={`zodiac-item ${selectedSign === name ? 'is-selected' : ''}`} onClick={() => setSelectedSign(name)}><span className="zodiac-glyph">{['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'][signs.findIndex(s => s[0] === name)]}</span><span><strong>{name}</strong><small>{dates}</small></span><i>{title}</i></button>)}</div><div className="selected-signal"><span>Your signal</span><strong>{sign[0]}</strong><p>{sign[2]} — drawn to warmth, depth and things that reveal themselves slowly.</p></div></section>

      <section className="fragrance-section" id="archive"><div className="section-heading"><div><SectionLabel>03 / The archive</SectionLabel><h2>Six ways to<br /><em>leave a trace.</em></h2></div><p>Composed in Paris.<br />Finished by hand.</p></div><div className="fragrance-layout"><div className="fragrance-list">{fragrances.map((f, i) => <button key={f.name} className={`fragrance-row ${activeFragrance === i ? 'is-active' : ''}`} onClick={() => setActiveFragrance(i)}><span>{f.name}</span><strong>{f.title}</strong><small>{f.note}</small><ArrowUpRight size={16} /></button>)}</div><div className="fragrance-detail"><div className="detail-image"><Image src="/images/horuscope-collection.png" alt="HORUSCOPE fragrance collection arranged on an obsidian table" fill sizes="(max-width: 800px) 100vw, 45vw" /></div><div className="detail-copy"><SectionLabel>Selected composition</SectionLabel><h3>{fragrances[activeFragrance].title}</h3><p>{fragrances[activeFragrance].text}</p><span className="note-line">{fragrances[activeFragrance].note}</span><button className="outline-button">Discover {fragrances[activeFragrance].name} <ArrowUpRight size={15} /></button></div></div></div></section>

      <section className="quiz-section"><div className="quiz-art"><span>Find the atmosphere<br />that finds you.</span><Sparkles size={22} /></div><div className="quiz-copy"><SectionLabel>04 / A private reading</SectionLabel><h2>What does<br /><em>your skin</em> remember?</h2><p>Answer three instinctive questions. We will return a fragrance, not a personality type.</p><button className="gold-button" onClick={() => { setQuizOpen(true); setQuizStep(0); setQuizResult('') }}>Begin your reading <ArrowUpRight size={15} /></button></div></section>

      <section className="craft-section"><div className="craft-image"><Image src="/images/horuscope-craft.png" alt="Perfumer measuring amber liquid at a dark atelier workbench" fill sizes="(max-width: 800px) 100vw, 55vw" /></div><div className="craft-copy"><SectionLabel>05 / The hand behind it</SectionLabel><h2>Made slowly.<br /><em>Worn closely.</em></h2><p>We work in small batches, with materials that are allowed to be themselves. Every formula is rested, tested and filled by a single pair of hands.</p><a className="text-link" href="#journal">Inside the atelier <ArrowUpRight size={15} /></a></div></section>

      <section className="journal-section" id="journal"><div className="section-heading"><div><SectionLabel>06 / Field notes</SectionLabel><h2>From the <em>journal.</em></h2></div><a className="text-link" href="#journal">View all notes <ArrowUpRight size={15} /></a></div><div className="journal-grid"><article><span>01 — On material</span><h3>The quiet intelligence of cedar.</h3><a href="#journal">Read note <ArrowUpRight size={14} /></a></article><article><span>02 — On ritual</span><h3>Why scent belongs to the hour before sleep.</h3><a href="#journal">Read note <ArrowUpRight size={14} /></a></article><article><span>03 — On place</span><h3>A field guide to the Mediterranean after rain.</h3><a href="#journal">Read note <ArrowUpRight size={14} /></a></article></div></section>

      <footer className="site-footer"><div className="footer-brand">HORUSCOPE<span>®</span><p>Stories, bottled.</p></div><div className="footer-links"><a href="#collection">Shop collection</a><a href="#journal">Contact</a><a href="#journal">Instagram</a></div><p className="copyright">© 2026 HORUSCOPE<br />Made in small numbers.</p></footer>

      {quizOpen && <div className="quiz-modal" role="dialog" aria-modal="true" aria-labelledby="quiz-title"><div className="quiz-panel"><button className="close-quiz" onClick={() => setQuizOpen(false)} aria-label="Close reading"><X size={20} /></button>{quizStep < quizQuestions.length ? <><SectionLabel>Private reading / 0{quizStep + 1}</SectionLabel><h2 id="quiz-title">{quizQuestions[quizStep][0]}</h2><div className="quiz-options">{(quizQuestions[quizStep][1] as string[]).map((answer) => <button key={answer} onClick={() => { if (quizStep === quizQuestions.length - 1) { setQuizResult(answer); setQuizStep(quizQuestions.length) } else setQuizStep(quizStep + 1) }}>{answer}<ArrowUpRight size={15} /></button>)}</div></> : <><SectionLabel>Your atmosphere</SectionLabel><h2 id="quiz-title">{quizResult === 'Under stars' || quizResult === 'Black velvet' ? 'The Dark Room' : 'After the Sun'}</h2><p className="quiz-result">A composition chosen for the part of you that trusts instinct before explanation.</p><button className="gold-button" onClick={() => setQuizOpen(false)}>Explore your fragrance <ArrowUpRight size={15} /></button></>}</div></div>}
    </main>
  )
}
