import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'
import { KopAccent, heeftCta, kopTekst, media, mediaUrl } from '@/blocks/ui'
import type { Pagina } from '@/payload-types'

type HeroData = Pagina['hero']

export function RenderHero({ hero }: { hero?: HeroData }) {
  if (!hero) return null

  if (hero.type === 'homeHero') {
    return (
      <section className="relative overflow-hidden bg-win-cream md:flex md:min-h-[min(82svh,760px)] md:items-center">
        <div className="relative h-[43svh] min-h-[280px] md:absolute md:inset-0 md:h-auto md:min-h-0">
          <Image src={mediaUrl(hero.foto)} alt={media(hero.foto)?.alt ?? ''} fill sizes="100vw" className="object-cover object-[65%_35%] md:object-center" priority />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-win-navy/90 via-win-navy/60 to-transparent md:block" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-10 md:px-8 md:py-20">
          <div className="max-w-xl text-win-navy md:text-white">
            <h1 className="mb-4 text-4xl font-black tracking-tight leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-headline)]">
              <KopAccent kop={hero.kop} accentClass="text-win-gold-ink md:text-win-gold" />
            </h1>
            {hero.subtitel && <p className="mb-6 text-sm font-extrabold uppercase tracking-[0.2em] text-win-gold-ink md:text-win-gold">{hero.subtitel}</p>}
            {hero.introZin && <p className="mb-8 max-w-lg text-lg font-medium leading-relaxed text-win-charcoal md:text-xl md:text-white">{hero.introZin}</p>}
            <div className="flex flex-col gap-3 sm:flex-row">
              {heeftCta(hero.cta) && (
                <Link className="rounded-lg bg-win-navy px-6 py-4 text-center font-bold text-white transition-colors hover:bg-win-charcoal md:bg-win-gold md:text-win-charcoal md:hover:bg-white" href={hero.cta.doel}>
                  {hero.cta.label}
                </Link>
              )}
              {heeftCta(hero.secundaireCta) && (
                <Link className="rounded-lg border border-win-navy px-6 py-4 text-center font-bold text-win-navy transition-colors hover:bg-white md:border-white/70 md:text-white md:hover:bg-white/10" href={hero.secundaireCta.doel}>
                  {hero.secundaireCta.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (hero.type === 'kopHeader') {
    return (
      <header className="bg-win-cream py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-6 text-left md:text-center">
          {hero.pillLabel && <span className="inline-block px-4 py-1 mb-6 rounded-full border border-win-gold text-win-gold font-semibold tracking-widest text-sm uppercase">{hero.pillLabel}</span>}
          <h1 className="text-4xl md:text-6xl font-black text-win-navy leading-tight mb-6 font-[family-name:var(--font-headline)]">
            <KopAccent kop={hero.kop} accentClass="text-win-gold-ink underline decoration-win-gold/30 underline-offset-8" />
          </h1>
          <div className="mb-6 h-1 w-16 bg-win-gold md:mx-auto"></div>
          {hero.introZin && <p className="max-w-2xl text-lg font-medium leading-8 text-win-charcoal/80 md:mx-auto md:text-xl">{hero.introZin}</p>}
          {heeftCta(hero.cta) && (
            <Link className="mt-6 inline-flex items-center gap-2 font-semibold text-win-navy underline underline-offset-4 hover:text-win-gold-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-win-navy" href={hero.cta.doel}>
              {hero.cta.label} <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </header>
    )
  }

  const methodiekTitel = hero.kop?.accent === 'Methodiek' && hero.kop?.na === 'achter Weerbaarheidstherapie'

  return (
    <PageHero
      title={
        methodiekTitel ? (
          <>
            <span className="block">
              <KopAccent kop={{ ...hero.kop, na: null }} />
            </span>
            <span className="block text-[clamp(1.125rem,5vw,2.75rem)] leading-tight">{hero.kop?.na}</span>
          </>
        ) : (
          <KopAccent kop={hero.kop} />
        )
      }
      subtitle={hero.subtitel || undefined}
      image={mediaUrl(hero.foto)}
      imageAlt={media(hero.foto)?.alt ?? kopTekst(hero.kop)}
      imagePosition={hero.fotoFocus ?? 'center 25%'}
      cta={heeftCta(hero.cta) ? { label: hero.cta.label, href: hero.cta.doel } : undefined}
      secondaryCta={heeftCta(hero.secundaireCta) ? { label: hero.secundaireCta.label, href: hero.secundaireCta.doel } : undefined}
    />
  )
}
