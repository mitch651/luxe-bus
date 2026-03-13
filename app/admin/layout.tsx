import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <aside className="fixed left-0 top-0 z-30 h-full w-56 border-r border-white/10 bg-[#0a0a0a]/98">
        <div className="flex flex-col gap-1 p-4">
          <Link
            href="/admin"
            className="rounded-lg px-4 py-3 text-sm font-semibold text-[#c9a84c]"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/homepage"
            className="rounded-lg px-4 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            Homepage
          </Link>
        </div>
      </aside>
      <main className="pl-56">{children}</main>
    </div>
  );
}
