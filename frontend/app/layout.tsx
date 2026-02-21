"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const navLinks = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/lobby", label: "Lobby", icon: "🎮" },
  { href: "/match", label: "Match", icon: "⚔️" },
  { href: "/leaderboard", label: "Rank", icon: "🏆" },
  { href: "/history", label: "History", icon: "📜" },
  { href: "/profile", label: "Profile", icon: "👤" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased pb-20`}>
        {/* Top Navigation */}
        <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0e1118]/98 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 group">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors">
                  SHADOW<span className="text-purple-500">RANK</span>
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.slice(1).map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                        isActive
                          ? "bg-purple-500/20 text-purple-400"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </div>

        {/* Bottom Navigation Bar - Perfect for Telegram Mini App */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 bg-[#0e1118]/98 backdrop-blur-md safe-area-inset-bottom">
          <div className="max-w-6xl mx-auto px-1">
            <div className="flex items-center justify-around">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl transition-all min-w-[50px] flex-1 ${
                      isActive
                        ? "text-purple-400 bg-purple-500/10"
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    <span className="text-xl leading-none">{link.icon}</span>
                    <span className={`text-[10px] font-medium leading-tight ${isActive ? "text-purple-400" : "text-gray-500"}`}>
                      {link.label}
                    </span>
                    {isActive && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </body>
    </html>
  );
}
