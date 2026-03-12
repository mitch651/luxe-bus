import FleetVideo from "@/components/fleet-video";

export default function FleetSection() {
  // Grey Mercedes Sprinter - exterior + interior gallery
  const greySprinterExterior = {
    src: "/images/fleet/sprinter-grey-disneyland.png",
    alt: "Grey Mercedes Sprinter at Disneyland Resort",
    title: "Grey Mercedes Sprinter",
    desc: 'Up to 8 passengers. 43" TV, premium sound, LED ambient lighting, built-in cooler & premium leather seating.',
  };

  // Grey van interior + amenities — one list: image with grey box (emoji + label) under each
  const greySprinterInteriorCards = [
    { src: "/images/fleet/sprinter-starlight-tv.jpg.jpg", alt: "Starlight ceiling and flat screen TV", icon: "✨", label: "Starlight Ceiling & 43\" TV" },
    { src: "/images/fleet/sprinter-seating.jpg.jpg", alt: "Lounge seating", icon: "🛋️", label: "Premium Leather Seating" },
    { src: "/images/fleet/sprinter-lounge.jpg.jpg", alt: "L-shaped lounge with starry ceiling", icon: "🛋️", label: "Lounge & Starry Ceiling" },
    { src: "/images/fleet/sprinter-interior.jpg.jpg", alt: "Ambient LED lighting", icon: "💡", label: "Ambient LED Lighting" },
    { src: "/images/fleet/sprinter-cooler.jpg.jpg", alt: "Built-in cooler", icon: "🧊", label: "Built-in Cooler" },
    { src: "/images/fleet/sprinter-console.jpg.jpg", alt: "Console with snacks and drinks", icon: "🥤", label: "Snacks & Refreshments" },
    { src: "/images/fleet/sprinter-speaker.jpg.jpg", alt: "Premium sound system", icon: "🎶", label: "Premium Sound System" },
    { src: "/images/fleet/sprinter-amenities.jpg.jpg", alt: "Cup holders and amenities", icon: "✨", label: "Built-in Amenities" },
  ];

  // Black Mercedes Sprinter - exterior
  const blackSprinterExterior = {
    src: "/images/fleet/sprinter-black-disneyland.png",
    alt: "Black Mercedes Sprinter at Disneyland Resort at night",
    title: "Black Mercedes Sprinter",
    desc: "Up to 14 passengers with row seating. Premium luxury interior, starlight ceiling, stunning presence.",
  };

  // Black van interior — image with grey box (emoji + label) under each
  const blackSprinterInteriorCards = [
    { src: "/images/fleet/sprinter-black-interior-1.png", alt: "Starlight ceiling and TV", icon: "✨", label: "Starlight Ceiling & Entertainment" },
    { src: "/images/fleet/sprinter-black-interior-2.png", alt: "Purple starlight interior", icon: "✨", label: "Starlight Ceiling" },
    { src: "/images/fleet/sprinter-black-interior-3.png", alt: "Luxe Bus logo on interior", icon: "🏆", label: "Premium Branding" },
    { src: "/images/fleet/sprinter-black-interior-4.png", alt: "Seating and screen", icon: "🛋️", label: "Premium Seating & Screen" },
    { src: "/images/fleet/sprinter-black-interior-5.png", alt: "Ambient lighting", icon: "💡", label: "Ambient Lighting" },
  ];

  // Tesla Cybertruck
  const cybertruck = {
    src: "/images/fleet/cybertruck.png",
    alt: "Tesla Cybertruck at Disneyland",
    title: "Tesla Cybertruck",
    desc: "Fits up to 4 passengers. Lots of trunk storage. TV for Netflix and games. Iconic design for VIP arrivals and unforgettable entrances.",
  };

  return (
    <section id="fleet" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#c9a84c] uppercase tracking-[0.25em] text-sm font-medium mb-3">
            Our Fleet
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Step Inside Luxury
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            Every detail designed for comfort, style, and an unforgettable ride.
          </p>
        </div>

        {/* Grey van (left) + Black van (right) side by side */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Left: Grey van + interior right under */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Grey Mercedes Sprinter
            </h3>

            {/* Grey van exterior card */}
            <div className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#c9a84c]/40 transition-all duration-300">
              <div className="overflow-hidden">
                <img
                  src={greySprinterExterior.src}
                  alt={greySprinterExterior.alt}
                  className="w-full h-72 md:h-80 object-cover object-bottom scale-100 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-white mb-2">{greySprinterExterior.title}</h4>
                <p className="text-white/60 leading-relaxed">{greySprinterExterior.desc}</p>
              </div>
            </div>

            {/* Grey interior — image + grey box (emoji + label), same style as exterior card */}
            <p className="text-[#c9a84c] uppercase tracking-wider text-sm font-medium pt-2">
              Interior — Grey Sprinter
            </p>
            <div className="grid grid-cols-2 gap-3">
              {greySprinterInteriorCards.map((card, i) => (
                <div key={i} className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#c9a84c]/40 transition-all duration-300">
                  <div className="overflow-hidden">
                    <img
                      src={card.src}
                      alt={card.alt}
                      className="w-full h-36 md:h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3 flex items-center gap-2">
                    <span className="text-xl">{card.icon}</span>
                    <p className="text-white/90 text-xs font-medium">{card.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Left video — grey van */}
            <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 mt-6">
              <FleetVideo
                src={encodeURI("/videos/GREY VAN FINAL.mp4")}
                className="w-full h-72 md:h-80 object-cover"
              />
            </div>
          </div>

          {/* Right: Black van + interior */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Black Mercedes Sprinter
            </h3>
            <div className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#c9a84c]/40 transition-all duration-300">
              <div className="overflow-hidden">
                <img
                  src={blackSprinterExterior.src}
                  alt={blackSprinterExterior.alt}
                  className="w-full h-72 md:h-80 object-cover object-bottom transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-white mb-2">{blackSprinterExterior.title}</h4>
                <p className="text-white/60 leading-relaxed">{blackSprinterExterior.desc}</p>
              </div>
            </div>

            {/* Black van interior — image + grey box (emoji + label), same style as exterior card */}
            <p className="text-[#c9a84c] uppercase tracking-wider text-sm font-medium pt-2">
              Interior — Black Sprinter
            </p>
            <div className="grid grid-cols-2 gap-3">
              {blackSprinterInteriorCards.map((card, i) => (
                <div key={i} className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#c9a84c]/40 transition-all duration-300">
                  <div className="overflow-hidden">
                    <img
                      src={card.src}
                      alt={card.alt}
                      className="w-full h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3 flex items-center gap-2">
                    <span className="text-xl">{card.icon}</span>
                    <p className="text-white/90 text-xs font-medium">{card.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right video — black van */}
            <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 mt-6">
              <FleetVideo
                src={encodeURI("/videos/BLACK VAN FINAL.mp4")}
                className="w-full h-72 md:h-80 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Cybertruck - below */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Tesla Cybertruck
          </h3>
          <div className="group max-w-2xl rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#c9a84c]/40 transition-all duration-300">
            <div className="overflow-hidden">
              <img
                src={cybertruck.src}
                alt={cybertruck.alt}
                className="w-full h-72 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold text-white mb-2">{cybertruck.title}</h4>
              <p className="text-white/60 leading-relaxed">{cybertruck.desc}</p>
            </div>
          </div>

          {/* Cybertruck features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 max-w-2xl">
            {[
              { icon: "👥", label: "Up to 4 Passengers" },
              { icon: "🧳", label: "Trunk Storage" },
              { icon: "📺", label: "TV (Netflix & Games)" },
              { icon: "🚗", label: "VIP Arrivals" },
            ].map((f, i) => (
              <div
                key={i}
                className="text-center bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#c9a84c]/40 transition-colors"
              >
                <div className="text-2xl mb-2">{f.icon}</div>
                <p className="text-white/80 text-xs font-medium">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
