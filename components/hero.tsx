import Image from "next/image";
import type { HeroContent } from "@/types/homepage";
import { DEFAULT_HERO_CONTENT } from "@/types/homepage";

interface HeroProps {
  content?: HeroContent | null;
  /** When true, use smaller min-height for admin preview frame */
  preview?: boolean;
}

export default function Hero({ content, preview }: HeroProps) {
  const c = content ?? DEFAULT_HERO_CONTENT;
  const imageSrc = c.heroImageUrl || DEFAULT_HERO_CONTENT.heroImageUrl;
  const imageAlt = c.heroImageAlt || DEFAULT_HERO_CONTENT.heroImageAlt;

  return (
    <section
      id="home"
      className={`relative flex items-end justify-center overflow-hidden pb-16 ${
        preview ? "min-h-[70vh]" : "min-h-screen"
      }`}
    >
      {/* Hero background */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc.startsWith("http") ? imageSrc : imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          priority
          className="object-cover object-center md:object-bottom"
          unoptimized={imageSrc.startsWith("http")}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/95 md:from-[#0a0a0a]/70 md:via-[#0a0a0a]/30 md:to-[#0a0a0a]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {c.eyebrow ? (
          <p className="text-[#c9a84c] uppercase tracking-[0.3em] text-sm font-extrabold mb-6">
            {c.eyebrow}
          </p>
        ) : null}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight mb-6">
          {c.headline}
        </h1>
        {c.subheadline ? (
          <p className="text-lg text-white/70 max-w-xl mx-auto mb-10 font-semibold">
            {c.subheadline}
          </p>
        ) : null}
        {c.body ? (
          <p className="text-base text-white/60 max-w-lg mx-auto mb-8 font-medium">
            {c.body}
          </p>
        ) : null}
        <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
          {c.ctaText ? (
            <a href={c.ctaHref || "#trip"} className="btn-gold">
              {c.ctaText}
            </a>
          ) : null}
          {c.ctaSecondaryText ? (
            <a href={c.ctaSecondaryHref || "#fleet"} className="btn-outline">
              {c.ctaSecondaryText}
            </a>
          ) : null}
        </div>
        {(c.badge1 || c.badge2) ? (
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            {c.badge1 ? (
              <span className="text-xs uppercase tracking-widest text-white/50 border border-white/20 rounded-full px-4 py-2">
                {c.badge1}
              </span>
            ) : null}
            {c.badge2 ? (
              <span className="text-xs uppercase tracking-widest text-white/50 border border-white/20 rounded-full px-4 py-2">
                {c.badge2}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
