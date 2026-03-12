"use client";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-[#0a0a0a] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#c9a84c]/5 to-transparent pointer-events-none" />
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <p className="text-[#c9a84c] uppercase tracking-[0.25em] text-sm font-medium mb-3">
            Book Now
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Ride?
          </h2>
          <p className="text-white/50 max-w-md mx-auto text-lg">
            Get a quote with trip details, add-ons, and more.
          </p>
        </div>

        <div
          id="get-quote"
          className="rounded-2xl overflow-hidden bg-white/5 border border-[#c9a84c]/20 shadow-2xl shadow-[#c9a84c]/10 p-10 text-center"
        >
          <p className="text-white/70 mb-6 max-w-lg mx-auto">
            Get a quote with trip details, add-ons, airport pickup info, and
            more. Scroll up to fill out the form.
          </p>
          <a href="#trip" className="btn-gold inline-block">
            Get a Quote
          </a>
        </div>

        <div className="text-center mt-10">
          <p className="text-white/40 text-sm">
            Or DM us on Instagram{" "}
            <a
              href="https://www.instagram.com/theluxebus_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c9a84c] hover:underline"
            >
              @theluxebus_
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
