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

const rankColors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  Bronze: {
    bg: "bg-gradient-to-br from-amber-900/30 to-orange-900/30",
    text: "text-amber-400",
    border: "border-amber-500/40",
    glow: "shadow-amber-500/20",
  },
  Silver: {
    bg: "bg-gradient-to-br from-zinc-700/30 to-zinc-600/30",
    text: "text-zinc-300",
    border: "border-zinc-400/40",
    glow: "shadow-zinc-400/20",
  },
  Gold: {
    bg: "bg-gradient-to-br from-yellow-700/30 to-yellow-600/30",
    text: "text-yellow-400",
    border: "border-yellow-500/40",
    glow: "shadow-yellow-500/20",
  },
  Platinum: {
    bg: "bg-gradient-to-br from-cyan-700/30 to-blue-700/30",
    text: "text-cyan-300",
    border: "border-cyan-400/40",
    glow: "shadow-cyan-400/20",
  },
  Diamond: {
    bg: "bg-gradient-to-br from-purple-700/30 to-violet-700/30",
    text: "text-purple-300",
    border: "border-purple-400/40",
    glow: "shadow-purple-400/20",
  },
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
        prev.map((p) => (p.id === "1" ? { ...p, ready: !ready } : p))
      );
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 md:p-10 relative overflow-hidden">
      {/* Background orbs */}
      <div className="orb orb-purple w-96 h-96 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="orb orb-blue w-72 h-72 bottom-0 right-0 translate-x-1/4 translate-y-1/4 opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl w-full flex flex-col items-center relative z-10"
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight mb-3 bg-gradient-to-r from-zinc-100 via-white to-zinc-200 bg-clip-text text-transparent">
            LOBBY
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-zinc-400 text-base font-medium">Waiting for players...</p>
          </div>
        </motion.div>

        {/* Players Grid */}
        <div className="w-full mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {players.map((player, i) => {
              const rankStyle = rankColors[player.rank] || rankColors.Bronze;
              return (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className={`relative flex flex-col items-center glass-card p-6 rounded-2xl border-2 transition-all duration-300 ${
                    player.ready
                      ? `${rankStyle.border} ${rankStyle.glow} shadow-lg ring-2 ring-emerald-500/30`
                      : "border-white/10"
                  }`}
                >
                  {/* Ready indicator */}
                  <AnimatePresence>
                    {player.ready && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50 z-10"
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Avatar */}
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-full blur-xl" />
                    <img
                      src={player.avatarUrl}
                      alt={player.username}
                      className="relative w-20 h-20 rounded-full ring-4 ring-white/10 object-cover"
                    />
                  </div>

                  {/* Username */}
                  <span className="font-semibold text-base text-zinc-100 mb-1.5 truncate w-full text-center">
                    {player.username}
                  </span>

                  {/* Rank Badge */}
                  <div
                    className={`px-3 py-1 rounded-full border ${rankStyle.bg} ${rankStyle.border} ${rankStyle.text} text-xs font-bold uppercase tracking-wider shadow-lg`}
                  >
                    {player.rank}
                  </div>
                </motion.div>
              );
            })}

            {/* Empty slots */}
            {Array.from({ length: Math.max(0, 4 - players.length) }).map((_, i) => (
              <motion.div
                key={`empty-${i}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (players.length + i) * 0.1 }}
                className="flex flex-col items-center justify-center glass-card p-6 rounded-2xl border-2 border-dashed border-white/10 min-h-[200px]"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 border-2 border-dashed border-white/10 mb-4 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-zinc-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <span className="text-zinc-600 text-sm font-medium">Waiting...</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ready Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-6"
        >
          <motion.button
            onClick={handleReady}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`esports-button px-12 py-5 rounded-2xl font-semibold text-base min-w-[200px] relative overflow-hidden ${
              ready
                ? "ring-4 ring-emerald-500/50 shadow-2xl shadow-emerald-500/30"
                : "shadow-xl shadow-purple-500/30"
            }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {ready ? (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Ready
                </>
              ) : (
                "Click to Ready"
              )}
            </span>
            {ready && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.button>

          {/* Countdown */}
          <AnimatePresence>
            {ready && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                className="glass-card px-8 py-4 rounded-xl border border-emerald-500/30"
              >
                <p className="font-display text-xl text-center">
                  <span className="text-emerald-400">Game starts in: </span>
                  <span className="text-white font-bold text-2xl">{countdown}s</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </main>
  );
}
