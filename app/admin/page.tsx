import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-2">Admin</h1>
      <p className="text-white/50 text-sm mb-8">
        Manage your site content.
      </p>
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 max-w-md">
        <h2 className="text-sm font-semibold text-[#c9a84c] uppercase tracking-wider mb-2">
          Content
        </h2>
        <Link
          href="/admin/homepage"
          className="block rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors"
        >
          Homepage
        </Link>
        <p className="mt-2 text-xs text-white/40">
          Edit hero headline, copy, CTAs, badges, and hero image with live preview.
        </p>
      </div>
    </div>
  );
}
