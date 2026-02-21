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

const medals = ["🥇", "🥈", "🥉"];

export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [type, setType] = useState<"global" | "weekly">("global");

  useEffect(() => {
    fetch(`http://localhost:8000/api/users/leaderboard/${type}/`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setUsers([]));
  }, [type]);

  return (
    <main>
      <h2 className="text-3xl font-bold mb-2">Leaderboard</h2>
      <p className="text-gray-400 mb-8">Top players by ELO</p>

      <div className="flex gap-2 mb-8">
        {(["global", "weekly"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              type === t
                ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {users.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            className={`card p-5 flex justify-between items-center ${
              index < 3 ? "ring-1 ring-purple-500/20" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="w-8 text-xl">
                {index < 3 ? medals[index] : `#${index + 1}`}
              </span>
              <span className="font-semibold">{user.username}</span>
              {index < 3 && (
                <span className="text-xs text-gray-500">
                  {user.wins}W / {user.losses}L
                </span>
              )}
            </div>
            <span className="text-purple-400 font-bold text-lg">{user.elo}</span>
          </motion.div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="card p-12 text-center">
          <p className="text-gray-400 mb-2">No rankings yet</p>
          <p className="text-sm text-gray-500">
            Be the first to climb. Enter a lobby and win.
          </p>
        </div>
      )}
    </main>
  );
}
