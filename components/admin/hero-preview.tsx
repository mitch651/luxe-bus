"use client";

import Hero from "@/components/hero";
import type { HeroContent } from "@/types/homepage";

interface HeroPreviewProps {
  content: HeroContent;
  viewport?: "desktop" | "mobile";
  className?: string;
}

export default function HeroPreview({ content, viewport = "desktop", className = "" }: HeroPreviewProps) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-white/10 bg-[#0a0a0a] ${className}`}
      data-viewport={viewport}
    >
      <div
        className={`relative mx-auto bg-black ${
          viewport === "mobile" ? "w-[375px]" : "w-full"
        }`}
      >
        <Hero content={content} preview />
      </div>
    </div>
  );
}
