import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type Cta = { label: string; href: string };

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  cta?: Cta;
  secondaryCta?: Cta;
};

/** De foto en de titel hebben elk hun eigen vlak, ook op tablet en mobiel. */
export function PageHero({
  title,
  subtitle,
  image,
  imageAlt,
  imagePosition = "center 25%",
  cta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="grid bg-win-navy md:min-h-[500px] md:grid-cols-2">
      <div className="relative order-1 h-[42svh] min-h-[270px] md:order-2 md:h-auto md:min-h-[500px]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          style={{ objectPosition: imagePosition }}
        />
      </div>
      <div className="order-2 flex items-center px-6 py-12 text-white md:order-1 md:px-10 md:py-16 lg:px-16">
        <div className="w-full max-w-xl">
          <h1 className="mb-5 text-[clamp(2rem,5vw,3.75rem)] font-black leading-[1.08] tracking-tight [overflow-wrap:anywhere] font-[family-name:var(--font-headline)]">
            {title}
          </h1>
          {subtitle && (
            <p className="max-w-lg border-l-2 border-win-gold pl-5 text-lg leading-relaxed text-win-cream md:text-xl">
              {subtitle}
            </p>
          )}
          {(cta || secondaryCta) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {cta && (
                <Link
                  href={cta.href}
                  className="rounded-lg bg-win-gold px-6 py-3.5 text-center font-bold text-win-charcoal transition-colors hover:bg-win-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {cta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="rounded-lg border border-white/70 px-6 py-3.5 text-center font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
