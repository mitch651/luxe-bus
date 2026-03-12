"use client";

import { useRef, useEffect, useState } from "react";

export default function FleetVideo({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (failed) return;
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [failed]);

  if (failed) {
    return (
      <div className="flex items-center justify-center aspect-video bg-white/5 min-h-[200px] rounded-2xl border border-white/10">
        <div className="text-center p-6">
          <div className="text-4xl mb-2 opacity-50">🎬</div>
          <p className="text-white/60 text-sm font-medium">Video coming soon</p>
          <p className="text-white/40 text-xs mt-1">Add your video to public/videos/</p>
        </div>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      loop
      autoPlay
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
