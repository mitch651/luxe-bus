import { createClient } from "@supabase/supabase-js";
import type { HeroContent } from "@/types/homepage";
import { DEFAULT_HERO_CONTENT } from "@/types/homepage";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const url = supabaseUrl || "https://placeholder.supabase.co";
const key = supabaseAnonKey || "placeholder-key";
const supabase = createClient(url, key);

const HOMEPAGE_ROW_ID = "hero";

export interface HomepageContentRow {
  id: string;
  eyebrow: string | null;
  headline: string | null;
  subheadline: string | null;
  body: string | null;
  cta_text: string | null;
  cta_href: string | null;
  cta_secondary_text: string | null;
  cta_secondary_href: string | null;
  badge1: string | null;
  badge2: string | null;
  hero_image_url: string | null;
  hero_image_alt: string | null;
  updated_at: string | null;
}

function rowToHeroContent(row: HomepageContentRow | null): HeroContent {
  if (!row) return DEFAULT_HERO_CONTENT;
  return {
    eyebrow: row.eyebrow ?? DEFAULT_HERO_CONTENT.eyebrow,
    headline: row.headline ?? DEFAULT_HERO_CONTENT.headline,
    subheadline: row.subheadline ?? DEFAULT_HERO_CONTENT.subheadline,
    body: row.body ?? DEFAULT_HERO_CONTENT.body,
    ctaText: row.cta_text ?? DEFAULT_HERO_CONTENT.ctaText,
    ctaHref: row.cta_href ?? DEFAULT_HERO_CONTENT.ctaHref,
    ctaSecondaryText: row.cta_secondary_text ?? DEFAULT_HERO_CONTENT.ctaSecondaryText,
    ctaSecondaryHref: row.cta_secondary_href ?? DEFAULT_HERO_CONTENT.ctaSecondaryHref,
    badge1: row.badge1 ?? DEFAULT_HERO_CONTENT.badge1,
    badge2: row.badge2 ?? DEFAULT_HERO_CONTENT.badge2,
    heroImageUrl: row.hero_image_url ?? DEFAULT_HERO_CONTENT.heroImageUrl,
    heroImageAlt: row.hero_image_alt ?? DEFAULT_HERO_CONTENT.heroImageAlt,
  };
}

export async function getHomepageHeroContent(): Promise<HeroContent> {
  const { data, error } = await supabase
    .from("homepage_content")
    .select("*")
    .eq("id", HOMEPAGE_ROW_ID)
    .single();

  if (error) return DEFAULT_HERO_CONTENT;
  return rowToHeroContent(data as HomepageContentRow);
}

export async function saveHomepageHeroContent(content: HeroContent): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from("homepage_content")
    .update({
      eyebrow: content.eyebrow,
      headline: content.headline,
      subheadline: content.subheadline,
      body: content.body,
      cta_text: content.ctaText,
      cta_href: content.ctaHref,
      cta_secondary_text: content.ctaSecondaryText,
      cta_secondary_href: content.ctaSecondaryHref,
      badge1: content.badge1,
      badge2: content.badge2,
      hero_image_url: content.heroImageUrl,
      hero_image_alt: content.heroImageAlt,
      updated_at: new Date().toISOString(),
    })
    .eq("id", HOMEPAGE_ROW_ID);

  if (error) return { error: error.message };
  return { error: null };
}
