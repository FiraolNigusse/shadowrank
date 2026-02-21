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

export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [type, setType] = useState<"global" | "weekly">("global");

  useEffect(() => {
    fetch(`http://localhost:8000/api/users/leaderboard/${type}/`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setUsers([]));
  }, [type]);

  const rankColors: Record<number, string> = {
    1: "text-amber-400",
    2: "text-zinc-300",
    3: "text-amber-600",
  };

  return (
    <main className="min-h-screen p-6 md:p-10 relative overflow-hidden">
      <div className="orb orb-purple w-80 h-80 -top-20 right-0" />
      <div className="orb orb-blue w-64 h-64 bottom-0 left-0 opacity-30" style={{ animationDelay: "-2s" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-2 text-zinc-100">
          LEADERBOARD
        </h1>
        <p className="text-zinc-500 text-sm mb-8">Top players by ELO</p>

        <div className="flex gap-2 mb-8">
          {(["global", "weekly"] as const).map((t) => (
            <motion.button
              key={t}
              onClick={() => setType(t)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`esports-tab px-5 py-2.5 capitalize ${
                type === t ? "esports-tab-active" : ""
              }`}
            >
              {t}
            </motion.button>
          ))}
        </div>

        <div className="space-y-3">
          {users.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ x: 4 }}
              className="glass-card p-5 flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`font-display text-xl font-bold w-8 ${
                    rankColors[index + 1] ?? "text-zinc-500"
                  }`}
                >
                  #{index + 1}
                </span>
                <span className="font-semibold text-zinc-200">{user.username}</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-violet-400">ELO {user.elo}</p>
                <p className="text-xs text-zinc-500">
                  {user.wins}W / {user.losses}L
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {users.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-zinc-500 py-12"
          >
            No rankings yet. Be the first to climb.
          </motion.p>
        )}
      </motion.div>
    </main>
  );
}
