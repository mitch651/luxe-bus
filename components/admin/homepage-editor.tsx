"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { HeroContent } from "@/types/homepage";
import { DEFAULT_HERO_CONTENT } from "@/types/homepage";
import HeroPreview from "./hero-preview";
import { saveHomepageHeroContent } from "@/lib/homepage";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const HERO_BUCKET = "hero-images";

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#c9a84c]/50 transition-colors text-sm";
const labelClass = "block text-white/60 text-xs uppercase tracking-wider mb-2 font-medium";
const sectionClass = "rounded-xl border border-white/10 bg-white/[0.02] p-6";

interface HomepageEditorProps {
  initialContent: HeroContent;
}

export default function HomepageEditor({ initialContent }: HomepageEditorProps) {
  const [draft, setDraft] = useState<HeroContent>(initialContent);
  const [saved, setSaved] = useState<HeroContent>(initialContent);
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasChanges =
    JSON.stringify(draft) !== JSON.stringify(saved);

  const update = useCallback((updates: Partial<HeroContent>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleSave = async () => {
    setStatus("saving");
    setErrorMessage(null);
    const result = await saveHomepageHeroContent(draft);
    if (result.error) {
      setStatus("error");
      setErrorMessage(result.error);
      return;
    }
    setSaved(draft);
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2500);
  };

  const handleReset = () => {
    setDraft(saved);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file?.type.startsWith("image/")) {
      setUploadError("Please select an image file.");
      return;
    }
    if (!isSupabaseConfigured) {
      setUploadError("Supabase not configured. Use Image URL field instead.");
      return;
    }
    setUploadError(null);
    setUploading(true);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `hero-${Date.now()}.${ext}`;
    const { data, error } = await supabase.storage.from(HERO_BUCKET).upload(path, file, {
      cacheControl: "3600",
      upsert: true,
    });
    setUploading(false);
    if (error) {
      setUploadError(error.message);
      return;
    }
    const { data: urlData } = supabase.storage.from(HERO_BUCKET).getPublicUrl(data.path);
    update({ heroImageUrl: urlData.publicUrl });
  };

  useEffect(() => {
    setDraft(initialContent);
    setSaved(initialContent);
  }, [initialContent]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Sticky save bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/10 bg-[#0a0a0a]/95 px-6 py-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/50">Homepage Hero</span>
          {hasChanges && (
            <span className="rounded-full bg-[#c9a84c]/20 px-2.5 py-0.5 text-xs font-medium text-[#c9a84c]">
              Unsaved changes
            </span>
          )}
          {status === "saved" && (
            <span className="text-xs text-emerald-400">Saved</span>
          )}
          {status === "error" && errorMessage && (
            <span className="text-xs text-red-400">{errorMessage}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/5 transition-colors"
            >
              Revert
            </button>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={!hasChanges || status === "saving"}
            className="rounded-lg bg-[#c9a84c] px-5 py-2 text-sm font-semibold text-[#0a0a0a] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {status === "saving" ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr,400px] gap-0">
        {/* Left: Live preview */}
        <div className="p-6 border-b lg:border-b-0 lg:border-r border-white/10 min-h-[70vh] flex flex-col">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="text-xs uppercase tracking-widest text-white/50 font-semibold">
              Live preview
            </h2>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#c9a84c] hover:underline"
            >
              Open full page →
            </a>
            <div className="flex rounded-lg border border-white/10 p-0.5">
              <button
                type="button"
                onClick={() => setViewport("desktop")}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  viewport === "desktop" ? "bg-[#c9a84c] text-[#0a0a0a]" : "text-white/60 hover:text-white"
                }`}
              >
                Desktop
              </button>
              <button
                type="button"
                onClick={() => setViewport("mobile")}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  viewport === "mobile" ? "bg-[#c9a84c] text-[#0a0a0a]" : "text-white/60 hover:text-white"
                }`}
              >
                Mobile
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            <HeroPreview content={draft} viewport={viewport} />
          </div>
        </div>

        {/* Right: Editor controls */}
        <div className="overflow-y-auto p-6 space-y-6 bg-[#0a0a0a]">
          {/* Hero Content */}
          <section className={sectionClass}>
            <h3 className="text-sm font-semibold text-[#c9a84c] uppercase tracking-wider mb-1">
              Hero content
            </h3>
            <p className="text-xs text-white/40 mb-4">Main headline and supporting copy.</p>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Eyebrow / Kicker</label>
                <input
                  type="text"
                  value={draft.eyebrow}
                  onChange={(e) => update({ eyebrow: e.target.value })}
                  placeholder="e.g. Southern California's Premier Luxury Transport"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Headline</label>
                <input
                  type="text"
                  value={draft.headline}
                  onChange={(e) => update({ headline: e.target.value })}
                  placeholder="The Luxe Bus"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Subheadline</label>
                <textarea
                  value={draft.subheadline}
                  onChange={(e) => update({ subheadline: e.target.value })}
                  placeholder="Short tagline or description"
                  rows={2}
                  className={inputClass + " resize-y"}
                />
              </div>
              <div>
                <label className={labelClass}>Body paragraph (optional)</label>
                <textarea
                  value={draft.body}
                  onChange={(e) => update({ body: e.target.value })}
                  placeholder="Additional copy below subheadline"
                  rows={3}
                  className={inputClass + " resize-y"}
                />
              </div>
            </div>
          </section>

          {/* CTA Settings */}
          <section className={sectionClass}>
            <h3 className="text-sm font-semibold text-[#c9a84c] uppercase tracking-wider mb-1">
              CTA settings
            </h3>
            <p className="text-xs text-white/40 mb-4">Primary and secondary buttons.</p>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Primary button text</label>
                <input
                  type="text"
                  value={draft.ctaText}
                  onChange={(e) => update({ ctaText: e.target.value })}
                  placeholder="Get a Quote"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Primary button link</label>
                <input
                  type="text"
                  value={draft.ctaHref}
                  onChange={(e) => update({ ctaHref: e.target.value })}
                  placeholder="#trip"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Secondary button text</label>
                <input
                  type="text"
                  value={draft.ctaSecondaryText}
                  onChange={(e) => update({ ctaSecondaryText: e.target.value })}
                  placeholder="Explore the Fleet"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Secondary button link</label>
                <input
                  type="text"
                  value={draft.ctaSecondaryHref}
                  onChange={(e) => update({ ctaSecondaryHref: e.target.value })}
                  placeholder="#fleet"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Badges */}
          <section className={sectionClass}>
            <h3 className="text-sm font-semibold text-[#c9a84c] uppercase tracking-wider mb-1">
              Badges
            </h3>
            <p className="text-xs text-white/40 mb-4">Optional pill labels below CTAs.</p>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Badge 1</label>
                <input
                  type="text"
                  value={draft.badge1}
                  onChange={(e) => update({ badge1: e.target.value })}
                  placeholder="Leave empty to hide"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Badge 2</label>
                <input
                  type="text"
                  value={draft.badge2}
                  onChange={(e) => update({ badge2: e.target.value })}
                  placeholder="Leave empty to hide"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Hero Image */}
          <section className={sectionClass}>
            <h3 className="text-sm font-semibold text-[#c9a84c] uppercase tracking-wider mb-1">
              Hero image
            </h3>
            <p className="text-xs text-white/40 mb-4">
              Upload or paste a URL. Recommended: 1920×1080 or larger.
            </p>
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading || !isSupabaseConfigured}
                  className="rounded-lg border border-[#c9a84c]/50 px-4 py-2 text-sm font-medium text-[#c9a84c] hover:bg-[#c9a84c]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {uploading ? "Uploading…" : "Upload new image"}
                </button>
                <button
                  type="button"
                  onClick={() => update({ heroImageUrl: DEFAULT_HERO_CONTENT.heroImageUrl })}
                  className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/70 hover:bg-white/5 transition-colors"
                >
                  Reset to default
                </button>
              </div>
              {uploadError && (
                <p className="text-xs text-red-400">{uploadError}</p>
              )}
              <div>
                <label className={labelClass}>Image URL or path</label>
                <input
                  type="text"
                  value={draft.heroImageUrl}
                  onChange={(e) => update({ heroImageUrl: e.target.value })}
                  placeholder="/images/fleet/sprinter-black-disneyland.png"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Alt text (SEO / accessibility)</label>
                <input
                  type="text"
                  value={draft.heroImageAlt}
                  onChange={(e) => update({ heroImageAlt: e.target.value })}
                  placeholder="Black Mercedes Sprinter at Disneyland Resort"
                  className={inputClass}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
