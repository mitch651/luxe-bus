"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

const defaultReviews: Review[] = [
  {
    id: "default-1",
    name: "Jessica M.",
    rating: 5,
    text: "Absolutely incredible experience! We booked The Luxe Bus for my bachelorette party and it was the highlight of the night. The TV, the lights, the vibes—everything was perfect. Uber could NEVER!",
    date: "2025-12-15",
  },
  {
    id: "default-2",
    name: "Carlos R.",
    rating: 5,
    text: "Used them for an airport transfer with the whole family. Fit all our luggage, car seats, strollers—no problem. Driver was super professional and on time. Will definitely book again.",
    date: "2025-12-28",
  },
  {
    id: "default-3",
    name: "Amanda T.",
    rating: 5,
    text: "We took The Luxe Bus to Temecula wine country and it was the best decision ever. Everyone had a blast, the bus was spotless, and we didn't have to worry about driving home. 10/10!",
    date: "2026-01-05",
  },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30)
    return `${Math.floor(diffDays / 7)} week${
      Math.floor(diffDays / 7) > 1 ? "s" : ""
    } ago`;
  if (diffDays < 365)
    return `${Math.floor(diffDays / 30)} month${
      Math.floor(diffDays / 30) > 1 ? "s" : ""
    } ago`;
  return `${Math.floor(diffDays / 365)} year${
    Math.floor(diffDays / 365) > 1 ? "s" : ""
  } ago`;
}

function StarRating({
  rating,
  onRate,
  interactive,
}: {
  rating: number;
  onRate?: (r: number) => void;
  interactive?: boolean;
}) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRate && onRate(star)}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          className={`text-2xl transition-colors ${
            interactive ? "cursor-pointer" : "cursor-default"
          } ${
            star <= (hover || rating) ? "text-[#c9a84c]" : "text-white/20"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [useSupabase, setUseSupabase] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!url || !key) {
        setReviews(defaultReviews);
        setUseSupabase(false);
        setLoaded(true);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("reviews")
          .select("id, name, rating, content, created_at")
          .order("created_at", { ascending: false });

        if (error) throw error;

        const mapped: Review[] = (data || []).map((r) => ({
          id: r.id,
          name: r.name,
          rating: r.rating,
          text: r.content,
          date: r.created_at?.split("T")[0] ?? new Date().toISOString().split("T")[0],
        }));

        setReviews(mapped.length > 0 ? mapped : defaultReviews);
      } catch {
        setReviews(defaultReviews);
        setUseSupabase(false);
      }
      setLoaded(true);
    }
    loadReviews();
  }, []);

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0.0";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }
    if (name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (text.trim().length < 10) {
      setError("Please write at least a few words about your experience.");
      return;
    }

    if (!useSupabase) {
      setError("Reviews are not available right now. Please try again later.");
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("reviews")
        .insert({
          name: name.trim(),
          rating,
          content: text.trim(),
        })
        .select("id, name, rating, content, created_at")
        .single();

      if (error) throw error;

      const newReview: Review = {
        id: data.id,
        name: data.name,
        rating: data.rating,
        text: data.content,
        date: data.created_at?.split("T")[0] ?? new Date().toISOString().split("T")[0],
      };

      setReviews((prev) => [newReview, ...prev]);
      setName("");
      setText("");
      setRating(0);
      setShowForm(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);

      try {
        const formData = new URLSearchParams();
        formData.append("form-name", "review-notification");
        formData.append("name", newReview.name);
        formData.append("rating", String(newReview.rating));
        formData.append("text", newReview.text);
        await fetch("/__forms.html", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString(),
        });
      } catch {
        // Don't block - review already saved to Supabase
      }
    } catch {
      setError("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!loaded) return null;

  return (
    <section id="reviews" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#c9a84c] uppercase tracking-[0.25em] text-sm font-medium mb-3">
            Reviews
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Riders Say
          </h2>

          <div className="flex items-center justify-center gap-3 mb-2">
            <StarRating rating={Math.round(Number(avgRating))} />
            <span className="text-white/70 text-lg">
              {avgRating} · {reviews.length} Review
              {reviews.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {submitted && (
          <div className="max-w-md mx-auto mb-8 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-xl p-5 text-center animate-fade-in-up">
            <p className="text-[#c9a84c] font-semibold text-lg">
              Thank you for your review! 🙏
            </p>
            <p className="text-white/50 text-sm mt-1">
              Your feedback is now live on the page.
            </p>
          </div>
        )}

        <div className="mb-12">
          {!showForm ? (
            <div className="text-center">
              <button onClick={() => setShowForm(true)} className="btn-gold">
                ★ Leave a Review
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <h3 className="text-white font-bold text-xl mb-6 text-center">
                Share Your Experience
              </h3>

              <div className="mb-6 text-center">
                <p className="text-white/50 text-sm mb-2">Tap to rate</p>
                <div className="flex justify-center">
                  <StarRating rating={rating} onRate={setRating} interactive />
                </div>

                {rating > 0 && (
                  <p className="text-[#c9a84c] text-sm mt-2 font-medium">
                    {rating === 1 && "Poor"}
                    {rating === 2 && "Fair"}
                    {rating === 3 && "Good"}
                    {rating === 4 && "Great"}
                    {rating === 5 && "Amazing!"}
                  </p>
                )}
              </div>

              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 mb-4 focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
              />

              <textarea
                placeholder="Tell us about your ride..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 mb-4 focus:outline-none focus:border-[#c9a84c]/50 resize-none transition-colors"
              />

              {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold flex-1 text-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => {
                    setShowForm(false);
                    setError("");
                    setRating(0);
                    setName("");
                    setText("");
                  }}
                  className="btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#c9a84c]/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#c9a84c]/20 flex items-center justify-center text-[#c9a84c] font-bold text-sm">
                  {r.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{r.name}</p>
                  <p className="text-white/40 text-xs">{formatDate(r.date)}</p>
                </div>
              </div>

              <div className="mb-3">
                <StarRating rating={r.rating} />
              </div>

              <p className="text-white/70 text-sm leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
