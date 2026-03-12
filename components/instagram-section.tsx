"use client";

export default function InstagramSection() {
  // Local images — using grey van interior shots (in public/images/fleet/)
  const posts = [
    { img: "/images/fleet/sprinter-starlight-tv.jpg.jpg", caption: "Interior vibes ✨" },
    { img: "/images/fleet/sprinter-interior.jpg.jpg", caption: '43" TV on board 📺' },
    { img: "/images/fleet/sprinter-lounge.jpg.jpg", caption: "Night rides 🌙" },
    { img: "/images/fleet/sprinter-seating.jpg.jpg", caption: "Luxury on wheels 🥂" },
    { img: "/images/fleet/sprinter-cooler.jpg.jpg", caption: "Party mode 🎉" },
    { img: "/images/fleet/sprinter-amenities.jpg.jpg", caption: "Uber could never 💅" },
  ];

  return (
    <section id="instagram" className="py-24 bg-[#111]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[#c9a84c] uppercase tracking-[0.25em] text-sm font-medium mb-3">
            Follow Us
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            @theluxebus_
          </h2>
          <p className="text-white/50 max-w-md mx-auto">
            See the latest rides, events, and behind-the-scenes on our Instagram.
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto ig-scroll pb-4 snap-x snap-mandatory">
          {posts.map((p, i) => (
            <a
              key={i}
              href="https://www.instagram.com/theluxebus_/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-72 snap-start group relative rounded-2xl overflow-hidden"
            >
              <img
                src={p.img}
                alt={p.caption}
                className="w-72 h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                  <svg
                    className="w-8 h-8 text-white mx-auto mb-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  <p className="text-white text-sm font-medium">{p.caption}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.instagram.com/theluxebus_/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Follow @theluxebus_ on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
