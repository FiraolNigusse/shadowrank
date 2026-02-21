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
    <main>
      <div className="mb-10">
        <span
          className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold mb-4 ${
            isNight ? "bg-indigo-500/20 text-indigo-300" : "bg-amber-500/20 text-amber-300"
          }`}
        >
          {isNight ? "🌙 Night" : "☀️ Day"}
        </span>
        <h2 className="text-3xl font-bold mb-2">
          {isNight ? "Night Phase" : "Day Phase"}
        </h2>
        <p className="text-gray-400">
          {isNight ? "Mafia chooses a target" : "Town votes to eliminate"}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {players.map((player, i) => (
          <motion.button
            key={player.id}
            onClick={() =>
              isNight && player.alive && setSelectedTarget(selectedTarget === player.id ? null : player.id)
            }
            disabled={!player.alive}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={player.alive ? { scale: 1.02 } : {}}
            whileTap={player.alive ? { scale: 0.98 } : {}}
            className={`card p-5 text-center ${
              player.alive ? "" : "opacity-50 grayscale cursor-not-allowed"
            } ${selectedTarget === player.id ? "ring-2 ring-purple-500" : ""}`}
          >
            <img
              src={player.avatarUrl}
              alt={player.username}
              className="w-16 h-16 rounded-full mx-auto mb-2 ring-2 ring-white/10"
            />
            <p className="font-semibold text-sm">{player.username}</p>
            {player.alive && (
              <span className="text-xs text-green-400 mt-1 inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Alive
              </span>
            )}
          </motion.button>
        ))}
      </div>

      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-4">Vote</h3>
        <div className="space-y-2">
          {players
            .filter((p) => p.alive)
            .map((player) => (
              <motion.button
                key={player.id}
                onClick={() => setSelectedVote(player.id)}
                whileHover={{ x: 4 }}
                className={`secondary-btn w-full text-left flex items-center justify-between ${
                  selectedVote === player.id ? "bg-purple-500/20 border-purple-500/50" : ""
                }`}
              >
                {player.username}
                {selectedVote === player.id && (
                  <span className="text-purple-400 font-bold">✓</span>
                )}
              </motion.button>
            ))}
        </div>
      </div>

      <div className="card p-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Alive</span>
          <span className="font-semibold text-green-400">
            {aliveCount} / {players.length}
          </span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${alivePercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </main>
  );
}
