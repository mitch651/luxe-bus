export interface HeroContent {
  eyebrow: string;
  headline: string;
  subheadline: string;
  body: string;
  ctaText: string;
  ctaHref: string;
  ctaSecondaryText: string;
  ctaSecondaryHref: string;
  badge1: string;
  badge2: string;
  heroImageUrl: string;
  heroImageAlt: string;
}

export const DEFAULT_HERO_CONTENT: HeroContent = {
  eyebrow: "Southern California's Premier Luxury Transport",
  headline: "The Luxe Bus",
  subheadline: "Luxury party bus for airports, sporting events, birthdays, bachelor & bachelorette parties, wineries, casinos, and more.",
  body: "",
  ctaText: "Get a Quote",
  ctaHref: "#trip",
  ctaSecondaryText: "Explore the Fleet",
  ctaSecondaryHref: "#fleet",
  badge1: "",
  badge2: "",
  heroImageUrl: "/images/fleet/sprinter-black-disneyland.png",
  heroImageAlt: "Black Mercedes Sprinter at Disneyland Resort",
};
