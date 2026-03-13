import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-end justify-center overflow-hidden pb-16"
    >
      {/* Hero background — black Mercedes Sprinter */}
      <div className="absolute inset-0">
        <Image
          src="/images/fleet/sprinter-black-disneyland.png"
          alt="Black Mercedes Sprinter at Disneyland Resort"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center md:object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/95 md:from-[#0a0a0a]/70 md:via-[#0a0a0a]/30 md:to-[#0a0a0a]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="text-[#c9a84c] uppercase tracking-[0.3em] text-sm font-extrabold mb-6">
          Southern California&apos;s Premier Luxury Transport
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight mb-6">
          The Luxe Bus
        </h1>
        <p className="text-lg text-white/70 max-w-xl mx-auto mb-10 font-semibold">
          Luxury party bus for airports, sporting events, birthdays, bachelor
          &amp; bachelorette parties, wineries, casinos, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
          <a href="#trip" className="btn-gold">
            Get a Quote
          </a>
          <a href="#fleet" className="btn-outline">
            Explore the Fleet
          </a>
        </div>
      </div>
    </section>
  );
}
