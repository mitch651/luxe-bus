"use client";

export default function TikTokSection() {
  // Different images than Instagram — fleet exteriors, Cybertruck, black interior
  const posts = [
    { img: "/images/fleet/sprinter-grey-disneyland.png", caption: "Grey Sprinter at Disneyland ✨" },
    { img: "/images/fleet/sprinter-black-disneyland.png", caption: "Black Sprinter vibes 🌙" },
    { img: "/images/fleet/cybertruck.png", caption: "Cybertruck arrivals 🚗" },
    { img: "/images/fleet/sprinter-black-interior-1.png", caption: "Interior luxe 📺" },
    { img: "/images/fleet/sprinter-black-interior-2.png", caption: "Starlight ceiling ✨" },
    { img: "/images/fleet/sprinter-console.jpg.jpg", caption: "Party ready 🥤" },
  ];

  return (
    <section id="tiktok" className="py-24 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[#c9a84c] uppercase tracking-[0.25em] text-sm font-medium mb-3">
            TikTok
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            @theluxebus
          </h2>
          <p className="text-white/50 max-w-md mx-auto">
            Rides, behind-the-scenes, and luxury transport vibes on TikTok.
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto ig-scroll pb-4 snap-x snap-mandatory">
          {posts.map((p, i) => (
            <a
              key={i}
              href="https://www.tiktok.com/@theluxebus"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-56 h-[320px] snap-start group relative rounded-2xl overflow-hidden"
            >
              <img
                src={p.img}
                alt={p.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                  <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center mx-auto mb-2">
                    <svg
                      className="w-6 h-6 text-white ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-white text-sm font-medium px-2">{p.caption}</p>
                </div>
              </div>
              <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.tiktok.com/@theluxebus"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
            </svg>
            Follow @theluxebus on TikTok
          </a>
        </div>
      </div>
    </section>
  );
}
