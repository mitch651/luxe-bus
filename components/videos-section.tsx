"use client";

import { useState } from "react";

// Left = grey van, Right = black van (order matters for grid)
const VIDEOS = [
  { mp4: "/videos/GREY VAN FINAL.mp4", label: "Grey Mercedes Sprinter" },
  { mp4: "/videos/BLACK VAN FINAL.mp4", label: "Black Mercedes Sprinter" },
];

function VideoCard({
  mp4,
  label,
}: {
  mp4: string;
  label: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center aspect-video min-h-[200px]">
        <div className="text-center p-6">
          <div className="text-4xl mb-2 opacity-50">🎬</div>
          <p className="text-white/60 text-sm font-medium">{label}</p>
          <p className="text-white/40 text-xs mt-1">Video coming soon</p>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#c9a84c]/40 transition-all duration-300">
      <video
        src={encodeURI(mp4)}
        onError={() => setFailed(true)}
        controls
        playsInline
        preload="metadata"
        className="w-full aspect-video object-cover"
      >
        <source src={encodeURI(mp4)} type="video/mp4" />
        Your browser does not support video. Add MP4 files to /public/videos/ for best compatibility.
      </video>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-white font-medium text-sm">{label}</p>
      </div>
    </div>
  );
}

export default function VideosSection() {
  return (
    <section id="videos" className="py-24 bg-[#111]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#c9a84c] uppercase tracking-[0.25em] text-sm font-medium mb-3">
            See It in Action
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            The Luxe Bus Experience
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            Take a look at our luxury fleet and the ride that awaits you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {VIDEOS.map((video) => (
            <VideoCard key={video.label} mp4={video.mp4} label={video.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
