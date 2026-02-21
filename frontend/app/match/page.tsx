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
  const [selectedVote, setSelectedVote] = useState<string | null>(null);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <div className={`absolute w-screen h-screen opacity-10 blur-3xl rounded-full -z-10 animate-pulse transition-colors duration-1000 ${phase === 'night' ? 'bg-blue-900' : 'bg-orange-700'}`}></div>

      <h1 className="text-4xl font-bold mb-6 text-white">

        {phase.toUpperCase()} PHASE
      </h1>

      <div className="flex gap-6 mb-8">
        {players.map(player => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex flex-col items-center p-4 rounded-xl w-28 ${player.alive
                ? "glass-card"
                : "glass-card opacity-50 line-through"
              }`}
          >
            <img
              src={player.avatarUrl}
              alt="avatar"
              className="w-16 h-16 rounded-full mb-2"
            />
            <span className="font-semibold text-white">
              {player.username}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-2xl mb-4 text-white">Vote Panel</h2>

        {players
          .filter(p => p.alive)
          .map(player => (
            <motion.button
              key={player.id}
              onClick={() => setSelectedVote(player.id)}
              whileHover={{ scale: 1.05 }}
              className={`esports-button px-6 py-3 mb-2 rounded-xl font-semibold text-white ${selectedVote === player.id ? "ring-2 ring-red-500" : ""
                }`}
            >
              {player.username}
            </motion.button>
          ))}

        {selectedVote && (
          <p className="mt-3 text-white">
            You voted for:{" "}
            <span className="font-semibold">
              {players.find(p => p.id === selectedVote)?.username}
            </span>
          </p>
        )}
      </div>

      <div className="mt-8 w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-500"
          style={{
            width: `${(players.filter(p => p.alive).length / players.length) * 100
              }%`,
          }}
        />
      </div>
      <p className="mt-2 text-sm text-white opacity-70">
        Alive players
      </p>
    </main>
  );
}