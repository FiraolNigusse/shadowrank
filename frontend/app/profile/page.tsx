"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface User {
  id: string;
  username: string;
  elo: number;
  wins: number;
  losses: number;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/users/me/")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-10 h-10 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
          <p className="text-zinc-500 text-sm">Loading profile...</p>
        </motion.div>
      </main>
    );
  }

  const winRate =
    user.wins + user.losses === 0
      ? 0
      : (user.wins / (user.wins + user.losses)) * 100;

  return (
    <main className="min-h-screen p-6 md:p-10 flex flex-col items-center relative overflow-hidden">
      <div className="orb orb-purple w-80 h-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full flex flex-col items-center"
      >
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          src={`https://i.pravatar.cc/150?u=${user.username}`}
          alt=""
          className="w-28 h-28 rounded-full mb-6 ring-4 ring-violet-500/30 ring-offset-4 ring-offset-[var(--bg-base)]"
        />
        <h1 className="font-display text-4xl font-bold text-zinc-100">
          {user.username}
        </h1>
        <p className="mt-2 text-xl text-zinc-400">ELO: {user.elo}</p>
        <span className="mt-3 px-4 py-1.5 rounded-full text-xs font-semibold bg-violet-500/15 text-violet-400 border border-violet-500/25">
          Ranked Player
        </span>

        <div className="mt-10 w-full glass-card p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-zinc-400">Wins</span>
            <span className="font-bold text-emerald-400">{user.wins}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-400">Losses</span>
            <span className="font-bold text-red-400">{user.losses}</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-white/5">
            <span className="text-zinc-400">Win Rate</span>
            <span className="font-bold text-zinc-100">{winRate.toFixed(1)}%</span>
          </div>
        </div>

        <div className="mt-6 w-full">
          <div className="progress-bar h-2">
            <motion.div
              className="progress-bar-fill progress-bar-fill-success"
              initial={{ width: 0 }}
              animate={{ width: `${winRate}%` }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </motion.div>
    </main>
  );
}
