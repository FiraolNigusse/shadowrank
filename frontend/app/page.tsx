"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-purple-700 opacity-20 blur-3xl rounded-full -z-10 animate-pulse top-1/4 left-1/4"></div>
      <div className="absolute w-96 h-96 bg-blue-700 opacity-10 blur-3xl rounded-full -z-10 animate-pulse bottom-1/4 right-1/4" style={{ animationDelay: '2s' }}></div>

      <h1 className="text-6xl font-black tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
        SHADOWRANK
      </h1>

      <div className="flex flex-col gap-4 w-64">
        <Link href="/lobby" className="esports-button px-8 py-3 rounded-xl font-bold text-center">
          Enter Lobby
        </Link>
        <Link href="/match" className="esports-button px-8 py-3 rounded-xl font-bold bg-none border border-purple-500/30 text-center">
          Enter Match Screen
        </Link>
      </div>
    </main>

  );
}