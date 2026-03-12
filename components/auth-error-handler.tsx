"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function getAuthErrorFromHash(): { error: string; code: string } | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash?.slice(1) || "";
  const params = new URLSearchParams(hash);
  const error = params.get("error");
  const code = params.get("error_code") || "";
  return error ? { error, code } : null;
}

export function AuthErrorHandler({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [authError, setAuthError] = useState<{ error: string; code: string } | null>(() => getAuthErrorFromHash());

  useEffect(() => {
    const err = getAuthErrorFromHash();
    if (err) {
      setAuthError(err);
      window.history.replaceState(null, "", pathname || "/");
    }
  }, [pathname]);

  if (authError && authError.code === "otp_expired") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#0a0a0a]">
        <div className="bg-white/[0.04] rounded-2xl p-8 border border-[#c9a84c]/30 text-center max-w-md w-full">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#c9a84c]/20 flex items-center justify-center border border-[#c9a84c]/40">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Link Expired</h2>
          <p className="text-white/70 text-sm mb-8 leading-relaxed">
            This verification link has expired or is invalid. Please request a new one or contact us if you need help.
          </p>
          <div className="space-y-4">
            <Link
              href="/#trip"
              className="block w-full bg-[#c9a84c] hover:bg-[#c9a84c]/90 text-black font-semibold py-4 rounded-xl text-sm uppercase tracking-wider transition-colors"
            >
              Get a Quote
            </Link>
            <Link href="/" className="block text-[#c9a84c] hover:text-[#c9a84c]/80 text-sm font-medium">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#0a0a0a]">
        <div className="bg-white/[0.04] rounded-2xl p-8 border border-[#c9a84c]/30 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-white mb-3">Something Went Wrong</h2>
          <p className="text-white/70 text-sm mb-8">Please try again or contact us if the problem persists.</p>
          <Link
            href="/"
            className="block w-full bg-[#c9a84c] hover:bg-[#c9a84c]/90 text-black font-semibold py-4 rounded-xl text-sm uppercase tracking-wider"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
