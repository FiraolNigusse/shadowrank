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
      <main className="flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </main>
    );
  }

  const winRate =
    user.wins + user.losses === 0
      ? 0
      : (user.wins / (user.wins + user.losses)) * 100;

  return (
    <main className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="relative inline-block">
          <img
            src={`https://i.pravatar.cc/150?u=${user.username}`}
            alt=""
            className="w-28 h-28 rounded-full mx-auto mb-4 ring-4 ring-purple-500/30"
          />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30">
            <span className="text-purple-400 font-bold text-sm">{user.elo} ELO</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-1">{user.username}</h2>
        <p className="text-gray-500 text-sm">Ranked Player</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6 space-y-5 mb-6"
      >
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Wins</span>
          <span className="font-bold text-green-400 text-xl">{user.wins}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Losses</span>
          <span className="font-bold text-red-400 text-xl">{user.losses}</span>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-white/5">
          <span className="text-gray-400">Win Rate</span>
          <span className="font-bold text-xl">{winRate.toFixed(1)}%</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Progress</span>
          <span className="font-medium">{winRate.toFixed(0)}%</span>
        </div>
        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${winRate}%` }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
      </motion.div>
    </main>
  );
}
