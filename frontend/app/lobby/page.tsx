"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Player {
  id: string;
  username: string;
  avatarUrl: string;
  rank: string;
  ready?: boolean;
}

const rankClass: Record<string, string> = {
  Bronze: "rank-bronze",
  Silver: "rank-silver",
  Gold: "rank-gold",
  Platinum: "rank-platinum",
  Diamond: "rank-diamond",
};

export default function Lobby() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [ready, setReady] = useState(false);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    setPlayers([
      { id: "1", username: "Player1", avatarUrl: "https://i.pravatar.cc/150?img=1", rank: "Bronze" },
      { id: "2", username: "Player2", avatarUrl: "https://i.pravatar.cc/150?img=2", rank: "Silver" },
    ]);
  }, []);

  useEffect(() => {
    if (ready && countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [ready, countdown]);

  const handleReady = () => {
    setReady(!ready);
    if (!ready) {
      setPlayers((prev) =>
        prev.map((p) => (p.id === "1" ? { ...p, ready: true } : p))
      );
    } else {
      setPlayers((prev) =>
        prev.map((p) => (p.id === "1" ? { ...p, ready: false } : p))
      );
    }
  };

  return (
    <main>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-2">Lobby</h2>
          <p className="text-gray-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Waiting for players...
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {players.map((player, i) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`card p-6 text-center relative ${
              player.ready ? "ring-2 ring-green-500/50" : ""
            }`}
          >
            {player.ready && (
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
            <img
              src={player.avatarUrl}
              alt={player.username}
              className="w-16 h-16 rounded-full mx-auto mb-3 ring-2 ring-white/10"
            />
            <p className="font-semibold mb-1">{player.username}</p>
            <span className={`rank-badge ${rankClass[player.rank] || "rank-bronze"}`}>
              {player.rank}
            </span>
          </motion.div>
        ))}
        {Array.from({ length: Math.max(0, 4 - players.length) }).map((_, i) => (
          <motion.div
            key={`empty-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            className="card p-6 flex flex-col items-center justify-center border-2 border-dashed border-white/10 min-h-[180px]"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-2">
              <span className="text-2xl text-white/20">+</span>
            </div>
            <span className="text-sm text-gray-500">Open slot</span>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-4 items-center">
        <motion.button
          onClick={handleReady}
          className={`primary-btn ${ready ? "!bg-green-600 !shadow-green-500/40" : ""}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {ready ? "✓ Ready" : "Ready Up"}
        </motion.button>
        <button className="secondary-btn">Leave</button>

        <AnimatePresence>
          {ready && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 ml-4 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30"
            >
              <span className="text-green-400 font-mono font-bold text-xl pulse-soft">
                {countdown}
              </span>
              <span className="text-gray-400 text-sm">sec</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
