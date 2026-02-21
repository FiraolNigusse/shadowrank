"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/lobby", label: "Lobby" },
  { href: "/match", label: "Match" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/history", label: "History" },
  { href: "/profile", label: "Profile" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between glass-card px-6 py-3.5 backdrop-blur-xl border border-white/15 shadow-xl shadow-black/30">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-violet-300 to-purple-400 hover:from-purple-200 hover:via-violet-200 hover:to-purple-300 transition-all duration-300"
        >
          SHADOWRANK
        </Link>

        <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-hide">
          {navItems
            .filter((item) => item.href !== "/")
            .map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <motion.span
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative block px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                      isActive
                        ? "text-white bg-white/15 border border-white/25 shadow-lg shadow-purple-500/25"
                        : "text-zinc-200 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/15"
                    }`}
                  >
                    {item.label}
                  </motion.span>
                </Link>
              );
            })}
        </div>
      </div>
    </motion.nav>
  );
}
