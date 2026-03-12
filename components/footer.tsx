import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
              <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 border border-white/20 relative">
                <Image
                  src="/images/logo.png"
                  alt="The Luxe Bus"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <span className="font-bold text-sm tracking-wide text-white">
                The Luxe Bus
              </span>
            </div>
            <p className="text-white/40 text-sm">
              Luxury Group Transportation · Southern California
            </p>
          </div>

          <nav className="flex flex-wrap gap-6 text-white/40 text-sm justify-center">
            <a href="#home" className="hover:text-[#c9a84c] transition-colors">
              Home
            </a>
            <a href="#trip" className="hover:text-[#c9a84c] transition-colors">
              Get a Quote
            </a>
            <a href="#fleet" className="hover:text-[#c9a84c] transition-colors">
              Fleet
            </a>
            <a
              href="#services"
              className="hover:text-[#c9a84c] transition-colors"
            >
              Services
            </a>
            <a
              href="#reviews"
              className="hover:text-[#c9a84c] transition-colors"
            >
              Reviews
            </a>
            <a
              href="#contact"
              className="hover:text-[#c9a84c] transition-colors"
            >
              Contact
            </a>
            <a
              href="https://www.instagram.com/theluxebus_/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#c9a84c] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@theluxebus"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#c9a84c] transition-colors"
            >
              TikTok
            </a>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} The Luxe Bus Group Transportation. All
            rights reserved.
          </p>
          <p className="text-white/20 text-[10px] mt-2">Designed by MLC</p>
        </div>
      </div>
    </footer>
  );
}
