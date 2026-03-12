export default function ServicesSection() {
  const services = [
    {
      title: "Airport Transfers",
      desc: "Stress-free roundtrip service to LAX, LGB, SNA, and all Southern California airports. Car seats and strollers welcome.",
      icon: "✈️",
    },
    {
      title: "Sporting Events",
      desc: "Roll up to the game in style. Perfect for group outings to Dodgers, Lakers, Chargers, and more.",
      icon: "🏟️",
    },
    {
      title: "Birthday Parties",
      desc: "Make it a celebration from the moment everyone steps on. LED lights, music, and luxury all the way.",
      icon: "🎂",
    },
    {
      title: "Bachelor & Bachelorette",
      desc: "The ultimate pre-wedding experience. Wine tours, Vegas runs, club hopping—we handle the ride.",
      icon: "🥂",
    },
    {
      title: "Wineries & Casinos",
      desc: "Temecula, Napa, or the casino strip. Enjoy the night without worrying about the drive home.",
      icon: "🍷",
    },
    {
      title: "Corporate Events",
      desc: "Impress clients and teams with premium group transport. Professional, punctual, polished.",
      icon: "💼",
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#111]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#c9a84c] uppercase tracking-[0.25em] text-sm font-medium mb-3">
            Services
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Where Do You Want to Go?
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            From the airport to the after-party, Luxe Bus has you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#c9a84c]/40 hover:bg-white/[0.03] transition-all duration-300"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
              <p className="text-white/60 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
