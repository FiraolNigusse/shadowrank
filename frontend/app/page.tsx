"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">ShadowRank</h1>
      <Link href="/lobby" className="px-6 py-2 bg-blue-500 rounded-xl font-bold">
        Enter Lobby
      </Link>
      <Link href="/match" className="px-6 py-2 bg-red-500 rounded-xl font-bold">
        Enter Match Screen
      </Link>
    </main>
  );
}