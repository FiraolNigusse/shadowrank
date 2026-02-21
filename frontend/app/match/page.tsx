"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Player {
  id: string;
  username: string;
  avatarUrl: string;
  alive: boolean;
}

export default function Match() {
  const [players] = useState<Player[]>([
    { id: "1", username: "Player1", avatarUrl: "https://i.pravatar.cc/150?img=3", alive: true },
    { id: "2", username: "Player2", avatarUrl: "https://i.pravatar.cc/150?img=4", alive: true },
  ]);

  const [phase, setPhase] = useState<"day" | "night">("night");
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [selectedVote, setSelectedVote] = useState<string | null>(null);

  const aliveCount = players.filter((p) => p.alive).length;
  const alivePercent = (aliveCount / players.length) * 100;

  const isNight = phase === "night";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 md:p-10 relative overflow-hidden">
      <div
        className={`orb w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors duration-1000 ${
          isNight ? "orb-blue" : "bg-orange-600/30"
        }`}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl w-full flex flex-col items-center"
      >
        {/* Phase header */}
        <div className="text-center mb-8">
          <h1
            className={`font-display text-4xl md:text-6xl font-bold tracking-tight mb-3 transition-colors duration-500 ${
              isNight ? "text-sky-300" : "text-amber-300"
            }`}
            style={{ textShadow: isNight ? "0 0 40px rgba(56, 189, 248, 0.4)" : "0 0 40px rgba(251, 191, 36, 0.4)" }}
          >
            {phase.toUpperCase()} PHASE
          </h1>
          <p className="text-zinc-300 text-base font-medium">
            {isNight ? "Mafia chooses a target" : "Town votes to eliminate"}
          </p>
        </div>

        {/* Target selection */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {players.map((player, i) => (
            <motion.button
              key={player.id}
              onClick={() => isNight && player.alive && setSelectedTarget(selectedTarget === player.id ? null : player.id)}
              disabled={!player.alive}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={player.alive ? { scale: 1.08, y: -4 } : {}}
              whileTap={player.alive ? { scale: 0.98 } : {}}
              className={`flex flex-col items-center glass-card p-6 w-32 rounded-2xl transition-all duration-300 cursor-pointer ${
                player.alive ? "" : "opacity-50 grayscale cursor-not-allowed"
              } ${
                selectedTarget === player.id
                  ? "ring-4 ring-violet-400 shadow-xl shadow-violet-500/20 border-violet-400/50"
                  : ""
              }`}
            >
              <div className="relative mb-3">
                <img
                  src={player.avatarUrl}
                  alt={player.username}
                  className={`w-20 h-20 rounded-full object-cover ring-4 ${
                    selectedTarget === player.id ? "ring-violet-400" : "ring-white/10"
                  } ${!player.alive ? "ring-red-500/20" : ""}`}
                />
                {selectedTarget === player.id && (
                  <div className="absolute inset-0 rounded-full bg-violet-500/20" />
                )}
              </div>
              <span
                className={`font-bold text-base ${
                  player.alive ? "text-zinc-100" : "text-zinc-500 line-through"
                }`}
              >
                {player.username}
              </span>
              {player.alive && (
                <span className="text-xs text-emerald-400 mt-0.5 font-medium">Alive</span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Vote panel */}
        <div className="flex flex-col items-center w-full max-w-sm">
          <h2 className="font-display text-2xl font-bold text-zinc-200 mb-8 tracking-tight">
            VOTE PANEL
          </h2>

          <div className="flex flex-col gap-3 w-full">
            {players
              .filter((p) => p.alive)
              .map((player) => (
                <motion.button
                  key={player.id}
                  onClick={() => setSelectedVote(player.id)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`esports-button-vote px-6 py-4 rounded-xl font-bold text-left w-full flex items-center justify-between transition-all ${
                    selectedVote === player.id
                      ? "esports-button-vote-active"
                      : ""
                  }`}
                >
                  <span className="text-zinc-100">{player.username}</span>
                  {selectedVote === player.id && (
                    <span className="text-violet-300 text-sm font-medium">Selected</span>
                  )}
                </motion.button>
              ))}
          </div>

          {selectedVote && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-5 text-base text-zinc-300"
            >
              Voted:{" "}
              <span className="font-bold text-violet-300">
                {players.find((p) => p.id === selectedVote)?.username}
              </span>
            </motion.p>
          )}
        </div>

        {/* Alive count */}
        <div className="mt-12 w-full max-w-xs">
          <div className="progress-bar h-3 rounded-full">
            <motion.div
              className="progress-bar-fill progress-bar-fill-success"
              initial={{ width: 0 }}
              animate={{ width: `${alivePercent}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <p className="mt-3 text-sm font-semibold text-zinc-300 text-center">
            {aliveCount} / {players.length} alive
          </p>
        </div>
      </motion.div>
    </main>
  );
}
